import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarCheck,
  Check,
  HeartHandshake,
  LineChart,
  ShieldCheck,
  WalletCards,
} from 'lucide-react'
import { createElement } from 'react'
import { Link } from 'react-router-dom'
import HeroDashboard from '../components/HeroDashboard'

const journey = [
  { number: '01', title: 'Understand', text: 'Know your financial position and investor personality.', icon: ShieldCheck },
  { number: '02', title: 'Plan', text: 'Turn income and goals into a realistic monthly system.', icon: WalletCards },
  { number: '03', title: 'Invest', text: 'Choose investments that match your capacity and timeline.', icon: LineChart },
  { number: '04', title: 'Track', text: 'See progress, review dates, and portfolio concentration.', icon: BarChart3 },
  { number: '05', title: 'Improve', text: 'Use each review to make the next decision clearer.', icon: CalendarCheck },
]

const featuredTools = [
  { title: 'Investor Profile', text: 'Discover whether your approach is conservative, balanced, or growth focused.', to: '/tools/investor-profile', label: 'Understand my profile' },
  { title: 'Financial Health', text: 'Check cash flow, savings runway, debt pressure, and financial resilience.', to: '/tools/financial-health', label: 'Check my position' },
  { title: 'Net Worth', text: 'Calculate what you own, what you owe, and the number that matters between them.', to: '/tools/net-worth', label: 'Calculate net worth' },
  { title: 'Investment Tracker', text: 'Record holdings, monitor gains, and stay ahead of contribution and maturity dates.', to: '/tools/investment-tracker', label: 'Track investments' },
]

function HomePage() {
  return (
    <div>
      <section className="mf-grid-pattern overflow-hidden bg-[var(--mf-background)]">
        <div className="mf-container grid gap-12 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--mf-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--mf-primary)] shadow-sm">
              <ShieldCheck className="h-4 w-4" />
              Financial clarity for real life
            </div>
            <h1 className="mf-display mt-7 max-w-3xl">
              Make your money make <span className="italic text-[var(--mf-primary)]">more sense.</span>
            </h1>
            <p className="mf-copy mt-7 max-w-2xl">
              MoneyFlex Tribe combines practical financial education with simple tools that help you understand your position, plan confidently, and track your progress.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/tools/investor-profile" className="mf-action">
                Start with my profile <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/tools" className="mf-action mf-action-secondary">
                Explore all tools
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
              {['Beginner friendly', 'Built for NGN and USD', 'Private on this device'].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[var(--mf-primary)]" /> {item}
                </span>
              ))}
            </div>
          </div>
          <HeroDashboard />
        </div>
      </section>

      <section className="border-y border-[var(--mf-border)] bg-white">
        <div className="mf-container py-12">
          <p className="mf-kicker text-center">The MoneyFlex journey</p>
          <div className="mt-8 grid gap-px overflow-hidden rounded-[28px] border border-[var(--mf-border)] bg-[var(--mf-border)] md:grid-cols-5">
            {journey.map(({ number, title, text, icon: Icon }) => (
              <div key={title} className="bg-white p-6">
                <div className="flex items-center justify-between">
                  {createElement(Icon, { className: 'h-5 w-5 text-[var(--mf-primary)]' })}
                  <span className="text-xs font-bold text-slate-400">{number}</span>
                </div>
                <h2 className="mt-8 text-lg font-bold text-slate-950">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mf-section">
        <div className="mf-container">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mf-kicker">Practical tools</p>
              <h2 className="mf-heading mt-4">Move from knowing to doing.</h2>
              <p className="mf-copy mt-5">Each tool gives you a useful answer, explains what it means, and points you toward a responsible next step.</p>
            </div>
            <Link to="/tools" className="inline-flex items-center gap-2 font-bold text-[var(--mf-primary)]">
              View the complete toolkit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {featuredTools.map((tool, index) => (
              <Link
                key={tool.title}
                to={tool.to}
                className={`group relative overflow-hidden rounded-[28px] border p-7 transition hover:-translate-y-1 ${index === 3 ? 'border-transparent bg-[var(--mf-primary)] text-white' : 'border-[var(--mf-border)] bg-white'}`}
              >
                <p className={`text-xs font-black uppercase tracking-[0.2em] ${index === 3 ? 'text-white/60' : 'text-slate-400'}`}>MoneyFlex tool 0{index + 1}</p>
                <h3 className={`mt-5 text-2xl font-bold ${index === 3 ? 'text-white' : 'text-slate-950'}`}>{tool.title}</h3>
                <p className={`mt-3 max-w-xl leading-7 ${index === 3 ? 'text-white/75' : 'text-slate-600'}`}>{tool.text}</p>
                <span className={`mt-7 inline-flex items-center gap-2 text-sm font-bold ${index === 3 ? 'text-white' : 'text-[var(--mf-primary)]'}`}>
                  {tool.label} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--mf-deep)] text-white">
        <div className="mf-container grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-white/55">Learn with confidence</p>
            <h2 className="mf-font-display mt-4 text-4xl font-semibold leading-tight sm:text-5xl">Knowledge is useful when it changes your next move.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: BookOpen, title: 'Plain-language learning', text: 'Understand money concepts without jargon or shame.' },
              { icon: HeartHandshake, title: 'Supportive community', text: 'Build better habits with people on the same journey.' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-[24px] border border-white/10 bg-white/6 p-6">
                {createElement(Icon, { className: 'h-6 w-6 text-white/75' })}
                <h3 className="mt-8 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mf-section bg-white">
        <div className="mf-container flex flex-col items-start justify-between gap-8 rounded-[32px] bg-[var(--mf-surface-soft)] p-8 sm:p-12 lg:flex-row lg:items-center">
          <div className="max-w-3xl">
            <p className="mf-kicker">Your next move</p>
            <h2 className="mf-heading mt-4">Start with the number or question keeping you up at night.</h2>
          </div>
          <Link to="/tools" className="mf-action shrink-0">Choose a tool <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
