const horizonOptions = ['Less than 2 years', '2 to 5 years', 'More than 5 years']
const marketDropOptions = ['Sell immediately', 'Wait and review calmly', 'Hold or invest more']
const goalOptions = [
  'Protect my capital',
  'Balance growth and safety',
  'Maximize long-term growth',
]
const cashNeedOptions = [
  'Need access within 1 year',
  'May need some access in 1 to 3 years',
  'No near-term need',
]

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  )
}

function RiskProfileForm({ formData, onChange, onSubmit }) {
  const inputClasses =
    'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-[#23375a] focus:bg-white focus:ring-4 focus:ring-[#23375a]/10'

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Field label="Investment Time Horizon">
        <select
          value={formData.horizon}
          onChange={(event) => onChange('horizon', event.target.value)}
          className={inputClasses}
        >
          {horizonOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field label="If your investment drops 20%, what would you do?">
        <select
          value={formData.marketReaction}
          onChange={(event) => onChange('marketReaction', event.target.value)}
          className={inputClasses}
        >
          {marketDropOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field label="What is your main investment goal?">
        <select
          value={formData.goal}
          onChange={(event) => onChange('goal', event.target.value)}
          className={inputClasses}
        >
          {goalOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field label="When might you need this money?">
        <select
          value={formData.cashNeed}
          onChange={(event) => onChange('cashNeed', event.target.value)}
          className={inputClasses}
        >
          {cashNeedOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-[#23375a] px-7 py-3.5 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#1b2b47]"
      >
        Identify My Risk Type
      </button>
    </form>
  )
}

export default RiskProfileForm
