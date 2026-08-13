import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'

const SESSION_TYPES = [
  { id: 'chat', label: 'Chat', icon: '💬', desc: 'Text-based discussion', cost: 2 },
  { id: 'whiteboard', label: 'Whiteboard', icon: '✏️', desc: 'Collaborative drawing', cost: 2 },
  { id: 'voice', label: 'Voice Call', icon: '🎤', desc: 'Audio conversation', cost: 5 },
  { id: 'video', label: 'Video Call', icon: '📹', desc: 'Face-to-face learning', cost: 6 },
  { id: 'screen', label: 'Screen Share + Video', icon: '🖥️', desc: 'Full visual session', cost: 7 },
]

const TEACHER = {
  name: 'Rahul Mehta',
  title: 'The Pattern Hunter',
  photo: 'photo-1522202176988-66273c2fd55f',
  skill: 'React',
  level: 'Advanced',
  rating: 4.9,
  style: 'Concept Explainer',
}

export default function SessionPurchase() {
  const { user, spendCredits } = useAuth()
  const navigate = useNavigate()
  const [selected, setSelected] = useState('video')
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)

  const sessionType = SESSION_TYPES.find(s => s.id === selected)!
  const afterBalance = (user?.credits ?? 0) - sessionType.cost
  const canAfford = afterBalance >= 0

  const handleStart = async () => {
    if (!canAfford) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    spendCredits(sessionType.cost)
    navigate('/app/room')
  }

  return (
    <div className="max-w-lg mx-auto px-6 py-10">
      <h1 className="font-display text-[1.9rem] text-navy mb-2">Choose Your Session</h1>
      <p className="text-[14.5px] text-sb-muted mb-8">Pick how you want to learn with {TEACHER.name}.</p>

      {/* Teacher card */}
      <div className="bg-white rounded-2xl border border-sb-border p-5 flex items-center gap-4 mb-6">
        <img
          src={`https://images.unsplash.com/${TEACHER.photo}?w=56&h=56&fit=crop&auto=format`}
          alt={TEACHER.name}
          className="w-13 h-13 rounded-xl object-cover bg-parchment"
        />
        <div className="flex-1">
          <p className="text-[14.5px] font-semibold text-navy">{TEACHER.name}</p>
          <p className="text-[11.5px] text-amber-600 font-semibold">{TEACHER.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[12px] text-sb-muted">{TEACHER.skill} · {TEACHER.level}</span>
            <span className="text-amber-500 text-[12px]">★ {TEACHER.rating}</span>
          </div>
        </div>
        <span className="text-[11.5px] text-sb-muted">{TEACHER.style}</span>
      </div>

      {/* Session types */}
      <div className="space-y-2.5 mb-8">
        {SESSION_TYPES.map(s => (
          <button
            key={s.id}
            onClick={() => setSelected(s.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition-all text-left ${
              selected === s.id
                ? 'border-navy bg-navy-light'
                : 'border-sb-border bg-white hover:border-navy/40'
            }`}
          >
            <span className="text-xl">{s.icon}</span>
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-navy">{s.label}</p>
              <p className="text-[12.5px] text-sb-muted">{s.desc}</p>
            </div>
            <span className="font-mono text-[14px] font-bold text-navy">{s.cost} cr</span>
            {selected === s.id && (
              <div className="w-5 h-5 rounded-full bg-navy flex items-center justify-center shrink-0">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Balance summary */}
      <div className="bg-parchment rounded-2xl border border-sb-border p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13.5px] text-sb-muted">Your balance</span>
          <span className="font-mono text-[14px] font-bold text-navy">{user?.credits ?? 0} cr</span>
        </div>
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-sb-border">
          <span className="text-[13.5px] text-sb-muted">Session cost</span>
          <span className="font-mono text-[14px] font-bold text-orange-600">−{sessionType.cost} cr</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[13.5px] font-semibold text-navy">After session</span>
          <span className={`font-mono text-[15px] font-bold ${canAfford ? 'text-navy' : 'text-red-600'}`}>{afterBalance} cr</span>
        </div>
        {!canAfford && (
          <p className="text-[12px] text-red-600 mt-2">Not enough credits. Earn more by teaching or solving problems.</p>
        )}
      </div>

      <button
        onClick={handleStart}
        disabled={!canAfford || loading}
        className="w-full py-4 bg-navy text-cream font-semibold rounded-xl hover:bg-navy-800 transition-colors text-[15px] disabled:opacity-40 flex items-center justify-center gap-2"
      >
        {loading ? (
          <><svg className="animate-spin w-4 h-4" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="18" strokeDashoffset="6"/></svg> Starting…</>
        ) : `Start ${sessionType.label} — ${sessionType.cost} Credits`}
      </button>
    </div>
  )
}
