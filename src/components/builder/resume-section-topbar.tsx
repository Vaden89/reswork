import { ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from '../common/button'
import { capitalizeFirst } from '#/utils/string'
import { useState } from 'react'
import { RESUME_SECTIONS } from '#/data/templates/sections'
import { AnimatePresence, motion } from 'motion/react'
import type { Variants } from 'motion'

interface ResumeSectionTopBarProps {
  activeSection: string
  isPreviewVisible: boolean
  setActiveSection: (section: string) => void
  setIsPreviewVisible: (visible: boolean) => void
}

export function ResumeSectionTopBar({
  activeSection,
  setActiveSection,
  isPreviewVisible,
  setIsPreviewVisible,
}: ResumeSectionTopBarProps) {
  return (
    <div className="w-full flex sm:hidden items-center justify-between py-3 px-2 border-border border-b">
      <SectionDropDown
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <Button
        variants="ghost"
        text={isPreviewVisible ? 'HIDE PREVIEW' : 'PREVIEW'}
        onClick={() => setIsPreviewVisible(!isPreviewVisible)}
      />
    </div>
  )
}

const listVariant: Variants = {
  initial: {
    opacity: 0,
    y: -8,
    transition: { when: 'afterChildren' },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 40,
      delayChildren: 0.05,
      staggerChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.15,
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
}

const itemVariant: Variants = {
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -8 },
}

function SectionDropDown({
  activeSection,
  setActiveSection,
}: Partial<ResumeSectionTopBarProps>) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        className="flex items-center gap-5"
      >
        <span className="w-24 text-left">
          {capitalizeFirst(activeSection!)}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-10"
            />
            <motion.div
              variants={listVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute top-full left-0 z-20 mt-2 w-48 origin-top rounded-md border border-border bg-neutral p-2 shadow-lg"
            >
              {RESUME_SECTIONS.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    variants={itemVariant}
                    onClick={() => {
                      setActiveSection(item.id)
                      setIsOpen(false)
                    }}
                    className={`flex w-full items-center gap-3 rounded px-3 py-2.5 text-left transition-colors ${
                      isActive
                        ? 'bg-primary text-white font-medium'
                        : 'text-tertiary hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} className="shrink-0" />
                    <span>{item.label}</span>
                  </motion.button>
                )
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
