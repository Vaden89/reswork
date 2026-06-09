import { Copyright } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="w-full flex bg-dark-gray items-center justify-center">
      <div className="w-full max-w-6xl flex items-baseline-last sm:items-center justify-between py-5 min-[1440px]:py-8  px-3 sm:px-10 xl:px-0 text-xs text-secondary">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-primary text-[13px] font-semibold">
            RESWORK
          </span>
          <div className="flex items-center gap-1">
            <Copyright size={12} />
            <span>2026 RESWORK Resume Builder</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Help</span>
        </div>
      </div>
    </footer>
  )
}
