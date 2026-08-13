import { Link } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'

const SKILL_TREE = [
  { label: 'Fundamentals', status: 'mastered' },
  { label: 'Control Flow', status: 'mastered' },
  { label: 'Functions', status: 'mastered' },
  { label: 'OOP', status: 'mastered' },
  { label: 'File Handling', status: 'improving' },
  { label: 'APIs', status: 'improving' },
  { label: 'Advanced Python', status: 'locked' },
]

const ACTIVITY = [
  { label: 'Solved a Hard problem', detail: '+5 credits', time: '2h ago', icon: '⚡' },
  { label: 'Taught Maya — Python OOP', detail: '+7 credits', time: '5h ago', icon: '📖' },
  { label: 'Unlocked badge: Problem Solver', detail: '', time: 'Yesterday', icon: '🏅' },
  { label: 'Completed Python assessment', detail: '87% · Advanced', time: '3 days ago', icon: '✓' },
  { label: 'Improved JavaScript score', detail: '64% → 68%', time: '4 days ago', icon: '↑' },
]

function StatusDot({ s }: { s: string }) {
  const map: Record<string, string> = { mastered: 'bg-emerald-500', improving: 'bg-amber-400', locked: 'bg-sb-border' }
  return <span className={`w-2 h-2 rounded-full shrink-0 ${map[s]}`} />
}

