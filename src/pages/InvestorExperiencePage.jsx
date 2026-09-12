import { ArrowRight, BookOpen, Check, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import GuidedFlow from '../components/GuidedFlow'
import PageIntro from '../components/PageIntro'
import { readStorage, storageKeys, writeStorage } from '../lib/finance'

const questions = [
  {
    key: 'experience',
    label: 'How much hands-on investment experience do you have?',
    help: 'Think about investments you selected or monitored yourself, not only pension contributions made for you.',
    options: [['I have not invested yet', 0], ['Less than two years', 2], ['Two to five years', 3], ['More than five years', 4]],
  },
  {
    key: 'products',
    label: 'How well do you understand common investment products?',
    help: 'Consider fixed income, funds, shares, real estate, and how each can gain or lose value.',
    options: [['I am still learning the basics', 0], ['I understand one or two products', 2], ['I can compare several products', 3], ['I understand their structure, risks, and trade-offs', 4]],
  },
  {
    key: 'diversification',
    label: 'Which statement best describes diversification?',
    help: 'This checks an important principle for managing concentration risk.',
    options: [['Buying several investments that all behave the same way', 0], ['Spreading money across different assets, sectors, or markets', 4], ['Choosing only the investment with the highest return', 0]],
  },
  {
    key: 'research',
    label: 'What do you normally check before investing?',
    help: 'Good decisions begin with understanding what you own and how it can disappoint you.',
    options: [['I mainly rely on recommendations or social media', 0], ['I check expected return and the provider', 2], ['I review risk, liquidity, fees, provider, documents, and fit with my goal', 4]],
  },
  {
    key: 'fees',
    label: 'How do fees and inflation affect an investment return?',
    help: 'Headline returns do not always show how much purchasing power you actually gain.',
    options: [['They do not materially affect my return', 0], ['They can reduce my real return', 4], ['I am not sure', 1]],
  },
  {
    key: 'monitoring',
    label: 'How do you monitor investments after buying?',
    help: 'A review routine helps you respond to changes without watching prices every hour.',
    options: [['I do not have a review process', 0], ['I check occasionally when I remember', 2], ['I use goals, statements, and scheduled review dates', 4]],
  },
  {
    key: 'independence',
    label: 'How confidently can you explain why an investment belongs in your plan?',
    help: 'Confidence here means informed reasoning, not certainty that an investment will perform well.',
    options: [['I usually cannot explain it yet', 0], ['I understand the basic reason', 2], ['I can explain its purpose, risks, time horizon, and exit conditions', 4]],
  },
]

const profiles = {
  foundation: {
    name: 'Foundation Builder',
    summary: 'You are at the beginning of your investment journey. Your strongest next move is to build knowledge before increasing complexity or taking avoidable risk.',
    recommendations: ['Learn risk, return, liquidity, diversification, fees, and inflation first.', 'Begin with transparent products you can explain in your own words.', 'Verify providers and documents before transferring money.', 'Use small learning amounts only after your financial foundation is ready.'],
  },
  developing: {
    name: 'Developing Investor',
    summary: 'You understand important investment ideas and have some practical exposure, but a more consistent research and review process will strengthen your decisions.',
    recommendations: ['Write a clear goal and time horizon for every investment.', 'Compare fees, liquidity, downside risk, and provider credibility before returns.', 'Diversify intentionally instead of simply owning many similar products.', 'Schedule portfolio reviews and document why you buy, hold, or exit.'],
  },
  informed: {
    name: 'Informed Investor',
    summary: 'You show strong practical knowledge and can connect investments to goals, risks, and review decisions. Continue improving discipline rather than chasing complexity.',
    recommendations: ['Maintain a written investment policy and allocation limits.', 'Stress-test concentration, liquidity, currency, and counterparty exposure.', 'Review performance against goals and suitable benchmarks, not social noise.', 'Seek regulated professional advice for complex, tax-sensitive, or high-value decisions.'],
  },
}

const initialAnswers = Object.fromEntries(questions.map((question) => [question.key, '']))

function InvestorExperiencePage() {
  const location = useLocation()
  const saved = readStorage(storageKeys.investorKnowledge, null)
  const [answers, setAnswers] = useState(saved?.answers ?? initialAnswers)
  const [result, setResult] = useState(saved?.result ?? null)
  const [step, setStep] = useState(0)
  const question = questions[step]
  const nextPath = location.pathname.startsWith('/dashboard') ? '/dashboard/financial-health' : '/tools/financial-health'

  const finish = (nextAnswers) => {
    const score = Object.values(nextAnswers).reduce((sum, value) => sum + Number(value), 0)
    const nextResult = score <= 10 ? profiles.foundation : score <= 20 ? profiles.developing : profiles.informed
    writeStorage(storageKeys.investorKnowledge, { answers: nextAnswers, result: nextResult, score, updatedAt: new Date().toISOString() })
    setResult(nextResult)
  }

  const choose = (score) => {
    const nextAnswers = { ...answers, [question.key]: String(score) }
    setAnswers(nextAnswers)
    if (step === questions.length - 1) finish(nextAnswers)
    else setStep((current) => current + 1)
  }

  const retake = () => {
    setAnswers(initialAnswers)
    setResult(null)
    setStep(0)
  }

  return (
    <div className="mf-container py-12 sm:py-16">
      <PageIntro eyebrow="Investor profile" title="Understand your investment knowledge and readiness." description="A guided assessment of your experience, product understanding, research habits, and ability to make informed investment decisions." />

      {result ? (
        <div className="mf-step-enter mx-auto mt-10 max-w-4xl overflow-hidden rounded-[32px] bg-[var(--mf-primary)] text-white shadow-[0_35px_90px_-45px_rgba(35,55,90,0.9)]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="p-8 sm:p-11">
              <Sparkles className="h-9 w-9 text-white/70" />
              <p className="mt-9 text-xs font-black uppercase tracking-[0.22em] text-white/55">Your investor profile</p>
              <h2 className="mf-font-display mt-3 text-4xl font-semibold sm:text-5xl">{result.name}</h2>
              <p className="mt-6 leading-8 text-white/75">{result.summary}</p>
            </div>
            <div className="bg-white p-8 text-slate-950 sm:p-11">
              <p className="flex items-center gap-2 text-sm font-bold"><BookOpen className="h-4 w-4 text-[var(--mf-primary)]" /> Recommended next steps</p>
              <ul className="mt-5 space-y-4">
                {result.recommendations.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-600"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--mf-primary)]" />{item}</li>)}
              </ul>
              <Link to={nextPath} className="mf-action mt-8 w-full">Check my financial capacity <ArrowRight className="h-4 w-4" /></Link>
              <button type="button" onClick={retake} className="mt-4 inline-flex w-full items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:text-[var(--mf-primary)]"><RotateCcw className="h-4 w-4" /> Retake assessment</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-10 max-w-3xl">
          <GuidedFlow step={step} total={questions.length} eyebrow="Investor knowledge" title={question.label} description={question.help} onBack={() => setStep((current) => Math.max(0, current - 1))} hideNext>
            <div className="grid gap-3">
              {question.options.map(([label, score]) => {
                const selected = String(answers[question.key]) === String(score)
                return <button key={label} type="button" onClick={() => choose(score)} className={`mf-choice ${selected ? 'mf-choice-selected' : ''}`}><span className="font-semibold leading-6">{label}</span><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${selected ? 'border-[var(--mf-primary)] bg-[var(--mf-primary)] text-white' : 'border-[var(--mf-border)] text-transparent'}`}><Check className="h-4 w-4" /></span></button>
              })}
            </div>
          </GuidedFlow>
          <p className="mt-5 text-center text-xs leading-6 text-slate-500">Answer honestly for useful guidance. This educational profile is not a licence, certification, or personal investment recommendation.</p>
        </div>
      )}
    </div>
  )
}

export default InvestorExperiencePage
