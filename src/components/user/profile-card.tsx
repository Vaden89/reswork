import { useEffect, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Navii } from '@usenavii/react'
import { useAuth } from '#/context/auth.context'
import { authClient } from '#/lib/auth-client'

export const ProfileCard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await authClient.signOut()
    setIsOpen(false)
    navigate({ to: '/' })
  }

  return (
    <div ref={menuRef} className="relative flex items-center gap-2 text-sm">
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        className="rounded-full outline-none ring-tertiary transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2"
        aria-label="Open profile menu"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <Navii
          seed={user?.id ?? 'guest'}
          size={32}
          title="Profile"
          className="rounded-full"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute right-0 top-full z-50 mt-3 w-44 origin-top-right rounded-xl border border-border bg-white p-1 shadow-lg"
            role="menu"
          >
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              role="menuitem"
            >
              <LogOut size={16} />
              {isLoggingOut ? 'Logging out...' : 'Log out'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
