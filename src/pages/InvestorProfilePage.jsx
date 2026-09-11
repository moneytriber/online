import { ArrowRight, Check, CheckCircle2, RotateCcw, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import GuidedFlow from '../components/GuidedFlow'
import PageIntro from '../components/PageIntro'
import { readStorage, storageKeys, writeStorage } from '../lib/finance'

const questions = [
  {
    key: 'timeline',
    label: 'When are you most likely to need this money?',
    help: 'Your time horizon affects how much market movement you can reasonably absorb.',
    options: [['Within 2 years', 0], ['In 2 to 5 years', 2], ['More than 5 years from now', 4]],
  },
  {
    key: 'reaction',
    label: 'Your portfolio drops by 15%. What do you do?',
    help: 'Choose the response that feels most realistic, not the one that sounds most impressive.',
    options: [['Sell to prevent further loss', 0], ['Wait, review, and avoid a rushed decision', 2], ['Stay invested or add gradually', 4]],
  },
  {
    key: 'priority',
    label: 'Which outcome matters most to you?',
    help: 'There is no perfect choice. This tells us what you value most from an investment journey.',
    options: [['Protecting my starting capital', 0], ['Balancing stability and growth', 2], ['Maximising long-term growth', 4]],
  },
  {
    key: 'experience',
    label: 'How much investing experience do you have?',
    help: 'Experience can make market movement easier to understand, but it never removes risk.',
    options: [['None yet', 0], ['Some experience with simple products', 2], ['I understand market movement and diversification', 4]],
  },
  {
    key: 'liquidity',
    label: 'How important is quick access to this money?',
    help: 'Money you may need soon generally should not depend on volatile markets.',
    options: [['Very important', 0], ['I may need part of it', 2], ['I can leave it invested long term', 4]],
  },
]

const profiles = {
  conservative: {
    name: 'Conservative Investor',
    summary: 'You prioritise capital stability, liquidity, and a smoother experience over aggressive growth.',
    fit: ['Emergency reserves and money market funds', 'Treasury products and high-quality fixed income', 'A small, diversified growth allocation after your foundation is secure'],
  },
  balanced: {
    name: 'Balanced Investor',
    summary: 'You are willing to accept measured movement in exchange for growth, while still valuing diversification and stability.',
    fit: ['A diversified blend of fixed income and growth assets', 'Broad funds rather than concentrated bets', 'Scheduled portfolio reviews and goal-based allocation'],
  },
  growth: {
    name: 'Growth Investor',
    summary: 'You can tolerate more volatility and have a longer-term mindset, but your financial capacity must still support that risk.',
    fit: ['Diversified equity-heavy portfolios for long horizons', 'Regular contributions through market cycles', 'Clear limits for speculative or concentrated positions'],
  },
}

const initialAnswers = Object.fromEntries(questions.map((question) => [question.key, '']))

function InvestorProfilePage() {
  const saved = readStorage(storageKeys.investorProfile, null)
  const [answers, setAnswers] = useState(saved?.answers ?? initialAnswers)
  const [result, setResult] = useState(saved?.result ?? null)
  const [step, setStep] = useState(0)
  const question = questions[step]

  const finish = (nextAnswers) => {
    const score = Object.values(nextAnswers).reduce((sum, value) => sum + Number(value), 0)
    const nextResult = score <= 6 ? profiles.conservative : score <= 14 ? profiles.balanced : profiles.growth
    writeStorage(storageKeys.investorProfile, { answers: nextAnswers, result: nextResult, score, updatedAt: new Date().toISOString() })
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
      <PageIntro eyebrow="Assessment 01" title="Understand your investor profile." description="A guided five-question conversation about your preferences, time horizon, and likely behaviour. Your financial capacity is assessed separately." />

      {result ? (
        <div className="mf-step-enter mx-auto mt-10 max-w-4xl overflow-hidden rounded-[32px] bg-[var(--mf-primary)] text-white shadow-[0_35px_90px_-45px_rgba(35,55,90,0.9)]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="p-8 sm:p-11">
              <ShieldCheck className="h-9 w-9 text-white/70" />
              <p className="mt-9 text-xs font-black uppercase tracking-[0.22em] text-white/55">Your investor profile</p>
              <h2 className="mf-font-display mt-3 text-4xl font-semibold sm:text-5xl">{result.name}</h2>
              <p className="mt-6 leading-8 text-white/75">{result.summary}</p>
            </div>
            <div className="bg-white p-8 text-slate-950 sm:p-11">
              <p className="text-sm font-bold">Educational starting points</p>
              <ul className="mt-5 space-y-4">
                {result.fit.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-600"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--mf-primary)]" />{item}</li>)}
              </ul>
              <Link to="/tools/financial-health" className="mf-action mt-8 w-full">Check my financial capacity <ArrowRight className="h-4 w-4" /></Link>
              <button type="button" onClick={retake} className="mt-4 inline-flex w-full items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:text-[var(--mf-primary)]"><RotateCcw className="h-4 w-4" /> Retake assessment</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-10 max-w-3xl">
          <GuidedFlow step={step} total={questions.length} eyebrow="Investor profile" title={question.label} description={question.help} onBack={() => setStep((current) => Math.max(0, current - 1))} hideNext>
            <div className="grid gap-3">
              {question.options.map(([label, score]) => {
                const selected = String(answers[question.key]) === String(score)
                return (
                  <button key={label} type="button" onClick={() => choose(score)} className={`mf-choice ${selected ? 'mf-choice-selected' : ''}`}>
                    <span className="font-semibold leading-6">{label}</span>
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${selected ? 'border-[var(--mf-primary)] bg-[var(--mf-primary)] text-white' : 'border-[var(--mf-border)] text-transparent'}`}><Check className="h-4 w-4" /></span>
                  </button>
                )
              })}
            </div>
          </GuidedFlow>
          <p className="mt-5 text-center text-xs leading-6 text-slate-500">Your selection moves you forward automatically. Educational guidance only; suitability depends on your complete circumstances.</p>
        </div>
      )}
    </div>
  )
}

export default InvestorProfilePage
