import { Outlet } from 'react-router'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
