import { Link } from '@tanstack/react-router'
import { ProfileCard } from '../user/profile-card'
import { desktopMenu } from '#/data/constants/menu'
import { MobileMenu } from '../nav/mobile-menu'

export const NavBar = () => {
  return (
    <nav className="w-full flex items-center justify-between py-4 border-b border-b-border sm:px-8 px-3">
      <Link to="/">
        <h1 className="text-3xl font-semibold sm:font-medium">Reswork</h1>
      </Link>
      <div className="hidden sm:flex items-center gap-4 text-sm font-normal text-secondary">
        {desktopMenu.map((link) => (
          <Link key={link.label} to={link.path}>
            <button className="nav-link">{link.label}</button>
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2 relative">
        <ProfileCard />
        <MobileMenu />
      </div>
    </nav>
  )
}
