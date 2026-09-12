import { Activity, ArrowRight, BarChart3, Check, Circle, LineChart, PieChart, ShieldCheck, Sparkles } from 'lucide-react'
import { createElement } from 'react'
import { Link } from 'react-router-dom'
import { readStorage, storageKeys } from '../lib/finance'

const setupSteps = [
  { key: 'investorKnowledge', title: 'Investor Profile', description: 'Assess your experience, knowledge, and investment decision readiness.', icon: BarChart3, to: '/dashboard/investor-profile' },
  { key: 'riskProfile', title: 'Risk Calculator', description: 'Understand your comfort with volatility, time, liquidity, and potential loss.', icon: ShieldCheck, to: '/dashboard/risk-profile' },
  { key: 'financialHealth', title: 'Financial Health', description: 'Measure cash flow, emergency savings, debt pressure, and resilience.', icon: Activity, to: '/dashboard/financial-health' },
  { key: 'netWorth', title: 'Net Worth', description: 'Create a clear baseline of everything you own and owe.', icon: BarChart3, to: '/dashboard/net-worth' },
  { key: 'budget', title: 'Budget Planner', description: 'Give your income a practical plan before the month begins.', icon: PieChart, to: '/dashboard/budget' },
  { key: 'investments', title: 'Investment Tracker', description: 'Add your first investment and schedule its next review.', icon: LineChart, to: '/dashboard/investments' },
]

function GettingStartedWizard() {
  const records = {
    investorKnowledge: readStorage(storageKeys.investorKnowledge, null),
    riskProfile: readStorage(storageKeys.investorProfile, null),
    financialHealth: readStorage(storageKeys.financialHealth, null),
    netWorth: readStorage(storageKeys.netWorth, null),
    budget: readStorage(storageKeys.budget, null),
    investments: readStorage(storageKeys.investments, []),
  }
  const steps = setupSteps.map((step) => ({ ...step, complete: step.key === 'investments' ? records.investments.length > 0 : Boolean(records[step.key]) }))
  const completed = steps.filter((step) => step.complete).length
  const current = steps.find((step) => !step.complete)
  const progress = Math.round((completed / steps.length) * 100)

  return (
    <section className="mt-6 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
        <div className="relative overflow-hidden bg-[var(--mf-primary)] p-7 text-white sm:p-9">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10" />
          <div className="relative">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10"><Sparkles className="h-5 w-5" /></span>
            <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-white/50">Getting started</p>
            <h2 className="mf-font-display mt-3 text-3xl font-semibold">Build your complete money picture.</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">Complete the tools in order so each next decision has stronger context.</p>
            <div className="mt-8">
              <div className="flex items-center justify-between text-xs font-bold"><span>{completed} of {steps.length} completed</span><span>{progress}%</span></div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-white transition-[width] duration-500" style={{ width: `${progress}%` }} /></div>
            </div>
            {current ? <Link to={current.to} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-[var(--mf-primary)] transition hover:-translate-y-0.5">Continue with {current.title} <ArrowRight className="h-4 w-4" /></Link> : <p className="mt-7 flex items-center gap-2 text-sm font-black"><Check className="h-4 w-4" /> Setup complete. Keep your figures current.</p>}
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Your setup path</p><p className="mt-2 text-sm text-slate-500">Completed tools move out of your way automatically.</p></div></div>
          <div className="mt-5 space-y-2">
            {steps.map((step) => {
              const isCurrent = current?.key === step.key
              return (
                <Link key={step.key} to={step.to} className={`group flex items-center gap-4 rounded-2xl border p-4 transition ${isCurrent ? 'border-[var(--mf-primary)] bg-[var(--mf-surface-soft)]' : 'border-transparent hover:bg-[var(--mf-surface-soft)]'}`}>
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${step.complete ? 'bg-[var(--mf-primary)] text-white' : 'bg-[var(--mf-surface-soft)] text-[var(--mf-primary)]'}`}>{step.complete ? <Check className="h-5 w-5" /> : createElement(step.icon, { className: 'h-5 w-5' })}</span>
                  <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-black text-slate-950">{step.title}</p>{isCurrent ? <span className="rounded-full bg-[var(--mf-primary)] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-white">Next</span> : null}</div><p className="mt-1 text-xs leading-5 text-slate-500">{step.description}</p></div>
                  {step.complete ? <span className="hidden text-[10px] font-black uppercase tracking-[0.12em] text-[var(--mf-success)] sm:block">Complete</span> : <Circle className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-[var(--mf-primary)]" />}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GettingStartedWizard
