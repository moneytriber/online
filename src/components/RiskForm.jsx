const investmentOptions = ['None', 'Beginner', 'Intermediate', 'Advanced']
const riskAppetiteOptions = ['Low', 'Medium', 'High']
const incomeStabilityOptions = ['Unstable', 'Somewhat stable', 'Stable']

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  )
}

function RiskForm({ formData, onChange, onSubmit, submitLabel = 'Evaluate Risk' }) {
  const inputClasses =
    'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-[#23375a] focus:bg-white focus:ring-4 focus:ring-[#23375a]/10'

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Monthly Income">
          <input
            type="number"
            min="0"
            required
            value={formData.monthlyIncome}
            onChange={(event) => onChange('monthlyIncome', event.target.value)}
            className={inputClasses}
            placeholder="5000"
          />
        </Field>

        <Field label="Monthly Expenses">
          <input
            type="number"
            min="0"
            required
            value={formData.monthlyExpenses}
            onChange={(event) => onChange('monthlyExpenses', event.target.value)}
            className={inputClasses}
            placeholder="3000"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Savings">
          <input
            type="number"
            min="0"
            required
            value={formData.savings}
            onChange={(event) => onChange('savings', event.target.value)}
            className={inputClasses}
            placeholder="12000"
          />
        </Field>

        <Field label="Investment Experience">
          <select
            value={formData.investmentExperience}
            onChange={(event) =>
              onChange('investmentExperience', event.target.value)
            }
            className={inputClasses}
          >
            {investmentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Risk Appetite">
          <select
            value={formData.riskAppetite}
            onChange={(event) => onChange('riskAppetite', event.target.value)}
            className={inputClasses}
          >
            {riskAppetiteOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Income Stability">
          <select
            value={formData.incomeStability}
            onChange={(event) => onChange('incomeStability', event.target.value)}
            className={inputClasses}
          >
            {incomeStabilityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-[#23375a] px-7 py-3.5 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#1b2b47]"
      >
        {submitLabel}
      </button>
    </form>
  )
}

export default RiskForm
