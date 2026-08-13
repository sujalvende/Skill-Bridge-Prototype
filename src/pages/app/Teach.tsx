import { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'

const RECENT_SESSIONS = [
  { student: 'Maya', skill: 'Python', topic: 'OOP Basics', credits: 6, rating: 5.0, date: 'Today' },
  { student: 'Carlos', skill: 'Python', topic: 'Decorators', credits: 5, rating: 4.8, date: 'Yesterday' },
  { student: 'Priya', skill: 'JavaScript', topic: 'Closures', credits: 4, rating: 5.0, date: '2 days ago' },
]

export default function Teach() {
  const { user } = useAuth()
  const [requestOpen, setRequestOpen] = useState(false)
  const [form, setForm] = useState({ skill: '', topic: '', level: 'Beginner', type: 'Chat' })

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault()
    setRequestOpen(false)
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-[1.9rem] text-navy mb-2">Share What You Know</h1>
        <p className="text-[14.5px] text-sb-muted">Your knowledge is valuable. Someone is waiting to learn from you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* Main */}
        <div className="space-y-5">

          {/* Demand alert */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
              <span className="text-lg">🔔</span>
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-navy">Someone needs Python help right now.</p>
              <p className="text-[13px] text-emerald-700 mt-0.5">3 learners are actively looking for a Python teacher.</p>
            </div>
            <button
              onClick={() => setRequestOpen(true)}
              className="px-4 py-2 bg-navy text-cream text-[13px] font-semibold rounded-xl hover:bg-navy-800 transition-colors shrink-0"
            >
              Help Now
            </button>
          </div>

          {/* Your teaching skills */}
          <div className="bg-white rounded-2xl border border-sb-border p-6">
            <h2 className="text-[15px] font-semibold text-navy mb-5">Your Teaching Skills</h2>
            <div className="space-y-4">
              {(user?.skills ?? []).map(skill => (
                <div key={skill.name} className="flex items-center justify-between p-4 bg-parchment rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sb-purple-light flex items-center justify-center">
                      <span className="text-[10px] font-bold text-sb-purple">{skill.name.slice(0, 2).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-[13.5px] font-semibold text-navy">{skill.name}</p>
                      <p className="text-[11.5px] text-sb-muted">{skill.level} · {skill.pct}%</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setForm(f => ({ ...f, skill: skill.name })); setRequestOpen(true) }}
                    className="px-4 py-2 text-[12.5px] font-semibold text-sb-purple border border-sb-purple/30 rounded-xl hover:bg-sb-purple-light transition-colors"
                  >
                    Teach This
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent sessions */}
          <div className="bg-white rounded-2xl border border-sb-border p-6">
            <h2 className="text-[15px] font-semibold text-navy mb-5">Recent Teaching Sessions</h2>
            <div className="space-y-3">
              {RECENT_SESSIONS.map((s, i) => (
                <div key={i} className="flex items-center gap-4 py-3 border-b border-sb-border last:border-0">
                  <div className="w-9 h-9 rounded-xl bg-navy-light flex items-center justify-center text-[12px] font-bold text-navy">
                    {s.student[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-[13.5px] font-semibold text-navy">{s.student}</p>
                    <p className="text-[12px] text-sb-muted">{s.skill} — {s.topic}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[13px] font-bold text-emerald-600">+{s.credits} cr</p>
                    <p className="text-[11px] text-sb-muted">{s.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-amber-500 text-[12px]">★</span>
                    <span className="text-[12px] font-semibold text-navy">{s.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">

          {/* Teaching stats */}
          <div className="bg-white rounded-2xl border border-sb-border p-5">
            <p className="text-[11px] font-semibold text-sb-muted uppercase tracking-widest mb-4">Teaching Stats</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-sb-muted">Credits Earned</span>
                <span className="font-mono text-[14px] font-bold text-navy">{user?.credits ?? 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-sb-muted">Students Helped</span>
                <span className="font-mono text-[14px] font-bold text-navy">{user?.stats.studentsTaught ?? 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-sb-muted">Teaching Rating</span>
                <div className="flex items-center gap-1">
                  <span className="text-amber-500">★</span>
                  <span className="font-mono text-[14px] font-bold text-navy">{user?.stats.rating || '—'}</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[12.5px] text-sb-muted">Teaching Century</span>
                  <span className="text-[12px] font-semibold text-navy">{user?.stats.studentsTaught ?? 0}/100</span>
                </div>
                <div className="h-1.5 bg-parchment rounded-full">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${Math.min((user?.stats.studentsTaught ?? 0), 100)}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Motivation */}
          <div className="bg-navy rounded-2xl p-5">
            <blockquote className="font-display italic text-[1.1rem] text-white/80 leading-snug mb-4">
              "When you teach, you understand deeper."
            </blockquote>
            <p className="text-[12.5px] text-white/40">Every learner you help builds your confidence and reputation.</p>
          </div>

          <button
            onClick={() => setRequestOpen(true)}
            className="w-full py-3.5 bg-navy text-cream font-semibold rounded-xl hover:bg-navy-800 transition-colors text-[14.5px]"
          >
            Create Teaching Session
          </button>
        </div>
      </div>

      {/* Create session modal */}
      {requestOpen && (
        <div className="fixed inset-0 bg-navy/50 z-50 flex items-center justify-center px-4" onClick={() => setRequestOpen(false)}>
          <div className="bg-white rounded-2xl border border-sb-border p-7 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <h2 className="font-display text-[1.4rem] text-navy mb-1">Create Teaching Session</h2>
            <p className="text-[13.5px] text-sb-muted mb-6">Set up your session and start teaching.</p>
            <form onSubmit={handleStart} className="space-y-4">
              <div>
                <label className="block text-[12.5px] font-semibold text-navy mb-1.5">Skill</label>
                <select
                  value={form.skill}
                  onChange={e => setForm(f => ({ ...f, skill: e.target.value }))}
                  className="w-full px-3.5 py-3 rounded-xl border border-sb-border bg-parchment text-[14px] text-navy outline-none"
                >
                  <option value="">Choose a skill</option>
                  {user?.skills.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-navy mb-1.5">Topic</label>
                <input
                  value={form.topic}
                  onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}
                  placeholder="e.g. Binary Trees, CSS Flexbox..."
                  className="w-full px-3.5 py-3 rounded-xl border border-sb-border bg-parchment text-[14px] text-navy outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12.5px] font-semibold text-navy mb-1.5">Level</label>
                  <select value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value }))} className="w-full px-3.5 py-3 rounded-xl border border-sb-border bg-parchment text-[14px] text-navy outline-none">
                    {['Beginner','Intermediate','Advanced'].map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-navy mb-1.5">Session Type</label>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="w-full px-3.5 py-3 rounded-xl border border-sb-border bg-parchment text-[14px] text-navy outline-none">
                    {['Chat','Whiteboard','Voice','Video','Screen Share'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setRequestOpen(false)} className="flex-1 py-3 border border-sb-border text-navy font-semibold rounded-xl text-[14px]">Cancel</button>
                <Link to="/app/room" className="flex-1 py-3 bg-navy text-cream font-semibold rounded-xl text-[14px] text-center hover:bg-navy-800 transition-colors">
                  Start Session
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
