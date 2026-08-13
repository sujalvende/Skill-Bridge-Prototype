import { Outlet } from 'react-router'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      <main className="flex items-center justify-center py-12 px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
