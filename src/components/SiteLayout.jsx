import { useEffect, useState } from 'react'
import {
  BarChart3,
  ChevronDown,
  Menu,
  WalletCards,
  X,
} from 'lucide-react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Learn', to: '/learn' },
  { label: 'Community', to: '/community' },
  { label: 'Webinar', to: '/webinars/invest-with-assurance-2-0' },
  { label: 'About', to: '/about' },
]

const toolItems = [
  { label: 'Tools overview', to: '/tools', description: 'Choose your next money move.' },
  { label: 'Risk profile calculator', to: '/tools/risk-calculator', description: 'Discover whether your style is Conservative, Balanced, or Growth.' },
  { label: 'Investor profile', to: '/tools/investor-profile', description: 'Assess your investment experience, knowledge, and decision readiness.' },
  { label: 'Financial health', to: '/tools/financial-health', description: 'Measure your financial resilience today.' },
  { label: 'Net worth', to: '/tools/net-worth', description: 'See what you own minus what you owe.' },
  { label: 'Budget planner', to: '/tools/budget-planner', description: 'Give every naira a clear purpose.' },
  { label: 'Investment tracker', to: '/tools/investment-tracker', description: 'Track holdings, returns, and review dates.' },
]

const ASSURANCE_PAYSTACK_URL = 'https://paystack.shop/pay/moneytriber'

const pageTitles = {
  '/': 'MoneyFlex Tribe | Financial Clarity for Real Life',
  '/learn': 'Learn | MoneyFlex Tribe',
  '/community': 'Community | MoneyFlex Tribe',
  '/about': 'About | MoneyFlex Tribe',
  '/dashboard': 'My Money Dashboard | MoneyFlex Tribe',
  '/tools': 'Money Tools | MoneyFlex Tribe',
  '/tools/risk-calculator': 'Risk Profile Calculator | MoneyFlex Tribe',
  '/tools/investor-profile': 'Investor Profile | MoneyFlex Tribe',
  '/tools/financial-health': 'Financial Health | MoneyFlex Tribe',
  '/tools/net-worth': 'Net Worth Calculator | MoneyFlex Tribe',
  '/tools/budget-planner': 'Budget Planner | MoneyFlex Tribe',
  '/tools/investment-tracker': 'Investment Tracker | MoneyFlex Tribe',
  '/webinars/invest-with-assurance-2-0': 'Investing With Assurance 2.0 | MoneyFlex Tribe',
}

function trackAssuranceCheckout() {
  window.fbq?.('track', 'InitiateCheckout', {
    content_name: 'Investing With Assurance 2.0',
    currency: 'NGN',
    value: 15000,
  })
}

function BrandLogo({ footer = false }) {
  return (
    <img
      src="/logo-cropped.png"
      alt="Money Flex Tribe"
      className={footer ? 'h-16 w-auto object-contain' : 'h-14 w-auto object-contain sm:h-16'}
    />
  )
}

