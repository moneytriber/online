import { Activity, ArrowRight, BellRing, LineChart, PieChart, ShieldCheck, WalletCards } from 'lucide-react'
import { createElement } from 'react'
import { Link } from 'react-router-dom'
import PageIntro from '../components/PageIntro'
import { formatMoney, readStorage, storageKeys, toNumber } from '../lib/finance'

function DashboardPage() {
  const profile = readStorage(storageKeys.investorProfile, null)
  const health = readStorage(storageKeys.financialHealth, null)
  const netWorthData = readStorage(storageKeys.netWorth, null)
  const budget = readStorage(storageKeys.budget, null)
  const investments = readStorage(storageKeys.investments, [])

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

  const metrics = [
    { label: 'Investor profile', value: profile?.result?.name ?? 'Not assessed', icon: ShieldCheck, to: '/tools/investor-profile' },
    { label: 'Financial health', value: health?.result ? `${health.result.score}/100` : 'Not checked', icon: Activity, to: '/tools/financial-health' },
    { label: 'Net worth', value: formatMoney(netWorth), icon: WalletCards, to: '/tools/net-worth' },
    { label: 'Budget remaining', value: formatMoney(budgetIncome - budgetAllocated), icon: PieChart, to: '/tools/budget-planner' },
  ]

  return (
    <div>
      <section className="mf-grid-pattern border-b border-[var(--mf-border)] bg-white">
        <div className="mf-container py-16 sm:py-20">
          <PageIntro eyebrow="My Money Dashboard" title="Your financial picture, in one calm view." description="This dashboard brings together results saved by your MoneyFlex tools on this device. Secure account sync will follow in the backend phase." />
        </div>
      </section>

      <section className="mf-section">
        <div className="mf-container">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map(({ icon: Icon, ...metric }) => (
              <Link key={metric.label} to={metric.to} className="mf-panel group p-6 transition hover:-translate-y-1">
                <div className="flex items-center justify-between">{createElement(Icon, { className: 'h-5 w-5 text-[var(--mf-primary)]' })}<ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[var(--mf-primary)]" /></div>
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{metric.label}</p>
                <p className="mt-2 text-xl font-bold text-slate-950">{metric.value}</p>
              </Link>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="overflow-hidden rounded-[28px] bg-[var(--mf-primary)] text-white">
              <div className="p-7 sm:p-8">
                <div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-white/55">Investment portfolio</p><h2 className="mf-font-display mt-3 text-3xl font-semibold">Track progress by currency.</h2></div><LineChart className="h-7 w-7 text-white/60" /></div>
                <div className="mt-9 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/8 p-5"><p className="text-xs text-white/55">NGN current value</p><p className="mt-2 text-2xl font-bold">{formatMoney(ngnPortfolio, 'NGN')}</p></div>
                  <div className="rounded-2xl bg-white/8 p-5"><p className="text-xs text-white/55">USD current value</p><p className="mt-2 text-2xl font-bold">{formatMoney(usdPortfolio, 'USD')}</p></div>
                </div>
                <Link to="/tools/investment-tracker" className="mt-7 inline-flex items-center gap-2 text-sm font-bold">Open investment tracker <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>

            <div className="mf-panel p-7 sm:p-8">
              <div className="flex items-center justify-between"><p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Review centre</p><BellRing className="h-5 w-5 text-[var(--mf-primary)]" /></div>
              <p className="mt-8 text-5xl font-bold text-slate-950">{reviewsDue}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">investment review{reviewsDue === 1 ? '' : 's'} due today or overdue.</p>
              <Link to="/tools/investment-tracker" className="mf-action mf-action-secondary mt-7 w-full">Review portfolio</Link>
            </div>
          </div>

          {!profile && !health && !netWorthData && !budget && investments.length === 0 ? (
            <div className="mt-6 rounded-[28px] border border-dashed border-[var(--mf-border)] bg-white p-8 text-center">
              <h2 className="text-xl font-bold">Your dashboard will become more useful as you use the tools.</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">Start with your investor profile, then check your financial health before planning or tracking investments.</p>
              <Link to="/tools/investor-profile" className="mf-action mt-6">Start the journey <ArrowRight className="h-4 w-4" /></Link>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
