import { useState } from 'react'
import { Link } from 'react-router'

const PROBLEMS = [
  { id: 1, title: 'Reverse a String', skill: 'Python', difficulty: 'Easy', reward: 1, time: '5 min', solved: true },
  { id: 2, title: 'Find the Maximum', skill: 'Python', difficulty: 'Easy', reward: 1, time: '5 min', solved: false },
  { id: 3, title: 'Two Sum', skill: 'Python', difficulty: 'Easy', reward: 1, time: '10 min', solved: true },
  { id: 4, title: 'Binary Search', skill: 'Python', difficulty: 'Medium', reward: 2, time: '15 min', solved: false },
  { id: 5, title: 'Valid Parentheses', skill: 'Python', difficulty: 'Medium', reward: 3, time: '15 min', solved: false },
  { id: 6, title: 'Merge Sorted Arrays', skill: 'Python', difficulty: 'Medium', reward: 3, time: '20 min', solved: false },
  { id: 7, title: 'Longest Palindromic Substring', skill: 'Python', difficulty: 'Hard', reward: 5, time: '25 min', solved: false },
  { id: 8, title: 'Binary Tree Level Order Traversal', skill: 'Python', difficulty: 'Hard', reward: 5, time: '30 min', solved: false },
  { id: 9, title: 'Trapping Rain Water', skill: 'Python', difficulty: 'Very Hard', reward: 7, time: '45 min', solved: false },
  { id: 10, title: 'Regular Expression Matching', skill: 'Python', difficulty: 'Very Hard', reward: 7, time: '45 min', solved: false },
]

const diffColors: Record<string, { badge: string; dot: string }> = {
  Easy: { badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  Medium: { badge: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  Hard: { badge: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500' },
  'Very Hard': { badge: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
}

const FILTERS = ['All', 'Easy', 'Medium', 'Hard', 'Very Hard']

export default function Solve() {
  const [filter, setFilter] = useState('All')

  const filtered = PROBLEMS.filter(p => filter === 'All' || p.difficulty === filter)
  const stats = {
    solved: PROBLEMS.filter(p => p.solved).length,
    total: PROBLEMS.length,
    easy: PROBLEMS.filter(p => p.difficulty === 'Easy' && p.solved).length,
    medium: PROBLEMS.filter(p => p.difficulty === 'Medium' && p.solved).length,
    hard: PROBLEMS.filter(p => p.difficulty === 'Hard' && p.solved).length,
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-[1.9rem] text-navy mb-2">Solve. Improve. Earn.</h1>
        <p className="text-[14.5px] text-sb-muted">Prove your skills and earn credits with every solved problem.</p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-sb-border px-5 py-4">
          <p className="font-mono text-[1.6rem] font-bold text-navy">{stats.solved}</p>
          <p className="text-[12px] text-sb-muted mt-0.5">Solved</p>
        </div>
        {[
          { label: 'Easy', count: stats.easy, color: 'text-emerald-600' },
          { label: 'Medium', count: stats.medium, color: 'text-amber-600' },
          { label: 'Hard', count: stats.hard, color: 'text-orange-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-sb-border px-5 py-4">
            <p className={`font-mono text-[1.6rem] font-bold ${s.color}`}>{s.count}</p>
            <p className="text-[12px] text-sb-muted mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${
              filter === f ? 'bg-navy text-cream' : 'bg-white text-sb-muted border border-sb-border hover:border-navy/40 hover:text-navy'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Problems list */}
      <div className="bg-white rounded-2xl border border-sb-border overflow-hidden">
        {filtered.map((p, i) => (
          <div
            key={p.id}
            className={`flex items-center gap-4 px-5 py-4 hover:bg-parchment transition-colors group ${i < filtered.length - 1 ? 'border-b border-sb-border' : ''}`}
          >
            {/* Status dot */}
            <div className={`w-2 h-2 rounded-full shrink-0 ${p.solved ? 'bg-emerald-500' : 'bg-sb-border'}`} />

            {/* Title */}
            <div className="flex-1 min-w-0">
              <p className={`text-[14px] font-semibold group-hover:text-sb-purple transition-colors ${p.solved ? 'text-sb-muted line-through decoration-1' : 'text-navy'}`}>
                {p.title}
              </p>
              <p className="text-[12px] text-sb-muted mt-0.5">{p.skill} · {p.time}</p>
            </div>

            {/* Difficulty */}
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${diffColors[p.difficulty].badge}`}>
              {p.difficulty}
            </span>

            {/* Reward */}
            <div className="flex items-center gap-1 w-14 justify-end">
              <span className="font-mono text-[13px] font-bold text-emerald-600">+{p.reward}</span>
              <span className="text-[11px] text-sb-muted">cr</span>
            </div>

            {/* CTA */}
            {!p.solved ? (
              <Link
                to={`/app/solve/${p.id}`}
                className="px-4 py-2 bg-navy text-cream text-[12.5px] font-semibold rounded-lg hover:bg-navy-800 transition-colors"
              >
                Solve
              </Link>
            ) : (
              <div className="px-4 py-2 text-[12.5px] font-semibold text-emerald-600 rounded-lg bg-emerald-50">
                Done ✓
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
