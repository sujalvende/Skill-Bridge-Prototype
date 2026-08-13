import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

const QUESTIONS = [
  {
    q: 'What is the output of `print(type([]))`?',
    options: ["<class 'list'>", "<class 'array'>", "list", "TypeError"],
    answer: 0,
    difficulty: 'Easy',
  },
  {
    q: 'Which keyword is used to define a function in Python?',
    options: ['function', 'def', 'fun', 'define'],
    answer: 1,
    difficulty: 'Easy',
  },
  {
    q: 'What does the `*args` parameter allow in a Python function?',
    options: ['Keyword arguments', 'Variable-length positional arguments', 'Default arguments', 'Type annotations'],
    answer: 1,
    difficulty: 'Medium',
  },
  {
    q: 'What is a decorator in Python?',
    options: [
      'A comment style',
      'A function that modifies another function',
      'A class method',
      'An import statement',
    ],
    answer: 1,
    difficulty: 'Medium',
  },
  {
    q: 'What is the difference between `==` and `is` in Python?',
    options: [
      'They are identical',
      '`==` compares values, `is` compares identity',
      '`is` compares values, `==` compares identity',
      '`is` is only for numbers',
    ],
    answer: 1,
    difficulty: 'Medium',
  },
  {
    q: 'What does list comprehension `[x**2 for x in range(5) if x%2==0]` return?',
    options: ['[0, 4, 16]', '[0, 1, 4, 9, 16]', '[4, 16]', '[0, 4]'],
    answer: 0,
    difficulty: 'Hard',
  },
  {
    q: 'What is a Python generator?',
    options: [
      'A function that returns a list',
      'A function that yields values lazily',
      'A built-in data structure',
      'A decorator',
    ],
    answer: 1,
    difficulty: 'Hard',
  },
]

export default function Assessment() {
  const navigate = useNavigate()
  const teachSkills: string[] = JSON.parse(sessionStorage.getItem('ob_teach') ?? '[]')
  const skill = teachSkills[0] ?? 'Python'

  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(45)

  useEffect(() => {
    if (submitted) return
    if (timeLeft === 0) { handleNext(); return }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, submitted])

  const handleSelect = (idx: number) => {
    if (submitted) return
    setSelected(idx)
  }

  const handleNext = () => {
    const newAnswers = [...answers]
    newAnswers[current] = selected
    setAnswers(newAnswers)

    if (current < QUESTIONS.length - 1) {
      setCurrent(c => c + 1)
      setSelected(null)
      setTimeLeft(45)
      setSubmitted(false)
    } else {
      const correct = newAnswers.filter((a, i) => a === QUESTIONS[i].answer).length
      const pct = Math.round((correct / QUESTIONS.length) * 100)
      sessionStorage.setItem('ob_score', String(pct))
      navigate('/onboarding/result')
    }
  }

  const handleSubmit = () => {
    if (selected === null) return
    setSubmitted(true)
  }

  const q = QUESTIONS[current]
  const progress = ((current) / QUESTIONS.length) * 100

  return (
    <div className="w-full max-w-lg">
      <div className="flex items-center justify-center gap-1.5 mb-10">
        {[1,2,3,4].map(n => (
          <div key={n} className={`h-1 rounded-full transition-all ${n === 4 ? 'w-8 bg-navy' : 'w-4 bg-navy/40'}`} />
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-sb-border overflow-hidden shadow-sm">
        {/* Header */}
        <div className="px-6 py-4 border-b border-sb-border flex items-center justify-between bg-parchment">
          <div>
            <p className="text-[11px] font-semibold text-sb-muted uppercase tracking-widest">{skill} Assessment</p>
            <p className="text-[13px] font-semibold text-navy mt-0.5">
              Question {current + 1} <span className="text-sb-muted font-normal">of {QUESTIONS.length}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-[11px] font-semibold px-2 py-1 rounded-lg ${
              q.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' :
              q.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' :
              'bg-red-100 text-red-700'
            }`}>{q.difficulty}</span>
            <div className={`flex items-center gap-1.5 font-mono text-[14px] font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-navy'}`}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M7 4.5V7l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {timeLeft}s
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-parchment">
          <div className="h-full bg-navy transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        {/* Question */}
        <div className="px-6 py-6">
          <p className="text-[15.5px] font-semibold text-navy mb-5 leading-snug">{q.q}</p>

          <div className="space-y-2.5">
            {q.options.map((opt, i) => {
              let cls = 'border-sb-border bg-parchment text-navy hover:border-navy/40 hover:bg-cream'
              if (selected === i && !submitted) cls = 'border-navy bg-navy-light text-navy'
              if (submitted && i === q.answer) cls = 'border-emerald-500 bg-emerald-50 text-emerald-800'
              if (submitted && selected === i && i !== q.answer) cls = 'border-red-400 bg-red-50 text-red-700'

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={submitted}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border-2 text-[14px] font-medium transition-all ${cls}`}
                >
                  <span className="inline-flex w-6 h-6 rounded-full bg-white/50 border border-current/20 items-center justify-center text-[11px] font-bold mr-3">
                    {['A','B','C','D'][i]}
                  </span>
                  {opt}
                </button>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-sb-border flex items-center justify-between">
          <button
            onClick={handleNext}
            className="text-[13px] text-sb-muted hover:text-navy transition-colors"
          >
            Skip
          </button>
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={selected === null}
              className="px-6 py-2.5 bg-navy text-cream font-semibold rounded-xl text-[13.5px] disabled:opacity-40 hover:bg-navy-800 transition-colors"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl text-[13.5px] hover:bg-emerald-700 transition-colors"
            >
              {current < QUESTIONS.length - 1 ? 'Next Question →' : 'See Results →'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
