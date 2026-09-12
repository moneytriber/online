import {
  Activity,
  ArrowRight,
  BellRing,
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  Landmark,
  LineChart,
  PieChart,
  ShieldCheck,
  Sparkles,
  UserRound,
  WalletCards,
} from 'lucide-react'
import { createElement, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatMoney, readStorage, storageKeys, toNumber } from '../lib/finance'
import { createPublicProfile, defaultClientProfile, getInitials, getShareUrl } from '../lib/profile'
import GettingStartedWizard from '../components/GettingStartedWizard'

function DashboardPage() {
  const riskProfile = readStorage(storageKeys.investorProfile, null)
  const investorKnowledge = readStorage(storageKeys.investorKnowledge, null)
  const health = readStorage(storageKeys.financialHealth, null)
  const netWorthData = readStorage(storageKeys.netWorth, null)
  const budget = readStorage(storageKeys.budget, null)
  const investments = readStorage(storageKeys.investments, [])
  const clientProfile = { ...defaultClientProfile, ...readStorage(storageKeys.clientProfile, {}) }
  const [copyNotice, setCopyNotice] = useState('')

  const latestSnapshot = netWorthData?.history?.[0]
  const calculatedNetWorth = netWorthData?.values
    ? ['cash', 'investments', 'property', 'business', 'otherAssets'].reduce((sum, key) => sum + toNumber(netWorthData.values[key]), 0) - ['loans', 'mortgage', 'cards', 'otherDebt'].reduce((sum, key) => sum + toNumber(netWorthData.values[key]), 0)
    : 0
  const netWorth = latestSnapshot?.netWorth ?? calculatedNetWorth
  const budgetIncome = toNumber(budget?.income)
  const budgetAllocated = budget ? ['essentials', 'lifestyle', 'goals', 'debt', 'investing'].reduce((sum, key) => sum + toNumber(budget[key]), 0) : 0
  const ngnPortfolio = investments.filter((item) => item.currency === 'NGN').reduce((sum, item) => sum + toNumber(item.currentValue), 0)
  const usdPortfolio = investments.filter((item) => item.currency === 'USD').reduce((sum, item) => sum + toNumber(item.currentValue), 0)
  const today = new Date().toISOString().slice(0, 10)
  const reviewsDue = investments.filter((item) => item.reviewDate && item.reviewDate <= today).length
  const completedTools = [riskProfile, investorKnowledge, health, netWorthData, budget].filter(Boolean).length
  const publicProfile = createPublicProfile(clientProfile, riskProfile, investorKnowledge)
  const shareUrl = getShareUrl(publicProfile)
  const copyShareLink = async () => {
    if (!shareUrl) {
      setCopyNotice('Choose a username')
      return
    }
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopyNotice('Copied')
    } catch {
      setCopyNotice('Open profile to copy')
    }
  }

  const metrics = [
    { label: 'Investor profile', value: investorKnowledge?.result?.name ?? 'Not assessed', icon: BookOpen, to: '/dashboard/investor-profile' },
    { label: 'Risk profile', value: riskProfile?.result?.name ?? 'Not assessed', icon: ShieldCheck, to: '/dashboard/risk-profile' },
    { label: 'Financial health', value: health?.result ? `${health.result.score}/100` : 'Not checked', icon: Activity, to: '/dashboard/financial-health' },
    { label: 'Net worth', value: formatMoney(netWorth), icon: Landmark, to: '/dashboard/net-worth' },
    { label: 'Budget remaining', value: formatMoney(budgetIncome - budgetAllocated), icon: PieChart, to: '/dashboard/budget' },
  ]

  const quickActions = [
    { label: 'Assess My Investor Profile', help: 'Measure your investment experience, knowledge, and decision readiness.', icon: BookOpen, to: '/dashboard/investor-profile' },
    { label: 'Take Risk Profile Calculator', help: 'Understand whether your style is Conservative, Balanced, or Growth.', icon: ShieldCheck, to: '/dashboard/risk-profile' },
    { label: 'Update Financial Health', help: 'Recheck your resilience after income, debt, or savings changes.', icon: Activity, to: '/dashboard/financial-health' },
    { label: 'Add an Investment', help: 'Track a new holding and schedule its next review date.', icon: LineChart, to: '/dashboard/investments' },
    { label: 'Edit Public Profile', help: 'Choose what your shareable MoneyFlex profile shows.', icon: UserRound, to: '/dashboard/profile' },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <GettingStartedWizard />

      <section className="mt-6 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--mf-primary)] text-base font-black text-white">{getInitials(publicProfile.name)}</span>
            <div><div className="flex flex-wrap items-center gap-2"><h2 className="text-lg font-black text-slate-950">{publicProfile.name}</h2><span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[var(--mf-success)]">Share ready</span></div><p className="mt-1 text-sm text-slate-500">{publicProfile.headline}</p></div>
          </div>
          <Link to="/dashboard/profile" className="mf-action mf-action-secondary px-4 py-2.5 text-sm">Edit profile</Link>
        </div>
        <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-[var(--mf-surface-soft)] p-3 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1 truncate px-2 text-xs font-semibold text-slate-500">{shareUrl || 'Choose and publish a username to create your public link.'}</div>
          <div className="flex gap-2">
            <button type="button" onClick={copyShareLink} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-black text-slate-700 sm:flex-none">{copyNotice === 'Copied' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copyNotice || 'Copy'}</button>
            {shareUrl ? <a href={shareUrl} target="_blank" rel="noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-black text-slate-700 sm:flex-none"><ExternalLink className="h-4 w-4" /> Visit</a> : <Link to="/dashboard/profile" className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-black text-slate-700 sm:flex-none"><ExternalLink className="h-4 w-4" /> Create</Link>}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {metrics.map(({ icon, ...metric }) => (
          <Link key={metric.label} to={metric.to} className="group rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--mf-surface-soft)] text-[var(--mf-primary)]">{createElement(icon, { className: 'h-5 w-5' })}</span><ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[var(--mf-primary)]" /></div>
            <p className="mt-6 text-xs font-bold text-slate-400">{metric.label}</p>
            <p className="mt-2 text-lg font-black text-slate-950">{metric.value}</p>
          </Link>
        ))}
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="overflow-hidden rounded-[24px] bg-[var(--mf-primary)] text-white">
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Investment portfolio</p><h2 className="mf-font-display mt-3 text-3xl font-semibold">Progress by currency.</h2></div><WalletCards className="h-7 w-7 text-white/55" /></div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/8 p-5"><p className="text-xs text-white/50">NGN current value</p><p className="mt-2 text-2xl font-black">{formatMoney(ngnPortfolio, 'NGN')}</p></div>
              <div className="rounded-2xl bg-white/8 p-5"><p className="text-xs text-white/50">USD current value</p><p className="mt-2 text-2xl font-black">{formatMoney(usdPortfolio, 'USD')}</p></div>
            </div>
            <Link to="/dashboard/investments" className="mt-7 inline-flex items-center gap-2 text-sm font-black">Open investment tracker <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
          {[['Tools completed', completedTools, Sparkles], ['Investments tracked', investments.length, LineChart], ['Reviews due', reviewsDue, BellRing]].map(([label, value, icon]) => (
            <div key={label} className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex items-center justify-between"><p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">{label}</p>{createElement(icon, { className: 'hidden h-4 w-4 text-[var(--mf-primary)] sm:block' })}</div>
              <p className="mt-3 text-3xl font-black text-slate-950">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Quick actions</p>
        <div className="mt-4 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
          {quickActions.map(({ icon, ...action }, index) => (
            <Link key={action.label} to={action.to} className={`group flex items-center gap-4 p-5 transition hover:bg-[var(--mf-surface-soft)] sm:px-6 ${index ? 'border-t border-slate-100' : ''}`}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--mf-surface-soft)] text-[var(--mf-primary)]">{createElement(icon, { className: 'h-5 w-5' })}</span>
              <div className="min-w-0 flex-1"><p className="font-black text-slate-950">{action.label}</p><p className="mt-1 text-xs leading-5 text-slate-500">{action.help}</p></div>
              <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[var(--mf-primary)]" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
