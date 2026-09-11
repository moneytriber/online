import { Bell, BellRing, CalendarClock, Check, LineChart, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import GuidedFlow from '../components/GuidedFlow'
import PageIntro from '../components/PageIntro'
import { formatMoney, formatNumberInput, parseNumberInput, percent, readStorage, storageKeys, toNumber, writeStorage } from '../lib/finance'

const blankInvestment = {
  name: '',
  type: 'Stocks / equity fund',
  currency: 'NGN',
  invested: '',
  currentValue: '',
  purchaseDate: '',
  reviewDate: '',
  platform: '',
}

const investmentSteps = [
  { key: 'name', title: 'What should we call this investment?', help: 'Use a name you will recognise quickly, such as “2026 Treasury bill”.', type: 'text', required: true, placeholder: 'e.g. Treasury bill' },
  { key: 'type', title: 'What type of investment is it?', help: 'Choose the category that best describes how the investment works.', type: 'choice', options: ['Stocks / equity fund', 'Fixed income', 'Money market fund', 'Real estate', 'Business', 'Crypto', 'Other'] },
  { key: 'currency', title: 'Which currency should we track it in?', help: 'Currency portfolios are shown separately so exchange rates do not distort your totals.', type: 'choice', options: ['NGN', 'USD'] },
  { key: 'platform', title: 'Who holds or manages the investment?', help: 'This is optional. Never enter a password, account number, PIN, or private key.', type: 'text', placeholder: 'Provider or platform name (optional)' },
  { key: 'invested', title: 'How much have you contributed?', help: 'Enter your total capital contribution, excluding expected returns.', type: 'money', required: true },
  { key: 'currentValue', title: 'What is it worth today?', help: 'Use the latest value available to you. You can update this figure later.', type: 'money', required: true },
  { key: 'purchaseDate', title: 'When did you start this investment?', help: 'This is optional, but it helps you understand the age of the position.', type: 'date' },
  { key: 'reviewDate', title: 'When should you review it next?', help: 'Choose a maturity or review date to receive an alert when you revisit MoneyFlex.', type: 'date' },
]

function InvestmentTrackerPage() {
  const [investments, setInvestments] = useState(() => readStorage(storageKeys.investments, []))
  const [form, setForm] = useState(blankInvestment)
  const [entryStep, setEntryStep] = useState(0)
  const [notificationState, setNotificationState] = useState(() => typeof Notification === 'undefined' ? 'unsupported' : Notification.permission)

  const summaries = useMemo(() => ['NGN', 'USD'].map((currency) => {
    const items = investments.filter((item) => item.currency === currency)
    const invested = items.reduce((sum, item) => sum + toNumber(item.invested), 0)
    const current = items.reduce((sum, item) => sum + toNumber(item.currentValue), 0)
    return { currency, invested, current, gain: current - invested, returnRate: invested ? ((current - invested) / invested) * 100 : 0, count: items.length }
  }), [investments])

  const dueReviews = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10)
    return investments.filter((item) => item.reviewDate && item.reviewDate <= today)
  }, [investments])

  useEffect(() => {
    if (notificationState === 'granted' && dueReviews.length) {
      const today = new Date().toISOString().slice(0, 10)
      const notificationKey = 'moneyflex-last-review-notification'
      if (window.localStorage.getItem(notificationKey) !== today) {
        new Notification('MoneyFlex investment review', {
          body: `${dueReviews.length} investment${dueReviews.length > 1 ? 's are' : ' is'} ready for review.`,
        })
        window.localStorage.setItem(notificationKey, today)
      }
    }
  }, [notificationState, dueReviews.length])

  const persist = (next) => {
    setInvestments(next)
    writeStorage(storageKeys.investments, next)
  }

  const addInvestment = () => {
    const next = [{ ...form, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...investments]
    persist(next)
    setForm(blankInvestment)
    setEntryStep(0)
  }

  const currentEntry = investmentSteps[entryStep]
  const entryValue = form[currentEntry.key]
  const canContinueEntry = !currentEntry.required || (entryValue !== '' && (currentEntry.type !== 'money' || toNumber(entryValue) >= 0))
  const advanceEntry = () => {
    if (!canContinueEntry) return
    if (entryStep === investmentSteps.length - 1) addInvestment()
    else setEntryStep((value) => value + 1)
  }
  const chooseEntry = (value) => {
    setForm((current) => ({ ...current, [currentEntry.key]: value }))
    setEntryStep((current) => Math.min(investmentSteps.length - 1, current + 1))
  }

  const updateCurrentValue = (id, value) => persist(investments.map((item) => item.id === id ? { ...item, currentValue: value, updatedAt: new Date().toISOString() } : item))
  const removeInvestment = (id) => persist(investments.filter((item) => item.id !== id))

  const enableNotifications = async () => {
    if (typeof Notification === 'undefined') return
    const permission = await Notification.requestPermission()
    setNotificationState(permission)
  }

  return (
    <div className="mf-container py-12 sm:py-16">
      <PageIntro eyebrow="Portfolio tracker" title="Track investments with context, not anxiety." description="Record what you contributed, update current values, and set review dates. This first version uses manual valuations so listed and private investments can live in one portfolio." />

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {summaries.map((summary) => (
          <div key={summary.currency} className={`rounded-[28px] p-7 ${summary.currency === 'NGN' ? 'bg-[var(--mf-primary)] text-white' : 'mf-panel'}`}>
            <div className="flex items-center justify-between"><p className={`text-xs font-black uppercase tracking-[0.2em] ${summary.currency === 'NGN' ? 'text-white/55' : 'text-slate-400'}`}>{summary.currency} portfolio</p><LineChart className="h-5 w-5 opacity-60" /></div>
            <p className="mt-6 text-3xl font-bold">{formatMoney(summary.current, summary.currency)}</p>
            <div className={`mt-5 grid grid-cols-2 gap-4 border-t pt-5 ${summary.currency === 'NGN' ? 'border-white/10' : 'border-[var(--mf-border)]'}`}>
              <div><p className="text-xs opacity-60">Contributed</p><p className="mt-1 text-sm font-bold">{formatMoney(summary.invested, summary.currency)}</p></div>
              <div><p className="text-xs opacity-60">Gain / loss</p><p className="mt-1 text-sm font-bold">{formatMoney(summary.gain, summary.currency)} · {percent(summary.returnRate)}</p></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
        <div className="xl:sticky xl:top-28">
          <GuidedFlow step={entryStep} total={investmentSteps.length} eyebrow="Add an investment" title={currentEntry.title} description={currentEntry.help} onBack={() => setEntryStep((value) => Math.max(0, value - 1))} onNext={advanceEntry} canContinue={canContinueEntry} nextLabel={entryStep === investmentSteps.length - 1 ? 'Add to portfolio' : currentEntry.required ? 'Continue' : 'Continue or skip'} hideNext={currentEntry.type === 'choice'}>
            {currentEntry.type === 'choice' ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {currentEntry.options.map((option) => {
                  const selected = entryValue === option
                  return <button key={option} type="button" onClick={() => chooseEntry(option)} className={`mf-choice ${selected ? 'mf-choice-selected' : ''}`}><span className="font-semibold">{option}</span><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${selected ? 'border-[var(--mf-primary)] bg-[var(--mf-primary)] text-white' : 'border-[var(--mf-border)] text-transparent'}`}><Check className="h-4 w-4" /></span></button>
                })}
              </div>
            ) : (
              <label className="block">
                <span className="mf-label">{currentEntry.type === 'money' ? `Amount in ${form.currency === 'USD' ? 'US dollars' : 'naira'}` : currentEntry.type === 'date' ? 'Select a date' : 'Your answer'}</span>
                <div className="relative">
                  {currentEntry.type === 'money' ? <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">{form.currency === 'USD' ? '$' : '₦'}</span> : null}
                  <input autoFocus className={`mf-input py-5 text-lg font-bold ${currentEntry.type === 'money' ? 'mf-money-input' : ''}`} type={currentEntry.type === 'money' ? 'text' : currentEntry.type} inputMode={currentEntry.type === 'money' ? 'decimal' : undefined} value={currentEntry.type === 'money' ? formatNumberInput(entryValue) : entryValue} onChange={(event) => setForm((current) => ({ ...current, [currentEntry.key]: currentEntry.type === 'money' ? parseNumberInput(event.target.value) : event.target.value }))} placeholder={currentEntry.placeholder ?? (currentEntry.type === 'money' ? '0' : '')} />
                </div>
              </label>
            )}
          </GuidedFlow>
          <p className="mt-4 text-center text-xs leading-6 text-slate-500">Never enter brokerage passwords, card details, or private keys. Values are stored only on this device.</p>
        </div>

        <div className="space-y-5">
          <div className="mf-panel-soft flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3"><CalendarClock className="mt-1 h-5 w-5 shrink-0 text-[var(--mf-primary)]" /><div><p className="font-bold">{dueReviews.length ? `${dueReviews.length} review${dueReviews.length > 1 ? 's' : ''} due` : 'No reviews due today'}</p><p className="mt-1 text-xs leading-5 text-slate-500">Browser alerts work when permission is granted and the app is visited.</p></div></div>
            {notificationState !== 'granted' && notificationState !== 'unsupported' ? <button type="button" onClick={enableNotifications} className="mf-action mf-action-secondary shrink-0 px-4 py-2 text-sm"><Bell className="h-4 w-4" /> Enable reminders</button> : <span className="inline-flex items-center gap-2 text-xs font-bold text-[var(--mf-primary)]"><BellRing className="h-4 w-4" /> {notificationState === 'granted' ? 'Reminders enabled' : 'Not supported'}</span>}
          </div>

          {investments.length ? investments.map((item) => {
            const gain = toNumber(item.currentValue) - toNumber(item.invested)
            const rate = toNumber(item.invested) ? (gain / toNumber(item.invested)) * 100 : 0
            const due = item.reviewDate && item.reviewDate <= new Date().toISOString().slice(0, 10)
            return (
              <article key={item.id} className="mf-panel p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div><div className="flex flex-wrap items-center gap-2"><h3 className="text-xl font-bold text-slate-950">{item.name}</h3>{due ? <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">Review due</span> : null}</div><p className="mt-2 text-sm text-slate-500">{item.type}{item.platform ? ` · ${item.platform}` : ''}</p></div>
                  <button type="button" onClick={() => removeInvestment(item.id)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--mf-border)] text-slate-400 transition hover:border-red-200 hover:text-red-600" aria-label={`Remove ${item.name}`}><Trash2 className="h-4 w-4" /></button>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="mf-panel-soft p-4"><p className="text-xs text-slate-500">Contributed</p><p className="mt-2 font-bold">{formatMoney(item.invested, item.currency)}</p></div>
                  <label className="mf-panel-soft p-4"><span className="text-xs text-slate-500">Current value</span><input className="mt-2 w-full border-0 bg-transparent p-0 font-bold outline-none" type="text" inputMode="decimal" value={formatNumberInput(item.currentValue)} onChange={(event) => updateCurrentValue(item.id, parseNumberInput(event.target.value))} /></label>
                  <div className="mf-panel-soft p-4"><p className="text-xs text-slate-500">Gain / loss</p><p className={`mt-2 font-bold ${gain < 0 ? 'text-red-600' : 'text-[var(--mf-success)]'}`}>{formatMoney(gain, item.currency)} · {percent(rate)}</p></div>
                </div>
                {item.reviewDate ? <p className="mt-4 text-xs text-slate-500">Next review: {new Date(`${item.reviewDate}T00:00:00`).toLocaleDateString('en-NG', { dateStyle: 'medium' })}</p> : null}
              </article>
            )
          }) : (
            <div className="mf-panel-soft py-16 text-center"><LineChart className="mx-auto h-10 w-10 text-[var(--mf-primary)]" /><h2 className="mt-5 text-xl font-bold">Your portfolio starts here</h2><p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600">Add your first investment to see portfolio value, gain or loss, currency breakdown, and review reminders.</p></div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InvestmentTrackerPage
