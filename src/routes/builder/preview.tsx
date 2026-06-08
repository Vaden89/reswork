import { useState } from 'react'
import { NavBar } from '#/components/common/nav-bar'
import { useResumeData } from '#/hooks/use-resume-data'
import { createFileRoute } from '@tanstack/react-router'
import { SkillsForm } from '#/components/forms/skills-form'
import { EducationForm } from '#/components/forms/education-form'
import { ExperienceForm } from '#/components/forms/experience-form'
import { GeneralInfoForm } from '#/components/forms/general-info-form'
import { ResumeSectionSideBar } from '#/components/resume-section-sidebar'

export const Route = createFileRoute('/builder/preview')({
  component: RouteComponent,
})

function RouteComponent() {
  const { resumeData, setField } = useResumeData()
  const [activeSection, setActiveSection] = useState('general')

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
        <div className="col-span-3 flex flex-col p-8 px-12 overflow-y-auto">
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
        </div>
        <div className="bg-blue-300 col-span-3">
          {/*
              Placeholder till I know what I want to do here ngl
            */}
        </div>
      </section>
    </main>
  )
}
