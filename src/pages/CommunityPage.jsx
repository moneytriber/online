import { ArrowRight, HeartHandshake, MessageCircle, Target, Users } from 'lucide-react'
import { createElement } from 'react'
import { Link } from 'react-router-dom'
import PageIntro from '../components/PageIntro'

const pillars = [
  { icon: MessageCircle, title: 'Ask without shame', text: 'A healthy money community makes room for honest questions and clear explanations.' },
  { icon: Target, title: 'Turn learning into action', text: 'Challenges and check-ins connect financial knowledge to the decisions you make each week.' },
  { icon: Users, title: 'Grow with accountability', text: 'Progress becomes easier to sustain when goals are visible and support is consistent.' },
]

function CommunityPage() {
  return (
    <div>
      <section className="mf-grid-pattern border-b border-[var(--mf-border)] bg-white">
        <div className="mf-container py-16 sm:py-20">
          <PageIntro eyebrow="The MoneyFlex community" title="Better money conversations change what feels possible." description="MoneyFlex Tribe is building a supportive learning community where financial questions become practical next steps, without pressure, jargon, or judgement." />
        </div>
      </section>

      <section className="mf-section">
        <div className="mf-container grid gap-5 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }) => (
            <article key={title} className="mf-panel p-7">
              {createElement(Icon, { className: 'h-6 w-6 text-[var(--mf-primary)]' })}
              <h2 className="mt-9 text-xl font-bold text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--mf-border)] bg-white">
        <div className="mf-container grid gap-10 py-16 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="mf-kicker">A practical rhythm</p>
            <h2 className="mf-heading mt-4">Learn. Apply. Review. Repeat.</h2>
            <p className="mf-copy mt-5">The community experience is designed around useful routines rather than endless information.</p>
          </div>
          <div className="space-y-3">
            {[
              ['01', 'Money reset', 'Review the previous period without guilt and identify one priority.'],
              ['02', 'Focused lesson', 'Understand one financial concept in plain language.'],
              ['03', 'Action check-in', 'Apply the lesson, record the result, and ask better questions.'],
            ].map(([number, title, text]) => (
              <div key={number} className="flex gap-4 rounded-[22px] bg-[var(--mf-surface-soft)] p-5">
                <span className="text-xs font-black text-[var(--mf-primary)]">{number}</span>
                <div><h3 className="font-bold text-slate-950">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mf-section">
        <div className="mf-container overflow-hidden rounded-[32px] bg-[var(--mf-primary)] text-white">
          <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div><HeartHandshake className="h-7 w-7 text-white/65" /><h2 className="mf-font-display mt-6 text-4xl font-semibold">Start by understanding your own money story.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">Use the tools now, then bring clearer questions and goals into every financial conversation.</p></div>
            <Link to="/tools/investor-profile" className="mf-action bg-white text-[var(--mf-primary)]">Find my profile <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CommunityPage
