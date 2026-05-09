import { Link } from 'react-router-dom'
import HeroDashboard from '../components/HeroDashboard'

function HomePage() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
      <div className="rounded-[40px] border border-white/80 bg-white/80 p-8 shadow-[0_30px_90px_-50px_rgba(15,23,42,0.35)] backdrop-blur sm:p-10">
        <div className="text-[#23375a] bg-[#23375a]/10 inline-flex rounded-full border border-[#23375a]/15 p-4 text-sm font-medium">
          Tailwind is active and powering this interface.
        </div>
        <p className="mt-6 inline-flex rounded-full border border-[#23375a]/15 bg-[#23375a]/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#23375a]">
          Build money confidence, one smart move at a time
        </p>
        <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          Ditch Financial Confusion. Take Control of Your Money.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
          MoneyFlex Tribe helps you learn the money basics, plan with intention,
          and grow with tools that make progress easy to see. Each tab now opens
          as its own page so visitors can focus on one part of the journey at a
          time.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/tools"
            className="inline-flex items-center justify-center rounded-full bg-[#23375a] px-7 py-4 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#1b2b47]"
          >
            Explore Tools
          </Link>
          <Link
            to="/community"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 text-base font-semibold text-slate-900 transition duration-300 hover:-translate-y-0.5 hover:border-[#23375a]/30 hover:text-[#23375a]"
          >
            Join the Community
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ['12k+', 'Members building healthier money habits'],
            ['92%', 'Say the tools make decisions easier'],
            ['6', 'Focused pages for the full experience'],
          ].map(([value, label]) => (
            <div
              key={value}
              className="rounded-[26px] border border-slate-200/80 bg-slate-50/80 p-5 transition duration-300 hover:border-[#23375a]/20 hover:bg-white"
            >
              <p className="text-3xl font-semibold tracking-tight text-slate-950">
                {value}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <HeroDashboard />
    </section>
  )
}

export default HomePage
