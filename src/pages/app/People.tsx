import { useState } from 'react'
import { Link } from 'react-router'

const PEOPLE = [
  { id: 1, name: 'Rahul Mehta', title: 'The Pattern Hunter', photo: 'photo-1522202176988-66273c2fd55f', skill: 'React', level: 'Advanced', pct: 91, rating: 4.9, students: 43, solved: 312, compatibility: 94, style: 'Concept Explainer', available: true, cost: 5 },
  { id: 2, name: 'Priya Sharma', title: 'The Deep Thinker', photo: 'photo-1573497620053-ea5300f94f21', skill: 'Data Science', level: 'Expert', pct: 95, rating: 4.8, students: 31, solved: 287, compatibility: 88, style: 'Step-by-Step', available: true, cost: 6 },
  { id: 3, name: 'Omar Hassan', title: 'The Logic Weaver', photo: 'photo-1580894732930-0babd100d356', skill: 'Python', level: 'Advanced', pct: 87, rating: 4.9, students: 27, solved: 243, compatibility: 92, style: 'Problem Solver', available: false, cost: 4 },
  { id: 4, name: 'Carlos Rivera', title: 'The Code Shogun', photo: 'photo-1523240795612-9a054b0db644', skill: 'JavaScript', level: 'Intermediate', pct: 74, rating: 4.6, students: 22, solved: 156, compatibility: 78, style: 'Live Coder', available: true, cost: 3 },
  { id: 5, name: 'Aisha Patel', title: 'The Creative Architect', photo: 'photo-1543269865-cbf427effbad', skill: 'Figma', level: 'Expert', pct: 96, rating: 4.9, students: 52, solved: 89, compatibility: 85, style: 'Visual Thinker', available: true, cost: 5 },
  { id: 6, name: 'Maya K.', title: 'The Concept Smith', photo: 'photo-1531545514256-b1400bc00f31', skill: 'UI/UX', level: 'Advanced', pct: 89, rating: 4.7, students: 18, solved: 134, compatibility: 82, style: 'Pattern Hunter', available: false, cost: 4 },
]

const SKILLS_FILTER = ['All Skills', 'Python', 'React', 'JavaScript', 'Data Science', 'Figma', 'UI/UX']

