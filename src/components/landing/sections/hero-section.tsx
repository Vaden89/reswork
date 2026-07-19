import { Button } from '#/components/common/button'
import { ArrowRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import type { Variants } from 'motion'
import { useAuth } from '#/context/auth.context'

const stagger: Variants = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const fadeUp: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const HeroSection = () => {
  const { user } = useAuth()
  const isAuthenticated = user?.type === 'authenticated'

  return (
    <section className="max-w-6xl px-4 sm:px-8 xl:px-0 w-full flex justify-between items-center mt-12 gap-10">
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="sm:w-1/2 flex flex-col gap-5"
      >
        <motion.h1
          variants={fadeUp}
          className="text-5xl sm:text-6xl font-bold tracking-tight leading-[0.95]"
        >
          Build your professional future.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="text-secondary text-xl sm:text-2xl font-semibold"
        >
          Precision and simplicity for modern professional. Construct a document
          that reflects your structural value
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center gap-3"
        >
          <Link to="/builder/templates">
            <Button
              text="START BUILDING"
              icon={<ArrowRight size={16} />}
              className="py-2 px-5"
            />
          </Link>
          {isAuthenticated ? (
            <Link to="/resumes">
              <Button
                text="MY RESUMES"
                variants="ghost"
                className="py-2 px-5 border border-primary text-primary"
              />
            </Link>
          ) : (
            <Link to="/sign-up">
              <Button
                text="CREATE FREE ACCOUNT"
                variants="ghost"
                className="py-2 px-5 border border-primary text-primary"
              />
            </Link>
          )}
        </motion.div>
        {!isAuthenticated && (
          <motion.span variants={fadeUp} className="text-sm text-secondary">
            No account needed to try — sign up to sync your work and get 10 free
            AI tokens.
          </motion.span>
        )}
      </motion.div>
      <img
        src="/images/landing.svg"
        alt="Resume builder illustration"
        className="w-1/2 aspect-auto hidden sm:flex"
        fetchPriority="high"
      />
    </section>
  )
}
