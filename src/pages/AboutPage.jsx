import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageIntro from '../components/PageIntro'
import coachPhoto from '../assets/coach-photo.jpg'

function AboutPage() {
  return (
    <div>
      <section className="mf-grid-pattern border-b border-[var(--mf-border)] bg-white"><div className="mf-container py-16 sm:py-20"><PageIntro eyebrow="About MoneyFlex Tribe" title="Clarity first. Confidence next. Wealth with intention." description="MoneyFlex Tribe exists to make financial knowledge practical, human, and useful for the decisions people face every month." /></div></section>
      <section className="mf-section"><div className="mf-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><div className="overflow-hidden rounded-[32px] bg-[var(--mf-surface-soft)]"><img src={coachPhoto} alt="Oluwabusolami Adewale-Kayode, founder of MoneyFlex Tribe" className="aspect-[4/5] w-full object-cover object-top" /></div><div><p className="mf-kicker">Meet the founder</p><h2 className="mf-heading mt-4">Oluwabusolami Adewale-Kayode</h2><p className="mf-copy mt-5">A Certified Financial Education Instructor, Financial Advisor, businesswoman, and founder of TheMoneyFlexTribe. Her work focuses on translating complex financial ideas into practical knowledge people can confidently use.</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{['5+ years of industry experience', 'Former Head of Abuja Retail Team at ARM Investment Managers', 'Practical, beginner-friendly teaching', 'Education grounded in real financial decisions'].map((item) => <div key={item} className="flex gap-3 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-600"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--mf-primary)]" />{item}</div>)}</div><Link to="/tools" className="mf-action mt-8">Use the MoneyFlex tools <ArrowRight className="h-4 w-4" /></Link></div></div></section>
      <section className="bg-[var(--mf-deep)] text-white"><div className="mf-container grid gap-8 py-16 md:grid-cols-3">{[['Our belief','Financial confidence grows when people understand the reason behind each decision.'],['Our method','Learn clearly, plan realistically, act carefully, and review consistently.'],['Our responsibility','Education should inform choices without pretending that one answer suits every person.']].map(([title,text]) => <div key={title} className="border-l border-white/15 pl-6"><h2 className="text-xl font-bold">{title}</h2><p className="mt-3 text-sm leading-7 text-white/65">{text}</p></div>)}</div></section>
    </div>
  )
}

export default AboutPage
