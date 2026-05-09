import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'
import { communityHighlights } from '../data/siteData.jsx'

function CommunityPage() {
  return (
    <section className="grid gap-6 rounded-[40px] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)] sm:p-10 lg:grid-cols-[0.95fr_1.05fr]">
      <div>
        <SectionHeader
          eyebrow="Community"
          title="You do not have to figure money out alone."
          description="MoneyFlex Tribe combines education with belonging so progress feels supported, sustainable, and less overwhelming."
        />

        <div className="mt-8 space-y-4">
          {communityHighlights.map((item) => (
            <div
              key={item}
              className="flex items-start gap-4 rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-4"
            >
              <div className="mt-1 h-3 w-3 rounded-full bg-[#23375a]" />
              <p className="text-sm leading-7 text-slate-600">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-[30px] bg-[linear-gradient(180deg,#23375a_0%,#1b2b47_100%)] p-6 text-white">
          <p className="text-sm uppercase tracking-[0.26em] text-white/80">
            Member Story
          </p>
          <p className="mt-5 text-2xl font-semibold leading-tight">
            “I finally understand where my money should go every month.”
          </p>
          <p className="mt-4 text-sm leading-7 text-white/85">
            Members use the tribe to replace guilt and confusion with repeatable
            habits, clear goals, and better conversations.
          </p>
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm uppercase tracking-[0.26em] text-slate-500">
            Weekly Rhythm
          </p>
          <div className="mt-5 space-y-4">
            {[
              'Monday: Money reset and budget review',
              'Wednesday: Skill-building mini lessons',
              'Friday: Wins, questions, and accountability',
            ].map((item) => (
              <div key={item} className="rounded-[22px] bg-white p-4 text-sm text-slate-600">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-slate-950 p-6 text-white sm:col-span-2">
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              ['4.9/5', 'Average member satisfaction'],
              ['32', 'Interactive learning sessions per quarter'],
              ['24h', 'Fast support inside the community'],
            ].map(([value, label]) => (
              <div key={value}>
                <p className="text-3xl font-semibold">{value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 sm:col-span-2">
          <p className="text-sm uppercase tracking-[0.26em] text-slate-500">
            Keep going
          </p>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Community is most powerful when paired with practical systems. That
            is where the MoneyFlex tools come in.
          </p>
          <Link
            to="/tools"
            className="mt-6 inline-flex rounded-full bg-[#23375a] px-6 py-3 font-semibold text-white transition hover:bg-[#1b2b47]"
          >
            View the Tools
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CommunityPage
