import { Link } from '@tanstack/react-router'
import { ProfileCard } from '../user/profile-card'
import { Menu, Power } from 'lucide-react'
import { useState } from 'react'

export const NavBar = () => {
  return (
    <nav className="w-full flex items-center justify-between py-4 border-b  border-b-border sm:px-8 px-3 ">
      <Link to="/">
        <h1 className="text-2xl font-semibold sm:font-medium">Reswork</h1>
      </Link>
      <div className="hidden sm:flex items-center gap-4 text-sm font-normal text-secondary">
        <Link to="/builder">
          <button className="nav-link">Templates</button>
        </Link>
        <Link to="/">
          <button className="nav-link">My Resumes</button>
        </Link>
      </div>
      <div className="flex items-center gap-2 relative">
        <ProfileCard />
        <MobileMenu />
      </div>
    </nav>
  )
}

function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsMenuOpen((p) => !p)}>
        <Menu size={20} />
      </button>
      {isMenuOpen && (
        <div className="w-[200px] p-2 px-4 absolute bg-white border border-border rounded-lg top-10 right-0 flex flex-col">
          <div className="w-full flex flex-col items-center text-sm font-normal text-secondary">
            <Link to="/builder" className="w-full">
              <button className="w-full py-2 border-b border-border">
                Templates
              </button>
            </Link>
            <Link to="/" className="w-full">
              <button className="w-full py-2 border-b border-border">
                My Resumes
              </button>
            </Link>
            {/* I Shall replace this when I actually setup the accounts thing for now forgive me */}
            <button className="py-2 text-red-500 flex items-center gap-2">
              <Power size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  )
}
