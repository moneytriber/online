import { Activity, AlertTriangle, ArrowRight, Check, CheckCircle2, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import GuidedFlow from '../components/GuidedFlow'
import PageIntro from '../components/PageIntro'
import { formatMoney, formatNumberInput, parseNumberInput, readStorage, storageKeys, toNumber, writeStorage } from '../lib/finance'

const initialForm = {
  income: '',
  expenses: '',
  savings: '',
  debtPayments: '',
  totalDebt: '',
  stability: '',
  protection: '',
}

const steps = [
  { key: 'income', title: 'What is your monthly take-home income?', help: 'Use the amount that actually reaches you after deductions.', type: 'money', required: true },
  { key: 'expenses', title: 'How much do you spend on living costs each month?', help: 'Include housing, food, transport, utilities, dependants, and recurring essentials.', type: 'money', required: true },
  { key: 'savings', title: 'How much emergency savings can you access today?', help: 'Count liquid savings, not long-term investments or property.', type: 'money', required: true },
  { key: 'debtPayments', title: 'How much goes to debt repayments monthly?', help: 'Include loans, credit facilities, and other required repayments.', type: 'money', required: true },
  { key: 'totalDebt', title: 'What is your total outstanding debt?', help: 'An estimate is fine. Enter zero if you currently have no debt.', type: 'money', required: true },
  {
    key: 'stability',
    title: 'How predictable is your income?',
    help: 'Think about the reliability of the income you can actually plan around.',
    type: 'choice',
    options: [['Unstable or irregular', 'unstable'], ['Somewhat predictable', 'somewhat'], ['Stable and predictable', 'stable']],
  },
  {
    key: 'protection',
    title: 'Do you have relevant insurance or financial protection?',
    help: 'Consider cover for major risks that your current savings could not comfortably absorb.',
    type: 'choice',
    options: [['Not in place or I am unsure', 'no'], ['Appropriate cover is in place', 'yes']],
  },
]

function evaluateHealth(form) {
  const income = toNumber(form.income)
  const expenses = toNumber(form.expenses)
  const savings = toNumber(form.savings)
  const debtPayments = toNumber(form.debtPayments)
  const totalDebt = toNumber(form.totalDebt)
  const expenseRatio = income ? expenses / income : 1
  const debtRatio = income ? debtPayments / income : 1
  const savingsMonths = expenses ? savings / expenses : 0
  let score = 0

  score += expenseRatio <= 0.7 ? 25 : expenseRatio <= 0.9 ? 15 : expenseRatio <= 1 ? 7 : 0
  score += savingsMonths >= 6 ? 25 : savingsMonths >= 3 ? 18 : savingsMonths >= 1 ? 8 : 0
  score += debtRatio <= 0.1 ? 20 : debtRatio <= 0.25 ? 12 : debtRatio <= 0.4 ? 5 : 0
  score += form.stability === 'stable' ? 20 : form.stability === 'somewhat' ? 12 : 4
  score += form.protection === 'yes' ? 10 : 0
  if (income && totalDebt > income * 12) score = Math.max(0, score - 10)

  const status = score >= 75 ? 'Strong foundation' : score >= 50 ? 'Developing foundation' : 'Financially exposed'
  const tone = score >= 75 ? 'strong' : score >= 50 ? 'developing' : 'exposed'
  const priorities = []
  if (expenseRatio > 0.9) priorities.push('Create immediate room between income and monthly spending.')
  if (savingsMonths < 3) priorities.push('Build an emergency reserve toward at least three months of core expenses.')
  if (debtRatio > 0.25) priorities.push('Review expensive debt and reduce the share of income committed to repayments.')
  if (income && totalDebt > income * 12) priorities.push('Create a structured repayment strategy before taking additional investment risk.')
  if (form.stability !== 'stable') priorities.push('Use a larger cash buffer and conservative commitments while income is less predictable.')
  if (form.protection !== 'yes') priorities.push('Review appropriate insurance or protection for risks your savings cannot absorb.')
  if (!priorities.length) priorities.push('Maintain your foundation and direct planned surplus toward diversified long-term goals.')

  return { score, status, tone, savingsMonths, monthlySurplus: income - expenses - debtPayments, priorities }
}

function FinancialHealthPage() {
  const location = useLocation()
  const saved = readStorage(storageKeys.financialHealth, null)
  const [form, setForm] = useState(saved?.form ?? initialForm)
  const [result, setResult] = useState(saved?.result ?? null)
  const [step, setStep] = useState(0)
  const current = steps[step]
  const nextPath = location.pathname.startsWith('/dashboard') ? '/dashboard/budget' : '/tools/budget-planner'
  const canContinue = current.type !== 'money' || (form[current.key] !== '' && toNumber(form[current.key]) >= 0 && (current.key !== 'income' || toNumber(form.income) > 0))

  const finish = (nextForm) => {
    const nextResult = evaluateHealth(nextForm)
    setForm(nextForm)
    setResult(nextResult)
    writeStorage(storageKeys.financialHealth, { form: nextForm, result: nextResult, updatedAt: new Date().toISOString() })
  }

  const choose = (value) => {
    const nextForm = { ...form, [current.key]: value }
    setForm(nextForm)
    if (step === steps.length - 1) finish(nextForm)
    else setStep((value) => value + 1)
  }

  const retake = () => {
    setResult(null)
    setStep(0)
  }

  return (
    <div className="mf-container py-12 sm:py-16">
      <PageIntro eyebrow="Financial health" title="Measure your financial resilience." description="A guided check of cash flow, debt, emergency savings, income stability, and protection. This is separate from how adventurous you feel about investing." />

      {result ? (
        <div className="mf-step-enter mx-auto mt-10 max-w-4xl overflow-hidden rounded-[32px] bg-[var(--mf-primary)] text-white">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="p-8 sm:p-10">
              <Activity className="h-8 w-8 text-white/70" />
              <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-white/55">Financial health score</p>
              <p className="mt-3 text-6xl font-bold">{result.score}<span className="text-2xl text-white/45">/100</span></p>
              <h2 className="mf-font-display mt-5 text-4xl font-semibold">{result.status}</h2>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/8 p-4"><p className="text-xs text-white/55">Emergency runway</p><p className="mt-2 font-bold">{result.savingsMonths.toFixed(1)} months</p></div>
                <div className="rounded-2xl bg-white/8 p-4"><p className="text-xs text-white/55">Monthly room</p><p className="mt-2 font-bold">{formatMoney(result.monthlySurplus)}</p></div>
              </div>
            </div>
            <div className="bg-white p-8 text-slate-950 sm:p-10">
              <p className="text-sm font-bold">Your priority moves</p>
              <ul className="mt-5 space-y-4">
                {result.priorities.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">{result.tone === 'exposed' ? <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--mf-danger)]" /> : <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--mf-success)]" />}{item}</li>)}
              </ul>
              <Link to={nextPath} className="mf-action mt-8 w-full">Turn this into a plan <ArrowRight className="h-4 w-4" /></Link>
              <button type="button" onClick={retake} className="mt-4 inline-flex w-full items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:text-[var(--mf-primary)]"><RotateCcw className="h-4 w-4" /> Review my answers</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-10 max-w-3xl">
          <GuidedFlow
            step={step}
            total={steps.length}
            eyebrow="Financial health check"
            title={current.title}
            description={current.help}
            onBack={() => setStep((value) => Math.max(0, value - 1))}
            onNext={() => setStep((value) => Math.min(steps.length - 1, value + 1))}
            canContinue={canContinue}
            hideNext={current.type === 'choice'}
          >
            {current.type === 'money' ? (
              <label className="block max-w-xl">
                <span className="mf-label">Amount in naira</span>
                <div className="relative"><span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl font-bold text-slate-400">₦</span><input autoFocus className="mf-input mf-money-input py-5 text-xl font-bold" type="text" inputMode="decimal" value={formatNumberInput(form[current.key])} onChange={(event) => setForm((value) => ({ ...value, [current.key]: parseNumberInput(event.target.value) }))} placeholder="0" /></div>
              </label>
            ) : (
              <div className="grid gap-3">
                {current.options.map(([label, value]) => {
                  const selected = form[current.key] === value
                  return <button key={value} type="button" onClick={() => choose(value)} className={`mf-choice ${selected ? 'mf-choice-selected' : ''}`}><span className="font-semibold">{label}</span><span className={`flex h-7 w-7 items-center justify-center rounded-full border ${selected ? 'border-[var(--mf-primary)] bg-[var(--mf-primary)] text-white' : 'border-[var(--mf-border)] text-transparent'}`}><Check className="h-4 w-4" /></span></button>
                })}
              </div>
            )}
          </GuidedFlow>
          <p className="mt-5 text-center text-xs leading-6 text-slate-500">Your figures stay on this device. This score is a planning signal, not a credit score or personal investment recommendation.</p>
        </div>
      )}
    </div>
  )
}

export default FinancialHealthPage
