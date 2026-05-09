import { Link } from 'react-router-dom'
import ToolCard from '../components/ToolCard'
import { tools } from '../data/siteData.jsx'

function ToolsPage() {
  return (
    <div className="space-y-8">
      <div className="grid gap-5 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.title} {...tool} />
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-4">
        {[
          ['Net worth tracker', 'Watch your overall financial position improve over time.', '/tools'],
          ['Budget planner', 'Give every naira or dollar a clear job before it disappears.', '/tools'],
          ['Investment tracker', 'Stay disciplined by reviewing growth with context.', '/tools'],
          ['Risk evaluator', 'Assess your exposure with a gated calculator and instant feedback.', '/tools/risk-evaluator'],
        ].map(([title, text, to]) => (
          <Link
            key={title}
            to={to}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-1 hover:border-[#23375a]/25 hover:shadow-[0_24px_90px_-40px_rgba(35,55,90,0.28)]"
          >
            <p className="text-lg font-semibold text-slate-950">{title}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            <span className="mt-5 inline-flex text-sm font-semibold text-[#23375a]">
              {to === '/tools/risk-evaluator' ? 'Open submenu' : 'Included in overview'}
            </span>
          </Link>
        ))}
      </div>

      <div className="rounded-[32px] bg-[linear-gradient(135deg,#23375a_0%,#1b2b47_55%,#0f172a_100%)] p-8 text-white shadow-[0_32px_90px_-38px_rgba(35,55,90,0.55)]">
        <h2 className="text-3xl font-semibold tracking-tight">
          Ready to start using the system?
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-white/85">
          Move from reading about money to managing it with more confidence and
          less guesswork.
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/tools/risk-evaluator"
            className="inline-flex rounded-full bg-white px-6 py-3 font-semibold text-[#23375a] transition hover:bg-slate-100"
          >
            Open Risk Evaluator
          </Link>
          <Link
            to="/start"
            className="inline-flex rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
          >
            Go to Start Page
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ToolsPage
