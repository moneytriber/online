import {
  Activity,
  BellRing,
  BookOpenCheck,
  ChevronLeft,
  Gauge,
  Globe2,
  Landmark,
  LayoutDashboard,
  LineChart,
  Menu,
  PieChart,
  ShieldCheck,
  UserRound,
  X,
} from 'lucide-react'
import { createElement, useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { readStorage, storageKeys } from '../lib/finance'
import { getShareUrl } from '../lib/profile'

const portalNav = [
  { label: 'Overview', to: '/dashboard', icon: LayoutDashboard, end: true },
  { label: 'My Profile', to: '/dashboard/profile', icon: UserRound },
  { label: 'Risk Calculator', to: '/dashboard/risk-profile', icon: ShieldCheck },
  { label: 'Investor Profile', to: '/dashboard/investor-profile', icon: Gauge },
  { label: 'Financial Health', to: '/dashboard/financial-health', icon: Activity },
  { label: 'Net Worth', to: '/dashboard/net-worth', icon: Landmark },
  { label: 'Budget Planner', to: '/dashboard/budget', icon: PieChart },
  { label: 'Investments', to: '/dashboard/investments', icon: LineChart },
  { label: 'Reminders', to: '/dashboard/reminders', icon: BellRing },
  { label: 'Results Guide', to: '/dashboard/guide', icon: BookOpenCheck },
]

const titles = {
  '/dashboard': 'My Moniebestie',
  '/dashboard/profile': 'My Profile',
  '/dashboard/risk-profile': 'Risk Profile Calculator',
  '/dashboard/investor-profile': 'Investor Profile',
  '/dashboard/financial-health': 'Financial Health',
  '/dashboard/net-worth': 'Net Worth',
  '/dashboard/budget': 'Budget Planner',
  '/dashboard/investments': 'Investment Tracker',
  '/dashboard/reminders': 'Reminders',
  '/dashboard/guide': 'Results Guide',
}

function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const clientProfile = readStorage(storageKeys.clientProfile, {})
  const publicProfileUrl = getShareUrl({ username: clientProfile.publishedUsername })

  useEffect(() => {
    document.title = `${titles[location.pathname] ?? 'Client Portal'} | MoneyFlex Tribe`
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  const navigation = (
    <nav className="space-y-1" aria-label="Client portal navigation">
      {portalNav.map(({ icon, ...item }) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${isActive ? 'bg-[var(--mf-primary)] text-white shadow-[0_14px_30px_-20px_rgba(35,55,90,0.8)]' : 'text-slate-500 hover:bg-[var(--mf-surface-soft)] hover:text-[var(--mf-primary)]'}`}
        >
          {createElement(icon, { className: 'h-[18px] w-[18px] shrink-0' })}
          {item.label}
        </NavLink>
      ))}
    </nav>
  )

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-[var(--mf-foreground)]">
      <header className="sticky top-0 z-50 flex h-[72px] items-center justify-between border-b border-white/10 bg-[#101113] px-4 text-white sm:px-6">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => setMobileOpen((value) => !value)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 lg:hidden" aria-label="Toggle portal navigation">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link to="/dashboard" className="flex items-center gap-3">
            <img src="/logo-cropped.png" alt="MoneyFlex Tribe" className="h-11 w-auto rounded-lg bg-white px-2 object-contain" />
            <div className="hidden sm:block">
              <p className="text-sm font-black tracking-tight">MoneyFlex Tribe</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">Client portal</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {publicProfileUrl ? <a href={publicProfileUrl} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-xs font-bold text-white/80 transition hover:bg-white/10 sm:flex"><Globe2 className="h-4 w-4" /> Public profile</a> : <Link to="/dashboard/profile" className="hidden items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-xs font-bold text-white/80 transition hover:bg-white/10 sm:flex"><Globe2 className="h-4 w-4" /> Create public profile</Link>}
          <Link to="/dashboard/reminders" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white/70 transition hover:bg-white/10" aria-label="View reminders"><BellRing className="h-4 w-4" /></Link>
          <Link to="/dashboard/profile" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xs font-black text-[var(--mf-primary)]" aria-label="Edit client profile">MF</Link>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-72px)]">
        <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] w-[260px] shrink-0 flex-col border-r border-slate-200 bg-white p-5 lg:flex">
          <div className="mb-6 rounded-2xl bg-[var(--mf-surface-soft)] p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--mf-primary)] text-white"><Gauge className="h-5 w-5" /></span>
              <div><p className="text-sm font-black text-slate-950">My Moniebestie</p><p className="text-xs text-slate-500">Private workspace</p></div>
            </div>
          </div>
          {navigation}
          <div className="mt-auto border-t border-slate-200 pt-5">
            <Link to="/" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-500 transition hover:bg-[var(--mf-surface-soft)] hover:text-[var(--mf-primary)]"><ChevronLeft className="h-4 w-4" /> Back to website</Link>
          </div>
        </aside>

        {mobileOpen ? (
          <div className="fixed inset-0 top-[72px] z-40 bg-slate-950/30 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)}>
            <aside className="h-full w-[min(86vw,320px)] overflow-y-auto bg-white p-5 shadow-2xl" onClick={(event) => event.stopPropagation()}>
              <p className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-slate-400">My Moniebestie</p>
              {navigation}
              <Link to="/" className="mt-5 flex items-center gap-3 border-t border-slate-200 px-4 pt-5 text-sm font-bold text-slate-500"><ChevronLeft className="h-4 w-4" /> Back to website</Link>
            </aside>
          </div>
        ) : null}

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
