import { Plus } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '../../common/button'
import { ProjectCard } from '../../project-card'
import type { Project } from '#/types/template.type'
import type { FormProps } from '#/types/section-forms.type'
import { EMPTY_PROJECT } from '#/data/constants/form-defaults'

export function ProjectsForm({ resumeData, setField }: FormProps) {
  const projects = resumeData.projects

  useEffect(() => {
    if (projects.length === 0) setField('projects', [EMPTY_PROJECT])
  }, [])

  const updateProjects = (updated: Project[]) => setField('projects', updated)

  const addProject = () =>
    updateProjects([...projects, { ...EMPTY_PROJECT, technologies: [''] }])

  const removeProject = (i: number) =>
    updateProjects(projects.filter((_, idx) => idx !== i))

  const updateProjectField = (i: number, field: keyof Project, value: string) =>
    updateProjects(
      projects.map((proj, idx) =>
        idx === i ? { ...proj, [field]: value } : proj,
      ),
    )

  const addTechnology = (i: number) =>
    updateProjects(
      projects.map((proj, idx) =>
        idx === i
          ? { ...proj, technologies: [...proj.technologies, ''] }
          : proj,
      ),
    )

  const removeTechnology = (i: number, j: number) =>
    updateProjects(
      projects.map((proj, idx) =>
        idx === i
          ? {
              ...proj,
              technologies: proj.technologies.filter((_, jdx) => jdx !== j),
            }
          : proj,
      ),
    )

  const updateTechnology = (i: number, j: number, value: string) =>
    updateProjects(
      projects.map((proj, idx) =>
        idx === i
          ? {
              ...proj,
              technologies: proj.technologies.map((tech, jdx) =>
                jdx === j ? value : tech,
              ),
            }
          : proj,
      ),
    )

  return (
    <>
      <div className="flex flex-col pb-5 border-b border-border">
        <span className="text-4xl font-semibold">Projects</span>
        <p className="text-sm text-secondary">
          Showcase your most impactful work and personal projects.
        </p>
      </div>
      <div className="w-full flex flex-col gap-4 mt-5">
        <div className="w-full flex items-center justify-between">
          <span className="text-2xl font-medium">Projects</span>
          <Button
            text="Add Project"
            variants="ghost"
            icon={<Plus size={20} />}
            iconPosition="left"
            onClick={addProject}
          />
        </div>
        {projects.map((proj, i) => (
          <ProjectCard
            key={i}
            project={proj}
            canRemove={projects.length > 1}
            onRemove={() => removeProject(i)}
            onUpdate={(field, value) => updateProjectField(i, field, value)}
            onAddTechnology={() => addTechnology(i)}
            onRemoveTechnology={(j) => removeTechnology(i, j)}
            onUpdateTechnology={(j, value) => updateTechnology(i, j, value)}
          />
        ))}
      </div>
    </>
  )
}
