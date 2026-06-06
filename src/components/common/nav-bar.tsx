import { Link } from '@tanstack/react-router'
import { ProfileCard } from '../user/profile-card'

export const NavBar = () => {
  return (
    <nav className="w-full flex items-center justify-between py-4 border-b  border-b-border px-8 xl:px-0">
      <Link to="/">
        <h1 className="text-2xl font-medium">Reswork</h1>
      </Link>
      <div className="flex items-center gap-4 text-sm font-normal text-secondary">
        <Link to="/builder">
          <button className="nav-link">Templates</button>
        </Link>
        <Link to="/">
          <button className="nav-link">My Resumes</button>
        </Link>
      </div>
      <ProfileCard />
    </nav>
  )
}
