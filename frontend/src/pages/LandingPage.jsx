import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Mail,
  Calendar,
  Briefcase,
  Bell,
  CheckCircle2,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
  Clock,
  MessageCircle,
  Send,
} from 'lucide-react'

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const fadeRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardSpring = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
}

/* ─── Rotating Text Hook ─── */
function useRotatingText(words, interval = 2800) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(timer)
  }, [words.length, interval])
  return words[index]
}

/* ─── Navbar ─── */
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/[0.04]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="CampusFlow" className="w-8 h-8 p-0.5 object-contain mix-blend-multiply" />
          <span className="text-lg font-bold text-text-primary tracking-tight">
            Campus<span className="text-terracotta">Flow</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            <a href="#overwhelm" className="text-sm font-medium text-text-secondary hover:text-terracotta transition-colors">Why</a>
            <a href="#features" className="text-sm font-medium text-text-secondary hover:text-terracotta transition-colors">Features</a>
            <a href="#assistant" className="text-sm font-medium text-text-secondary hover:text-terracotta transition-colors">Cora</a>
          </div>
          <button
            onClick={() => { window.location.href = '/login' }}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-terracotta hover:bg-terracotta-dark rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-terracotta/20"
          >
            Get Started
          </button>
        </div>

        <button className="md:hidden text-text-secondary" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-black/5 px-6 py-4 space-y-3">
          <a href="#overwhelm" className="block text-sm font-medium text-text-secondary py-2">Why</a>
          <a href="#features" className="block text-sm font-medium text-text-secondary py-2">Features</a>
          <a href="#assistant" className="block text-sm font-medium text-text-secondary py-2">Cora</a>
          <button onClick={() => { window.location.href = '/login' }} className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-terracotta rounded-xl mt-2">Get Started</button>
        </div>
      )}
    </nav>
  )
}

/* ═══════════════════════════════════════════
   SECTION 1: HERO
   ═══════════════════════════════════════════ */
