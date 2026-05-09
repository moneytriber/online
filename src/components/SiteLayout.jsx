import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Problem', to: '/problem' },
  { label: 'Solution', to: '/solution' },
  { label: 'Community', to: '/community' },
  { label: 'Start', to: '/start' },
]

const toolItems = [
  {
    label: 'Overview',
    to: '/tools',
    description: 'Explore all MoneyFlex planning tools.',
  },
  {
    label: 'Financial Risk Evaluator',
    to: '/tools/risk-evaluator',
    description: 'Assess your profile before using deeper investment tools.',
  },
]

const ASSURANCE_PAYSTACK_URL = 'https://paystack.shop/pay/moneytriber'

const socialItems = [
  { label: 'TikTok', href: '#', icon: 'tiktok' },
  { label: 'Facebook', href: '#', icon: 'facebook' },
  { label: 'Instagram', href: '#', icon: 'instagram' },
  { label: 'Twitter', href: '#', icon: 'twitter' },
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
]

const webinarItems = [
  {
    label: 'Assurance 2.0',
    to: '/webinars/invest-with-assurance-2-0',
    targetBlank: true,
  },
  {
    label: 'Beginner Investor Sessions',
    href: '#',
  },
  {
    label: 'Risk Management Workshops',
    href: '#',
  },
  {
    label: 'Budgeting and Cash Flow Clinics',
    href: '#',
  },
  {
    label: 'Long-Term Wealth Planning',
    href: '#',
  },
]

function SocialIcon({ icon }) {
  if (icon === 'tiktok') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M14.7 3c.3 1.7 1.2 3 2.6 3.8.9.5 1.9.8 2.9.8V11a8 8 0 0 1-5.3-1.9v6.6a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v3.4a2.5 2.5 0 1 0 1.6 2.3V3h3Z" />
      </svg>
    )
  }

  if (icon === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.2c0-.9.3-1.5 1.6-1.5H16V5.1c-.2 0-.9-.1-1.8-.1-1.8 0-3.2 1.1-3.2 3.3V11H8.7v3H11V21h2.5Z" />
      </svg>
    )
  }

  if (icon === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.8]" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.7" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  if (icon === 'twitter') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M18.9 4H22l-6.8 7.7L23 20h-6.1l-4.7-5.6L7.2 20H4l7.2-8.1L4 4h6.2l4.2 5.1L18.9 4Zm-1.1 14h1.7L9.4 5.9H7.6L17.8 18Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M6.9 8.5A1.6 1.6 0 1 1 7 5.3a1.6 1.6 0 0 1-.1 3.2ZM5.6 9.8h2.8V18H5.6V9.8Zm4.5 0h2.7v1.1h.1c.4-.7 1.3-1.4 2.7-1.4 2.9 0 3.4 1.9 3.4 4.4V18h-2.8v-3.7c0-.9 0-2-.1-2.6-.2-.6-.6-1-1.4-1-.8 0-1.4.5-1.6 1.1-.1.2-.1.5-.1.8V18h-2.8V9.8Z" />
    </svg>
  )
}

