import { useState } from 'react'
import { capitalizeFirst } from '#/utils/string'
import type { Dispatch, SetStateAction } from 'react'
import { RESUME_SECTIONS } from '#/data/templates/sections'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

interface ResumeSectionSidebarProps {
  activeSection: string
  isOpen: boolean
  onToggle: () => void
  setActiveSection: Dispatch<SetStateAction<string>>
}

export function ResumeSectionSideBar({
  activeSection,
  isOpen,
  onToggle,
  setActiveSection,
}: ResumeSectionSidebarProps) {
  return (
    <aside
      className={`${isOpen ? 'w-48 px-3' : 'w-15 px-2'} hidden shrink-0 transition-all duration-200 sm:flex flex-col border-r border-border py-8`}
    >
      <div
        className={`flex ${isOpen ? 'items-center justify-between' : 'justify-center'}`}
      >
        {isOpen && (
          <div className="flex flex-col">
            <span className="font-semibold text-xl">Editor</span>
            <span className="text-sm text-secondary">Resume Section</span>
          </div>
        )}
        <button
          type="button"
          onClick={onToggle}
          className="text-secondary hover:text-primary transition-colors mt-1"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      <div className="mt-10 flex flex-col gap-1 w-full">
        {RESUME_SECTIONS.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          return (
            <div
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full py-3 rounded cursor-pointer text-tertiary flex items-center transition-colors ${
                isOpen ? 'gap-3 px-4' : 'justify-center px-0'
              } ${isActive ? 'bg-primary text-white font-medium' : 'hover:bg-gray-100'}`}
            >
              <Icon size={18} className="shrink-0" />
              {isOpen && <span>{item.label}</span>}
            </div>
          )
        })}
      </div>
    </aside>
  )
}

export function ResumeSectionDropDown({
  activeSection,
  setActiveSection,
}: Partial<ResumeSectionSidebarProps>) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  return (
    <div className="flex items-center justify-between py-3 px-3 w-full border-b border-border relative">
      <div className="relative">
        <button
          onClick={() => setIsDropDownOpen((p) => !p)}
          className="flex items-center justify-start"
        >
          <span className="w-28 text-start pl-2">
            {capitalizeFirst(activeSection ?? '')}
          </span>
          <ChevronDown size={18} />
        </button>

        {isDropDownOpen && (
          <div className="absolute flex items-start flex-col top-8 bg-white w-full rounded-lg px-4 frosted-glass">
            {RESUME_SECTIONS.map((section) => {
              return (
                <button
                  key={section.id}
                  className="py-1 text-sm"
                  onClick={() => {
                    setIsDropDownOpen(false)
                    setActiveSection!(section.id)
                  }}
                >
                  {section.label}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
