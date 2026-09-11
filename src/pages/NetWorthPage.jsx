import { ArrowDownRight, ArrowRight, ArrowUpRight, CheckCircle2, Landmark, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import GuidedFlow from '../components/GuidedFlow'
import PageIntro from '../components/PageIntro'
import { formatMoney, formatNumberInput, parseNumberInput, readStorage, storageKeys, toNumber, writeStorage } from '../lib/finance'

const assetFields = [
  ['cash', 'Cash and bank balances'],
  ['investments', 'Investments'],
  ['property', 'Property and land'],
  ['business', 'Business ownership'],
  ['otherAssets', 'Other valuable assets'],
]

const liabilityFields = [
  ['loans', 'Personal and business loans'],
  ['mortgage', 'Mortgage or property debt'],
  ['cards', 'Credit cards and overdrafts'],
  ['otherDebt', 'Other liabilities'],
]

const steps = [
  ...assetFields.map(([key, label]) => ({ key, label, group: 'What you own', icon: 'asset' })),
  ...liabilityFields.map(([key, label]) => ({ key, label, group: 'What you owe', icon: 'liability' })),
]

const blankValues = Object.fromEntries(steps.map(({ key }) => [key, '']))

function NetWorthPage() {
  const saved = readStorage(storageKeys.netWorth, { values: blankValues, history: [] })
  const [values, setValues] = useState(saved.values ?? blankValues)
  const [history, setHistory] = useState(saved.history ?? [])
  const [step, setStep] = useState(0)
  const [finished, setFinished] = useState(false)
  const current = steps[step]
  const assets = assetFields.reduce((sum, [key]) => sum + toNumber(values[key]), 0)
  const liabilities = liabilityFields.reduce((sum, [key]) => sum + toNumber(values[key]), 0)
  const netWorth = assets - liabilities
  const canContinue = values[current.key] !== '' && toNumber(values[current.key]) >= 0

  const advance = () => {
    if (!canContinue) return
    if (step < steps.length - 1) setStep((value) => value + 1)
    else {
      const snapshot = { id: crypto.randomUUID(), date: new Date().toISOString(), assets, liabilities, netWorth }
      const nextHistory = [snapshot, ...history].slice(0, 12)
      setHistory(nextHistory)
      writeStorage(storageKeys.netWorth, { values, history: nextHistory })
      setFinished(true)
    }
  }

  return (
    <div className="mf-container py-12 sm:py-16">
      <PageIntro eyebrow="Net worth calculator" title="Know your net worth, not just your income." description="Move through what you own and owe one item at a time. Use conservative current estimates for a clearer picture of your position." />

      <div className="mt-10 grid gap-6 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
        {finished ? (
          <section className="mf-step-enter mf-panel flex min-h-[450px] flex-col items-center justify-center p-8 text-center sm:p-12">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--mf-surface-soft)] text-[var(--mf-primary)]"><CheckCircle2 className="h-8 w-8" /></span>
            <p className="mf-kicker mt-7">Snapshot saved</p>
            <h2 className="mf-font-display mt-3 text-4xl font-semibold text-slate-950">You now have a baseline.</h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600">Repeat this check periodically. The direction of your net worth over time matters more than one isolated number.</p>
            <button type="button" onClick={() => { setFinished(false); setStep(0) }} className="mf-action mf-action-secondary mt-8"><RotateCcw className="h-4 w-4" /> Update my figures</button>
          </section>
        ) : (
          <GuidedFlow step={step} total={steps.length} eyebrow={current.group} title={current.label} description={current.icon === 'asset' ? 'Enter its realistic current value. Use zero if this does not apply to you.' : 'Enter the amount currently outstanding. Use zero if this does not apply.'} onBack={() => setStep((value) => Math.max(0, value - 1))} onNext={advance} canContinue={canContinue} nextLabel={step === steps.length - 1 ? 'Save my snapshot' : 'Continue'}>
            <div className="flex max-w-xl items-start gap-4">
              <span className={`mt-7 flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${current.icon === 'asset' ? 'bg-green-50 text-[var(--mf-success)]' : 'bg-red-50 text-[var(--mf-danger)]'}`}>{current.icon === 'asset' ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}</span>
              <label className="block flex-1"><span className="mf-label">Current amount</span><div className="relative"><span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl font-bold text-slate-400">₦</span><input autoFocus className="mf-input mf-money-input py-5 text-xl font-bold" type="text" inputMode="decimal" value={formatNumberInput(values[current.key])} onChange={(event) => setValues((value) => ({ ...value, [current.key]: parseNumberInput(event.target.value) }))} placeholder="0" /></div></label>
            </div>
          </GuidedFlow>
        )}

        <aside className="space-y-5 xl:sticky xl:top-28">
          <div className="overflow-hidden rounded-[28px] bg-[var(--mf-primary)] text-white shadow-[0_30px_80px_-45px_rgba(35,55,90,0.8)]">
            <div className="p-7 sm:p-8">
              <Landmark className="h-7 w-7 text-white/70" />
              <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-white/55">Estimated net worth</p>
              <p className="mt-3 text-4xl font-bold sm:text-5xl">{formatMoney(netWorth)}</p>
              <p className="mt-3 text-sm text-white/60">Updates with every answer</p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/10">
              <div className="bg-white/5 p-5"><p className="text-xs text-white/55">Assets</p><p className="mt-2 font-bold">{formatMoney(assets)}</p></div>
              <div className="bg-white/5 p-5"><p className="text-xs text-white/55">Liabilities</p><p className="mt-2 font-bold">{formatMoney(liabilities)}</p></div>
            </div>
          </div>

          {history.length ? (
            <div className="mf-panel p-6">
              <h2 className="font-bold">Recent snapshots</h2>
              <div className="mt-4 space-y-3">
                {history.slice(0, 4).map((item) => <div key={item.id} className="flex items-center justify-between rounded-2xl bg-[var(--mf-surface-soft)] px-4 py-3"><span className="text-xs text-slate-500">{new Date(item.date).toLocaleDateString('en-NG')}</span><span className="text-sm font-bold">{formatMoney(item.netWorth)}</span></div>)}
              </div>
            </div>
          ) : null}
          <Link to="/tools/investment-tracker" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--mf-primary)]">Track the investments inside your assets <ArrowRight className="h-4 w-4" /></Link>
        </aside>
      </div>
    </div>
  )
}

export default NetWorthPage
