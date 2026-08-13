import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'

const PROBLEM = {
  title: 'Longest Palindromic Substring',
  skill: 'Python',
  difficulty: 'Hard',
  reward: 5,
  time: '25 min',
  description: `Given a string \`s\`, return the longest palindromic substring in \`s\`.

A palindrome is a string that reads the same forward and backward.

**Example 1:**
\`\`\`
Input: s = "babad"
Output: "bab"
\`\`\`

**Example 2:**
\`\`\`
Input: s = "cbbd"
Output: "bb"
\`\`\`

**Constraints:**
- 1 ≤ s.length ≤ 1000
- s consists of only digits and English letters`,
  starterCode: `def longest_palindrome(s: str) -> str:
    # Your solution here
    pass

# Test cases
print(longest_palindrome("babad"))  # "bab"
print(longest_palindrome("cbbd"))   # "bb"
`,
}

const HINTS = [
  'Think about expanding around each character as a potential center.',
  'A palindrome can have odd or even length — handle both cases.',
  'Try O(n²) first, then consider Manacher\'s algorithm for O(n).',
]

export default function Problem() {
  const { addCredits } = useAuth()
  const navigate = useNavigate()
  const [code, setCode] = useState(PROBLEM.starterCode)
  const [activeTab, setActiveTab] = useState<'description' | 'hints'>('description')
  const [result, setResult] = useState<'idle' | 'running' | 'success' | 'fail'>('idle')
  const [hintsRevealed, setHintsRevealed] = useState(0)
  const [timeLeft] = useState(25 * 60)

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const handleRun = () => {
    setResult('running')
    setTimeout(() => {
      setResult('success')
      addCredits(PROBLEM.reward)
    }, 1500)
  }

  if (result === 'success') {
    return (
      <div className="max-w-lg mx-auto px-6 py-16 text-center">
        <div className="inline-flex w-20 h-20 rounded-2xl bg-emerald-100 items-center justify-center mb-6">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M6 18L13 25L30 10" stroke="#047857" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="font-display text-[2rem] text-navy mb-2">Problem Solved!</h1>
        <p className="text-[14.5px] text-sb-muted mb-6">{PROBLEM.title}</p>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-6 py-5 mb-8 inline-block">
          <p className="font-mono text-[2.5rem] font-bold text-emerald-700">+{PROBLEM.reward}</p>
          <p className="text-[13px] text-emerald-600 font-semibold">Credits Earned</p>
        </div>

        <p className="font-display italic text-navy text-[1.1rem] mb-8">
          "One step closer to mastery."
        </p>

        <div className="flex flex-col gap-3">
          <Link to="/app/solve" className="py-3.5 bg-navy text-cream font-semibold rounded-xl hover:bg-navy-800 transition-colors">
            Solve Another Problem
          </Link>
          <Link to="/app/dashboard" className="py-3 border border-sb-border text-navy font-semibold rounded-xl hover:bg-parchment transition-colors">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col">
      {/* Problem header */}
      <div className="bg-white border-b border-sb-border px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link to="/app/solve" className="text-sb-muted hover:text-navy transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <h1 className="text-[14.5px] font-semibold text-navy">{PROBLEM.title}</h1>
          <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-lg bg-orange-100 text-orange-700">{PROBLEM.difficulty}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-mono text-[13px] text-navy">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/><path d="M7 4.5V7l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            {String(minutes).padStart(2,'0')}:{String(seconds).padStart(2,'0')}
          </div>
          <div className="flex items-center gap-1 text-[12.5px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
            +{PROBLEM.reward} cr
          </div>
        </div>
      </div>

      {/* Split editor */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-0">
        {/* Left — problem description */}
        <div className="border-r border-sb-border overflow-y-auto">
          {/* Tabs */}
          <div className="flex border-b border-sb-border px-4">
            {(['description', 'hints'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-[13px] font-medium capitalize border-b-2 transition-colors ${
                  activeTab === tab ? 'border-navy text-navy' : 'border-transparent text-sb-muted hover:text-navy'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="px-6 py-5">
            {activeTab === 'description' ? (
              <div className="prose prose-sm max-w-none">
                <pre className="text-[13.5px] text-navy leading-relaxed whitespace-pre-wrap font-sans">{PROBLEM.description}</pre>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-[13px] text-sb-muted mb-4">Hints reveal progressively. Use only if needed.</p>
                {HINTS.map((hint, i) => (
                  <div key={i}>
                    {i < hintsRevealed ? (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                        <p className="text-[12.5px] font-semibold text-amber-700 mb-1">Hint {i + 1}</p>
                        <p className="text-[13px] text-navy">{hint}</p>
                      </div>
                    ) : (
                      <button
                        onClick={() => setHintsRevealed(n => n + 1)}
                        className="w-full py-3 border border-dashed border-sb-border rounded-xl text-[13px] text-sb-muted hover:border-amber-400 hover:text-amber-600 transition-colors"
                      >
                        Reveal Hint {i + 1}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right — code editor */}
        <div className="flex flex-col bg-[#0d1117] min-h-0">
          <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] text-white/40 font-mono">solution.py</span>
            </div>
            <span className="text-[11px] text-white/30 font-mono">Python 3.11</span>
          </div>

          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            className="flex-1 bg-transparent px-5 py-4 font-mono text-[13px] text-[#e6edf3] resize-none outline-none leading-relaxed"
            spellCheck={false}
          />

          {/* Run controls */}
          <div className="border-t border-white/10 px-4 py-3 flex items-center justify-between">
            <span className="text-[11px] text-white/30">Ctrl+Enter to run</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/app/solve')}
                className="px-4 py-2 text-white/50 text-[12.5px] hover:text-white/80"
              >
                Skip
              </button>
              <button
                onClick={handleRun}
                disabled={result === 'running'}
                className="px-5 py-2 bg-emerald-600 text-white text-[13px] font-semibold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-60 flex items-center gap-2"
              >
                {result === 'running' ? (
                  <><svg className="animate-spin w-3 h-3" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="12" strokeDashoffset="4"/></svg> Running…</>
                ) : '▶ Run & Submit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
