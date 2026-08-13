import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface Skill {
  name: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  pct: number
  verified: boolean
}

export interface User {
  name: string
  username: string
  email: string
  title: string
  bio: string
  photo: string
  credits: number
  skills: Skill[]
  learningGoals: string[]
  stats: {
    problemsSolved: number
    studentsTaught: number
    sessions: number
    rating: number
    badges: number
    streak: number
  }
  onboardingComplete: boolean
}

interface AuthContextValue {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, _password: string) => Promise<void>
  signup: (name: string, username: string, email: string, _password: string) => Promise<void>
  logout: () => void
  completeOnboarding: (teachSkills: string[], learnSkills: string[]) => void
  addCredits: (amount: number) => void
  spendCredits: (amount: number) => boolean
}

const DEFAULT_USER: User = {
  name: 'Sujal Vende',
  username: 'sujal',
  email: 'sujal@example.com',
  title: 'The Seeker',
  bio: 'Learner and teacher on SkillBridge.',
  photo: 'photo-1580894732930-0babd100d356',
  credits: 245,
  skills: [
    { name: 'Python', level: 'Advanced', pct: 87, verified: true },
    { name: 'JavaScript', level: 'Intermediate', pct: 68, verified: true },
    { name: 'Photoshop', level: 'Intermediate', pct: 61, verified: false },
  ],
  learningGoals: ['React', 'Data Science', 'UI/UX'],
  stats: {
    problemsSolved: 243,
    studentsTaught: 27,
    sessions: 312,
    rating: 4.8,
    badges: 16,
    streak: 7,
  },
  onboardingComplete: false,
}

const AuthContext = createContext<AuthContextValue | null>(null)

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem('sb_user')
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

function saveUser(user: User | null) {
  if (user) {
    localStorage.setItem('sb_user', JSON.stringify(user))
  } else {
    localStorage.removeItem('sb_user')
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => loadUser())

  useEffect(() => {
    saveUser(user)
  }, [user])

  const login = async (email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 900))
    const saved = loadUser()
    if (saved && saved.email === email) {
      setUser(saved)
    } else {
      const u = { ...DEFAULT_USER, email, onboardingComplete: true, title: 'The Logic Weaver' }
      setUser(u)
    }
  }

  const signup = async (name: string, username: string, email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 900))
    const newUser: User = {
      ...DEFAULT_USER,
      name,
      username,
      email,
      title: 'The Seeker',
      credits: 10,
      skills: [],
      stats: { problemsSolved: 0, studentsTaught: 0, sessions: 0, rating: 0, badges: 0, streak: 0 },
      onboardingComplete: false,
    }
    setUser(newUser)
  }

  const logout = () => setUser(null)

  const completeOnboarding = (teachSkills: string[], _learnSkills: string[]) => {
    setUser(u => {
      if (!u) return u
      const skills: Skill[] = teachSkills.slice(0, 3).map((name, i) => ({
        name,
        level: ['Advanced', 'Intermediate', 'Beginner'][i] as Skill['level'],
        pct: [87, 68, 61][i],
        verified: true,
      }))
      return { ...u, skills, onboardingComplete: true, title: 'The Logic Weaver', credits: 10 }
    })
  }

  const addCredits = (amount: number) => {
    setUser(u => (u ? { ...u, credits: u.credits + amount } : u))
  }

  const spendCredits = (amount: number): boolean => {
    if (!user || user.credits < amount) return false
    setUser(u => (u ? { ...u, credits: u.credits - amount } : u))
    return true
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, signup, logout, completeOnboarding, addCredits, spendCredits }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
