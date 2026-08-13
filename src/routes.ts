import { createBrowserRouter, redirect } from 'react-router'
import PublicLayout from './layouts/PublicLayout'
import OnboardingLayout from './layouts/OnboardingLayout'
import AppLayout from './layouts/AppLayout'
import Home from './pages/public/Home'
import Login from './pages/public/Login'
import SignUp from './pages/public/SignUp'
import Welcome from './pages/onboarding/Welcome'
import TeachSkills from './pages/onboarding/TeachSkills'
import LearnSkills from './pages/onboarding/LearnSkills'
import Assessment from './pages/onboarding/Assessment'
import AssessmentResult from './pages/onboarding/AssessmentResult'
import Dashboard from './pages/app/Dashboard'
import Learn from './pages/app/Learn'
import Teach from './pages/app/Teach'
import Solve from './pages/app/Solve'
import Problem from './pages/app/Problem'
import Credits from './pages/app/Credits'
import People from './pages/app/People'
import SkillPassportPage from './pages/app/SkillPassportPage'
import Badges from './pages/app/Badges'
import LearningRoom from './pages/app/LearningRoom'
import SessionPurchase from './pages/app/SessionPurchase'
import Notifications from './pages/app/Notifications'

export const router = createBrowserRouter([
  {
    Component: PublicLayout,
    children: [
      { index: true, Component: Home },
      { path: 'login', Component: Login },
      { path: 'signup', Component: SignUp },
    ],
  },
  {
    path: 'onboarding',
    Component: OnboardingLayout,
    children: [
      { path: 'welcome', Component: Welcome },
      { path: 'teach-skills', Component: TeachSkills },
      { path: 'learn-skills', Component: LearnSkills },
      { path: 'assessment', Component: Assessment },
      { path: 'result', Component: AssessmentResult },
    ],
  },
  {
    path: 'app',
    Component: AppLayout,
    children: [
      { index: true, loader: () => redirect('/app/dashboard') },
      { path: 'dashboard', Component: Dashboard },
      { path: 'learn', Component: Learn },
      { path: 'teach', Component: Teach },
      { path: 'solve', Component: Solve },
      { path: 'solve/:id', Component: Problem },
      { path: 'credits', Component: Credits },
      { path: 'people', Component: People },
      { path: 'passport', Component: SkillPassportPage },
      { path: 'badges', Component: Badges },
      { path: 'room', Component: LearningRoom },
      { path: 'purchase', Component: SessionPurchase },
      { path: 'notifications', Component: Notifications },
    ],
  },
])
