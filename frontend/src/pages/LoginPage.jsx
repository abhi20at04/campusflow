// TODO: Replace with Google OAuth authentication after hackathon
// Temporary frontend authentication for HackOn demo submission

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail } from 'lucide-react'

// Demo credentials — temporary for hackathon video
const DEMO_EMAIL = 'tarun@gmail.com'
const DEMO_PASSWORD = 'campusflow123'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // TODO: Replace with Google OAuth authentication after hackathon
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', email)
      navigate('/dashboard')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen bg-background font-sans flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-[24px] shadow-2xl shadow-black/[0.06] border border-black/[0.04] p-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2.5 mb-8">
            <img src="/logo.png" alt="CampusFlow" className="w-9 h-9 p-0.5 object-contain mix-blend-multiply" />
            <span className="text-xl font-bold text-text-primary tracking-tight">
              Campus<span className="text-terracotta">Flow</span>
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-text-primary text-center">Welcome Back</h1>
          <p className="text-sm text-text-secondary text-center mt-1.5 mb-8">Sign in to continue to CampusFlow</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@gmail.com"
                required
                className="w-full px-4 py-3 text-sm text-text-primary bg-[#F8F7F4] border border-black/[0.06] rounded-xl outline-none focus:border-terracotta/40 focus:ring-2 focus:ring-terracotta/10 transition-all placeholder:text-text-muted"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1.5 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                required
                className="w-full px-4 py-3 text-sm text-text-primary bg-[#F8F7F4] border border-black/[0.06] rounded-xl outline-none focus:border-terracotta/40 focus:ring-2 focus:ring-terracotta/10 transition-all placeholder:text-text-muted"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs font-medium text-dusty-red text-center py-1">{error}</p>
            )}

            {/* Sign In */}
            <button
              type="submit"
              className="w-full py-3.5 bg-terracotta hover:bg-terracotta-dark text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-terracotta/20 text-sm"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-black/[0.06]"></div>
            <span className="text-xs text-text-muted font-medium">OR</span>
            <div className="flex-1 h-px bg-black/[0.06]"></div>
          </div>

          {/* Google OAuth — disabled for now */}
          <button
            disabled
            className="w-full py-3.5 bg-white border border-black/[0.08] text-text-secondary font-medium rounded-xl text-sm flex items-center justify-center gap-2.5 opacity-50 cursor-not-allowed"
          >
            <Mail size={16} />
            Continue with Google (Coming Soon)
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-text-muted mt-6">
          Built for Amazon HackOn — Team Matrixx
        </p>
      </div>
    </div>
  )
}
