import { Activity, ArrowRight, BookOpenCheck, Info, Landmark, LineChart, PieChart, ShieldCheck } from 'lucide-react'
import { createElement } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PageIntro from '../components/PageIntro'

const guideSections = [
  {
    id: 'investor-profile',
    title: 'Investor Profile',
    category: 'Knowledge and readiness',
    icon: BookOpenCheck,
    description: 'Measures your experience, product understanding, research habits, and ability to explain an investment decision.',
    toolPath: 'investor-profile',
    outcomes: [
      { name: 'Foundation Builder', meaning: 'You are beginning your investment journey and still developing the language and principles needed to assess opportunities.', expect: 'Simple concepts and transparent products will be easier to evaluate than complex or highly speculative offers.', improve: ['Learn risk, return, liquidity, diversification, inflation, and fees.', 'Practise verifying providers and reading product documents.', 'Do not invest in anything you cannot explain in your own words.'] },
      { name: 'Developing Investor', meaning: 'You understand important investment ideas and may have practical experience, but your research and review process is not fully consistent yet.', expect: 'You can compare basic options, although attractive returns or recommendations may still sometimes receive too much weight.', improve: ['Write the goal and time horizon before selecting a product.', 'Compare downside, fees, liquidity, provider quality, and expected return.', 'Keep a decision journal and schedule portfolio reviews.'] },
      { name: 'Informed Investor', meaning: 'You can connect investments to goals, risk, time horizon, costs, and review decisions with strong practical understanding.', expect: 'You are better equipped to assess trade-offs, but knowledge never removes market, liquidity, currency, or counterparty risk.', improve: ['Use written allocation and concentration limits.', 'Deepen tax, valuation, rebalancing, and scenario-analysis knowledge.', 'Use regulated professional advice for complex or high-value decisions.'] },
    ],
  },
  {
    id: 'risk-profile',
    title: 'Risk Profile Calculator',
    category: 'Risk tolerance',
    icon: ShieldCheck,
    description: 'Measures how you prefer to experience uncertainty, volatility, potential loss, liquidity restrictions, and long investment periods.',
    toolPath: 'risk-calculator',
    outcomes: [
      { name: 'Conservative Investor', meaning: 'You value stability, capital preservation, and access to money more than aggressive growth.', expect: 'A smoother journey may feel more comfortable, but overly cautious choices can still lose purchasing power to inflation.', improve: ['Separate emergency money from long-term investing.', 'Learn how inflation and reinvestment risk affect safer assets.', 'Introduce growth exposure only when your goals, timeline, and capacity support it.'] },
      { name: 'Balanced Investor', meaning: 'You want growth but prefer it alongside stability. You can accept measured market movement when the purpose and time horizon are clear.', expect: 'A balanced portfolio can still decline temporarily. The balance comes from diversification and allocation, not from eliminating loss.', improve: ['Define a target mix between defensive and growth assets.', 'Rebalance periodically instead of reacting emotionally to markets.', 'Check that your emergency reserve can protect long-term investments from forced selling.'] },
      { name: 'Growth Investor', meaning: 'You are comfortable accepting greater short-term volatility in pursuit of stronger long-term growth.', expect: 'Large temporary declines and long recovery periods are possible. A high tolerance score does not prove you can financially absorb those losses.', improve: ['Set firm limits for speculative and concentrated positions.', 'Test your plan against severe market declines before investing.', 'Confirm your knowledge and financial capacity separately.'] },
    ],
  },
  {
    id: 'financial-health',
    title: 'Financial Health',
    category: 'Risk capacity',
    icon: Activity,
    description: 'Measures whether your current cash flow, savings, debt, income stability, and protection can absorb financial shocks.',
    toolPath: 'financial-health',
    outcomes: [
      { name: 'Strong Foundation', meaning: 'Your cash flow and resilience indicators provide meaningful room to handle normal financial disruption.', expect: 'You may have more capacity to pursue longer-term goals, provided each investment still suits its purpose and risk.', improve: ['Maintain emergency savings and appropriate protection.', 'Direct planned surplus toward diversified goals.', 'Recheck after major income, debt, or family changes.'] },
      { name: 'Developing Foundation', meaning: 'Some parts of your financial base are working, but one or more pressure points could interrupt your plan.', expect: 'Investing may still be possible, but commitments should leave room for emergencies, debt, and irregular expenses.', improve: ['Strengthen the weakest indicator first.', 'Build a larger cash buffer before locking away money.', 'Reduce expensive debt and automate realistic savings.'] },
      { name: 'Financially Exposed', meaning: 'Current cash-flow pressure, low reserves, debt, instability, or missing protection could make ordinary shocks difficult to absorb.', expect: 'Taking additional investment risk may create forced selling or borrowing if an emergency occurs.', improve: ['Create immediate room between income and essential spending.', 'Prioritise emergency reserves and expensive debt.', 'Seek qualified help where debt or protection needs are urgent.'] },
    ],
  },
  {
    id: 'net-worth',
    title: 'Net Worth Calculator',
    category: 'Financial position',
    icon: Landmark,
    description: 'Shows assets minus liabilities. It is a baseline and trend measure, not a score of personal worth or financial success.',
    toolPath: 'net-worth',
    outcomes: [
      { name: 'Positive and Rising', meaning: 'Your recorded assets exceed your liabilities and the direction is improving.', expect: 'The figure may still fluctuate with asset prices, currency movements, or new borrowing.', improve: ['Review asset quality and liquidity, not only the total.', 'Reduce unnecessary concentration.', 'Update the snapshot on a consistent schedule.'] },
      { name: 'Near Zero', meaning: 'Your assets and liabilities are close to equal, so small changes can move your result in either direction.', expect: 'Progress may initially come more from debt reduction and regular contributions than investment returns.', improve: ['Protect cash flow and avoid avoidable new debt.', 'Build liquid assets alongside long-term assets.', 'Track the trend quarterly rather than judging one snapshot.'] },
      { name: 'Negative or Declining', meaning: 'Liabilities currently exceed assets, or your recent direction is weakening.', expect: 'This can occur during education, home ownership, or business building, but the repayment path still needs structure.', improve: ['List interest rates and prioritise costly liabilities.', 'Avoid counting unrealistic asset values.', 'Create milestones for moving the trend upward.'] },
    ],
  },
  {
    id: 'budget',
    title: 'Budget Planner',
    category: 'Monthly money system',
    icon: PieChart,
    description: 'Compares income with planned essentials, lifestyle, savings, debt, and investment allocations before the month begins.',
    toolPath: 'budget-planner',
    outcomes: [
      { name: 'Surplus', meaning: 'Some income remains unassigned after your current plan.', expect: 'Unassigned money can easily disappear unless it receives a deliberate purpose.', improve: ['Direct surplus toward reserves, debt, or defined goals.', 'Include irregular expenses and annual bills.', 'Keep a small realistic allowance for flexibility.'] },
      { name: 'Fully Allocated', meaning: 'Every naira currently has a planned purpose.', expect: 'A zero-based plan is useful only when the numbers remain realistic and include breathing room.', improve: ['Review actual spending against the plan.', 'Use sinking funds for non-monthly costs.', 'Adjust categories without shame when life changes.'] },
      { name: 'Overallocated', meaning: 'Planned spending and contributions exceed expected income.', expect: 'The gap will usually become debt, missed goals, or money moved from another category.', improve: ['Reduce lower-priority categories before the month starts.', 'Separate needs, commitments, and preferences.', 'Do not fund investing with money required for essential bills.'] },
    ],
  },
  {
    id: 'investment-tracker',
    title: 'Investment Tracker',
    category: 'Portfolio monitoring',
    icon: LineChart,
    description: 'Tracks contributions, current values, gain or loss, currencies, providers, and scheduled review dates.',
    toolPath: 'investment-tracker',
    outcomes: [
      { name: 'Positive Return', meaning: 'The recorded current value is above contributed capital.', expect: 'A gain does not automatically mean the investment is suitable, diversified, liquid, or likely to keep rising.', improve: ['Compare performance with the goal, time period, fees, and a relevant benchmark.', 'Review concentration and currency exposure.', 'Avoid increasing a holding only because it recently performed well.'] },
      { name: 'Negative Return', meaning: 'The recorded current value is below contributed capital.', expect: 'A loss may reflect normal volatility, a changed investment case, fees, poor quality, or inaccurate valuation.', improve: ['Revisit the original reason for investing.', 'Check whether fundamentals or your timeline changed.', 'Avoid panic decisions; use evidence and qualified advice where needed.'] },
      { name: 'Review Due', meaning: 'A maturity or review date has arrived and the holding needs an intentional decision.', expect: 'The right action may be to hold, rebalance, reinvest, exit, or gather more information.', improve: ['Update the current value and product documents.', 'Compare the holding with its original goal.', 'Record the decision and schedule the next review.'] },
    ],
  },
]

