import { Check, Copy, ExternalLink, Eye, LockKeyhole, Save, Share2, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { readStorage, storageKeys, writeStorage } from '../lib/finance'
import { createPublicProfile, defaultClientProfile, getInitials, getShareUrl } from '../lib/profile'

function ClientProfilePage() {
  const riskProfile = readStorage(storageKeys.investorProfile, null)
  const investorKnowledge = readStorage(storageKeys.investorKnowledge, null)
  const [profile, setProfile] = useState(() => ({ ...defaultClientProfile, ...readStorage(storageKeys.clientProfile, {}) }))
  const [notice, setNotice] = useState('')
  const publicProfile = createPublicProfile(profile, riskProfile, investorKnowledge)
  const shareUrl = getShareUrl(publicProfile)

  const update = (key, value) => setProfile((current) => ({ ...current, [key]: value }))
  const save = () => {
    writeStorage(storageKeys.clientProfile, profile)
    setNotice('Profile saved on this device.')
  }
  const copyLink = async () => {
    writeStorage(storageKeys.clientProfile, profile)
    try {
      await navigator.clipboard.writeText(shareUrl)
      setNotice('Share link copied.')
    } catch {
      setNotice('Copy was blocked. Open the preview and copy its address.')
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--mf-primary)]">My profile</p>
          <h1 className="mf-font-display mt-2 text-4xl font-semibold text-slate-950">Control what others can see.</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Build a public financial-growth profile without exposing balances, debt, income, or individual investments.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={shareUrl} target="_blank" rel="noreferrer" className="mf-action mf-action-secondary"><Eye className="h-4 w-4" /> Preview</a>
          <button type="button" onClick={copyLink} className="mf-action"><Copy className="h-4 w-4" /> Copy share link</button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
        <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--mf-primary)] text-xl font-black text-white">{getInitials(profile.name)}</span>
            <div><h2 className="text-xl font-black text-slate-950">{profile.name || defaultClientProfile.name}</h2><p className="mt-1 text-sm text-slate-500">Public profile editor</p></div>
          </div>

          <div className="mt-6 space-y-5">
            <label><span className="mf-label">Display name</span><input className="mf-input" value={profile.name} onChange={(event) => update('name', event.target.value)} placeholder="Your name" /></label>
            <label><span className="mf-label">Headline</span><input className="mf-input" value={profile.headline} onChange={(event) => update('headline', event.target.value)} placeholder="What are you building toward?" /></label>
            <label><span className="mf-label">Location</span><input className="mf-input" value={profile.location} onChange={(event) => update('location', event.target.value)} placeholder="City, Country" /></label>
            <label><span className="mf-label">About your money journey</span><textarea className="mf-input min-h-32 resize-y" value={profile.bio} onChange={(event) => update('bio', event.target.value)} maxLength="320" placeholder="Share a short, encouraging introduction." /><span className="mt-2 block text-right text-xs text-slate-400">{profile.bio.length}/320</span></label>
            <label><span className="mf-label">Public goals</span><input className="mf-input" value={profile.goals} onChange={(event) => update('goals', event.target.value)} placeholder="Separate goals with commas" /><span className="mt-2 block text-xs leading-5 text-slate-500">Separate up to six goals with commas.</span></label>
          </div>

          <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl bg-[var(--mf-surface-soft)] p-4">
            <input type="checkbox" checked={profile.shareInvestorProfile} onChange={(event) => update('shareInvestorProfile', event.target.checked)} className="mt-1 h-4 w-4 accent-[var(--mf-primary)]" />
            <span><span className="block text-sm font-bold text-slate-950">Show my risk profile</span><span className="mt-1 block text-xs leading-5 text-slate-500">Shares only Conservative, Balanced, or Growth, never your answers.</span></span>
          </label>

          <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-2xl bg-[var(--mf-surface-soft)] p-4">
            <input type="checkbox" checked={profile.shareInvestorKnowledge} onChange={(event) => update('shareInvestorKnowledge', event.target.checked)} className="mt-1 h-4 w-4 accent-[var(--mf-primary)]" />
            <span><span className="block text-sm font-bold text-slate-950">Show my investor profile</span><span className="mt-1 block text-xs leading-5 text-slate-500">Shares only your investor readiness category, never individual answers.</span></span>
          </label>

          <button type="button" onClick={save} className="mf-action mt-6 w-full"><Save className="h-4 w-4" /> Save profile</button>
          {notice ? <p className="mt-3 flex items-center justify-center gap-2 text-center text-sm font-semibold text-[var(--mf-success)]"><Check className="h-4 w-4" /> {notice}</p> : null}
        </section>

        <aside className="space-y-5 xl:sticky xl:top-24">
          <div className="overflow-hidden rounded-[28px] bg-[var(--mf-primary)] text-white shadow-[0_30px_80px_-45px_rgba(35,55,90,0.85)]">
            <div className="p-7 sm:p-9">
              <div className="flex items-center justify-between"><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">Public preview</span><Share2 className="h-5 w-5 text-white/60" /></div>
              <div className="mt-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-2xl font-black text-[var(--mf-primary)]">{getInitials(publicProfile.name)}</div>
              <h2 className="mf-font-display mt-6 text-4xl font-semibold">{publicProfile.name}</h2>
              <p className="mt-3 text-base leading-7 text-white/75">{publicProfile.headline}</p>
              {publicProfile.location ? <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-white/45">{publicProfile.location}</p> : null}
            </div>
            <div className="border-t border-white/10 bg-white/5 p-7 sm:p-9">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Public goals</p>
              <div className="mt-4 flex flex-wrap gap-2">{publicProfile.goals.map((goal) => <span key={goal} className="rounded-full bg-white/10 px-3 py-2 text-xs font-bold">{goal}</span>)}</div>
              {publicProfile.riskProfile ? <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/10 p-4"><ShieldCheck className="h-5 w-5 text-white/70" /><div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/45">Risk profile</p><p className="mt-1 text-sm font-bold">{publicProfile.riskProfile}</p></div></div> : null}
              {publicProfile.investorProfile ? <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white/10 p-4"><ShieldCheck className="h-5 w-5 text-white/70" /><div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/45">Investor profile</p><p className="mt-1 text-sm font-bold">{publicProfile.investorProfile}</p></div></div> : null}
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-6">
            <div className="flex gap-3"><LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-[var(--mf-primary)]" /><div><p className="text-sm font-black text-slate-950">Privacy boundary</p><p className="mt-2 text-xs leading-6 text-slate-500">This link never includes your income, expenses, health score, debt, net worth, budget amounts, providers, or investment values.</p></div></div>
            <a href={shareUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--mf-primary)]">Open public view <ExternalLink className="h-4 w-4" /></a>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default ClientProfilePage
