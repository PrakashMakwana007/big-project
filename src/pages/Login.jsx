import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

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

    try {
      const res = await api.auth.login({
        email,
        password
      })

      console.log("LOGIN SUCCESS:", res)

      
      localStorage.setItem("token", res.token)

      
      alert("Login success")

    } catch (err) {
      console.error("LOGIN ERROR:", err)

      setErrors({
        general: err.response?.data?.message || "Login failed"
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto flex items-stretch bg-transparent rounded-lg overflow-hidden shadow-none px-4 md:min-h-[700px]">
        <div className="relative hidden md:flex md:w-1/2 md:min-h-[700px] bg-gradient-to-br from-[#22c55e] to-[#16a34a] text-white flex-col justify-center items-start px-16 rounded-l-2xl overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_38%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.12),transparent_35%)]" />
          <div className="relative max-w-md">
            <h2 className="text-4xl font-bold text-white leading-tight mb-4">Work with top freelancers worldwide</h2>
            <p className="text-gray-100 text-lg">Build your projects faster with skilled professionals.</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 md:min-h-[700px] flex items-center justify-center p-0 md:p-10">
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 w-full max-w-md border border-gray-100 space-y-4 min-h-[620px] flex flex-col justify-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Sign in to Nexlance</h3>
              <p className="text-gray-500 text-sm mb-4">Welcome back - please enter your details.</p>
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
                <Link to="#" className="text-sm text-[#22c55e] hover:underline">Forgot password?</Link>
                <Link to="/register" className="text-sm text-[#22c55e] hover:underline">Don't have an account? <span className="font-medium">Join</span></Link>
              </div>

              <button type="submit" className="bg-[#22c55e] text-white font-semibold py-3 rounded-lg w-full hover:bg-[#16a34a] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">Continue</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
