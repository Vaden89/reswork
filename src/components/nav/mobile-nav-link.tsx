import { Link } from '@tanstack/react-router'
import { motion, type Variants } from 'motion/react'
import type { mobileMenu } from '#/data/constants/menu'

type Props = {
  link: (typeof mobileMenu)[0]
  active: boolean
  onNavigate?: () => void
}

const itemVariant: Variants = {
  initial: {
    opacity: 0,
    y: -10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 1000,
      damping: 60,
      velocity: -100,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
  },
}

export const MobileNavLink = ({ link, active, onNavigate }: Props) => {
  return (
    <motion.div variants={itemVariant}>
      <Link to={link.path} onClick={onNavigate}>
        <button
          className={`text-5xl font-semibold ${active ? 'text-black' : 'text-secondary'}`}
        >
          {link.label}
        </button>
      </Link>
    </motion.div>
  )
}
