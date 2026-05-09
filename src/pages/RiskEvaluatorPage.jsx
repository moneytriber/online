import { useState } from 'react'
import EmailGate from '../components/EmailGate'
import ProfileRecommendationCard from '../components/ProfileRecommendationCard'
import ResultCard from '../components/ResultCard'
import RiskForm from '../components/RiskForm'
import RiskProfileForm from '../components/RiskProfileForm'
import SectionHeader from '../components/SectionHeader'

const emailStorageKey = 'moneyflex-risk-email'

const defaultFormData = {
  monthlyIncome: '',
  monthlyExpenses: '',
  savings: '',
  investmentExperience: 'None',
  riskAppetite: 'Medium',
  incomeStability: 'Somewhat stable',
}

const defaultProfileData = {
  horizon: '2 to 5 years',
  marketReaction: 'Wait and review calmly',
  goal: 'Balance growth and safety',
  cashNeed: 'May need some access in 1 to 3 years',
}

function getStoredEmail() {
  if (typeof window === 'undefined') {
    return ''
  }

  return window.localStorage.getItem(emailStorageKey) ?? ''
}

function evaluateRiskProfile(profileData) {
  const horizonScores = {
    'Less than 2 years': 0,
    '2 to 5 years': 1,
    'More than 5 years': 2,
  }

  const reactionScores = {
    'Sell immediately': 0,
    'Wait and review calmly': 1,
    'Hold or invest more': 2,
  }

  const goalScores = {
    'Protect my capital': 0,
    'Balance growth and safety': 1,
    'Maximize long-term growth': 2,
  }

  const cashNeedScores = {
    'Need access within 1 year': 0,
    'May need some access in 1 to 3 years': 1,
    'No near-term need': 2,
  }

  const score =
    horizonScores[profileData.horizon] +
    reactionScores[profileData.marketReaction] +
    goalScores[profileData.goal] +
    cashNeedScores[profileData.cashNeed]

  if (score <= 2) {
    return {
      level: 'Low Risk Taker',
      mappedAppetite: 'Low',
      personality: 'Conservative Protector',
      summary:
        'You value stability, smoother returns, and capital protection more than aggressive upside.',
      recommendationTitle:
        'Best fit: capital-preservation and income-focused investments',
      recommendations: [
        'Strengthen emergency savings and liquid cash reserves first.',
        'Consider money market funds, treasury products, and short-duration bonds.',
        'Use conservative balanced funds if you want measured exposure to growth.',
      ],
    }
  }

  if (score <= 5) {
    return {
      level: 'Mid Risk Taker',
      mappedAppetite: 'Medium',
      personality: 'Balanced Builder',
      summary:
        'You want meaningful growth, but you still care about stability, diversification, and controlled downside.',
      recommendationTitle: 'Best fit: diversified balanced portfolios',
      recommendations: [
        'Blend quality equity index funds with fixed-income or bond holdings.',
        'Stay diversified instead of concentrating too much in one idea or sector.',
        'Review your allocation regularly so growth and safety stay balanced.',
      ],
    }
  }

  return {
    level: 'High Risk Taker',
    mappedAppetite: 'High',
    personality: 'Growth Seeker',
    summary:
      'You are comfortable with market swings and are more willing to accept volatility for stronger long-term upside.',
    recommendationTitle: 'Best fit: long-term growth-focused investing',
    recommendations: [
      'Focus on diversified equity-heavy portfolios built for long-term growth.',
      'Take aggressive positions only after your emergency fund is solid.',
      'Keep speculation limited and stay disciplined with your risk controls.',
    ],
  }
}

function evaluateRisk(formData) {
  const income = Number(formData.monthlyIncome) || 0
  const expenses = Number(formData.monthlyExpenses) || 0
  const savings = Number(formData.savings) || 0
  const monthsOfSavings = expenses > 0 ? savings / expenses : savings > 0 ? 12 : 0
  let score = 0
  const highlights = []

  if (expenses > income) {
    score += 4
    highlights.push('Your expenses are currently higher than your monthly income.')
  } else if (income > 0 && expenses / income > 0.8) {
    score += 1
    highlights.push('Your expenses take up a large share of your monthly income.')
  } else {
    highlights.push('Your monthly cash flow still leaves room for planning decisions.')
  }

  if (monthsOfSavings < 3) {
    score += 4
    highlights.push('Your savings cover less than three months of expenses.')
  } else if (monthsOfSavings < 6) {
    score += 2
    highlights.push('Your savings cushion is growing, but it could be stronger.')
  } else {
    highlights.push('Your savings buffer gives you more protection against disruption.')
  }

  if (formData.investmentExperience === 'None') {
    score += 2
    highlights.push('You have not built investment experience yet, which raises uncertainty.')
  } else if (formData.investmentExperience === 'Beginner') {
    score += 1
    highlights.push('You have started investing, but you are still early in the learning curve.')
  } else {
    highlights.push('Your investment experience supports better long-term decision-making.')
  }

  if (formData.riskAppetite === 'High') {
    score += 1
    highlights.push('A high risk appetite can expose you to more volatility if structure is weak.')
  } else if (formData.riskAppetite === 'Low') {
    score -= 1
    highlights.push('A low risk appetite points to a safer personal profile.')
  } else {
    highlights.push('A medium risk appetite suggests a balanced approach to decision-making.')
  }

  if (formData.incomeStability === 'Unstable') {
    score += 2
    highlights.push('Your income stability is low, which increases financial pressure.')
  } else if (formData.incomeStability === 'Somewhat stable') {
    score += 1
    highlights.push('Your income has some stability, but there is still room to strengthen predictability.')
  } else {
    highlights.push('Stable income gives your plan a stronger foundation.')
  }

  if (score >= 6) {
    return {
      level: 'High Risk',
      message: 'You are financially exposed and need urgent restructuring.',
      highlights,
    }
  }

  if (score >= 3) {
    return {
      level: 'Medium Risk',
      message: 'You are doing okay but need better structure.',
      highlights,
    }
  }

  return {
    level: 'Low Risk',
    message: 'You are financially stable and managing risk well.',
    highlights,
  }
}

