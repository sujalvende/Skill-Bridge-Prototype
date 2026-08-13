import { Outlet } from 'react-router'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