function HeroSection() {
  const rotatingWords = ['Assignments', 'Placements', 'Deadlines', 'Important Emails', 'Campus Events']
  const currentWord = useRotatingText(rotatingWords)

  return (
    <section className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      {/* Decorative blobs */}
      <motion.div
        animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-32 right-20 w-[400px] h-[400px] bg-terracotta/[0.04] rounded-full blur-[80px]"
      />
      <motion.div
        animate={{ x: [0, -8, 0], y: [0, 12, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-32 left-10 w-[350px] h-[350px] bg-sage/[0.05] rounded-full blur-[80px]"
      />

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full relative z-10">
        {/* Left — Copy */}
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.h1 variants={fadeLeft} className="text-[42px] md:text-[56px] font-extrabold text-text-primary leading-[1.1] tracking-tight">
            Never Miss Your Next
          </motion.h1>

          <motion.div variants={fadeUp} className="h-[60px] md:h-[72px] flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWord}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="text-[42px] md:text-[56px] font-extrabold text-terracotta tracking-tight"
              >
                {currentWord}.
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 text-base md:text-lg text-text-secondary leading-relaxed max-w-lg font-medium">
            CampusFlow transforms overwhelming college communications into clear, actionable insights using AI.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => { window.location.href = '/login' }}
              className="px-8 py-4 bg-terracotta hover:bg-terracotta-dark text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-terracotta/25 flex items-center gap-2.5 text-[15px]"
            >
              <Mail size={18} />
              Get Started
            </button>
            <a href="#assistant" className="px-8 py-4 bg-white border border-black/[0.08] text-text-primary hover:border-terracotta/30 font-semibold rounded-xl transition-all duration-200 hover:shadow-lg inline-flex items-center gap-2.5 text-[15px]">
              Watch Demo
            </a>
          </motion.div>
        </motion.div>

        {/* Right — Dashboard Preview */}
        <motion.div initial="hidden" animate="visible" variants={fadeRight} className="relative hidden lg:block">
          <div className="absolute -inset-3 bg-gradient-to-br from-terracotta/[0.08] via-transparent to-sage/[0.08] rounded-[32px] blur-xl"></div>

          {/* Main card */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative bg-white/95 backdrop-blur-sm rounded-[24px] shadow-2xl shadow-black/[0.06] border border-black/[0.04] p-6"
          >
            <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-black/[0.04]">
              <img src="/logo.png" alt="" className="w-5 h-5 object-contain mix-blend-multiply" />
              <span className="text-sm font-bold text-text-primary">CampusFlow</span>
              <div className="ml-auto flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-sage animate-pulse"></div><span className="text-[10px] font-medium text-text-muted">Live</span></div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-dusty-red/[0.04] border border-dusty-red/[0.08] rounded-2xl px-4 py-3.5">
                <div className="w-2.5 h-2.5 rounded-full bg-dusty-red"></div>
                <span className="text-sm font-medium text-text-primary flex-1">Nokia OA — Tomorrow 10 AM</span>
                <span className="text-[10px] font-semibold text-dusty-red bg-dusty-red/10 px-2.5 py-1 rounded-full">Urgent</span>
              </div>
              <div className="flex items-center gap-3 bg-gold/[0.04] border border-gold/[0.08] rounded-2xl px-4 py-3.5">
                <div className="w-2.5 h-2.5 rounded-full bg-gold"></div>
                <span className="text-sm font-medium text-text-primary flex-1">Assignment 3 — Due Tonight</span>
                <span className="text-[10px] font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full">Due Soon</span>
              </div>
              <div className="flex items-center gap-3 bg-sage/[0.04] border border-sage/[0.08] rounded-2xl px-4 py-3.5">
                <div className="w-2.5 h-2.5 rounded-full bg-sage"></div>
                <span className="text-sm font-medium text-text-primary flex-1">Amazon Internship — Apply Friday</span>
                <span className="text-[10px] font-semibold text-sage bg-sage/10 px-2.5 py-1 rounded-full">Placement</span>
              </div>
            </div>
          </motion.div>

          {/* Floating AI card */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute -bottom-6 -left-8 bg-white rounded-2xl shadow-xl shadow-black/[0.06] border border-black/[0.04] px-5 py-4 z-20 w-72"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles size={12} className="text-gold" />
              <span className="text-[11px] font-semibold text-text-muted">AI Suggestion</span>
            </div>
            <p className="text-sm font-medium text-text-primary">Start Nokia prep today — focus on aptitude + coding.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SECTION 2: STUDENT OVERWHELM
   ═══════════════════════════════════════════ */
function OverwhelmSection() {
  const problems = [
    { icon: Clock, title: 'Missed Assignment Deadlines', text: 'Keeping track of multiple submissions across courses becomes stressful.' },
    { icon: Briefcase, title: 'Lost Placement Opportunities', text: 'Internships and recruitment emails often get lost in crowded inboxes.' },
    { icon: Bell, title: 'Event Information Overload', text: 'Workshops, hackathons, and club updates arrive from multiple channels.' },
    { icon: Mail, title: 'Notification Fatigue', text: 'Students spend more time filtering information than acting on it.' },
  ]

  return (
    <section id="overwhelm" className="py-28 md:py-36 relative overflow-hidden">
      <motion.div
        animate={{ x: [0, 15, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute top-20 left-1/3 w-[300px] h-[300px] bg-dusty-red/[0.03] rounded-full blur-[60px]"
      />
      <motion.div
        animate={{ x: [0, -12, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-20 right-1/4 w-[280px] h-[280px] bg-gold/[0.04] rounded-full blur-[60px]"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-[42px] font-bold text-text-primary leading-tight tracking-tight">
            Student Life is Overwhelming
          </h2>
          <p className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto leading-relaxed font-medium">
            Important opportunities are buried beneath endless emails, announcements, and notifications.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {problems.map((p, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }}
              whileHover={{ y: -8, scale: 1.02, transition: cardSpring }}
              className="bg-white rounded-[20px] p-6 shadow-sm border border-black/[0.04] transition-shadow duration-300 hover:shadow-xl group cursor-default"
            >
              <div className="w-12 h-12 bg-dusty-red/[0.06] rounded-2xl flex items-center justify-center mb-5 group-hover:bg-dusty-red/[0.1] transition-colors duration-200">
                <p.icon size={22} className="text-dusty-red" />
              </div>
              <h3 className="text-[15px] font-bold text-text-primary mb-2">{p.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed font-medium">{p.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SECTION 3: FEATURES
   ═══════════════════════════════════════════ */
function FeaturesSection() {
  const features = [
    { icon: Mail, title: 'Smart Email Classification', desc: 'Automatically categorizes assignments, placements, events, and announcements.' },
    { icon: Sparkles, title: 'AI Email Summaries', desc: 'Convert lengthy emails into concise actionable insights.' },
    { icon: Calendar, title: 'Deadline Detection', desc: 'Extract important dates before you miss them.' },
    { icon: Briefcase, title: 'Placement Tracking', desc: 'Stay updated with internships and recruitment opportunities.' },
    { icon: LayoutDashboard, title: 'Unified Dashboard', desc: 'Access all important updates from a single interface.' },
    { icon: Bell, title: 'Priority Notifications', desc: 'Focus on urgent tasks with intelligent prioritization.' },
  ]

  return (
    <section id="features" className="py-28 md:py-36 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-[42px] font-bold text-text-primary leading-tight tracking-tight">
            Everything You Need in One Place
          </h2>
          <p className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto leading-relaxed font-medium">
            CampusFlow intelligently organizes your academic life so you can focus on what matters.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }}
              whileHover={{ y: -6, scale: 1.02, transition: cardSpring }}
              className="bg-white rounded-[20px] p-6 shadow-sm border border-black/[0.04] transition-shadow duration-300 hover:shadow-xl hover:border-terracotta/10 group cursor-default"
            >
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="w-12 h-12 bg-terracotta/[0.06] rounded-2xl flex items-center justify-center mb-5 group-hover:bg-terracotta/[0.1] transition-colors duration-200"
              >
                <f.icon size={22} className="text-terracotta" />
              </motion.div>
              <h3 className="text-[15px] font-bold text-text-primary mb-2">{f.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed font-medium">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SECTION 4: AI ASSISTANT
   ═══════════════════════════════════════════ */
function AssistantSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const [typedIndex, setTypedIndex] = useState(0)
  const conversations = [
    { role: 'user', text: 'What assignments are due this week?' },
    { role: 'assistant', text: 'You have 3 assignments due this week. Your Digital Signal Processing Lab report is due Friday.' },
    { role: 'user', text: 'Any placement updates?' },
    { role: 'assistant', text: 'Amazon SDE Internship applications close in 2 days. Infosys has opened registrations for its recruitment drive.' },
  ]

  useEffect(() => {
    if (!isInView) return
    if (typedIndex < conversations.length) {
      const delay = conversations[typedIndex].role === 'assistant' ? 1400 : 700
      const timer = setTimeout(() => setTypedIndex((i) => i + 1), delay)
      return () => clearTimeout(timer)
    }
  }, [typedIndex, isInView])

  return (
    <section id="assistant" ref={sectionRef} className="py-28 md:py-36 relative overflow-hidden">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-20 right-20 w-[250px] h-[250px] bg-sage/[0.04] rounded-full blur-[60px]"
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left — Copy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.h2 variants={fadeLeft} className="text-3xl md:text-[42px] font-bold text-text-primary leading-tight tracking-tight">
              Meet Cora, Your<br />Campus AI Assistant
            </motion.h2>
            <motion.p variants={fadeLeft} className="mt-5 text-text-secondary text-lg leading-relaxed max-w-md font-medium">
              Cora helps you stay ahead of assignments, placements, deadlines, and campus opportunities through intelligent assistance.
            </motion.p>
            <motion.button
              variants={fadeLeft}
              onClick={() => { window.location.href = '/login' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-10 px-8 py-4 bg-terracotta hover:bg-terracotta-dark text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-terracotta/25 inline-flex items-center gap-2.5 text-[15px]"
            >
              Try Cora
              <Send size={16} />
            </motion.button>
          </motion.div>

          {/* Right — Chat UI */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeRight}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-white rounded-[24px] shadow-2xl shadow-black/[0.06] border border-black/[0.04] overflow-hidden max-w-md ml-auto"
            >
              {/* Header */}
              <div className="bg-[#FAFAF8] px-6 py-4 border-b border-black/[0.04] flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-sage animate-pulse"></div>
                <span className="text-sm font-bold text-text-primary">Cora</span>
                <span className="ml-auto text-[10px] font-medium text-sage">Online</span>
              </div>

              {/* Messages */}
              <div className="p-6 space-y-3.5 min-h-[300px]">
                {conversations.slice(0, typedIndex).map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`text-sm px-4 py-3 max-w-[85%] font-medium ${
                      msg.role === 'user'
                        ? 'bg-terracotta text-white rounded-[16px] rounded-br-md'
                        : 'bg-[#F5F4F0] text-text-primary rounded-[16px] rounded-bl-md border border-black/[0.04]'
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {typedIndex < conversations.length && (
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex justify-start"
                  >
                    <div className="bg-[#F5F4F0] text-text-muted text-sm px-4 py-3 rounded-[16px] rounded-bl-md border border-black/[0.04] font-medium">
                      ●●●
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <div className="px-6 pb-5">
                <div className="flex items-center gap-2 bg-[#F5F4F0] rounded-xl px-4 py-3 border border-black/[0.04]">
                  <span className="text-sm text-text-muted font-medium flex-1">Ask Cora...</span>
                  <div className="w-8 h-8 bg-terracotta rounded-lg flex items-center justify-center">
                    <Send size={13} className="text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-black/[0.04] py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="CampusFlow" className="w-6 h-6 p-0.5 object-contain mix-blend-multiply" />
          <span className="text-sm font-bold text-text-primary">Campus<span className="text-terracotta">Flow</span></span>
          <span className="text-xs text-text-muted ml-2 font-medium">Built for Amazon HackOn</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-xs text-text-muted font-medium">Team Matrixx</span>
          <a href="https://github.com/tarun7kumar/CampusFlow" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-text-secondary hover:text-terracotta transition-colors flex items-center gap-1.5">
            <ExternalLink size={12} /> GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}

/* ─── Landing Page ─── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <HeroSection />
      <OverwhelmSection />
      <FeaturesSection />
      <AssistantSection />
      <Footer />
    </div>
  )
}
