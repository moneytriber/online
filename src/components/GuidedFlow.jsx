import { ArrowRight, ChevronLeft } from 'lucide-react'

function GuidedFlow({
  step,
  total,
  eyebrow,
  title,
  description,
  children,
  onBack,
  onNext,
  canContinue = true,
  nextLabel = 'Continue',
  hideNext = false,
}) {
  const progress = ((step + 1) / total) * 100

  return (
    <section className="mf-panel overflow-hidden" aria-live="polite">
      <div className="border-b border-[var(--mf-border)] bg-[var(--mf-surface-soft)] px-6 py-5 sm:px-9">
        <div className="flex items-center justify-between gap-4">
          <p className="mf-kicker">{eyebrow}</p>
          <p className="text-xs font-bold text-slate-500">{step + 1} of {total}</p>
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white">
          <div className="h-full rounded-full bg-[var(--mf-primary)] transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="p-6 sm:p-9 lg:p-11">
        <div key={step} className="mf-step-enter">
          <h2 className="mf-font-display max-w-3xl text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">{title}</h2>
          {description ? <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{description}</p> : null}
          <div className="mt-8">{children}</div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-[var(--mf-border)] px-6 py-5 sm:px-9">
        <button type="button" onClick={onBack} disabled={step === 0} className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-[var(--mf-primary)] disabled:pointer-events-none disabled:opacity-0">
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        {!hideNext ? (
          <button type="button" onClick={onNext} disabled={!canContinue} className="mf-action disabled:cursor-not-allowed disabled:opacity-40">
            {nextLabel} <ArrowRight className="h-4 w-4" />
          </button>
        ) : <p className="text-xs font-semibold text-slate-400">Choose an answer to continue</p>}
      </div>
    </section>
  )
}

export default GuidedFlow
