import { ArrowRight, Globe2, MapPin, ShieldCheck, Sparkles } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { readStorage, storageKeys } from '../lib/finance'
import { createPublicProfile, decodePublicProfile, defaultClientProfile, getInitials } from '../lib/profile'

function PublicProfilePage() {
  const [searchParams] = useSearchParams()
  const sharedProfile = decodePublicProfile(searchParams.get('view') ?? '')
  const localProfile = { ...defaultClientProfile, ...readStorage(storageKeys.clientProfile, {}) }
  const riskAssessment = readStorage(storageKeys.investorProfile, null)
  const investorKnowledge = readStorage(storageKeys.investorKnowledge, null)
  const profile = sharedProfile ?? createPublicProfile(localProfile, riskAssessment, investorKnowledge)
  const riskProfile = profile.riskProfile ?? (profile.version === 1 ? profile.investorProfile : null)
  const investorProfile = profile.version === 2 ? profile.investorProfile : null

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" aria-label="MoneyFlex Tribe home"><img src="/logo-cropped.png" alt="MoneyFlex Tribe" className="h-14 w-auto object-contain" /></Link>
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--mf-surface-soft)] px-4 py-2 text-xs font-black text-[var(--mf-primary)]"><Globe2 className="h-4 w-4" /> Public profile</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
        <section className="overflow-hidden rounded-[32px] bg-[var(--mf-primary)] text-white shadow-[0_35px_90px_-45px_rgba(35,55,90,0.85)]">
          <div className="relative p-7 sm:p-12">
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10" />
            <div className="absolute -right-5 top-6 h-40 w-40 rounded-full border border-white/10" />
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-white text-3xl font-black text-[var(--mf-primary)]">{getInitials(profile.name)}</div>
              <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-white/45">MoneyFlex journey</p>
              <h1 className="mf-font-display mt-3 max-w-3xl text-5xl font-semibold sm:text-6xl">{profile.name}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">{profile.headline}</p>
              {profile.location ? <p className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white/55"><MapPin className="h-4 w-4" /> {profile.location}</p> : null}
            </div>
          </div>

          <div className="grid gap-px border-t border-white/10 bg-white/10 md:grid-cols-2">
            <div className="bg-[var(--mf-primary)] p-7 sm:p-10">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">About this journey</p>
              <p className="mt-5 leading-8 text-white/75">{profile.bio || 'Building financial clarity one intentional decision at a time.'}</p>
            </div>
            <div className="bg-[var(--mf-deep)] p-7 sm:p-10">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">Financial goals</p>
              <div className="mt-5 flex flex-wrap gap-2">{profile.goals?.length ? profile.goals.map((goal) => <span key={goal} className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold">{goal}</span>) : <span className="text-sm text-white/60">Goals are still being defined.</span>}</div>
              {riskProfile ? <div className="mt-7 flex items-center gap-3 rounded-2xl bg-white/10 p-4"><ShieldCheck className="h-5 w-5 text-white/70" /><div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/40">Risk profile</p><p className="mt-1 text-sm font-bold">{riskProfile}</p></div></div> : null}
              {investorProfile ? <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white/10 p-4"><Sparkles className="h-5 w-5 text-white/70" /><div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/40">Investor profile</p><p className="mt-1 text-sm font-bold">{investorProfile}</p></div></div> : null}
            </div>
          </div>
        </section>

        <section className="mt-6 flex flex-col gap-5 rounded-[24px] border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--mf-surface-soft)] text-[var(--mf-primary)]"><Sparkles className="h-5 w-5" /></span><div><h2 className="font-black">Build your own financial profile</h2><p className="mt-1 text-sm leading-6 text-slate-500">Use practical tools to understand, plan, invest, and track with more clarity.</p></div></div>
          <Link to="/tools/risk-calculator" className="mf-action shrink-0">Start with risk profile <ArrowRight className="h-4 w-4" /></Link>
        </section>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-6 text-slate-400">This public page contains self-reported educational information. It is not proof of financial position, investment performance, or creditworthiness.</p>
      </main>
    </div>
  )
}

export default PublicProfilePage
