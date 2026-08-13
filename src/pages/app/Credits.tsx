import { Link } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'

const TRANSACTIONS = [
  { type: 'earn', label: 'Hard problem solved', amount: 5, date: 'Today, 2:14pm' },
  { type: 'earn', label: 'Teaching session — Maya', amount: 7, date: 'Today, 10:30am' },
  { type: 'spend', label: 'Video session — Rahul', amount: -6, date: 'Yesterday, 4pm' },
  { type: 'earn', label: 'Medium problem solved', amount: 3, date: 'Yesterday, 1pm' },
  { type: 'spend', label: 'Chat session — Priya', amount: -2, date: '2 days ago' },
  { type: 'earn', label: 'Teaching session — Carlos', amount: 5, date: '2 days ago' },
  { type: 'earn', label: 'Medium problem solved', amount: 2, date: '3 days ago' },
  { type: 'spend', label: 'Whiteboard — Omar', amount: -2, date: '3 days ago' },
]

const EARN_METHODS = [
  { label: 'Teach a session', icon: '📖', desc: 'Earn 4–7 credits per session' },
  { label: 'Solve a problem', icon: '⚡', desc: 'Earn 1–7 credits based on difficulty' },
  { label: 'Help in community', icon: '🤝', desc: 'Answer questions to earn 1 credit' },
]

const SPEND_METHODS = [
  { label: 'Chat', cost: 2 },
  { label: 'Whiteboard', cost: 2 },
  { label: 'Voice Call', cost: '4–5' },
  { label: 'Video Call', cost: 6 },
  { label: 'Screen Share + Video', cost: 7 },
]

export default function Credits() {
  const { user } = useAuth()

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-[1.9rem] text-navy mb-2">Credit Wallet</h1>
        <p className="text-[14.5px] text-sb-muted">Teach, solve, and earn. Spend to learn.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Main */}
        <div className="space-y-5">

          {/* Balance hero */}
          <div className="bg-navy rounded-2xl p-7 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
            <div className="relative">
              <p className="text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-3">Available Balance</p>
              <p className="font-mono text-[3.5rem] font-bold text-white leading-none mb-1">{user?.credits ?? 0}</p>
              <p className="text-[13.5px] text-white/50">credits</p>
              <div className="flex gap-3 mt-6">
                <Link to="/app/teach" className="px-5 py-2.5 bg-emerald-500 text-white font-semibold rounded-xl text-[13.5px] hover:bg-emerald-600 transition-colors">
                  + Earn Credits
                </Link>
                <Link to="/app/learn" className="px-5 py-2.5 bg-white/15 text-white font-semibold rounded-xl text-[13.5px] hover:bg-white/20 transition-colors">
                  Learn With Credits
                </Link>
              </div>
            </div>
          </div>

          {/* Transaction history */}
          <div className="bg-white rounded-2xl border border-sb-border p-6">
            <h2 className="text-[15px] font-semibold text-navy mb-5">Transaction History</h2>
            <div className="space-y-0">
              {TRANSACTIONS.map((t, i) => (
                <div key={i} className={`flex items-center gap-4 py-3.5 ${i < TRANSACTIONS.length - 1 ? 'border-b border-sb-border' : ''}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    t.type === 'earn' ? 'bg-emerald-100' : 'bg-orange-100'
                  }`}>
                    {t.type === 'earn' ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 12V4M5 7l3-3 3 3" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 4v8M5 9l3 3 3-3" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-[13.5px] font-medium text-navy">{t.label}</p>
                    <p className="text-[11.5px] text-sb-muted mt-0.5">{t.date}</p>
                  </div>
                  <span className={`font-mono text-[14px] font-bold ${t.amount > 0 ? 'text-emerald-600' : 'text-orange-600'}`}>
                    {t.amount > 0 ? '+' : ''}{t.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">

          {/* How to earn */}
          <div className="bg-white rounded-2xl border border-sb-border p-5">
            <p className="text-[11px] font-semibold text-sb-muted uppercase tracking-widest mb-4">How to Earn</p>
            <div className="space-y-3">
              {EARN_METHODS.map(m => (
                <div key={m.label} className="flex items-start gap-3 p-3 bg-parchment rounded-xl">
                  <span className="text-xl">{m.icon}</span>
                  <div>
                    <p className="text-[13px] font-semibold text-navy">{m.label}</p>
                    <p className="text-[11.5px] text-sb-muted mt-0.5">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to spend */}
          <div className="bg-white rounded-2xl border border-sb-border p-5">
            <p className="text-[11px] font-semibold text-sb-muted uppercase tracking-widest mb-4">Session Costs</p>
            <div className="space-y-2">
              {SPEND_METHODS.map(m => (
                <div key={m.label} className="flex items-center justify-between py-2 border-b border-sb-border last:border-0">
                  <span className="text-[13px] text-navy">{m.label}</span>
                  <span className="font-mono text-[13px] font-bold text-navy">{m.cost} cr</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-sb-muted mt-3">Always shown before you commit. No hidden costs.</p>
          </div>

          <Link to="/app/solve" className="block w-full py-3.5 bg-navy text-cream text-center font-semibold rounded-xl hover:bg-navy-800 transition-colors text-[14px]">
            Earn Credits Now →
          </Link>
        </div>
      </div>
    </div>
  )
}
