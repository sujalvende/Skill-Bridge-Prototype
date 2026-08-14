import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'

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
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, username: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
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

function mapSupabaseUserToAppUser(email?: string | null, metadata?: Record<string, unknown>): User | null {
  const normalizedName = typeof metadata?.full_name === 'string' ? metadata.full_name : DEFAULT_USER.name
  const normalizedUsername = typeof metadata?.username === 'string' ? metadata.username : DEFAULT_USER.username

  return {
    ...DEFAULT_USER,
    name: normalizedName,
    username: normalizedUsername,
    email: email || DEFAULT_USER.email,
    onboardingComplete: true,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const syncSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (!mounted) return
      if (error || !session) {
        setUser(null)
        setIsLoading(false)
        return
      }

      setUser(mapSupabaseUserToAppUser(session.user.email, session.user.user_metadata))
      setIsLoading(false)
    }

    syncSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return
      setUser(session ? mapSupabaseUserToAppUser(session.user.email, session.user.user_metadata) : null)
      setIsLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error

    const { data: { session } } = await supabase.auth.getSession()
    setUser(session ? mapSupabaseUserToAppUser(session.user.email, session.user.user_metadata) : null)
  }

  const signup = async (name: string, username: string, email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          username,
        },
      },
    })

    if (error) throw error
    const { data: { session } } = await supabase.auth.getSession()
    setUser(session ? mapSupabaseUserToAppUser(session.user.email, session.user.user_metadata) : null)
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setUser(null)
  }

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
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isLoading, login, signup, logout, completeOnboarding, addCredits, spendCredits }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
