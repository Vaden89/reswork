import { Plus } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '../../common/button'
import { ProjectCard } from '../../project-card'
import type { Project } from '#/types/template.type'
import type { FormProps } from '#/types/section-forms.type'

export function ProjectsForm({ resumeData, dispatch }: FormProps) {
  const projects = resumeData.projects

  useEffect(() => {
    if (projects.length === 0) dispatch({ type: 'ADD_PROJECT' })
  }, [])

  const addProject = () => dispatch({ type: 'ADD_PROJECT' })

  const removeProject = (i: number) =>
    dispatch({ type: 'REMOVE_PROJECT', index: i })

  const updateProjectField = (i: number, field: keyof Project, value: string) =>
    dispatch({ type: 'UPDATE_PROJECT', index: i, field, value })

  const addTechnology = (i: number) =>
    dispatch({ type: 'ADD_TECHNOLOGY', index: i })

  const removeTechnology = (i: number, j: number) =>
    dispatch({ type: 'REMOVE_TECHNOLOGY', projIndex: i, techIndex: j })

  const updateTechnology = (i: number, j: number, value: string) =>
    dispatch({
      type: 'UPDATE_TECHNOLOGY',
      projIndex: i,
      techIndex: j,
      value,
    })

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
