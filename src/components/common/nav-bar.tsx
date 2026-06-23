import { Link, useLocation } from '@tanstack/react-router'
import { ProfileCard } from '../user/profile-card'
import { desktopMenu } from '#/data/constants/menu'
import { MobileMenu } from '../nav/mobile-menu'

export const NavBar = () => {
  const { pathname } = useLocation()
  const fullWidth = pathname.startsWith('/builder/preview')

  return (
    <nav className="w-full flex justify-center">
      <div
        className={`w-full flex items-center justify-between py-4 px-3  border-b border-b-border  ${fullWidth ? 'sm:px-8' : 'max-w-6xl xl:px-0'}`}
      >
        <Link to="/">
          <h1 className="text-3xl font-semibold sm:font-medium">Reswork</h1>
        </Link>
        <DesktopMenu />
        <div className="flex items-center gap-2 relative">
          <ProfileCard />
          <MobileMenu />
        </div>
      </div>
    </nav>
  )
}

function DesktopMenu() {
  return (
    <div className="hidden sm:flex items-center gap-4 text-sm font-normal text-secondary">
      {desktopMenu.map((link) => (
        <Link key={link.label} to={link.path}>
          <button className="nav-link">{link.label}</button>
        </Link>
      ))}
    </div>
  )
}
