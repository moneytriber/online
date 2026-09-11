import { ArrowRight, BookOpen, Landmark, ShieldCheck, TrendingUp, WalletCards } from 'lucide-react'
import { createElement } from 'react'
import { Link } from 'react-router-dom'
import PageIntro from '../components/PageIntro'

const topics = [
  { title: 'Money foundations', text: 'Cash flow, emergency reserves, debt, protection, and the habits that create financial room.', icon: WalletCards },
  { title: 'Investment foundations', text: 'Risk, return, liquidity, time horizon, diversification, and why every product solves a different problem.', icon: ShieldCheck },
  { title: 'Fixed income', text: 'Understand treasury instruments, bonds, money market funds, yields, duration, and maturity.', icon: Landmark },
  { title: 'Growth assets', text: 'Learn the role of equities, funds, real estate, businesses, and long-term compounding.', icon: TrendingUp },
]

function LearnPage() {
  return (
    <div>
      <section className="mf-grid-pattern border-b border-[var(--mf-border)] bg-white"><div className="mf-container py-16 sm:py-20"><PageIntro eyebrow="MoneyFlex learning" title="Financial education that respects your real life." description="Build understanding in the right order: protect your foundation, learn how investments work, and make decisions that match your goals and capacity." /></div></section>
      <section className="mf-section"><div className="mf-container grid gap-5 md:grid-cols-2">{topics.map(({ icon: Icon, title, text }, index) => <article key={title} className={`rounded-[28px] p-7 ${index === 1 ? 'bg-[var(--mf-primary)] text-white' : 'mf-panel'}`}>{createElement(Icon, { className: `h-6 w-6 ${index === 1 ? 'text-white/70' : 'text-[var(--mf-primary)]'}` })}<p className={`mt-9 text-xs font-black uppercase tracking-[0.18em] ${index === 1 ? 'text-white/50' : 'text-slate-400'}`}>Module 0{index + 1}</p><h2 className={`mt-3 text-2xl font-bold ${index === 1 ? 'text-white' : 'text-slate-950'}`}>{title}</h2><p className={`mt-3 leading-7 ${index === 1 ? 'text-white/70' : 'text-slate-600'}`}>{text}</p></article>)}</div></section>
      <section className="border-y border-[var(--mf-border)] bg-white"><div className="mf-container grid gap-10 py-16 lg:grid-cols-[1fr_0.8fr] lg:items-center"><div><p className="mf-kicker">Featured class</p><h2 className="mf-heading mt-4">Investing With Assurance 2.0</h2><p className="mf-copy mt-5">Learn how fixed income, low-risk options, real estate with small capital, dollar equity funds, and stock basics fit into a calmer wealth-building journey.</p><Link to="/webinars/invest-with-assurance-2-0" target="_blank" rel="noreferrer" className="mf-action mt-7">Explore the webinar <ArrowRight className="h-4 w-4" /></Link></div><div className="mf-panel-soft p-8"><BookOpen className="h-7 w-7 text-[var(--mf-primary)]" /><p className="mt-8 text-xl font-bold">A good investment decision starts before the product.</p><p className="mt-3 text-sm leading-7 text-slate-600">Know the goal, time horizon, liquidity need, possible loss, fees, provider, and exit conditions before committing money.</p></div></div></section>
    </div>
  )
}

export default LearnPage