function SiteLayout() {
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isToolsRoute = location.pathname.startsWith('/tools')
  const isAssuranceRoute =
    location.pathname === '/webinars/invest-with-assurance-2-0'

  const closeMenus = () => {
    setIsToolsMenuOpen(false)
    setIsMobileMenuOpen(false)
  }

  const desktopNavLinkClasses = ({ isActive }) =>
    `rounded-xl px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? 'bg-[#23375a]/8 text-[#23375a]'
        : 'text-slate-700 hover:bg-slate-100 hover:text-[#23375a]'
    }`

  const mobileNavLinkClasses = ({ isActive }) =>
    `block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
      isActive
        ? 'bg-[#23375a] text-white'
        : 'text-slate-700 hover:bg-slate-100 hover:text-[#23375a]'
    }`

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.12)]">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center">
            <NavLink
              to="/"
              onClick={closeMenus}
              className="flex min-w-0 items-center"
            >
              <img
                src="/logo-cropped.png"
                alt="Money Flex Tribe logo"
                className="h-16 w-auto object-contain sm:h-20"
              />
            </NavLink>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {isAssuranceRoute ? (
              <a
                href={ASSURANCE_PAYSTACK_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#23375a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1b2b47]"
              >
                Join Class
              </a>
            ) : (
              <>
            <nav className="flex items-center gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={closeMenus}
                  className={desktopNavLinkClasses}
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsToolsMenuOpen((open) => !open)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    isToolsRoute
                      ? 'bg-[#23375a]/8 text-[#23375a]'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-[#23375a]'
                  }`}
                >
                  <span>Tools</span>
                  <svg
                    viewBox="0 0 20 20"
                    className={`h-4 w-4 transition ${isToolsMenuOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="m5 7.5 5 5 5-5" />
                  </svg>
                </button>

                {isToolsMenuOpen ? (
                  <div className="absolute right-0 z-30 mt-3 w-76 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_-36px_rgba(15,23,42,0.35)] [animation:fade-in-up_0.2s_ease-out]">
                    <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                        Tools Menu
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Choose a planning tool or go straight to the risk evaluation flow.
                      </p>
                    </div>
                    <div className="p-3">
                      {toolItems.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={closeMenus}
                          className="mt-2 block rounded-2xl px-4 py-3 first:mt-0 transition hover:bg-slate-50"
                        >
                          <p className="text-sm font-semibold text-slate-950">
                            {item.label}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-slate-500">
                            {item.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </nav>

            <Link
              to="/tools/risk-evaluator"
              onClick={closeMenus}
              className="rounded-full bg-[#23375a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1b2b47]"
            >
              Get Started
            </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#23375a] text-white transition hover:bg-[#1b2b47] lg:hidden"
            aria-label="Toggle menu"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              {isMobileMenuOpen ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen ? (
          <div className="border-t border-slate-200 bg-white [animation:fade-in-up_0.2s_ease-out] lg:hidden">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
              {isAssuranceRoute ? (
                <a
                  href={ASSURANCE_PAYSTACK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#23375a] px-5 py-3 font-bold text-white transition hover:bg-[#1b2b47]"
                >
                  Join Class
                </a>
              ) : (
                <>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    onClick={closeMenus}
                    className={mobileNavLinkClasses}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                  Tools
                </p>
                <div className="mt-3 space-y-2">
                  {toolItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={closeMenus}
                      className="block rounded-2xl bg-white px-4 py-3 transition hover:bg-slate-100"
                    >
                      <p className="text-sm font-semibold text-slate-950">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {item.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/tools/risk-evaluator"
                onClick={closeMenus}
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#23375a] px-5 py-3 font-bold text-white transition hover:bg-[#1b2b47]"
              >
                Get Started
              </Link>
                </>
              )}
            </div>
          </div>
        ) : null}
      </header>

      <main
        className={
          isAssuranceRoute
            ? 'w-full flex-1'
            : 'mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8'
        }
        onClick={() => setIsToolsMenuOpen(false)}
      >
        <Outlet />
      </main>

      <footer className="mt-10 border-t border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-x-8 gap-y-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.15fr_0.75fr_0.75fr_0.8fr_0.95fr] lg:px-8">
          <div>
            <img
              src="/logo-cropped.png"
              alt="Money Flex Tribe"
              className="h-20 w-auto object-contain mix-blend-multiply sm:h-24"
            />

            <div className="mt-3 flex flex-wrap items-center gap-2.5">
              {socialItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-[#23375a]/25 hover:bg-slate-100 hover:text-[#23375a]"
                >
                  <SocialIcon icon={item.icon} />
                </a>
              ))}
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
              Understand your money personality, evaluate your exposure, and make
              better investment decisions with clearer structure.
            </p>

            <Link
              to="/tools/risk-evaluator"
              className="mt-4 inline-flex rounded-full bg-[#23375a] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1b2b47]"
            >
              Start Risk Evaluation
            </Link>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
              Navigate
            </p>
            <div className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className="block text-sm text-slate-600 transition hover:text-[#23375a]"
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
              Tools
            </p>
            <div className="mt-4 space-y-2.5">
              {toolItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block text-sm text-slate-600 transition hover:text-[#23375a]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
              Webinars
            </p>
            <div className="mt-4 space-y-2.5">
              {webinarItems.map((item) =>
                item.to ? (
                  <Link
                    key={item.label}
                    to={item.to}
                    target={item.targetBlank ? '_blank' : undefined}
                    rel={item.targetBlank ? 'noreferrer' : undefined}
                    className="block text-sm text-slate-600 transition hover:text-[#23375a]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block text-sm text-slate-600 transition hover:text-[#23375a]"
                  >
                    {item.label}
                  </a>
                ),
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
              Platform Focus
            </p>
            <div className="mt-4 space-y-3">
              {[
                'Risk profiling before deeper calculators',
                'Clearer investment guidance for different personalities',
                'Responsive website structure with shared navigation',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#23375a]" />
                  <p className="text-sm leading-6 text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 bg-[#f7f8fa]">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p>© 2026 MoneyFlex Tribe. Built to help people invest with clarity.</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/tools" className="transition hover:text-[#23375a]">
                Tools
              </Link>
              <Link
                to="/tools/risk-evaluator"
                className="transition hover:text-[#23375a]"
              >
                Risk Evaluator
              </Link>
              <Link to="/start" className="transition hover:text-[#23375a]">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SiteLayout
