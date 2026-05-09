import { Link } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard'
import SectionHeader from '../components/SectionHeader'
import { solutions } from '../data/siteData.jsx'

function SolutionPage() {
  return (
    <section className="space-y-8">
      <div className="rounded-[40px] bg-slate-950 px-8 py-10 text-white shadow-[0_30px_90px_-40px_rgba(15,23,42,0.55)] sm:px-10">
        <SectionHeader
          eyebrow="The Solution"
          title="A simple path to better money decisions."
          description="We make financial growth feel less intimidating by guiding people through three clear stages: learn the rules, plan with purpose, and grow consistently."
          theme="dark"
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {solutions.map((item, index) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
              accent={index === 1}
            >
              <div className="inline-flex rounded-full border border-white/10 bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
                MoneyFlex framework
              </div>
            </FeatureCard>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row">
        {[
          ['01', 'Learn the basics without jargon'],
          ['02', 'Create a plan that fits real life'],
          ['03', 'Use tools to stay consistent'],
        ].map(([step, label]) => (
          <div
            key={step}
            className="flex-1 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#23375a]">
              Step {step}
            </p>
            <p className="mt-4 text-xl font-semibold text-slate-950">{label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)]">
        <p className="max-w-3xl text-lg leading-8 text-slate-600">
          The model stays simple on purpose. People do not need more complexity.
          They need a system that helps them act with confidence every week.
        </p>
        <Link
          to="/tools"
          className="mt-6 inline-flex rounded-full bg-[#23375a] px-6 py-3 font-semibold text-white transition hover:bg-[#1b2b47]"
        >
          Explore the Tools
        </Link>
      </div>
    </section>
  )
}

export default SolutionPage
