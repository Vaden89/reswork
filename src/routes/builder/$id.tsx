import { useEffect, useRef, useState } from 'react'
import { useResumeData } from '#/hooks/use-resume-data'
import { useResume } from '#/hooks/use-resumes'
import { useDataSource } from '#/context/data-source.context'
import { createFileRoute, useParams } from '@tanstack/react-router'
import { SkillsForm } from '#/components/forms/skills/skills-form'
import { EducationForm } from '#/components/forms/education/education-form'
import { ExperienceForm } from '#/components/forms/experience/experience-form'
import { GeneralInfoForm } from '#/components/forms/general-info-form'
import { ResumeSectionSideBar } from '#/components/builder/resume-section-sidebar'
import { Button } from '#/components/common/button'
import { Download } from 'lucide-react'
import { usePDF } from '@react-pdf/renderer'
import { Template1 } from '#/components/templates/template-1'
import { useDebounce } from '#/hooks/use-debounce'
import { ProjectsForm } from '#/components/forms/projects/projects-form'
import { ResumeSectionTopBar } from '#/components/builder/resume-section-topbar'
import { FormField } from '#/components/common/form'

export const Route = createFileRoute('/builder/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id: resumeId } = useParams({ from: '/builder/$id' })
  const resume = useResume(resumeId)

  const { repository } = useDataSource()
  const { updateResumeData, renameResume } = repository

  const [instance, updatePDF] = usePDF()
  const [title, setTitle] = useState('')
  const debouncedTitle = useDebounce(title, 600)
  const { resumeData, dispatch } = useResumeData()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const debouncedResumeData = useDebounce(resumeData, 600)
  const [activeSection, setActiveSection] = useState('general')
  const [isPreviewVisible, setIsPreviewVisible] = useState(true)

  const hydratedId = useRef<string | null>(null)
  useEffect(() => {
    if (resume && hydratedId.current !== resumeId) {
      dispatch({ type: 'SET_RESUME_DATA', data: resume.data })
      setTitle(resume.title)
      hydratedId.current = resumeId
    }
  }, [resume, resumeId, dispatch])

  useEffect(() => {
    updatePDF(<Template1 data={debouncedResumeData} />)
  }, [debouncedResumeData, updatePDF])

  useEffect(() => {
    if (hydratedId.current !== resumeId) return
    updateResumeData(resumeId, debouncedResumeData)
  }, [debouncedResumeData, resumeId, updateResumeData])

  useEffect(() => {
    if (hydratedId.current !== resumeId) return
    renameResume(resumeId, debouncedTitle)
  }, [debouncedTitle, resumeId, renameResume])

  return (
    <main className="w-full flex-1 flex flex-col min-h-0">
      <ResumeSectionTopBar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isPreviewVisible={isPreviewVisible}
        setIsPreviewVisible={setIsPreviewVisible}
      />
      <section className="w-full flex-1 flex min-h-0 overflow-hidden">
        <ResumeSectionSideBar
          isOpen={sidebarOpen}
          activeSection={activeSection}
          isPreviewVisible={isPreviewVisible}
          setActiveSection={setActiveSection}
          setIsPreviewVisible={setIsPreviewVisible}
          onToggle={() => setSidebarOpen((prev) => !prev)}
        />
        <div className="flex-1 min-h-0 flex flex-col lg:grid lg:grid-cols-2 overflow-hidden">
          <div
            className={`${isPreviewVisible ? 'hidden lg:flex' : 'flex'} flex-1 min-h-0 flex-col py-4 px-4 min-[1440px]:px-8 overflow-y-auto lg:h-[80vh] noscroll`}
          >
            <FormField
              classname="mb-5"
              name="Resume Name"
              label="Resume Name"
              value={title}
              inputClassName="bg-transparent"
              onChange={(e) => setTitle(e.target.value)}
            />

            {activeSection === 'general' && (
              <GeneralInfoForm resumeData={resumeData} dispatch={dispatch} />
            )}
            {activeSection === 'skills' && (
              <SkillsForm resumeData={resumeData} dispatch={dispatch} />
            )}
            {activeSection === 'experience' && (
              <ExperienceForm resumeData={resumeData} dispatch={dispatch} />
            )}
            {activeSection === 'education' && (
              <EducationForm resumeData={resumeData} dispatch={dispatch} />
            )}
            {activeSection === 'projects' && (
              <ProjectsForm resumeData={resumeData} dispatch={dispatch} />
            )}
          </div>

          <div
            className={`${isPreviewVisible ? 'flex' : 'hidden lg:flex'} flex-1 min-h-0 flex-col`}
          >
            <div className="py-2 xl:py-5 px-2 xl:px-4 flex items-center justify-between border-b border-border">
              <span className="text-lg text-secondary font-medium">
                LIVE PREVIEW
              </span>
              <Button
                text="Export PDF"
                icon={<Download size={20} />}
                iconPosition="left"
                className="px-4 text-[13px] py-2"
                onClick={() => {
                  if (!instance.url) return
                  const a = document.createElement('a')
                  a.href = instance.url
                  a.download = `${title}.pdf`
                  a.click()
                }}
              />
            </div>
            <div className="flex-1 min-h-0 border-l border-border relative">
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
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
