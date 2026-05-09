function MiniChartBar({ height, active = false }) {
  return (
    <div
      className={`w-9 rounded-full ${active ? 'bg-[#23375a]' : 'bg-[#23375a]/20'}`}
      style={{ height }}
    />
  )
}

function HeroDashboard() {
  return (
    <div className="relative overflow-hidden rounded-[40px] bg-slate-950 p-6 text-white shadow-[0_30px_90px_-44px_rgba(15,23,42,0.55)] sm:p-8">
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.32),_transparent_65%)]" />
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
              Smart Money Dashboard
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Your financial reset starts here
            </h2>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
            Live habits
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[28px] bg-white/8 p-5 backdrop-blur">
            <p className="text-sm text-slate-300">Monthly cash flow</p>
            <p className="mt-3 text-4xl font-semibold">+$2,480</p>
            <p className="mt-2 text-sm text-emerald-300">
              +14% improvement from last month
            </p>
          </div>
          <div className="rounded-[28px] bg-white/8 p-5 backdrop-blur">
            <p className="text-sm text-slate-300">Savings goal progress</p>
            <p className="mt-3 text-4xl font-semibold">76%</p>
            <div className="mt-4 h-3 rounded-full bg-white/10">
              <div className="h-3 w-3/4 rounded-full bg-[#23375a]" />
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[28px] bg-white p-6 text-slate-950">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Wealth momentum</p>
              <p className="mt-2 text-3xl font-semibold">$84,200</p>
            </div>
            <div className="rounded-full bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-700">
              +8.4%
            </div>
          </div>

          <div className="mt-8 flex items-end gap-3">
            <MiniChartBar height={74} />
            <MiniChartBar height={98} />
            <MiniChartBar height={122} active />
            <MiniChartBar height={88} />
            <MiniChartBar height={144} active />
            <MiniChartBar height={118} />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Budget health</p>
              <p className="mt-2 text-xl font-semibold">On track</p>
            </div>
            <div className="rounded-[24px] bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Investment habit</p>
              <p className="mt-2 text-xl font-semibold">Auto-funded</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroDashboard
