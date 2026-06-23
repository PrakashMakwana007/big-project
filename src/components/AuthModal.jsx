

import { useEffect, useState } from 'react'
import api from '../services/api'

function LoginForm({ switchMode, onLoginSuccess, pendingAction }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  function validate() {
    const e = {}
    if (!email.trim()) e.email = 'Email is required'
    if (!password) e.password = 'Password is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    setErrors({})

    try {
      const data = await api.auth.login({ email, password })
      api.auth.saveSession(data)
      if (onLoginSuccess) {
        onLoginSuccess(data.user?.role || 'seller')
      }
    } catch (err) {
      setErrors({ form: err.message || 'Login failed. Please check your credentials.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div>
        <h3 className="text-2xl font-bold text-gray-800">Sign in to Nexlance</h3>
        <p className="text-gray-500 text-sm mb-4">Welcome back - please enter your details.</p>
        {pendingAction && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 text-xs rounded-lg p-3 mb-4">
            ✓ Please sign in to continue with your action
          </div>
        )}
      </div>

      <button
        type="button"
        className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 hover:shadow-md transition-all duration-200"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
        <span className="text-sm font-medium text-gray-700">Sign up with Google</span>
      </button>

      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-3 text-gray-400 text-sm">or</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {errors.form && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-2">
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border border-gray-300 mt-2 focus:ring-2 focus:ring-[#22c55e] focus:border-transparent focus:outline-none ${errors.email ? 'border-red-300' : ''}`}
            placeholder="you@company.com"
          />
          {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border border-gray-300 mt-2 focus:ring-2 focus:ring-[#22c55e] focus:border-transparent focus:outline-none ${errors.password ? 'border-red-300' : ''}`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3C5 3 1.73 6.11.5 10c1.23 3.89 4.5 7 9.5 7s8.27-3.11 9.5-7C18.27 6.11 15 3 10 3zM10 15a5 5 0 110-10 5 5 0 010 10z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.94 2.94a.75.75 0 011.06 0l13 13a.75.75 0 11-1.06 1.06l-1.2-1.2A9.45 9.45 0 0110 17c-5 0-8.27-3.11-9.5-7a9.36 9.36 0 012.44-3.5L2.94 2.94zM10 5a5 5 0 014.58 2.66l-1.73 1.73A3 3 0 0010 7a3 3 0 00-2.11.86L6.16 6.16A5 5 0 0110 5z" /></svg>
              )}
            </button>
          </div>
          {errors.password && <div className="text-xs text-red-500 mt-1">{errors.password}</div>}
        </div>

        <div className="flex items-center justify-between">
          <button type="button" className="text-sm text-[#22c55e] hover:underline">Forgot password?</button>
          <button type="button" onClick={switchMode} className="text-sm text-[#22c55e] hover:underline">Don&apos;t have an account? <span className="font-medium">Join</span></button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#22c55e] text-white font-semibold py-3 rounded-lg w-full hover:bg-[#16a34a] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Continue'}
        </button>
      </form>
    </>
  )
}

function RegisterForm({ switchMode, onLoginSuccess }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('buyer')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  function validate() {
    const e = {}
    if (!name.trim()) e.name = 'Full name is required'
    if (!email.trim()) e.email = 'Email is required'
    if (!password) e.password = 'Password is required'
    if (password && password.length < 6) e.password = 'Password must be at least 6 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    setErrors({})

    try {
      const data = await api.auth.register({ name, email, password, role })
      api.auth.saveSession(data)
      if (onLoginSuccess) {
        onLoginSuccess(data.user?.role || role)
      }
    } catch (err) {
      setErrors({ form: err.message || 'Registration failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div>
        <h3 className="text-2xl font-bold text-gray-800">Create your Nexlance account</h3>
        <p className="text-gray-500 text-sm mb-4">Quick sign up to get started on projects.</p>
      </div>

      <button
        type="button"
        className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 hover:shadow-md transition-all duration-200"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
        <span className="text-sm font-medium text-gray-700">Sign up with Google</span>
      </button>

      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-3 text-gray-400 text-sm">or</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {errors.form && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-2">
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border border-gray-300 mt-2 focus:ring-2 focus:ring-[#22c55e] focus:border-transparent focus:outline-none ${errors.name ? 'border-red-300' : ''}`}
            placeholder="Your full name"
          />
          {errors.name && <div className="text-xs text-red-500 mt-1">{errors.name}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border border-gray-300 mt-2 focus:ring-2 focus:ring-[#22c55e] focus:border-transparent focus:outline-none ${errors.email ? 'border-red-300' : ''}`}
            placeholder="you@company.com"
          />
          {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border border-gray-300 mt-2 focus:ring-2 focus:ring-[#22c55e] focus:border-transparent focus:outline-none ${errors.password ? 'border-red-300' : ''}`}
              placeholder="Create a password (min 6 chars)"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3C5 3 1.73 6.11.5 10c1.23 3.89 4.5 7 9.5 7s8.27-3.11 9.5-7C18.27 6.11 15 3 10 3zM10 15a5 5 0 110-10 5 5 0 010 10z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.94 2.94a.75.75 0 011.06 0l13 13a.75.75 0 11-1.06 1.06l-1.2-1.2A9.45 9.45 0 0110 17c-5 0-8.27-3.11-9.5-7a9.36 9.36 0 012.44-3.5L2.94 2.94zM10 5a5 5 0 014.58 2.66l-1.73 1.73A3 3 0 0010 7a3 3 0 00-2.11.86L6.16 6.16A5 5 0 0110 5z" /></svg>
              )}
            </button>
          </div>
          {errors.password && <div className="text-xs text-red-500 mt-1">{errors.password}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-[#22c55e] focus:border-transparent focus:outline-none"
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button type="button" onClick={switchMode} className="text-sm text-[#22c55e] hover:underline">Already have an account? <span className="font-medium">Sign in</span></button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#22c55e] text-white font-semibold py-3 rounded-lg w-full hover:bg-[#16a34a] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
    </>
  )
}

export default function AuthModal({ isOpen, mode, onClose, onModeChange, onLoginSuccess, pendingAction }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setVisible(false)
      return
    }
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [isOpen])

  if (!isOpen) return null

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Authentication modal"
    >
      <div className={`bg-white rounded-2xl shadow-xl max-w-4xl w-full flex overflow-hidden relative transition-all duration-300 max-h-[90vh] md:max-h-[650px] ${visible ? 'scale-100' : 'scale-95'}`}>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#22c55e] to-[#16a34a] text-white items-center self-stretch">
          <div className="px-12 max-w-md">
            <h2 className="text-4xl font-bold leading-tight mb-4">Work with top freelancers worldwide</h2>
            <p className="text-gray-100 text-lg">Build your projects faster with skilled professionals.</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-10 overflow-y-auto max-h-[90vh] md:max-h-[650px]">
          <div className="space-y-4">
            {mode === 'login' ? (
              <LoginForm switchMode={() => onModeChange('register')} onLoginSuccess={onLoginSuccess} pendingAction={pendingAction} />
            ) : (
              <RegisterForm switchMode={() => onModeChange('login')} onLoginSuccess={onLoginSuccess} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
