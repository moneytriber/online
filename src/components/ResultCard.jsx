const resultStyles = {
  'Low Risk': {
    badge: 'bg-emerald-100 text-emerald-700',
    border: 'border-emerald-200',
    surface: 'bg-emerald-50',
  },
  'Medium Risk': {
    badge: 'bg-amber-100 text-amber-700',
    border: 'border-amber-200',
    surface: 'bg-amber-50',
  },
  'High Risk': {
    badge: 'bg-red-100 text-red-700',
    border: 'border-red-200',
    surface: 'bg-red-50',
  },
}

function ResultCard({ result, email }) {
  const styles = result ? resultStyles[result.level] : null

  if (!result) {
    return (
      <div className="rounded-[30px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center [animation:fade-in-up_0.45s_ease-out]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#23375a]/10 text-[#23375a]">
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-[1.8]">
            <path d="M12 3v18M3 12h18" />
          </svg>
        </div>
        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">
          Your result will appear here
        </h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Complete the form to see your financial risk level, a short
          explanation, and the next best action to take.
        </p>
      </div>
    )
  }

  return (
    <div
      className={`rounded-[30px] border p-8 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)] [animation:fade-in-up_0.45s_ease-out] ${styles.border} ${styles.surface}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">Assessment for</p>
          <p className="mt-1 text-lg font-semibold text-slate-950">{email}</p>
        </div>
        <span
          className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${styles.badge}`}
        >
          {result.level}
        </span>
      </div>

      <h3 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950">
        {result.level}
      </h3>
      <p className="mt-4 text-base leading-8 text-slate-700">{result.message}</p>

      <div className="mt-6 rounded-[24px] bg-white/80 p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
          What influenced this result
        </p>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
          {result.highlights.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#23375a]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="mt-7 inline-flex items-center justify-center rounded-full bg-[#23375a] px-7 py-3.5 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#1b2b47]"
      >
        Get Personalized Plan
      </button>
    </div>
  )
}

export default ResultCard
