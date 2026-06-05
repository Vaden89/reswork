import { ProfileCard } from '../user/profile-card'

export const NavBar = () => {
  return (
    <nav className="w-full flex items-center justify-between py-4 border-b  border-b-border px-8 xl:px-0">
      <h1 className="text-2xl font-medium">Reswork</h1>
      <div className="flex items-center gap-4 text-sm font-normal text-secondary">
        <button>Templates</button>
        <button>My Resumes</button>
      </div>
      <ProfileCard />
    </nav>
  )
}
