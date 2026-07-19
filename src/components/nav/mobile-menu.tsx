import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { mobileMenu } from '#/data/constants/menu'
import { MobileNavLink } from './mobile-nav-link'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '../common/button'
import { useAuth } from '#/context/auth.context'
import { authClient } from '#/lib/auth-client'

export const MobileMenu = () => {
  const { user } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isAuthenticated = user?.type === 'authenticated'

  const listVariant = {
    animate: {
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.07,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const handleLogout = async () => {
    await authClient.signOut()
    navigate({ to: '/' })
    setIsMenuOpen(false)
  }

  return (
    <>
      <button className="sm:hidden" onClick={() => setIsMenuOpen((p) => !p)}>
        <Menu size={20} />
      </button>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.2, duration: 0.5 } }}
            className="w-screen h-full bg-neutral fixed inset-0 flex flex-col justify-between p-4 px-3 z-51"
          >
            <div className="w-full flex items-center justify-between">
              <Link to="/">
                <h1 className="text-3xl font-semibold sm:font-medium">
                  Res<span className="text-accent">work</span>
                </h1>
              </Link>
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={28} />
              </button>
            </div>
            <motion.div
              variants={listVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col gap-4"
            >
              {mobileMenu.map((link) => (
                <MobileNavLink
                  key={link.label}
                  link={link}
                  active={pathname === link.path}
                  onNavigate={() => setIsMenuOpen(false)}
                />
              ))}
            </motion.div>

            {isAuthenticated ? (
              <div className="border-t pt-5 border-border">
                <Button
                  text="LOG OUT"
                  onClick={handleLogout}
                  className="py-3 w-full text-red-500 bg-transparent border border-red-500"
                />
              </div>
            ) : (
              <GuestFooter onClick={() => setIsMenuOpen(false)} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function GuestFooter({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex flex-col gap-4 pt-5 pb-2 border-t border-border">
      <span className="text-xs tracking-[0.2em] text-accent">
        SYNC YOUR RESUMES · 10 FREE AI TOKENS
      </span>
      <div className="flex items-center gap-3">
        <Link to="/sign-up" className="flex-1" onClick={onClick}>
          <Button text="CREATE FREE ACCOUNT" className="w-full py-3" />
        </Link>
        <Link to="/login" className="flex-1" onClick={onClick}>
          <Button
            text="LOG IN"
            variants="ghost"
            className="w-full py-3 border border-primary text-primary"
          />
        </Link>
      </div>
    </div>
  )
}