function RiskEvaluatorPage() {
  const [email, setEmail] = useState(() => getStoredEmail())
  const [emailSubmitted, setEmailSubmitted] = useState(() => Boolean(getStoredEmail()))
  const [profileData, setProfileData] = useState(defaultProfileData)
  const [profileResult, setProfileResult] = useState(null)
  const [formData, setFormData] = useState(defaultFormData)
  const [result, setResult] = useState(null)

  const isEmailValid = /\S+@\S+\.\S+/.test(email)

  const handleFormChange = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleProfileChange = (field, value) => {
    setProfileData((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleEmailSubmit = (event) => {
    event.preventDefault()

    if (!isEmailValid) {
      return
    }

    window.localStorage.setItem(emailStorageKey, email)
    setEmailSubmitted(true)
  }

  const handleProfileSubmit = (event) => {
    event.preventDefault()

    const nextProfileResult = evaluateRiskProfile(profileData)

    setProfileResult(nextProfileResult)
    setFormData((current) => ({
      ...current,
      riskAppetite: nextProfileResult.mappedAppetite,
    }))
  }

  const handleRiskSubmit = (event) => {
    event.preventDefault()
    setResult(evaluateRisk(formData))
  }

  return (
    <div className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-[0_28px_90px_-50px_rgba(15,23,42,0.35)] sm:p-8">
      <SectionHeader
        eyebrow="Risk Evaluator"
        title="Financial Risk Evaluator"
        description="Start with a risk management evaluation to learn what kind of risk taker you are, then continue to the financial risk evaluator."
      />

      <div className="relative mt-8 overflow-hidden rounded-[36px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5 sm:p-6">
        {!emailSubmitted ? (
          <EmailGate
            email={email}
            onEmailChange={setEmail}
            onSubmit={handleEmailSubmit}
            isValid={isEmailValid}
          />
        ) : null}

        <div className={`${!emailSubmitted ? 'pointer-events-none blur-[1px]' : ''}`}>
          <div className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-[30px] bg-white p-6 shadow-[0_24px_70px_-48px_rgba(15,23,42,0.3)] [animation:fade-in-up_0.45s_ease-out]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.26em] text-slate-500">
                    Step 1
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">
                    Risk Management Evaluation
                  </p>
                </div>
                <div className="rounded-full bg-[#23375a]/8 px-4 py-2 text-sm font-semibold text-[#23375a]">
                  Required First
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                Before using the financial risk evaluator, we first identify
                whether you are a low, mid, or high risk taker and suggest the
                type of investments that suit your personality.
              </p>

              <div className="mt-8">
                <RiskProfileForm
                  formData={profileData}
                  onChange={handleProfileChange}
                  onSubmit={handleProfileSubmit}
                />
              </div>
            </div>

            <ProfileRecommendationCard profile={profileResult} />
          </div>

          <div className="relative mt-6">
            {!profileResult ? (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[30px] bg-slate-950/40 p-4 backdrop-blur-sm [animation:fade-in_0.3s_ease-out]">
                <div className="max-w-md rounded-[28px] border border-white/15 bg-white p-6 text-center shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)]">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#23375a]">
                    Step 2 Locked
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                    Complete your risk-taker profile first
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Once we know if you are a low, mid, or high risk taker, the
                    financial risk evaluator will unlock automatically.
                  </p>
                </div>
              </div>
            ) : null}

            <div className={`${!profileResult ? 'pointer-events-none blur-[1px]' : ''}`}>
              <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[30px] bg-white p-6 shadow-[0_24px_70px_-48px_rgba(15,23,42,0.3)] [animation:fade-in-up_0.45s_ease-out]">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.26em] text-slate-500">
                        Step 2
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-slate-950">
                        Financial Risk Evaluator
                      </p>
                    </div>
                    <div className="rounded-full bg-[#23375a]/8 px-4 py-2 text-sm font-semibold text-[#23375a]">
                      {emailSubmitted ? email : 'Protected Tool'}
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-slate-600">
                    This second step looks at your cash flow, savings, income
                    stability, and experience to show how financially exposed
                    you are today.
                  </p>

                  <div className="mt-8">
                    <RiskForm
                      formData={formData}
                      onChange={handleFormChange}
                      onSubmit={handleRiskSubmit}
                      submitLabel="Run Financial Risk Evaluation"
                    />
                  </div>
                </div>

                <ResultCard result={result} email={email} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RiskEvaluatorPage
