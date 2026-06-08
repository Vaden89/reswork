import { RESUME_SECTIONS } from '#/data/templates/sections'
import type { Dispatch, SetStateAction } from 'react'

interface ResumeSectionSidebarProps {
  activeSection: string
  setActiveSection: Dispatch<SetStateAction<string>>
}

export function ResumeSectionSideBar({
  activeSection,
  setActiveSection,
}: ResumeSectionSidebarProps) {
  return (
    <div className="flex flex-col px-4 py-8 border-r border-border">
      <div className="flex flex-col">
        <span className="font-semibold text-xl">Editor</span>
        <span className="text-sm text-secondary">Resume Section</span>
      </div>
      <div className="mt-10 flex flex-col">
        {RESUME_SECTIONS.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          return (
            <div
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full px-4 py-3 justify-start rounded cursor-pointer text-tertiary flex items-center gap-4 transition-colors ${
                isActive
                  ? 'bg-primary text-white font-medium'
                  : 'hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </div>
          )
        })}
      </div>
    </div>
  )
}
