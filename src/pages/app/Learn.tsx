import { useState } from 'react'
import { Link } from 'react-router'

const CATEGORIES = ['All', 'Programming', 'Design', 'Data', 'Communication', 'Business', 'Creative']

const TEACHERS = [
  { id: 1, name: 'Rahul Mehta', photo: 'photo-1522202176988-66273c2fd55f', skill: 'React', level: 'Advanced', rating: 4.9, students: 43, style: 'Concept Explainer', compatibility: 94, pct: 91,
    sessions: { chat: 2, whiteboard: 2, voice: 4, video: 6, screen: 7 } },
  { id: 2, name: 'Priya Sharma', photo: 'photo-1573497620053-ea5300f94f21', skill: 'Data Science', level: 'Expert', rating: 4.8, students: 31, style: 'Step-by-Step Guide', compatibility: 88, pct: 95,
    sessions: { chat: 2, whiteboard: 3, voice: 5, video: 6, screen: 7 } },
  { id: 3, name: 'Omar Hassan', photo: 'photo-1580894732930-0babd100d356', skill: 'Python', level: 'Advanced', rating: 4.9, students: 27, style: 'Problem Solver', compatibility: 92, pct: 87,
    sessions: { chat: 2, whiteboard: 2, voice: 4, video: 6, screen: 7 } },
  { id: 4, name: 'Maya K.', photo: 'photo-1531545514256-b1400bc00f31', skill: 'UI/UX', level: 'Advanced', rating: 4.7, students: 18, style: 'Pattern Hunter', compatibility: 82, pct: 89,
    sessions: { chat: 2, whiteboard: 2, voice: 5, video: 6, screen: 7 } },
  { id: 5, name: 'Carlos Rivera', photo: 'photo-1565350831386-8c52421af9fa', skill: 'JavaScript', level: 'Intermediate', rating: 4.6, students: 22, style: 'Live Coder', compatibility: 78, pct: 74,
    sessions: { chat: 2, whiteboard: 2, voice: 4, video: 5, screen: 6 } },
  { id: 6, name: 'Aisha Patel', photo: 'photo-1543269865-cbf427effbad', skill: 'Figma', level: 'Expert', rating: 4.9, students: 52, style: 'Visual Thinker', compatibility: 85, pct: 96,
    sessions: { chat: 2, whiteboard: 2, voice: 4, video: 6, screen: 7 } },
]

export default function Learn() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = TEACHERS.filter(t =>
    (category === 'All' || t.skill.toLowerCase().includes(category.toLowerCase()) ||
      (category === 'Programming' && ['React','Python','JavaScript'].includes(t.skill)) ||
      (category === 'Design' && ['UI/UX','Figma'].includes(t.skill)) ||
      (category === 'Data' && ['Data Science'].includes(t.skill))
    ) &&
    (search === '' || t.name.toLowerCase().includes(search.toLowerCase()) || t.skill.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-[1.9rem] text-navy mb-2">What do you want to learn?</h1>
        <p className="text-[14.5px] text-sb-muted">Find someone who knows exactly what you need.</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-sb-muted" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
          <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search skills, teachers..."
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-sb-border rounded-xl text-[14.5px] text-navy placeholder:text-sb-muted outline-none focus:ring-2 focus:ring-sb-purple/25 focus:border-sb-purple/40 transition"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-all ${
              category === c ? 'bg-navy text-cream' : 'bg-white text-sb-muted border border-sb-border hover:border-navy/40 hover:text-navy'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(t => (
          <div key={t.id} className="bg-white rounded-2xl border border-sb-border overflow-hidden hover:shadow-[0_4px_24px_rgba(11,25,48,0.08)] transition-shadow flex flex-col">
            {/* Card header */}
            <div className="px-5 pt-5 pb-4 border-b border-sb-border">
              <div className="flex items-start gap-3 mb-4">
                <img
                  src={`https://images.unsplash.com/${t.photo}?w=48&h=48&fit=crop&auto=format`}
                  alt={t.name}
                  className="w-11 h-11 rounded-xl object-cover bg-parchment"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-navy">{t.name}</p>
                  <p className="text-[11.5px] text-sb-muted">{t.style}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-amber-500 text-[13px]">★</span>
                  <span className="text-[12.5px] font-semibold text-navy">{t.rating}</span>
                </div>
              </div>

              {/* Skill bar */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[13.5px] font-semibold text-navy">{t.skill}</span>
                  <span className="text-[11px] text-sb-muted bg-parchment px-2 py-0.5 rounded-full">{t.level}</span>
                </div>
                <span className="font-mono text-[12px] font-bold text-navy">{t.pct}%</span>
              </div>
              <div className="h-1.5 bg-parchment rounded-full">
                <div className="h-full bg-sb-purple rounded-full" style={{ width: `${t.pct}%` }} />
              </div>
            </div>

            {/* Session types */}
            <div className="px-5 py-4 flex-1">
              <p className="text-[10.5px] font-semibold text-sb-muted uppercase tracking-widest mb-2.5">Session types</p>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: 'Chat', cost: t.sessions.chat },
                  { label: 'Whiteboard', cost: t.sessions.whiteboard },
                  { label: 'Voice', cost: t.sessions.voice },
                  { label: 'Video', cost: t.sessions.video },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between bg-parchment rounded-lg px-2.5 py-2">
                    <span className="text-[12px] text-navy">{s.label}</span>
                    <span className="font-mono text-[11.5px] font-bold text-navy">{s.cost} cr</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 pb-5 flex items-center gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="h-1 flex-1 bg-parchment rounded-full">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${t.compatibility}%` }} />
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700">{t.compatibility}%</span>
                </div>
                <p className="text-[10px] text-sb-muted mt-0.5">Match</p>
              </div>
              <Link
                to="/app/purchase"
                className="px-5 py-2.5 bg-navy text-cream text-[13px] font-semibold rounded-xl hover:bg-navy-800 transition-colors"
              >
                Learn →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
