import { useResume } from '#/hooks/use-resumes'
import { useDebounce } from '#/hooks/use-debounce'
import { useEffect, useRef, useState } from 'react'
import { Button } from '#/components/common/button'
import { FileText, LayoutGrid } from 'lucide-react'
import { FormField } from '#/components/common/form'
import { useResumeData } from '#/hooks/use-resume-data'
import type { SectionId } from '#/data/templates/sections'
import { useDataSource } from '#/context/data-source.context'
import { SkillsForm } from '#/components/forms/skills/skills-form'
import { FormNavigation } from '#/components/forms/form-navigation'
import { GeneralInfoForm } from '#/components/forms/general-info-form'
import { ProjectsForm } from '#/components/forms/projects/projects-form'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { EducationForm } from '#/components/forms/education/education-form'
import { ExperienceForm } from '#/components/forms/experience/experience-form'
import { PdfPreviewSection } from '#/components/builder/pdf-preview-section'
import { ResumeSectionTopBar } from '#/components/builder/resume-section-topbar'
import { ResumeSectionSideBar } from '#/components/builder/resume-section-sidebar'

export const Route = createFileRoute('/builder/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id: resumeId } = useParams({ from: '/builder/$id' })
  const resume = useResume(resumeId)

  const { repository } = useDataSource()
  const { updateResumeData, renameResume } = repository

  const [title, setTitle] = useState('')
  const debouncedTitle = useDebounce(title, 600)
  const { resumeData, dispatch } = useResumeData()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const previewResumeData = useDebounce(resumeData, 300)
  const debouncedResumeData = useDebounce(resumeData, 600)
  const [activeSection, setActiveSection] = useState<SectionId>('general')
  const [isPreviewVisible, setIsPreviewVisible] = useState(false)

  const hydratedId = useRef<string | null>(null)
  useEffect(() => {
    if (resume && hydratedId.current !== resumeId) {
      dispatch({ type: 'SET_RESUME_DATA', data: resume.data })
      setTitle(resume.title)
      hydratedId.current = resumeId
    }
  }, [resume, resumeId, dispatch])

  useEffect(() => {
    if (hydratedId.current !== resumeId) return
    updateResumeData(resumeId, debouncedResumeData)
  }, [debouncedResumeData, resumeId, updateResumeData])

  useEffect(() => {
    if (hydratedId.current !== resumeId) return
    renameResume(resumeId, debouncedTitle)
  }, [debouncedTitle, resumeId, renameResume])

  if (!resume)
    return (
      <div className="flex-1 flex flex-col gap-3 items-center justify-center">
        <FileText size={64} />
        <span className="text-2xl font-semibold">Resume Not Found</span>
        <p className="text-sm text-secondary text-center">
          The document you're trying to access does not exist cause the id
          provided is invalid, or has been deleted.
        </p>
        <Link to="/builder/templates">
          <Button
            text="Browse Templates"
            icon={<LayoutGrid size={16} />}
            className="py-2"
          />
        </Link>
      </div>
    )

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
            className={`${isPreviewVisible ? 'hidden lg:flex' : 'flex'} flex-1 min-h-0 flex-col py-4 px-4 min-[1440px]:px-8 overflow-y-auto short:max-h-dvh short:h-full lg:h-[80vh] noscroll`}
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
              <GeneralInfoForm dispatch={dispatch} resumeData={resumeData} />
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

            <FormNavigation
              section={activeSection}
              setActiveSection={setActiveSection}
              setIsPreviewVisible={setIsPreviewVisible}
            />
          </div>

          <PdfPreviewSection
            title={title}
            resumeId={resumeId}
            templateId={resume.template_id}
            previewData={previewResumeData}
            isPreviewVisible={isPreviewVisible}
          />
        </div>
      </section>
    </main>
  )
}