function SiteLayout() {
  const [toolsOpen, setToolsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isToolsRoute = location.pathname.startsWith('/tools')
  const isAssuranceRoute = location.pathname === '/webinars/invest-with-assurance-2-0'

  useEffect(() => {
    document.title = pageTitles[location.pathname] ?? 'MoneyFlex Tribe'
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  const closeMenus = () => {
    setToolsOpen(false)
    setMobileOpen(false)
  }

  const navClasses = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? 'bg-[var(--mf-surface-soft)] text-[var(--mf-primary)]'
        : 'text-slate-600 hover:bg-[var(--mf-surface-soft)] hover:text-[var(--mf-primary)]'
    }`

  return (
    <div className="flex min-h-screen flex-col bg-[var(--mf-background)] text-[var(--mf-foreground)]">
      <header className="sticky top-0 z-50 border-b border-[var(--mf-border)] bg-white/95 backdrop-blur-xl">
        <div className="mf-container flex min-h-[76px] items-center justify-between gap-5">
          <Link to="/" onClick={closeMenus} aria-label="MoneyFlex Tribe home" className="shrink-0">
            <BrandLogo />
          </Link>

          {isAssuranceRoute ? (
            <a href={ASSURANCE_PAYSTACK_URL} target="_blank" rel="noreferrer" onClick={trackAssuranceCheckout} className="mf-action">
              Join Class
            </a>
          ) : (
            <>
              <div className="hidden items-center gap-1 lg:flex">
                <nav className="flex items-center gap-1" aria-label="Main navigation">
                  {navItems.map((item) => (
                    <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={closeMenus} className={navClasses}>
                      {item.label}
                    </NavLink>
                  ))}

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setToolsOpen((value) => !value)}
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                        isToolsRoute
                          ? 'bg-[var(--mf-surface-soft)] text-[var(--mf-primary)]'
                          : 'text-slate-600 hover:bg-[var(--mf-surface-soft)] hover:text-[var(--mf-primary)]'
                      }`}
                      aria-expanded={toolsOpen}
                    >
                      Tools
                      <ChevronDown className={`h-4 w-4 transition ${toolsOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {toolsOpen ? (
                      <div className="absolute right-0 mt-3 w-[390px] overflow-hidden rounded-[24px] border border-[var(--mf-border)] bg-white p-3 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.35)]">
                        <div className="grid grid-cols-2 gap-1">
                          {toolItems.map((item, index) => (
                            <Link
                              key={item.to}
                              to={item.to}
                              onClick={closeMenus}
                              className={`rounded-2xl p-4 transition hover:bg-[var(--mf-surface-soft)] ${index === 0 ? 'col-span-2 bg-[var(--mf-surface-soft)]' : ''}`}
                            >
                              <p className="text-sm font-bold text-slate-950">{item.label}</p>
                              <p className="mt-1 text-xs leading-5 text-slate-500">{item.description}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </nav>

                <Link to="/dashboard" onClick={closeMenus} className="mf-action ml-2">
                  <BarChart3 className="h-4 w-4" />
                  My Dashboard
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen((value) => !value)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--mf-primary)] text-white lg:hidden"
                aria-label="Toggle navigation"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </>
          )}
        </div>

        {mobileOpen && !isAssuranceRoute ? (
          <div className="border-t border-[var(--mf-border)] bg-white lg:hidden">
            <div className="mf-container space-y-5 py-5">
              <nav className="grid grid-cols-2 gap-2" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={closeMenus} className={navClasses}>
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <div className="border-t border-[var(--mf-border)] pt-4">
                <p className="mf-kicker">Money tools</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {toolItems.slice(1).map((item) => (
                    <Link key={item.to} to={item.to} onClick={closeMenus} className="rounded-2xl bg-[var(--mf-surface-soft)] px-4 py-3 text-sm font-semibold text-[var(--mf-primary)]">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <Link to="/dashboard" onClick={closeMenus} className="mf-action w-full">
                <BarChart3 className="h-4 w-4" /> My Dashboard
              </Link>
            </div>
          </div>
        ) : null}
      </header>

      <main className="w-full flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-[var(--mf-border)] bg-white">
        <div className="mf-container grid gap-10 py-12 md:grid-cols-[1.4fr_0.75fr_0.9fr_0.9fr]">
          <div>
            <BrandLogo footer />
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">
              Practical financial education and simple tools for clearer decisions, calmer money habits, and intentional wealth building.
            </p>
            <div className="mt-5 flex gap-2" aria-label="Social media links">
              {['f', 'ig', 'in'].map((mark) => (
                <span key={mark} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--mf-border)] text-xs font-black text-slate-500" title="Social link coming soon">{mark}</span>
              ))}
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--mf-border)] text-xs font-black text-slate-500" title="TikTok link coming soon">TT</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--mf-border)] text-xs font-black text-slate-500" title="X link coming soon">X</span>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold text-slate-950">Explore</p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <Link className="block hover:text-[var(--mf-primary)]" to="/learn">Learn</Link>
              <Link className="block hover:text-[var(--mf-primary)]" to="/community">Community</Link>
              <Link className="block hover:text-[var(--mf-primary)]" to="/about">About us</Link>
              <Link className="block hover:text-[var(--mf-primary)]" to="/dashboard">Dashboard</Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold text-slate-950">Money tools</p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              {toolItems.slice(1).map((item) => (
                <Link key={item.to} className="block hover:text-[var(--mf-primary)]" to={item.to}>{item.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold text-slate-950">Featured class</p>
            <p className="mt-4 text-sm font-semibold text-[var(--mf-primary)]">Investing With Assurance 2.0</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Understand how to build wealth without losing sleep.</p>
            <Link to="/webinars/invest-with-assurance-2-0" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--mf-primary)]">
              View webinar <WalletCards className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="border-t border-[var(--mf-border)] bg-[var(--mf-surface-soft)]">
          <div className="mf-container flex flex-col gap-2 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 MoneyFlex Tribe. Financial education for real life.</p>
            <p>Educational content only. Investment values can rise or fall.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SiteLayout
