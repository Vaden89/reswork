import { Link, useLocation } from '@tanstack/react-router'
import { ProfileCard } from '../user/profile-card'
import { desktopMenu } from '#/data/constants/menu'
import { MobileMenu } from '../nav/mobile-menu'
import { Button } from './button'
import { useAuth } from '#/context/auth.context'

export const NavBar = () => {
  const { pathname } = useLocation()
  const fullWidth =
    pathname.startsWith('/builder/') &&
    !pathname.startsWith('/builder/templates')

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
          <AuthActions />
          <MobileMenu />
        </div>
      </div>
    </nav>
  )
}

function AuthActions() {
  const { user, isLoading } = useAuth()

  if (isLoading) return null

  if (user?.type === 'authenticated') return <ProfileCard />

  return (
    <div className="hidden sm:flex items-center gap-4">
      <Link to="/login">
        <button className="nav-link text-sm text-secondary">Log in</button>
      </Link>
      <Link to="/sign-up">
        <Button text="SIGN UP" className="py-1.5 px-4" />
      </Link>
    </div>
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
