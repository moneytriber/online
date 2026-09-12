import {
  Activity,
  ArrowRight,
  BarChart3,
  LineChart,
  PieChart,
  ShieldCheck,
} from 'lucide-react'
import { createElement } from 'react'
import { Link } from 'react-router-dom'
import PageIntro from '../components/PageIntro'

const tools = [
  {
    title: 'Risk Profile Calculator',
    description: 'Understand how your goals, timeline, liquidity needs, and reaction to market movement shape your risk tolerance.',
    to: '/tools/risk-calculator',
    icon: ShieldCheck,
    action: 'Calculate my risk profile',
    type: 'Assessment',
  },
  {
    title: 'Investor Profile',
    description: 'Assess your investment experience, product knowledge, research habits, and readiness to make informed decisions.',
    to: '/tools/investor-profile',
    icon: BarChart3,
    action: 'Assess my investor knowledge',
    type: 'Assessment',
  },
  {
    title: 'Financial Health',
    description: 'Measure cash-flow pressure, emergency savings, debt commitments, and income stability in one practical check.',
    to: '/tools/financial-health',
    icon: Activity,
    action: 'Check my health',
    type: 'Calculator',
  },
  {
    title: 'Net Worth',
    description: 'Add your assets and liabilities to calculate your current net worth and preserve a snapshot for later review.',
    to: '/tools/net-worth',
    icon: BarChart3,
    action: 'Calculate net worth',
    type: 'Calculator',
  },
  {
    title: 'Budget Planner',
    description: 'Create a realistic plan for essentials, lifestyle, goals, debt, and investing before the month begins.',
    to: '/tools/budget-planner',
    icon: PieChart,
    action: 'Plan my budget',
    type: 'Planner',
  },
  {
    title: 'Investment Tracker',
    description: 'Record investments, compare contributed capital with current value, and stay ahead of important review dates.',
    to: '/tools/investment-tracker',
    icon: LineChart,
    action: 'Open tracker',
    type: 'Tracker',
    featured: true,
  },
]

function ToolsPage() {
  return (
    <>
      <section className="mf-grid-pattern border-b border-[var(--mf-border)] bg-white">
        <div className="mf-container py-16 sm:py-20">
          <PageIntro
            eyebrow="MoneyFlex toolkit"
            title="Useful answers for your next money decision."
            description="Measure your risk tolerance, assess your investment knowledge, check your financial foundation, then plan and track with confidence."
          />
        </div>
      </section>

      <section className="mf-section">
        <div className="mf-container grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {tools.map(({ icon: Icon, ...tool }) => (
            <Link
              key={tool.title}
              to={tool.to}
              className={`group flex min-h-[310px] flex-col rounded-[28px] border p-7 transition hover:-translate-y-1 ${
                tool.featured
                  ? 'border-transparent bg-[var(--mf-primary)] text-white shadow-[0_30px_80px_-45px_rgba(35,55,90,0.8)] md:col-span-2 xl:col-span-1'
                  : 'border-[var(--mf-border)] bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tool.featured ? 'bg-white/10 text-white' : 'bg-[var(--mf-surface-soft)] text-[var(--mf-primary)]'}`}>
                  {createElement(Icon, { className: 'h-5 w-5' })}
                </span>
                <span className={`text-xs font-black uppercase tracking-[0.18em] ${tool.featured ? 'text-white/55' : 'text-slate-400'}`}>{tool.type}</span>
              </div>
              <h2 className={`mt-9 text-2xl font-bold ${tool.featured ? 'text-white' : 'text-slate-950'}`}>{tool.title}</h2>
              <p className={`mt-3 text-sm leading-7 ${tool.featured ? 'text-white/70' : 'text-slate-600'}`}>{tool.description}</p>
              <span className={`mt-auto inline-flex items-center gap-2 pt-8 text-sm font-bold ${tool.featured ? 'text-white' : 'text-[var(--mf-primary)]'}`}>
                {tool.action} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--mf-border)] bg-white">
        <div className="mf-container flex flex-col gap-6 py-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-lg font-bold text-slate-950">Understand your result before making your next move.</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">The results guide explains every category, what to expect, and practical areas to improve.</p>
          </div>
          <Link to="/guide" className="mf-action mf-action-secondary shrink-0">Read the results guide <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  )
}

export default ToolsPage
