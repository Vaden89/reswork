import { ChevronLeft, ChevronRight, Eye, SquarePen } from 'lucide-react'
import { RESUME_SECTIONS } from '#/data/templates/sections'
import type { Dispatch, SetStateAction } from 'react'

interface ResumeSectionSidebarProps {
  activeSection: string
  isOpen: boolean
  isPreviewVisible: boolean
  onToggle: () => void
  setActiveSection: Dispatch<SetStateAction<string>>
  setIsPreviewVisible: (visible: boolean) => void
}

export function ResumeSectionSideBar({
  activeSection,
  isOpen,
  isPreviewVisible,
  onToggle,
  setActiveSection,
  setIsPreviewVisible,
}: ResumeSectionSidebarProps) {
  return (
    <div
      className={`${isOpen ? 'w-48 px-3' : 'w-15 px-2'}  shrink-0 transition-all duration-200 hidden sm:flex flex-col border-r border-border py-8`}
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
              onClick={() => {
                setActiveSection(item.id)
                setIsPreviewVisible(false)
              }}
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
      <button
        type="button"
        onClick={() => setIsPreviewVisible(!isPreviewVisible)}
        className={`mt-auto lg:hidden w-full py-3 rounded cursor-pointer text-tertiary flex items-center transition-colors hover:bg-gray-100 ${
          isOpen ? 'gap-3 px-4' : 'justify-center px-0'
        }`}
      >
        {isPreviewVisible ? (
          <SquarePen size={18} className="shrink-0" />
        ) : (
          <Eye size={18} className="shrink-0" />
        )}
        {isOpen && <span>{isPreviewVisible ? 'Edit' : 'Preview'}</span>}
      </button>
    </div>
  )
}
