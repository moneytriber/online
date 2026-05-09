function ToolCard({ title, description, metric, detail, bullets }) {
  return (
    <article className="group flex h-full flex-col rounded-[32px] border border-slate-200 bg-white p-7 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.3)] transition duration-300 hover:-translate-y-1.5 hover:border-[#23375a]/30 hover:shadow-[0_24px_90px_-36px_rgba(35,55,90,0.35)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">MoneyFlex Tool</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-950">{title}</h3>
        </div>
        <div className="rounded-2xl bg-[#23375a]/8 px-4 py-3 text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#23375a]">
            Key Metric
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{metric}</p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-600">{description}</p>

      <div className="mt-6 rounded-[24px] bg-slate-950 p-5 text-white">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Why it matters
        </p>
        <p className="mt-3 text-base leading-7 text-slate-100">{detail}</p>
      </div>

      <ul className="mt-6 space-y-3 text-sm text-slate-600">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#23375a]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default ToolCard
