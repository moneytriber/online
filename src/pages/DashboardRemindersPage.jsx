import { BellRing, CalendarClock, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { readStorage, storageKeys } from '../lib/finance'

function DashboardRemindersPage() {
  const investments = readStorage(storageKeys.investments, [])
  const today = new Date().toISOString().slice(0, 10)
  const due = investments.filter((item) => item.reviewDate && item.reviewDate <= today)
  const upcoming = investments.filter((item) => item.reviewDate && item.reviewDate > today).sort((a, b) => a.reviewDate.localeCompare(b.reviewDate))

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--mf-primary)]">Reminders</p>
      <h1 className="mf-font-display mt-2 text-4xl font-semibold text-slate-950">Your financial review centre.</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Review dates keep long-term decisions deliberate without encouraging daily portfolio checking.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex items-center justify-between"><h2 className="font-black">Due now</h2><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-[var(--mf-danger)]"><BellRing className="h-5 w-5" /></span></div>
          <div className="mt-6 space-y-3">
            {due.length ? due.map((item) => <div key={item.id} className="rounded-2xl bg-red-50/70 p-4"><p className="font-bold text-slate-950">{item.name}</p><p className="mt-1 text-xs text-slate-500">Review date: {new Date(`${item.reviewDate}T00:00:00`).toLocaleDateString('en-NG', { dateStyle: 'medium' })}</p></div>) : <div className="py-8 text-center"><CheckCircle2 className="mx-auto h-8 w-8 text-[var(--mf-success)]" /><p className="mt-3 text-sm font-bold">Nothing overdue</p></div>}
          </div>
        </section>

        <section className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex items-center justify-between"><h2 className="font-black">Upcoming</h2><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--mf-surface-soft)] text-[var(--mf-primary)]"><CalendarClock className="h-5 w-5" /></span></div>
          <div className="mt-6 space-y-3">
            {upcoming.length ? upcoming.slice(0, 8).map((item) => <div key={item.id} className="flex items-center justify-between rounded-2xl bg-[var(--mf-surface-soft)] p-4"><p className="font-bold text-slate-950">{item.name}</p><p className="text-xs text-slate-500">{new Date(`${item.reviewDate}T00:00:00`).toLocaleDateString('en-NG', { dateStyle: 'medium' })}</p></div>) : <p className="py-8 text-center text-sm text-slate-500">No future reviews scheduled yet.</p>}
          </div>
        </section>
      </div>

      <Link to="/dashboard/investments" className="mf-action mt-6">Manage investment dates</Link>
    </div>
  )
}

export default DashboardRemindersPage
