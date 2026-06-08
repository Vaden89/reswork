import { useEffect, useState } from 'react'
import { NavBar } from '#/components/common/nav-bar'
import { useResumeData } from '#/hooks/use-resume-data'
import { createFileRoute } from '@tanstack/react-router'
import { SkillsForm } from '#/components/forms/skills-form'
import { EducationForm } from '#/components/forms/education-form'
import { ExperienceForm } from '#/components/forms/experience-form'
import { GeneralInfoForm } from '#/components/forms/general-info-form'
import { ResumeSectionSideBar } from '#/components/resume-section-sidebar'
import { Button } from '#/components/common/button'
import { Download } from 'lucide-react'
import { usePDF } from '@react-pdf/renderer'
import { Template1 } from '#/components/templates/template-1'
import { useDebounce } from '#/hooks/use-debounce'
import { ProjectsForm } from '#/components/forms/projects-form'

export const Route = createFileRoute('/builder/preview')({
  component: RouteComponent,
})

function RouteComponent() {
  const { resumeData, setField } = useResumeData()
  const [activeSection, setActiveSection] = useState('general')

  const debouncedResumeData = useDebounce(resumeData, 600)
  const [instance, updatePDF] = usePDF()

  useEffect(() => {
    updatePDF(<Template1 data={debouncedResumeData} />)
  }, [debouncedResumeData, updatePDF])

  return (
    <main className="w-full flex-1 flex flex-col">
      <header>
        <NavBar />
      </header>
      <section className="w-full flex-1 grid grid-cols-7">
        <ResumeSectionSideBar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <div className="col-span-3 flex flex-col p-8 px-12 overflow-y-auto h-[80vh]">
          {activeSection === 'general' && (
            <GeneralInfoForm resumeData={resumeData} setField={setField} />
          )}
          {activeSection === 'skills' && (
            <SkillsForm resumeData={resumeData} setField={setField} />
          )}
          {activeSection === 'experience' && (
            <ExperienceForm resumeData={resumeData} setField={setField} />
          )}
          {activeSection === 'education' && (
            <EducationForm resumeData={resumeData} setField={setField} />
          )}
          {activeSection === 'projects' && (
            <ProjectsForm resumeData={resumeData} setField={setField} />
          )}
        </div>
        <div className="col-span-3 flex flex-col">
          <div className="py-5 px-4 flex items-center justify-between border-b border-border">
            <span className="text-lg text-secondary font-medium">
              LIVE PREVIEW
            </span>
            <Button
              icon={<Download size={20} />}
              iconPosition="left"
              className="px-4 text-[13px] py-2"
              onClick={() => {
                if (!instance.url) return
                const a = document.createElement('a')
                a.href = instance.url
                a.download = 'resume.pdf'
                a.click()
              }}
            >
              Export PDF
            </Button>
          </div>
          <div className="flex-1 border-l border-border relative">
            {instance.loading && (
              <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 pointer-events-none">
                <span className="text-sm text-secondary">
                  Updating preview…
                </span>
              </div>
            )}
            <iframe
              title="PDF Preview"
              src={instance.url ? `${instance.url}#toolbar=1` : undefined}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
