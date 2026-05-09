function FeatureCard({ icon, title, description, accent = false, children }) {
  const accentClasses = accent
    ? 'border-[#23375a]/20 bg-white shadow-[0_20px_60px_-24px_rgba(35,55,90,0.35)]'
    : 'border-slate-200/80 bg-white/90'

  return (
    <article
      className={`group rounded-[28px] border p-6 transition duration-300 hover:-translate-y-1 hover:border-[#23375a]/25 hover:shadow-[0_20px_70px_-28px_rgba(35,55,90,0.35)] ${accentClasses}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#23375a]/10 text-[#23375a]">
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
      {children ? <div className="mt-5">{children}</div> : null}
    </article>
  )
}

export default FeatureCard