export default function SkillPassportPage() {
  const { user } = useAuth()
  if (!user) return null

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-[1.9rem] text-navy mb-2">Skill Passport</h1>
        <p className="text-[14.5px] text-sb-muted">Your digital identity on SkillBridge.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
        {/* Passport card */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-sb-border overflow-hidden shadow-sm">
            {/* Header */}
            <div className="bg-navy px-6 py-6 flex items-start justify-between">
              <div>
                <p className="text-[10px] text-white/35 uppercase tracking-widest mb-2">Skill Passport</p>
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={`https://images.unsplash.com/${user.photo}?w=52&h=52&fit=crop&auto=format`}
                    alt={user.name}
                    className="w-12 h-12 rounded-xl object-cover border-2 border-white/20"
                  />
                  <div>
                    <h2 className="font-display text-[1.3rem] text-white leading-tight">{user.name}</h2>
                    <p className="text-[11px] text-white/50">@{user.username}</p>
                  </div>
                </div>
                <p className="text-amber-400 text-[12.5px] font-semibold">{user.title}</p>
                <p className="text-white/40 text-[11.5px] mt-1 italic">{user.bio}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="3" y="2" width="12" height="14" rx="2" stroke="white" strokeWidth="1.3"/>
                  <path d="M6 7h6M6 10h4" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 border-b border-sb-border divide-x divide-sb-border">
              {[
                { v: user.stats.problemsSolved, l: 'Solved' },
                { v: user.stats.studentsTaught, l: 'Taught' },
                { v: user.stats.sessions, l: 'Sessions' },
                { v: user.credits, l: 'Credits' },
              ].map(s => (
                <div key={s.l} className="px-3 py-3.5 text-center">
                  <p className="font-mono text-[14px] font-bold text-navy">{s.v}</p>
                  <p className="text-[10px] text-sb-muted mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="px-5 py-5 border-b border-sb-border">
              <p className="text-[10px] font-semibold text-sb-muted uppercase tracking-widest mb-3.5">Verified Skills</p>
              <div className="space-y-3">
                {user.skills.map(skill => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-semibold text-navy">{skill.name}</span>
                        <span className="text-[11px] text-sb-muted bg-parchment px-2 py-0.5 rounded-full">{skill.level}</span>
                        {skill.verified && <span className="text-[10px] font-bold text-sb-purple">✓</span>}
                      </div>
                      <span className="font-mono text-[12px] font-bold text-navy">{skill.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-parchment rounded-full">
                      <div className="h-full bg-navy rounded-full" style={{ width: `${skill.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill tree */}
            <div className="px-5 py-4">
              <p className="text-[10px] font-semibold text-sb-muted uppercase tracking-widest mb-3">Python Skill Tree</p>
              <div className="grid grid-cols-2 gap-1.5">
                {SKILL_TREE.map(node => (
                  <div key={node.label} className="flex items-center gap-2">
                    <StatusDot s={node.status} />
                    <span className={`text-[12px] ${node.status === 'locked' ? 'text-sb-border' : 'text-navy'}`}>{node.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rating */}
          {user.stats.rating > 0 && (
            <div className="bg-white rounded-2xl border border-sb-border p-5 flex items-center gap-4">
              <div className="font-mono text-[2rem] font-bold text-navy">{user.stats.rating}</div>
              <div>
                <div className="flex text-amber-500 text-lg">{'★'.repeat(5)}</div>
                <p className="text-[12px] text-sb-muted mt-0.5">Teaching Rating</p>
              </div>
            </div>
          )}

          {/* Badges preview */}
          <div className="bg-white rounded-2xl border border-sb-border p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-semibold text-sb-muted uppercase tracking-widest">Badges</p>
              <Link to="/app/badges" className="text-[11.5px] text-sb-purple hover:underline">See all</Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {['First Step', 'Problem Solver', 'Top Mentor', 'Teaching 10', 'Consistent Learner'].map(b => (
                <span key={b} className="text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-5">

          {/* Style insights */}
          <div className="bg-white rounded-2xl border border-sb-border p-6">
            <h2 className="text-[15px] font-semibold text-navy mb-5">Your Learning Profile</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Learning Style', value: 'Experimenter', desc: 'Learns best by trying things.' },
                { label: 'Teaching Style', value: 'Concept Explainer', desc: 'Explains ideas with clear examples.' },
                { label: 'Solving Style', value: 'Logical Thinker', desc: 'Breaks problems into steps.' },
              ].map(item => (
                <div key={item.label} className="bg-parchment rounded-xl p-4">
                  <p className="text-[10.5px] font-semibold text-sb-muted uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-[14px] font-semibold text-navy">{item.value}</p>
                  <p className="text-[12px] text-sb-muted mt-1.5 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Best matches */}
          <div className="bg-white rounded-2xl border border-sb-border p-6">
            <h2 className="text-[15px] font-semibold text-navy mb-4">Best Matches</h2>
            <div className="space-y-3">
              {[
                { type: 'Deep Thinkers', match: 92 },
                { type: 'Pattern Hunters', match: 88 },
                { type: 'Concept Explorers', match: 84 },
              ].map(m => (
                <div key={m.type} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[13.5px] font-semibold text-navy">{m.type}</span>
                      <span className="font-mono text-[13px] font-bold text-emerald-600">{m.match}%</span>
                    </div>
                    <div className="h-1.5 bg-parchment rounded-full">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${m.match}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/app/people" className="mt-4 block text-center text-[13px] font-semibold text-sb-purple hover:underline">
              Find Matching People →
            </Link>
          </div>

          {/* Activity */}
          <div className="bg-white rounded-2xl border border-sb-border p-6">
            <h2 className="text-[15px] font-semibold text-navy mb-5">Recent Activity</h2>
            <div className="space-y-0">
              {ACTIVITY.map((a, i) => (
                <div key={i} className={`flex items-start gap-3.5 py-3.5 ${i < ACTIVITY.length - 1 ? 'border-b border-sb-border' : ''}`}>
                  <div className="w-8 h-8 rounded-lg bg-parchment flex items-center justify-center text-base shrink-0">{a.icon}</div>
                  <div className="flex-1">
                    <p className="text-[13.5px] font-medium text-navy">{a.label}</p>
                    {a.detail && <p className="text-[12px] text-sb-muted mt-0.5">{a.detail}</p>}
                  </div>
                  <span className="text-[11px] text-sb-muted shrink-0">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
