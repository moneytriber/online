import { ArrowRight, CheckCircle2, PieChart, RotateCcw, Save } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import GuidedFlow from '../components/GuidedFlow'
import PageIntro from '../components/PageIntro'
import { formatMoney, formatNumberInput, parseNumberInput, readStorage, storageKeys, toNumber, writeStorage } from '../lib/finance'

const categories = [
  ['essentials', 'Essentials', 'Housing, food, transport, utilities, and recurring needs'],
  ['lifestyle', 'Lifestyle', 'Personal spending, subscriptions, and enjoyment'],
  ['goals', 'Savings and goals', 'Emergency reserves and planned purchases'],
  ['debt', 'Extra debt repayment', 'Payments above required minimums'],
  ['investing', 'Investing', 'Long-term wealth-building contributions'],
]

const steps = [
  ['income', 'What is your monthly take-home income?', 'Start with the amount that actually arrives in your account.'],
  ...categories.map(([key, title, help]) => [key, `How much will go to ${title.toLowerCase()}?`, help]),
]

const emptyPlan = { income: '', essentials: '', lifestyle: '', goals: '', debt: '', investing: '' }

function BudgetPlannerPage() {
  const location = useLocation()
  const saved = readStorage(storageKeys.budget, emptyPlan)
  const [plan, setPlan] = useState(saved)
  const [step, setStep] = useState(0)
  const [finished, setFinished] = useState(false)
  const [message, setMessage] = useState('')
  const [key, title, help] = steps[step]
  const income = toNumber(plan.income)
  const allocated = categories.reduce((sum, [categoryKey]) => sum + toNumber(plan[categoryKey]), 0)
  const remaining = income - allocated
  const canContinue = plan[key] !== '' && toNumber(plan[key]) >= 0 && (key !== 'income' || income > 0)
  const trackerPath = location.pathname.startsWith('/dashboard') ? '/dashboard/investments' : '/tools/investment-tracker'

  const advance = () => {
    if (!canContinue) return
    if (step < steps.length - 1) setStep((value) => value + 1)
    else {
      writeStorage(storageKeys.budget, plan)
      setMessage('Your monthly plan has been saved on this device.')
      setFinished(true)
    }
  }

  return (
    <div className="mf-container py-12 sm:py-16">
      <PageIntro eyebrow="Monthly planner" title="Give every naira a job before the month begins." description="Build your plan through six focused decisions. The goal is not a perfect percentage; it is a realistic structure that reflects your life." />

      <div className="mt-10 grid gap-6 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
        {finished ? (
          <section className="mf-step-enter mf-panel flex min-h-[450px] flex-col items-center justify-center p-8 text-center sm:p-12">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--mf-surface-soft)] text-[var(--mf-primary)]"><CheckCircle2 className="h-8 w-8" /></span>
            <p className="mf-kicker mt-7">Plan complete</p>
            <h2 className="mf-font-display mt-3 text-4xl font-semibold text-slate-950">Your money has a direction.</h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600">{message} Review the allocation summary and adjust whenever your priorities or income change.</p>
            <button type="button" onClick={() => { setFinished(false); setStep(0) }} className="mf-action mf-action-secondary mt-8"><RotateCcw className="h-4 w-4" /> Review my plan</button>
          </section>
        ) : (
          <GuidedFlow step={step} total={steps.length} eyebrow="Build your budget" title={title} description={help} onBack={() => setStep((value) => Math.max(0, value - 1))} onNext={advance} canContinue={canContinue} nextLabel={step === steps.length - 1 ? 'Save my plan' : 'Continue'}>
            <label className="block max-w-xl">
              <span className="mf-label">Monthly amount</span>
              <div className="relative"><span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl font-bold text-slate-400">₦</span><input autoFocus className="mf-input mf-money-input py-5 text-xl font-bold" type="text" inputMode="decimal" value={formatNumberInput(plan[key])} onChange={(event) => setPlan((current) => ({ ...current, [key]: parseNumberInput(event.target.value) }))} placeholder="0" /></div>
            </label>
          </GuidedFlow>
        )}

        <aside className="space-y-5 xl:sticky xl:top-28">
          <div className="overflow-hidden rounded-[28px] bg-[var(--mf-primary)] text-white shadow-[0_30px_80px_-45px_rgba(35,55,90,0.8)]">
            <div className="p-7 sm:p-8">
              <PieChart className="h-7 w-7 text-white/70" />
              <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-white/55">Still available to assign</p>
              <p className={`mt-3 text-4xl font-bold ${remaining < 0 ? 'text-red-200' : ''}`}>{formatMoney(remaining)}</p>
              <p className="mt-3 text-sm leading-7 text-white/65">{remaining < 0 ? 'Your current choices exceed your income. Go back and reduce one or more categories.' : remaining === 0 && income ? 'Every naira currently has a purpose.' : 'This updates as you answer each question.'}</p>
            </div>
            <div className="border-t border-white/10 p-6">
              <div className="flex justify-between text-sm"><span className="text-white/60">Income</span><strong>{formatMoney(income)}</strong></div>
              <div className="mt-3 flex justify-between text-sm"><span className="text-white/60">Allocated</span><strong>{formatMoney(allocated)}</strong></div>
            </div>
          </div>

          <div className="mf-panel p-6">
            <h2 className="font-bold">Allocation taking shape</h2>
            <div className="mt-5 space-y-4">
              {categories.map(([categoryKey, categoryTitle]) => {
                const share = income ? (toNumber(plan[categoryKey]) / income) * 100 : 0
                return <div key={categoryKey}><div className="flex justify-between text-xs"><span className="text-slate-600">{categoryTitle}</span><strong>{share.toFixed(0)}%</strong></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--mf-surface-soft)]"><div className="h-full rounded-full bg-[var(--mf-primary)] transition-[width] duration-500" style={{ width: `${Math.min(share, 100)}%` }} /></div></div>
              })}
            </div>
            <p className="mt-5 flex gap-2 text-xs leading-6 text-slate-500"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[var(--mf-primary)]" />Use percentages as a diagnostic, not a rigid rule. Your responsibilities and income pattern matter.</p>
          </div>
          <Link to={trackerPath} className="inline-flex items-center gap-2 text-sm font-bold text-[var(--mf-primary)]">Track planned investments <ArrowRight className="h-4 w-4" /></Link>
        </aside>
      </div>
    </div>
  )
}

export default BudgetPlannerPage
