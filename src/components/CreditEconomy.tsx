const earnRows = [
  { difficulty: 'Easy', reward: '+1 credit', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  { difficulty: 'Medium', reward: '+2 – 3 credits', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  { difficulty: 'Hard', reward: '+5 credits', color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200' },
  { difficulty: 'Very Hard', reward: '+7 credits', color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
]

const spendRows = [
  { session: 'Chat', cost: '2 credits' },
  { session: 'Whiteboard', cost: '2 credits' },
  { session: 'Voice Call', cost: '4 – 5 credits' },
  { session: 'Video Call', cost: '6 credits' },
  { session: 'Screen Share + Video', cost: '7 credits' },
]

export default function CreditEconomy() {
  return (
    <section id="credits" className="py-24 px-6 bg-parchment">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 max-w-xl mx-auto">
          <p className="text-xs font-semibold text-sb-purple uppercase tracking-widest mb-4">Credit Economy</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-navy mb-4">
            Teach + Solve = Credits.<br />Credits = Learn.
          </h2>
          <p className="text-[15px] text-sb-muted leading-relaxed">
            The more you contribute, the more you can access. Credits keep the system fair and sustainable for everyone.
          </p>
        </div>

        {/* Visual cycle */}
        <div className="flex items-center justify-center gap-4 mb-16 flex-wrap">
          {[
            { label: 'Teach', icon: '📖', color: 'bg-sb-purple-light text-sb-purple border-sb-purple/20' },
            { label: 'Solve Problems', icon: '⚡', color: 'bg-amber-50 text-amber-700 border-amber-200' },
          ].map((item, i) => (
            <>
              <div
                key={item.label}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-2 ${item.color} font-semibold text-[15px]`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </div>
              {i === 0 && (
                <span key="or" className="text-sb-muted font-semibold text-sm">or</span>
              )}
            </>
          ))}

          <div className="flex items-center gap-2 text-sb-muted mx-2">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M6 14H22M16 8L22 14L16 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl border-2 bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold text-[15px]">
            <span className="text-xl">💎</span>
            Earn Credits
          </div>

          <div className="flex items-center gap-2 text-sb-muted mx-2">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M6 14H22M16 8L22 14L16 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl border-2 bg-navy-light text-navy border-navy/20 font-semibold text-[15px]">
            <span className="text-xl">🎓</span>
            Learn From Others
          </div>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Earn table */}
          <div className="bg-white rounded-2xl border border-sb-border overflow-hidden">
            <div className="px-6 py-5 border-b border-sb-border">
              <p className="text-[11px] font-semibold text-sb-muted uppercase tracking-widest mb-1">Solving Problems</p>
              <h3 className="text-base font-semibold text-navy">How you earn credits</h3>
            </div>
            <div className="divide-y divide-sb-border">
              {earnRows.map(row => (
                <div key={row.difficulty} className="px-6 py-4 flex items-center justify-between">
                  <span className="text-[14px] font-medium text-navy">{row.difficulty}</span>
                  <span className={`font-mono text-[13px] font-bold px-2.5 py-1 rounded-lg border ${row.bg} ${row.color}`}>
                    {row.reward}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-parchment">
              <p className="text-[12.5px] text-sb-muted">Teaching sessions also earn credits based on session type.</p>
            </div>
          </div>

          {/* Spend table */}
          <div className="bg-white rounded-2xl border border-sb-border overflow-hidden">
            <div className="px-6 py-5 border-b border-sb-border">
              <p className="text-[11px] font-semibold text-sb-muted uppercase tracking-widest mb-1">Learning Sessions</p>
              <h3 className="text-base font-semibold text-navy">What you can spend credits on</h3>
            </div>
            <div className="divide-y divide-sb-border">
              {spendRows.map(row => (
                <div key={row.session} className="px-6 py-4 flex items-center justify-between">
                  <span className="text-[14px] font-medium text-navy">{row.session}</span>
                  <span className="font-mono text-[13px] font-bold text-navy">{row.cost}</span>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-parchment">
              <p className="text-[12.5px] text-sb-muted">Prices are always shown clearly before you commit. No hidden costs.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
