import { Link } from 'react-router-dom'

function StartPage() {
  return (
    <section className="overflow-hidden rounded-[40px] bg-[linear-gradient(135deg,#23375a_0%,#1b2b47_55%,#0f172a_100%)] px-8 py-10 text-white shadow-[0_32px_90px_-38px_rgba(35,55,90,0.55)] sm:px-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/80">
            Start Today
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Build a calmer, smarter relationship with money through education,
            tools, and community.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/85">
            Whether you are fixing your budget, growing your savings, or getting
            serious about investing, MoneyFlex Tribe gives you a clear next
            step.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ['Join', 'Create your MoneyFlex profile and pick a focus area.'],
              ['Learn', 'Complete a quick money foundations path.'],
              ['Track', 'Start using the tools weekly.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[24px] border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="text-lg font-semibold">{title}</p>
                <p className="mt-2 text-sm leading-7 text-white/85">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-base font-semibold text-[#23375a] transition duration-300 hover:-translate-y-0.5 hover:bg-slate-100"
          >
            Get Started Free
          </a>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-4 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
          >
            Back Home
          </Link>
        </div>
      </div>
    </section>
  )
}

export default StartPage