export default function People() {
  const [skillFilter, setSkillFilter] = useState('All Skills')
  const [sortBy, setSortBy] = useState<'compatibility' | 'rating' | 'students'>('compatibility')
  const [selectedPerson, setSelectedPerson] = useState<typeof PEOPLE[0] | null>(null)

  const filtered = PEOPLE
    .filter(p => skillFilter === 'All Skills' || p.skill === skillFilter)
    .sort((a, b) => b[sortBy] - a[sortBy])

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-[1.9rem] text-navy mb-2">Find Someone to Learn From</h1>
        <p className="text-[14.5px] text-sb-muted">People matched to your learning style and goals.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-1 flex-1">
          {SKILLS_FILTER.map(s => (
            <button
              key={s}
              onClick={() => setSkillFilter(s)}
              className={`px-4 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-all ${
                skillFilter === s ? 'bg-navy text-cream' : 'bg-white text-sb-muted border border-sb-border hover:border-navy/40 hover:text-navy'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as typeof sortBy)}
          className="px-3.5 py-2 border border-sb-border rounded-lg text-[13px] text-navy bg-white outline-none"
        >
          <option value="compatibility">Best Match</option>
          <option value="rating">Highest Rated</option>
          <option value="students">Most Students</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-sb-border overflow-hidden hover:shadow-[0_4px_24px_rgba(11,25,48,0.08)] transition-shadow flex flex-col">
            <div className="px-5 pt-5 pb-4 border-b border-sb-border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={`https://images.unsplash.com/${p.photo}?w=48&h=48&fit=crop&auto=format`}
                      alt={p.name}
                      className="w-11 h-11 rounded-xl object-cover bg-parchment"
                    />
                    {p.available && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                    )}
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-navy">{p.name}</p>
                    <p className="text-[11px] text-amber-600 font-semibold">{p.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-amber-500 text-[13px]">★</span>
                  <span className="text-[12.5px] font-semibold text-navy">{p.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-navy">{p.skill}</span>
                  <span className="text-[11px] text-sb-muted bg-parchment px-2 py-0.5 rounded-full">{p.level}</span>
                </div>
                <span className="font-mono text-[12px] font-bold text-navy">{p.pct}%</span>
              </div>
              <div className="h-1.5 bg-parchment rounded-full">
                <div className="h-full bg-navy rounded-full" style={{ width: `${p.pct}%` }} />
              </div>
            </div>

            <div className="grid grid-cols-3 divide-x divide-sb-border border-b border-sb-border">
              <div className="px-3 py-3 text-center">
                <p className="font-mono text-[13px] font-bold text-navy">{p.rating}</p>
                <p className="text-[10px] text-sb-muted mt-0.5">Rating</p>
              </div>
              <div className="px-3 py-3 text-center">
                <p className="font-mono text-[13px] font-bold text-navy">{p.students}</p>
                <p className="text-[10px] text-sb-muted mt-0.5">Taught</p>
              </div>
              <div className="px-3 py-3 text-center">
                <p className="font-mono text-[13px] font-bold text-navy">{p.compatibility}%</p>
                <p className="text-[10px] text-emerald-600 mt-0.5 font-semibold">Match</p>
              </div>
            </div>

            <div className="px-5 py-4 flex-1 flex flex-col justify-end">
              <p className="text-[11px] text-sb-muted mb-3">{p.style} · {p.cost} cr/session</p>
              <div className="flex gap-2">
                <Link
                  to="/app/purchase"
                  className="flex-1 text-center py-2.5 bg-navy text-cream text-[13px] font-semibold rounded-xl hover:bg-navy-800 transition-colors"
                >
                  Connect & Learn
                </Link>
                <button
                  onClick={() => setSelectedPerson(p)}
                  className="px-3 py-2.5 border border-sb-border text-navy text-[13px] font-semibold rounded-xl hover:bg-parchment transition-colors"
                >
                  Passport
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Passport modal */}
      {selectedPerson && (
        <div className="fixed inset-0 bg-navy/50 z-50 flex items-center justify-center px-4" onClick={() => setSelectedPerson(null)}>
          <div className="bg-white rounded-2xl border border-sb-border w-full max-w-sm shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-navy px-6 py-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Skill Passport</p>
                  <h3 className="font-display text-xl text-white">{selectedPerson.name}</h3>
                  <p className="text-amber-400 text-[12px] font-semibold mt-1">{selectedPerson.title}</p>
                </div>
                <button onClick={() => setSelectedPerson(null)} className="text-white/40 hover:text-white">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              </div>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-semibold text-navy">{selectedPerson.skill}</span>
                <span className="font-mono text-[13px] font-bold text-navy">{selectedPerson.pct}%</span>
              </div>
              <div className="h-1.5 bg-parchment rounded-full">
                <div className="h-full bg-sb-purple rounded-full" style={{ width: `${selectedPerson.pct}%` }} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Rating', value: selectedPerson.rating },
                  { label: 'Taught', value: selectedPerson.students },
                  { label: 'Solved', value: selectedPerson.solved },
                ].map(s => (
                  <div key={s.label} className="bg-parchment rounded-xl p-3 text-center">
                    <p className="font-mono text-[14px] font-bold text-navy">{s.value}</p>
                    <p className="text-[10.5px] text-sb-muted">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                <span className="text-[13px] font-semibold text-navy">Compatibility</span>
                <span className="font-mono text-[14px] font-bold text-emerald-600">{selectedPerson.compatibility}%</span>
              </div>
              <Link
                to="/app/purchase"
                onClick={() => setSelectedPerson(null)}
                className="block w-full text-center py-3 bg-navy text-cream font-semibold rounded-xl hover:bg-navy-800 transition-colors text-[14px]"
              >
                Connect & Learn
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
