function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  theme = 'light',
}) {
  const alignment =
    align === 'center'
      ? 'mx-auto max-w-2xl text-center'
      : 'max-w-2xl text-left'
  const isDark = theme === 'dark'
  const eyebrowClasses = isDark
    ? 'border-white/15 bg-white/8 text-white/80'
    : 'border-[#23375a]/15 bg-[#23375a]/8 text-[#23375a]'
  const titleClasses = isDark ? 'text-white' : 'text-slate-950'
  const descriptionClasses = isDark ? 'text-slate-300' : 'text-slate-600'

  return (
    <div className={alignment}>
      <span
        className={`inline-flex rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] ${eyebrowClasses}`}
      >
        {eyebrow}
      </span>
      <h2 className={`mt-5 text-3xl font-semibold tracking-tight sm:text-4xl ${titleClasses}`}>
        {title}
      </h2>
      <p className={`mt-4 text-base leading-7 sm:text-lg ${descriptionClasses}`}>
        {description}
      </p>
    </div>
  )
}

export default SectionHeader
