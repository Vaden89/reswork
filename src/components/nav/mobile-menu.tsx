import { Link, useLocation } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { mobileMenu } from '#/data/constants/menu'
import { MobileNavLink } from './mobile-nav-link'
import { AnimatePresence, motion } from 'motion/react'

export const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = useLocation({ select: (location: any) => location.pathname })

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

  return (
    <>
      <button onClick={() => setIsMenuOpen((p) => !p)}>
        <Menu size={20} />
      </button>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.2, duration: 0.5 } }}
            className="w-screen h-full bg-neutral fixed inset-0 flex flex-col justify-between p-4 px-3"
          >
            <div className="w-full flex items-center justify-between">
              <Link to="/">
                <h1 className="text-3xl font-semibold sm:font-medium">
                  Reswork
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
            <div className="h-10 border-t border-border" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