function OutcomeCard({ outcome }) {
  return (
    <details className="group self-start rounded-2xl border border-[var(--mf-border)] bg-white p-5 open:shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black text-slate-950"><span>{outcome.name}</span><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--mf-surface-soft)] text-[var(--mf-primary)] transition group-open:rotate-45">+</span></summary>
      <div className="mt-5 border-t border-[var(--mf-border)] pt-5">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--mf-primary)]">What it means</p><p className="mt-2 text-sm leading-7 text-slate-600">{outcome.meaning}</p>
        <p className="mt-5 text-xs font-black uppercase tracking-[0.14em] text-[var(--mf-primary)]">What to expect</p><p className="mt-2 text-sm leading-7 text-slate-600">{outcome.expect}</p>
        <p className="mt-5 text-xs font-black uppercase tracking-[0.14em] text-[var(--mf-primary)]">What to improve</p><ul className="mt-3 space-y-2">{outcome.improve.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-slate-600"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--mf-primary)]" />{item}</li>)}</ul>
      </div>
    </details>
  )
}

function CalculatorGuidePage() {
  const inDashboard = useLocation().pathname.startsWith('/dashboard')
  const toolUrl = (path) => inDashboard ? `/dashboard/${path === 'risk-calculator' ? 'risk-profile' : path === 'budget-planner' ? 'budget' : path === 'investment-tracker' ? 'investments' : path}` : `/tools/${path}`

  return (
    <div className="mf-container py-12 sm:py-16">
      <PageIntro eyebrow="MoneyFlex results guide" title="Understand what every result is telling you." description="Use this guide to interpret each category, know what to expect, and identify the next area to strengthen." />

      <div className="mt-8 grid gap-3 md:grid-cols-3">
        {[['Knowledge', 'What you understand about investing.'], ['Tolerance', 'How much uncertainty feels acceptable.'], ['Capacity', 'How much risk your finances can absorb.']].map(([title, text], index) => <div key={title} className="rounded-2xl border border-[var(--mf-border)] bg-white p-5"><span className="text-xs font-black text-[var(--mf-primary)]">0{index + 1}</span><h2 className="mt-4 font-black text-slate-950">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div>)}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr] lg:items-start">
        <aside className="hidden rounded-[24px] border border-[var(--mf-border)] bg-white p-5 lg:sticky lg:top-28 lg:block"><p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">On this page</p><nav className="mt-4 space-y-1">{guideSections.map((section) => <a key={section.id} href={`#${section.id}`} className="block rounded-xl px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-[var(--mf-surface-soft)] hover:text-[var(--mf-primary)]">{section.title}</a>)}</nav></aside>

        <div className="space-y-8">
          <div className="flex gap-3 rounded-[22px] bg-[var(--mf-surface-soft)] p-5"><Info className="mt-0.5 h-5 w-5 shrink-0 text-[var(--mf-primary)]" /><p className="text-sm leading-7 text-slate-600"><strong className="text-slate-950">Read results together.</strong> No single category determines investment suitability. Your goals, knowledge, risk tolerance, financial capacity, time horizon, and personal circumstances all matter.</p></div>
          {guideSections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28 rounded-[28px] border border-[var(--mf-border)] bg-[var(--mf-surface-soft)] p-5 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--mf-primary)] text-white">{createElement(section.icon, { className: 'h-5 w-5' })}</span><div><p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--mf-primary)]">{section.category}</p><h2 className="mf-font-display mt-2 text-3xl font-semibold text-slate-950">{section.title}</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{section.description}</p></div></div>
                <Link to={toolUrl(section.toolPath)} className="inline-flex shrink-0 items-center gap-2 text-sm font-black text-[var(--mf-primary)]">Open tool <ArrowRight className="h-4 w-4" /></Link>
              </div>
              <div className="mt-6 grid gap-3 xl:grid-cols-3">{section.outcomes.map((outcome) => <OutcomeCard key={outcome.name} outcome={outcome} />)}</div>
            </section>
          ))}
        </div>
      </div>

      <section className="mt-10 rounded-[28px] bg-[var(--mf-deep)] p-7 text-white sm:p-10"><div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-white/50">Important context</p><h2 className="mf-font-display mt-3 text-3xl font-semibold">Use categories as conversation starters, not permanent labels.</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">Results can change as your knowledge, responsibilities, savings, goals, and experiences change. These tools provide financial education and planning prompts, not regulated personal investment advice.</p></div><Link to={inDashboard ? '/dashboard/investor-profile' : '/tools/investor-profile'} className="mf-action shrink-0 bg-white text-[var(--mf-primary)]">Start with Investor Profile <ArrowRight className="h-4 w-4" /></Link></div></section>
    </div>
  )
}

export default CalculatorGuidePage
