const profileStyles = {
  'Low Risk Taker': {
    badge: 'bg-emerald-100 text-emerald-700',
    border: 'border-emerald-200',
    surface: 'bg-emerald-50',
  },
  'Mid Risk Taker': {
    badge: 'bg-amber-100 text-amber-700',
    border: 'border-amber-200',
    surface: 'bg-amber-50',
  },
  'High Risk Taker': {
    badge: 'bg-red-100 text-red-700',
    border: 'border-red-200',
    surface: 'bg-red-50',
  },
}

function ProfileRecommendationCard({ profile }) {
  const styles = profile ? profileStyles[profile.level] : null

  if (!profile) {
    return (
      <div className="rounded-[30px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center [animation:fade-in-up_0.45s_ease-out]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#23375a]/10 text-[#23375a]">
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-[1.8]">
            <path d="M4 12h16M12 4v16" />
          </svg>
        </div>
        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">
          Your investor type will appear here
        </h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Finish the risk management evaluation to learn what kind of risk taker
          you are and what investment style fits you best.
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
          <p className="text-sm font-medium text-slate-500">Risk Personality</p>
          <p className="mt-1 text-lg font-semibold text-slate-950">{profile.personality}</p>
        </div>
        <span
          className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${styles.badge}`}
        >
          {profile.level}
        </span>
      </div>

      <h3 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950">
        {profile.level}
      </h3>
      <p className="mt-4 text-base leading-8 text-slate-700">{profile.summary}</p>

      <div className="mt-6 rounded-[24px] bg-white/80 p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
          Investment recommendation
        </p>
        <p className="mt-3 text-lg font-semibold text-slate-950">
          {profile.recommendationTitle}
        </p>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
          {profile.recommendations.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#23375a]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProfileRecommendationCard
