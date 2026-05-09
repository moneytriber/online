function EmailGate({ email, onEmailChange, onSubmit, isValid }) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[36px] bg-slate-950/55 p-4 backdrop-blur-sm [animation:fade-in_0.35s_ease-out]">
      <div className="w-full max-w-lg rounded-[32px] border border-white/15 bg-white p-8 shadow-[0_30px_90px_-40px_rgba(15,23,42,0.45)]">
        <div className="inline-flex rounded-full border border-[#23375a]/15 bg-[#23375a]/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#23375a]">
          Email Access
        </div>
        <h3 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950">
          Unlock the Risk Experience
        </h3>
        <p className="mt-4 text-base leading-8 text-slate-600">
          Enter your email to access the risk management evaluation first, then
          continue into the financial risk evaluator with more personalized
          guidance.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Email address
            </span>
            <input
              type="email"
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-[#23375a] focus:bg-white focus:ring-4 focus:ring-[#23375a]/10"
            />
          </label>

          <button
            type="submit"
            disabled={!email}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#23375a] px-6 py-3.5 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#1b2b47] disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Continue to Evaluation
          </button>

          {!isValid && email ? (
            <p className="text-sm text-red-600">
              Enter a valid email address to continue.
            </p>
          ) : null}
        </form>
      </div>
    </div>
  )
}

export default EmailGate
