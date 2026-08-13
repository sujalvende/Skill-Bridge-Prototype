import { useState } from 'react'
import { useNavigate } from 'react-router'

const ALL_SKILLS = [
  'Python', 'JavaScript', 'React', 'TypeScript', 'C++', 'Java', 'SQL',
  'Data Science', 'Machine Learning', 'Figma', 'UI/UX', 'Photoshop',
  'Video Editing', 'Excel', 'Mathematics', 'Statistics', 'Public Speaking',
  'Writing', 'Marketing', 'Blender', 'Node.js', 'Go', 'Rust',
]

export default function LearnSkills() {
  const navigate = useNavigate()
  const teachSkills = new Set<string>(JSON.parse(sessionStorage.getItem('ob_teach') ?? '[]'))
  const learnableSkills = ALL_SKILLS.filter(s => !teachSkills.has(s))
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const toggle = (skill: string) => {
    setSelected(s => {
      const n = new Set(s)
      n.has(skill) ? n.delete(skill) : n.add(skill)
      return n
    })
  }

  const handleNext = () => {
    sessionStorage.setItem('ob_learn', JSON.stringify([...selected]))
    navigate('/onboarding/assessment')
  }

  return (
    <div className="w-full max-w-lg">
      <div className="flex items-center justify-center gap-1.5 mb-10">
        {[1,2,3,4].map(n => (
          <div key={n} className={`h-1 rounded-full transition-all ${n === 3 ? 'w-8 bg-navy' : n < 3 ? 'w-4 bg-navy/40' : 'w-4 bg-sb-border'}`} />
        ))}
      </div>

      <div className="text-center mb-8">
        <h1 className="font-display text-[1.9rem] text-navy mb-3">What do you want to learn?</h1>
        <p className="text-[14.5px] text-sb-muted">
          We'll find the best people to teach you. Select as many as you like.
        </p>
      </div>

      <div className="flex flex-wrap gap-2.5 justify-center mb-8">
        {learnableSkills.map(skill => (
          <button
            key={skill}
            onClick={() => toggle(skill)}
            className={`px-4 py-2.5 rounded-xl text-[13.5px] font-medium transition-all ${
              selected.has(skill)
                ? 'bg-sb-purple text-white border-2 border-sb-purple'
                : 'bg-white text-navy border-2 border-sb-border hover:border-sb-purple/40'
            }`}
          >
            {selected.has(skill) && <span className="mr-1.5">✓</span>}
            {skill}
          </button>
        ))}
      </div>

      {selected.size > 0 && (
        <p className="text-center text-[13px] text-sb-muted mb-6">
          {selected.size} skill{selected.size !== 1 ? 's' : ''} selected
        </p>
      )}

      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/onboarding/teach-skills')}
          className="text-[13.5px] text-sb-muted hover:text-navy transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="px-7 py-3 bg-navy text-cream font-semibold rounded-xl hover:bg-navy-800 transition-colors text-[14px]"
        >
          {selected.size === 0 ? 'Skip for now →' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
