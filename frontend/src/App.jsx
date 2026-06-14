// TODO: Replace with Google OAuth authentication after hackathon
// Temporary frontend authentication for HackOn demo submission

import { BrowserRouter, Routes, Route, Navigate, useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import UpdatesPage from './pages/UpdatesPage'
import AssistantPage from './pages/AssistantPage'

/* ─── Auth callback handler (for future Google OAuth) ─── */
function AuthHandler({ children }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (searchParams.get('auth') === 'success') {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', 'tarun@gmail.com')
      searchParams.delete('auth')
      setSearchParams(searchParams, { replace: true })
      navigate('/dashboard', { replace: true })
    }
  }, [searchParams, setSearchParams, navigate])

  return children
}

/* ─── Protected route wrapper ─── */
// TODO: Replace with Google OAuth authentication after hackathon
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthHandler>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/updates" element={<ProtectedRoute><UpdatesPage /></ProtectedRoute>} />
          <Route path="/assistant" element={<ProtectedRoute><AssistantPage /></ProtectedRoute>} />
        </Routes>
      </AuthHandler>
    </BrowserRouter>
  )
}
