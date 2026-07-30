import { Button } from '../common/button'
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react'
import { RESUME_SECTIONS } from '#/data/templates/sections'

import type { Dispatch, SetStateAction } from 'react'
import type { SectionId } from '#/data/templates/sections'

interface FormNavigationProps {
  section: SectionId
  setActiveSection: Dispatch<SetStateAction<SectionId>>
  setIsPreviewVisible: (visible: boolean) => void
}

export function FormNavigation({
  section,
  setActiveSection,
  setIsPreviewVisible,
}: FormNavigationProps) {
  const index = RESUME_SECTIONS.findIndex((s) => s.id === section)
  const prev = RESUME_SECTIONS[index - 1]
  const next = RESUME_SECTIONS[index + 1]

  return (
    <div className="mt-8 flex items-center justify-between sm:hidden">
      {prev ? (
        <Button
          text="Back"
          variants="ghost"
          iconPosition="left"
          className="py-2"
          icon={<ArrowLeft size={18} />}
          onClick={() => setActiveSection(prev.id)}
        />
      ) : (
        <span />
      )}
      {next ? (
        <Button
          text="Next"
          className="py-2"
          icon={<ArrowRight size={18} />}
          onClick={() => setActiveSection(next.id)}
        />
      ) : (
        <Button
          text="Preview"
          className="py-2"
          icon={<Eye size={18} />}
          onClick={() => setIsPreviewVisible(true)}
        />
      )}
    </div>
  )
}
