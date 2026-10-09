import { ArrowRight, Check, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function getAuthErrorMessage(error) {
  const message = error?.message || ''

  if (message === 'Invalid login credentials') return 'The email or password is incorrect.'
  if (message === 'Email not confirmed') return 'Please confirm your email address before signing in.'
  if (message.toLowerCase().includes('failed to fetch')) return 'The account service is temporarily unavailable. Please try again shortly.'
  if (message.toLowerCase().includes('user already registered')) return 'An account already exists with this email. Sign in instead.'
  return message || 'We could not complete that request. Please try again.'
}

function AuthPage() {
  const [mode, setMode] = useState('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const { configured, loading, user, signIn, signUp } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const destination = typeof location.state?.from === 'string' && location.state.from.startsWith('/dashboard')
    ? location.state.from
    : '/dashboard'

  useEffect(() => {
    document.title = 'Sign in to My Moniebestie | MoneyFlex Tribe'
  }, [])

  if (!loading && user) return <Navigate to={destination} replace />

  const changeMode = (nextMode) => {
    setMode(nextMode)
    setError('')
    setMessage('')
  }

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')

    if (!configured) {
      setError('Account access is not configured yet. Please contact MoneyFlex support.')
      return
    }

    if (mode === 'signup' && name.trim().length < 2) {
      setError('Please enter your name.')
      return
    }

    if (password.length < 8) {
      setError('Your password must contain at least 8 characters.')
      return
    }

    if (mode === 'signup' && password !== confirmPassword) {
      setError('The passwords do not match.')
      return
    }

    setSubmitting(true)
    const result = mode === 'signup'
      ? await signUp(name, email.trim(), password)
      : await signIn(email.trim(), password)
    setSubmitting(false)

    if (result.error) {
      setError(getAuthErrorMessage(result.error))
      return
    }

    if (mode === 'signup' && !result.data.session) {
      setMessage('Account created. Check your email and confirm your address before signing in.')
      return
    }

    navigate(destination, { replace: true })
  }

  return (
    <main className="min-h-screen bg-[var(--mf-background)] px-4 py-6 sm:px-6 lg:py-10">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-[32px] border border-[var(--mf-border)] bg-white shadow-[0_32px_90px_-50px_rgba(35,55,90,0.55)] lg:grid-cols-[0.92fr_1.08fr]">
        <section className="mf-gradient-hero relative hidden overflow-hidden p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-28 -top-24 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -bottom-36 -left-24 h-96 w-96 rounded-full border border-white/10" />
          <Link to="/" className="relative z-10 inline-flex w-fit items-center rounded-2xl bg-white p-3">
            <img src="/logo-cropped.png" alt="MoneyFlex Tribe" className="h-12 w-auto object-contain" />
          </Link>
          <div className="relative z-10">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-white/55">Your private money workspace</p>
            <h1 className="mf-font-display mt-5 max-w-lg text-5xl font-semibold leading-[1.02]">Build clarity. Track progress. Move with confidence.</h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/70">My Moniebestie brings your assessments, money plans, investments, and public investor profile into one secure home.</p>
            <div className="mt-9 grid gap-3">
              {['Your dashboard is private by default', 'Public profiles never expose balances', 'Your existing device data stays available'].map((item) => <div key={item} className="flex items-center gap-3 text-sm font-bold text-white/80"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10"><Check className="h-4 w-4" /></span>{item}</div>)}
            </div>
          </div>
        </section>

        <section className="flex items-center px-6 py-10 sm:px-12 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Link to="/" className="mb-10 inline-flex rounded-2xl bg-white lg:hidden"><img src="/logo-cropped.png" alt="MoneyFlex Tribe" className="h-16 w-auto object-contain" /></Link>
            <div className="flex w-fit rounded-full bg-[var(--mf-surface-soft)] p-1">
              <button type="button" onClick={() => changeMode('signin')} className={`rounded-full px-5 py-2.5 text-sm font-black transition ${mode === 'signin' ? 'bg-white text-[var(--mf-primary)] shadow-sm' : 'text-slate-500'}`}>Sign in</button>
              <button type="button" onClick={() => changeMode('signup')} className={`rounded-full px-5 py-2.5 text-sm font-black transition ${mode === 'signup' ? 'bg-white text-[var(--mf-primary)] shadow-sm' : 'text-slate-500'}`}>Create account</button>
            </div>

            <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-[var(--mf-primary)]">My Moniebestie</p>
            <h2 className="mf-font-display mt-3 text-4xl font-semibold text-slate-950">{mode === 'signin' ? 'Welcome back.' : 'Create your private workspace.'}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{mode === 'signin' ? 'Sign in to continue building your financial plan.' : 'Start with your investor profile, then bring every money decision into clearer focus.'}</p>

            <form onSubmit={submit} className="mt-8 space-y-5">
              {mode === 'signup' ? <label><span className="mf-label">Full name</span><div className="relative"><UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input className="mf-input !pl-11" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" placeholder="Your name" required /></div></label> : null}
              <label><span className="mf-label">Email address</span><div className="relative"><Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input type="email" className="mf-input !pl-11" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="you@example.com" required /></div></label>
              <label><span className="mf-label">Password</span><div className="relative"><LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input type={showPassword ? 'text' : 'password'} className="mf-input !px-11" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} placeholder="At least 8 characters" required /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></label>
              {mode === 'signup' ? <label><span className="mf-label">Confirm password</span><input type={showPassword ? 'text' : 'password'} className="mf-input" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" placeholder="Enter your password again" required /></label> : null}

              {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold leading-6 text-red-700">{error}</p> : null}
              {message ? <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold leading-6 text-emerald-700">{message}</p> : null}

              <button type="submit" disabled={submitting || loading} className="mf-action w-full py-3.5 disabled:cursor-wait disabled:opacity-60">{submitting ? 'Please wait...' : mode === 'signin' ? 'Open My Moniebestie' : 'Create my account'} <ArrowRight className="h-4 w-4" /></button>
            </form>

            <div className="mt-7 flex items-start gap-3 rounded-2xl bg-[var(--mf-surface-soft)] p-4"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--mf-primary)]" /><p className="text-xs leading-6 text-slate-500">MoneyFlex Tribe will never ask for your bank password, card PIN, or one-time password inside My Moniebestie.</p></div>
            <p className="mt-7 text-center text-xs text-slate-500">Not ready to create an account? <Link to="/tools" className="font-black text-[var(--mf-primary)]">Explore the public tools</Link></p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AuthPage
