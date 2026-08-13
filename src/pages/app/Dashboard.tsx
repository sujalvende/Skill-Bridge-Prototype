import { Link } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'

const problems = [
  { title: 'Reverse a Linked List', skill: 'Python', difficulty: 'Easy', reward: 1, time: '5 min' },
  { title: 'Binary Search Tree Insert', skill: 'Python', difficulty: 'Medium', reward: 3, time: '15 min' },
  { title: 'Longest Palindromic Substring', skill: 'Python', difficulty: 'Hard', reward: 5, time: '25 min' },
]

const suggestedPeople = [
  { name: 'Rahul M.', photo: 'photo-1522202176988-66273c2fd55f', skill: 'React', level: 'Advanced', rating: 4.9, compatibility: 94, cost: 5 },
  { name: 'Priya S.', photo: 'photo-1573497620053-ea5300f94f21', skill: 'Data Science', level: 'Advanced', rating: 4.8, compatibility: 88, cost: 6 },
  { name: 'Ali K.', photo: 'photo-1523240795612-9a054b0db644', skill: 'Figma', level: 'Expert', rating: 4.7, compatibility: 82, cost: 4 },
]

const diffColors: Record<string, string> = {
  Easy: 'bg-emerald-100 text-emerald-700',
  Medium: 'bg-amber-100 text-amber-700',
  Hard: 'bg-orange-100 text-orange-700',
}

