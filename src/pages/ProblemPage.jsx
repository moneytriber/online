import { Link } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard'
import SectionHeader from '../components/SectionHeader'
import { problemPoints } from '../data/siteData.jsx'

function ProblemPage() {
  return (
    <section className="space-y-8">
      <div className="rounded-[40px] border border-slate-200/80 bg-white/75 p-8 shadow-[0_26px_80px_-50px_rgba(15,23,42,0.35)] backdrop-blur sm:p-10">
        <SectionHeader
          eyebrow="The Problem"
          title="Money stress grows when clarity is missing."
          description="Financial confusion is rarely about effort. It is usually about a lack of simple systems, trusted guidance, and practical next steps."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {problemPoints.map((item) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={<span className="text-sm font-semibold">{item.icon}</span>}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[32px] bg-slate-950 p-8 text-white">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
            Why this matters
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            Confusion compounds just like money does.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
            When people do not know what to do next, they delay decisions, avoid
            looking at the numbers, and miss growth opportunities that could
            have been built one small habit at a time.
          </p>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)]">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
            Next step
          </p>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Once the pain is clear, the fix becomes simpler: learn the rules,
            plan with purpose, and grow with the right tools.
          </p>
          <Link
            to="/solution"
            className="mt-6 inline-flex rounded-full bg-[#23375a] px-6 py-3 font-semibold text-white transition hover:bg-[#1b2b47]"
          >
            See the Solution
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProblemPage
