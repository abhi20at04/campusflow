import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  CalendarDays,
  Briefcase,
  CheckSquare,
  AlertCircle,
  Clock,
  Mail,
  Sparkles,
  MessageCircle,
  Send,
  ArrowRight,
  X,
  Loader2,
  RefreshCw,
  Lightbulb,
  CheckCircle2,
  Plus,
  Calendar,
} from 'lucide-react'
import { fetchEmails, getEmailSummary, sendAssistantMessage } from '../services/api'

/* ─── Animation helpers ─── */
const fadeIn = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.08 } } }
const cardSpring = { type: 'spring', stiffness: 300, damping: 20 }

/* ─── Category color mapping ─── */
const CATEGORY_COLORS = {
  Placements: { text: 'text-terracotta', bg: 'bg-terracotta/10', border: 'border-terracotta/20' },
  Assignments: { text: 'text-sage', bg: 'bg-sage/10', border: 'border-sage/20' },
  Events: { text: 'text-gold', bg: 'bg-gold/10', border: 'border-gold/20' },
  General: { text: 'text-text-muted', bg: 'bg-surface-secondary', border: 'border-surface-secondary' },
  Exams: { text: 'text-dusty-red', bg: 'bg-dusty-red/10', border: 'border-dusty-red/20' },
}

function getCategoryStyle(category) {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.General
}

