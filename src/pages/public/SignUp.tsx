import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'

export default function SignUp() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!form.username.trim()) e.username = 'Username is required.'
    if (form.username.length < 3) e.username = 'Username must be at least 3 characters.'
    if (!form.email.includes('@')) e.email = 'Enter a valid email.'
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters.'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match.'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    try {
      await signup(form.name, form.username, form.email, form.password)
      navigate('/onboarding/welcome')
    } finally {
      setLoading(false)
    }
  }

  const field = (key: keyof typeof form, label: string, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-[12.5px] font-semibold text-navy mb-1.5">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className={`w-full px-3.5 py-3 rounded-xl border bg-parchment text-[14px] text-navy placeholder:text-sb-muted outline-none focus:ring-2 focus:ring-sb-purple/30 focus:border-sb-purple/50 transition ${
          errors[key] ? 'border-red-400' : 'border-sb-border'
        }`}
      />
      {errors[key] && <p className="text-[11.5px] text-red-600 mt-1">{errors[key]}</p>}
    </div>
  )

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <Link to="/" className="inline-flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-semibold text-navy text-base tracking-tight">SkillBridge</span>
        </Link>
        <h1 className="font-display text-[1.75rem] text-navy">Start learning free.</h1>
        <p className="text-[14px] text-sb-muted mt-1">Teach what you know. Learn from others.</p>
      </div>

      <div className="bg-white rounded-2xl border border-sb-border p-7 shadow-sm">
        <button className="w-full flex items-center justify-center gap-3 py-3 border border-sb-border rounded-xl text-[14px] font-medium text-navy hover:bg-parchment transition-colors mb-5">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-sb-border" />
          <span className="text-[11px] text-sb-muted font-medium">or</span>
          <div className="flex-1 h-px bg-sb-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {field('name', 'Full name', 'text', 'Your name')}
          {field('username', 'Username', 'text', 'e.g. sujal_v')}
          {field('email', 'Email', 'email', 'you@example.com')}
          <div>
            <label className="block text-[12.5px] font-semibold text-navy mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="Min. 8 characters"
                className={`w-full px-3.5 py-3 pr-10 rounded-xl border bg-parchment text-[14px] text-navy placeholder:text-sb-muted outline-none focus:ring-2 focus:ring-sb-purple/30 focus:border-sb-purple/50 transition ${errors.password ? 'border-red-400' : 'border-sb-border'}`}
              />
              <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sb-muted">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5Z" stroke="currentColor" strokeWidth="1.2"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2"/></svg>
              </button>
            </div>
            {errors.password && <p className="text-[11.5px] text-red-600 mt-1">{errors.password}</p>}
          </div>
          {field('confirm', 'Confirm password', 'password', 'Repeat your password')}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-1 bg-navy text-cream font-semibold rounded-xl hover:bg-navy-800 transition-colors text-[14.5px] disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><svg className="animate-spin w-4 h-4" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="18" strokeDashoffset="6"/></svg> Creating account…</>
            ) : 'Create Account'}
          </button>
        </form>
      </div>

      <p className="text-center text-[12.5px] text-sb-muted mt-4">
        By creating an account you agree to our{' '}
        <a href="#" className="text-sb-purple hover:underline">Terms</a> and{' '}
        <a href="#" className="text-sb-purple hover:underline">Privacy Policy</a>.
      </p>
      <p className="text-center text-[13px] text-sb-muted mt-3">
        Already have an account?{' '}
        <Link to="/login" className="text-sb-purple font-semibold hover:underline">Sign in</Link>
      </p>
    </div>
  )
}