export default function Dashboard() {
  const { user } = useAuth()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const firstName = user?.name.split(' ')[0] ?? 'there'

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="font-display text-[1.9rem] text-navy">{greeting}, {firstName} 👋</h1>
        <p className="text-[14.5px] text-sb-muted mt-1">Here's what's waiting for you today.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* Main column */}
        <div className="space-y-6">

          {/* Next best action */}
          <div className="bg-navy rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="relative">
              <p className="text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-3">Your next best step</p>
              <h2 className="text-[1.1rem] font-semibold text-white mb-1">Complete "Functions" in Python</h2>
              <p className="text-[13px] text-white/50 mb-4">Pick up where you left off — you're close to mastering this topic.</p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="h-1.5 bg-white/15 rounded-full">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: '72%' }} />
                  </div>
                  <p className="text-[11px] text-white/40 mt-1.5">72% complete</p>
                </div>
                <Link
                  to="/app/learn"
                  className="px-5 py-2.5 bg-white text-navy text-[13.5px] font-semibold rounded-xl hover:bg-cream transition-colors"
                >
                  Continue →
                </Link>
              </div>
            </div>
          </div>

          {/* Skills progress */}
          <div className="bg-white rounded-2xl border border-sb-border p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[15px] font-semibold text-navy">Your Skills</h2>
              <Link to="/app/passport" className="text-[12.5px] text-sb-purple hover:underline">View Passport →</Link>
            </div>
            <div className="space-y-4">
              {(user?.skills ?? []).map(skill => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[13.5px] font-semibold text-navy">{skill.name}</span>
                      <span className="text-[11px] text-sb-muted bg-parchment px-2 py-0.5 rounded-full">{skill.level}</span>
                      {skill.verified && (
                        <span className="text-[10px] text-sb-purple font-semibold">✓ Verified</span>
                      )}
                    </div>
                    <span className="font-mono text-[12px] font-bold text-navy">{skill.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-parchment rounded-full">
                    <div className="h-full bg-navy rounded-full transition-all" style={{ width: `${skill.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Problems for you */}
          <div className="bg-white rounded-2xl border border-sb-border p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[15px] font-semibold text-navy">Problems For You</h2>
              <Link to="/app/solve" className="text-[12.5px] text-sb-purple hover:underline">All problems →</Link>
            </div>
            <div className="space-y-3">
              {problems.map(p => (
                <div key={p.title} className="flex items-center justify-between p-4 bg-parchment rounded-xl hover:bg-cream transition-colors group">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10.5px] font-semibold px-2 py-1 rounded-lg ${diffColors[p.difficulty]}`}>
                      {p.difficulty}
                    </span>
                    <div>
                      <p className="text-[13.5px] font-semibold text-navy group-hover:text-sb-purple transition-colors">{p.title}</p>
                      <p className="text-[11.5px] text-sb-muted">{p.skill} · {p.time}</p>
                    </div>
                  </div>
                  <Link to={`/app/solve/1`} className="flex items-center gap-1.5">
                    <span className="font-mono text-[13px] font-bold text-emerald-600">+{p.reward}</span>
                    <span className="text-[11px] text-sb-muted">cr</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">

          {/* Credits */}
          <div className="bg-white rounded-2xl border border-sb-border p-5">
            <p className="text-[11px] font-semibold text-sb-muted uppercase tracking-widest mb-3">Your Credits</p>
            <p className="font-mono text-[2.5rem] font-bold text-navy leading-none mb-1">{user?.credits ?? 0}</p>
            <p className="text-[12.5px] text-sb-muted mb-4">Available to spend</p>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/app/teach" className="py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[12.5px] font-semibold rounded-lg text-center hover:bg-emerald-100 transition-colors">
                + Earn
              </Link>
              <Link to="/app/people" className="py-2 bg-sb-purple-light text-sb-purple border border-sb-purple/20 text-[12.5px] font-semibold rounded-lg text-center hover:bg-sb-purple/15 transition-colors">
                Spend
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl border border-sb-border p-5">
            <p className="text-[11px] font-semibold text-sb-muted uppercase tracking-widest mb-3">Your Progress</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Problems', value: user?.stats.problemsSolved ?? 0 },
                { label: 'Taught', value: user?.stats.studentsTaught ?? 0 },
                { label: 'Sessions', value: user?.stats.sessions ?? 0 },
                { label: 'Badges', value: user?.stats.badges ?? 0 },
              ].map(s => (
                <div key={s.label} className="bg-parchment rounded-xl p-3 text-center">
                  <p className="font-mono text-[1.3rem] font-bold text-navy">{s.value}</p>
                  <p className="text-[10.5px] text-sb-muted mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            {/* Streak */}
            <div className="mt-3 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5">
              <span className="text-lg">🔥</span>
              <div>
                <p className="text-[13px] font-semibold text-navy">{user?.stats.streak ?? 0}-day streak</p>
                <p className="text-[11px] text-amber-700">Keep it going!</p>
              </div>
            </div>
          </div>

          {/* Suggested teachers */}
          <div className="bg-white rounded-2xl border border-sb-border p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-semibold text-sb-muted uppercase tracking-widest">Learn From</p>
              <Link to="/app/people" className="text-[11.5px] text-sb-purple hover:underline">See all</Link>
            </div>
            <div className="space-y-3">
              {suggestedPeople.map(p => (
                <div key={p.name} className="flex items-center gap-3">
                  <img
                    src={`https://images.unsplash.com/${p.photo}?w=36&h=36&fit=crop&auto=format`}
                    alt={p.name}
                    className="w-9 h-9 rounded-xl object-cover bg-parchment"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-navy truncate">{p.name}</p>
                    <p className="text-[11px] text-sb-muted">{p.skill} · {p.cost}cr</p>
                  </div>
                  <Link
                    to="/app/purchase"
                    className="text-[11.5px] font-semibold text-sb-purple hover:text-navy transition-colors"
                  >
                    Learn
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Teach prompt */}
          <div className="bg-parchment rounded-2xl border border-sb-border p-5">
            <p className="text-[14px] font-semibold text-navy mb-2">Someone needs Python help</p>
            <p className="text-[12.5px] text-sb-muted mb-4">3 people are looking for a Python teacher right now.</p>
            <Link
              to="/app/teach"
              className="w-full block text-center py-2.5 bg-navy text-cream text-[13px] font-semibold rounded-xl hover:bg-navy-800 transition-colors"
            >
              Help Someone →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