/* ─── Top Navigation ─── */
// TODO: Replace with Google OAuth authentication after hackathon
function DashboardNav() {
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')
    window.location.href = '/'
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/[0.04]">
      <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="CampusFlow" className="w-8 h-8 p-0.5 object-contain mix-blend-multiply" />
          <span className="text-lg font-bold text-text-primary tracking-tight">
            Campus<span className="text-terracotta">Flow</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-[#F5F4F0] flex items-center justify-center">
            <User size={14} className="text-text-muted" />
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 text-xs font-medium text-text-secondary border border-black/[0.06] rounded-lg hover:border-dusty-red/30 hover:text-dusty-red transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

/* ─── Greeting ─── */
function Greeting() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-7"
    >
      <h1 className="text-[26px] md:text-[30px] font-bold text-text-primary tracking-tight">
        Hello Tarun 👋
      </h1>
      <p className="text-sm text-text-secondary mt-1 font-medium">
        Here's what needs your attention today.
      </p>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════
   LEFT COLUMN — Status & Planning
   ═══════════════════════════════════════════ */

function OverviewCards() {
  const cards = [
    { label: 'Deadlines', value: '2', icon: CalendarDays, color: 'text-dusty-red', bg: 'bg-dusty-red/[0.06]', tint: 'bg-dusty-red/[0.02]' },
    { label: 'Placements', value: '3', icon: Briefcase, color: 'text-gold', bg: 'bg-gold/[0.08]', tint: 'bg-gold/[0.02]' },
    { label: 'Tasks', value: '3', icon: CheckSquare, color: 'text-sage', bg: 'bg-sage/[0.08]', tint: 'bg-sage/[0.02]' },
  ]

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-3">
      {cards.map((c) => (
        <motion.div
          key={c.label}
          variants={fadeIn}
          transition={{ duration: 0.4 }}
          whileHover={{ y: -4, scale: 1.02, transition: cardSpring }}
          className={`${c.tint} rounded-2xl px-5 py-4 border border-black/[0.04] flex items-center gap-3.5 cursor-default`}
          style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}
        >
          <div className={`w-10 h-10 ${c.bg} rounded-xl flex items-center justify-center shrink-0`}>
            <c.icon size={18} className={c.color} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-text-muted font-medium">{c.label}</p>
          </div>
          <p className="text-3xl font-bold text-text-primary">{c.value}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

function TodaySchedule() {
  const schedule = [
    { time: '9:00 AM', activity: 'Classes', color: 'bg-terracotta' },
    { time: '2:00 PM', activity: 'Assignment Work', color: 'bg-sage' },
    { time: '6:00 PM', activity: 'Placement Preparation', color: 'bg-gold' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-2xl p-5 border border-black/[0.04] flex-1 flex flex-col"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.03)', background: 'white' }}
    >
      <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-4 flex items-center gap-1.5">
        <Clock size={12} />
        Today's Schedule
      </h3>
      <div className="space-y-0 flex-1">
        {schedule.map((s, i) => (
          <div key={i} className="flex items-stretch gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-2.5 h-2.5 rounded-full ${s.color} shrink-0 mt-0.5`}></div>
              {i < schedule.length - 1 && <div className="w-px flex-1 bg-black/[0.04] my-1"></div>}
            </div>
            <div className={`${i < schedule.length - 1 ? 'pb-5' : ''}`}>
              <p className="text-[11px] font-medium text-text-muted">{s.time}</p>
              <p className="text-sm font-medium text-text-primary mt-0.5">{s.activity}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════
   MIDDLE COLUMN — Information & Action
   ═══════════════════════════════════════════ */

function TodayPriorities() {
  const priorities = [
    { text: 'NOKIA Online Test', deadline: 'Live Now', priority: 'high' },
    { text: 'Smith & Nephew Case Study Submission', deadline: 'Due Today', priority: 'high' },
    { text: 'Amazon ML Summer School 2026', deadline: 'Few Hours Left', priority: 'medium' },
  ]

  const styles = {
    high: 'text-dusty-red bg-dusty-red/[0.08]',
    medium: 'text-gold bg-gold/[0.08]',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-2xl p-6 border border-black/[0.04]"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.03)', background: 'white' }}
    >
      <h2 className="text-sm font-bold text-text-primary mb-4 flex items-center gap-2">
        <AlertCircle size={15} className="text-dusty-red" />
        Today's Priorities
      </h2>
      <div className="space-y-2.5">
        {priorities.map((p, i) => (
          <div key={i} className="flex items-center justify-between bg-[#FAFAF8] rounded-xl px-4 py-3 border border-black/[0.03]">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${p.priority === 'high' ? 'bg-dusty-red' : 'bg-gold'}`}></div>
              <span className="text-sm font-medium text-text-primary">{p.text}</span>
            </div>
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${styles[p.priority]}`}>
              {p.deadline}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ─── Skeleton Loader ─── */
function UpdateSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-[20px] p-4 animate-pulse border border-black/[0.04]">
          <div className="flex items-start justify-between mb-2">
            <div className="h-4 bg-[#F0EFEC] rounded w-3/4"></div>
            <div className="h-4 bg-[#F0EFEC] rounded-full w-16"></div>
          </div>
          <div className="h-3 bg-[#F0EFEC] rounded w-full mb-1.5"></div>
          <div className="h-3 bg-[#F0EFEC] rounded w-2/3"></div>
        </div>
      ))}
    </div>
  )
}

/* ─── Important Updates (API-integrated) ─── */
function ImportantUpdates({ emails, loading, error, onRetry, onViewDetails }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-2xl p-6 border border-black/[0.04]"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.03)', background: 'white' }}
    >
      <h2 className="text-sm font-bold text-text-primary mb-4 flex items-center gap-2">
        <Mail size={15} className="text-sage" />
        Important Updates
      </h2>

      {loading && <UpdateSkeleton />}

      {error && (
        <div className="text-center py-8">
          <p className="text-sm text-text-secondary mb-3">Unable to load updates.</p>
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-terracotta border border-terracotta/20 rounded-xl hover:bg-terracotta/5 transition-colors duration-200"
          >
            <RefreshCw size={12} />
            Retry
          </button>
        </div>
      )}

      {!loading && !error && emails.length === 0 && (
        <div className="text-center py-8">
          <Mail size={20} className="text-text-muted mx-auto mb-2" />
          <p className="text-sm text-text-muted">No important updates available.</p>
        </div>
      )}

      {!loading && !error && emails.length > 0 && (
        <div className="space-y-3">
          {emails.slice(0, 5).map((email) => {
            const catStyle = getCategoryStyle(email.category)
            return (
              <motion.div
                key={email.id}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="rounded-[20px] p-4 border border-black/[0.04] hover:border-black/[0.08] transition-all duration-200 cursor-default"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}
              >
                <div className="flex items-start justify-between mb-1.5">
                  <h3 className="text-sm font-semibold text-text-primary line-clamp-1">{email.subject}</h3>
                  <span className={`text-[10px] font-semibold ${catStyle.text} ${catStyle.bg} px-2.5 py-0.5 rounded-full shrink-0 ml-3`}>
                    {email.category || 'General'}
                  </span>
                </div>
                <p className="text-[13px] text-text-secondary leading-relaxed line-clamp-2">{email.snippet}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[11px] text-text-muted font-medium">{email.date}</span>
                  <button
                    onClick={() => onViewDetails(email.id)}
                    className="text-[11px] font-semibold text-terracotta hover:text-terracotta-dark transition-colors duration-200 flex items-center gap-1"
                  >
                    View Details
                    <ArrowRight size={11} />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}

/* ─── Why This Matters helper ─── */
function getWhyMatters(summary) {
  const hasDates = summary.important_dates && summary.important_dates.length > 0
  const hasActions = summary.action_items && summary.action_items.length > 0
  if (summary.priority === 'high' && hasDates) return 'This email contains important deadlines requiring immediate attention. Taking action soon can help avoid missing critical windows.'
  if (summary.priority === 'high') return 'Marked as high priority — this requires your prompt action to stay on track.'
  if (hasDates && hasActions) return 'Contains upcoming dates and action items that directly impact your academic schedule.'
  if (hasActions) return 'Contains action items that need to be completed soon to maintain your progress.'
  if (hasDates) return 'Includes upcoming dates relevant to your academic or placement schedule.'
  return 'Relevant to your current academic activities and campus life.'
}

/* ─── Date card parser ─── */
function parseDateCard(dateStr) {
  const parsed = new Date(dateStr)
  if (!isNaN(parsed.getTime())) {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    return { month: months[parsed.getMonth()], day: parsed.getDate().toString() }
  }
  const monthMatch = dateStr.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i)
  const dayMatch = dateStr.match(/\d{1,2}/)
  return { month: monthMatch ? monthMatch[0].toUpperCase().slice(0, 3) : '—', day: dayMatch ? dayMatch[0] : '—' }
}

/* ─── AI Insights Drawer ─── */
function SummaryDrawer({ isOpen, onClose, summary, loading }) {
  if (!isOpen) return null
  const priorityColor = { high: 'text-dusty-red bg-dusty-red/10', medium: 'text-gold bg-gold/10', low: 'text-sage bg-sage/10' }

  return (
    <>
      <div className="fixed inset-0 bg-black/15 backdrop-blur-[2px] z-[60]" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] overflow-y-auto animate-slide-in border-l border-black/[0.04]">
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-black/[0.04] px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-text-primary">Cora's Insights</h2>
            <p className="text-[11px] text-text-muted mt-0.5 font-medium">Powered by Gemini</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-[#F5F4F0] flex items-center justify-center hover:bg-[#ECEAE6] transition-colors" aria-label="Close">
            <X size={15} className="text-text-secondary" />
          </button>
        </div>

        <div className="p-6">
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 size={24} className="text-terracotta animate-spin mb-3" />
              <p className="text-sm text-text-muted font-medium">Cora is generating insights...</p>
            </div>
          )}

          {!loading && summary && (
            <div className="space-y-6">
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold mb-1.5">Subject</p>
                <h3 className="text-base font-bold text-text-primary">{summary.subject}</h3>
              </div>

              {summary.priority && (
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold mb-2">Priority</p>
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${priorityColor[summary.priority] || priorityColor.medium}`}>
                    {summary.priority.charAt(0).toUpperCase() + summary.priority.slice(1)}
                  </span>
                </div>
              )}

              {summary.summary && (
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold mb-2">AI Summary</p>
                  <p className="text-sm text-text-primary leading-relaxed bg-[#FAFAF8] rounded-xl p-4 border border-black/[0.04]">
                    {summary.summary}
                  </p>
                </div>
              )}

              {summary.summary && (
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold mb-2">Why This Matters</p>
                  <div className="bg-gold/[0.08] border border-gold/20 rounded-xl px-4 py-3.5 flex items-start gap-2.5">
                    <Lightbulb size={15} className="text-gold shrink-0 mt-0.5" />
                    <p className="text-sm text-text-primary leading-relaxed">{getWhyMatters(summary)}</p>
                  </div>
                </div>
              )}

              {summary.important_dates && summary.important_dates.length > 0 && (
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold mb-2.5">Important Dates</p>
                  <div className="space-y-2.5">
                    {summary.important_dates.map((date, i) => {
                      const { month, day } = parseDateCard(date)
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-12 h-14 bg-[#FAFAF8] border border-black/[0.04] rounded-xl flex flex-col items-center justify-center shrink-0">
                            <span className="text-[10px] font-bold text-terracotta uppercase leading-none">{month}</span>
                            <span className="text-lg font-bold text-text-primary leading-tight">{day}</span>
                          </div>
                          <span className="text-sm font-medium text-text-primary">{date}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {summary.action_items && summary.action_items.length > 0 && (
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold mb-2.5">Action Items</p>
                  <div className="space-y-2.5">
                    {summary.action_items.map((item, i) => (
                      <div key={i} className="border border-black/[0.04] rounded-xl p-3.5" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                        <div className="flex items-start gap-2.5 mb-2.5">
                          <CheckCircle2 size={14} className="text-sage shrink-0 mt-0.5" />
                          <span className="text-sm font-medium text-text-primary leading-relaxed">{item}</span>
                        </div>
                        <div className="flex items-center gap-2 ml-6">
                          <button className="inline-flex items-center gap-1 text-[10px] font-medium text-text-secondary border border-black/[0.06] rounded-lg px-2.5 py-1 hover:border-terracotta/30 hover:text-terracotta transition-colors">
                            <Plus size={10} /> Add to Tasks
                          </button>
                          <button className="inline-flex items-center gap-1 text-[10px] font-medium text-text-secondary border border-black/[0.06] rounded-lg px-2.5 py-1 hover:border-terracotta/30 hover:text-terracotta transition-colors">
                            <Calendar size={10} /> Add to Calendar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!loading && !summary && (
            <p className="text-sm text-text-muted text-center py-12 font-medium">Unable to load insights.</p>
          )}
        </div>
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════
   RIGHT COLUMN — AI Copilot
   ═══════════════════════════════════════════ */

function AISuggestions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="rounded-2xl p-5 border border-black/[0.04]"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.03)', background: 'white' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wide flex items-center gap-1.5">
          <Sparkles size={12} className="text-gold" />
          Cora's Suggestions
        </h3>
      </div>
      <div className="space-y-2.5">
        {['Complete NOKIA Online Test before 1:30 PM.',
          'Submit Smith & Nephew case study before 6:00 PM.',
          'Apply for Amazon ML Summer School today.'
        ].map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ x: 4, transition: { duration: 0.2 } }}
            className="bg-[#FAFAF8] border border-black/[0.04] rounded-xl px-4 py-3 cursor-default"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}
          >
            <span className="text-[13px] font-medium text-text-primary leading-relaxed">{s}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function QuickAsk() {
  const [messages, setMessages] = useState([
    { role: 'user', text: 'What should I focus on today?' },
    { role: 'assistant', text: 'Prioritize the NOKIA Online Test first, complete the Smith & Nephew case study submission before 6:00 PM, and apply for Amazon ML Summer School before registrations close.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }])
    setInput('')
    setLoading(true)
    try {
      const data = await sendAssistantMessage(trimmed)
      setMessages((prev) => [...prev, { role: 'assistant', text: data.response }])
    } catch (err) {
      const detail = err.response?.data?.detail
      setMessages((prev) => [...prev, { role: 'assistant', text: detail || 'Sorry, please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="rounded-2xl p-5 border border-black/[0.04] flex-1 flex flex-col"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.03)', background: 'white' }}
    >
      <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-4 flex items-center gap-1.5">
        <MessageCircle size={12} className="text-terracotta" />
        Ask Cora
      </h3>

      <div className="space-y-2.5 mb-4 flex-1 overflow-y-auto max-h-60">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`text-xs px-3.5 py-2.5 max-w-[85%] font-medium ${
                msg.role === 'user'
                  ? 'bg-terracotta text-white rounded-2xl rounded-br-md'
                  : 'bg-[#F5F4F0] text-text-primary rounded-2xl rounded-bl-md border border-black/[0.04] leading-relaxed'
              }`}
              style={msg.role === 'assistant' ? { boxShadow: '0 2px 8px rgba(0,0,0,0.02)' } : {}}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#F5F4F0] text-text-muted text-xs px-3.5 py-2.5 rounded-2xl rounded-bl-md border border-black/[0.04] font-medium">
              <Loader2 size={12} className="animate-spin inline mr-1" />
              Cora is thinking...
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 bg-[#F5F4F0] rounded-xl px-4 py-3 mt-auto border border-black/[0.04]" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Cora..."
          className="text-sm text-text-primary placeholder:text-text-muted bg-transparent outline-none flex-1 min-w-0 font-medium"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="w-8 h-8 bg-terracotta hover:bg-terracotta-dark rounded-lg flex items-center justify-center shrink-0 disabled:opacity-40 transition-all duration-200"
        >
          <Send size={13} className="text-white" />
        </button>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════
   DASHBOARD PAGE
   ═══════════════════════════════════════════ */

export default function DashboardPage() {
  const [emails, setEmails] = useState([])
  const [emailsLoading, setEmailsLoading] = useState(true)
  const [emailsError, setEmailsError] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [summary, setSummary] = useState(null)
  const [summaryLoading, setSummaryLoading] = useState(false)

  const loadEmails = async () => {
    setEmailsLoading(true)
    setEmailsError(false)
    try { const data = await fetchEmails(); setEmails(data) }
    catch { setEmailsError(true) }
    finally { setEmailsLoading(false) }
  }

  useEffect(() => { loadEmails() }, [])

  const handleViewDetails = async (emailId) => {
    setDrawerOpen(true)
    setSummary(null)
    setSummaryLoading(true)
    try { const data = await getEmailSummary(emailId); setSummary(data) }
    catch { setSummary(null) }
    finally { setSummaryLoading(false) }
  }

  return (
    <div className="min-h-screen font-sans" style={{ background: 'linear-gradient(180deg, #FAFAF9 0%, #F7F6F4 100%)' }}>
      <DashboardNav />

      <main className="max-w-[1400px] mx-auto px-6 py-7">
        <Greeting />

        <div className="grid grid-cols-1 lg:grid-cols-[22%_48%_30%] gap-5 lg:items-start">
          <div className="lg:sticky lg:top-20 flex flex-col gap-4 lg:h-[calc(100vh-8rem)]">
            <OverviewCards />
            <TodaySchedule />
          </div>

          <div className="space-y-5 lg:min-h-[calc(100vh-8rem)]">
            <TodayPriorities />
            <ImportantUpdates emails={emails} loading={emailsLoading} error={emailsError} onRetry={loadEmails} onViewDetails={handleViewDetails} />
          </div>

          <div className="lg:sticky lg:top-20 flex flex-col gap-4 lg:h-[calc(100vh-8rem)]">
            <AISuggestions />
            <QuickAsk />
          </div>
        </div>
      </main>

      <SummaryDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} summary={summary} loading={summaryLoading} />
    </div>
  )
}
