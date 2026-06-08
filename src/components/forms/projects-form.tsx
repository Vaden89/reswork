import { Plus, Trash2 } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '../common/button'
import { FormField } from '../common/form'
import type { SetField } from '#/hooks/use-resume-data'
import type { Project, TemplateData } from '#/types/template.type'

const EMPTY_PROJECT: Project = {
  name: '',
  live_url: '',
  description: '',
  technologies: [''],
}

interface ProjectFormProps {
  resumeData: TemplateData
  setField: SetField
}

export function ProjectsForm({ resumeData, setField }: ProjectFormProps) {
  const projects = resumeData.projects

  useEffect(() => {
    if (projects.length === 0) setField('projects', [EMPTY_PROJECT])
  }, [])

  const updateProjects = (updated: Project[]) => setField('projects', updated)

  const addProject = () => updateProjects([...projects, { ...EMPTY_PROJECT, technologies: [''] }])

  const removeProject = (i: number) =>
    updateProjects(projects.filter((_, idx) => idx !== i))

  const updateProjectField = (i: number, field: keyof Project, value: string) =>
    updateProjects(
      projects.map((proj, idx) => (idx === i ? { ...proj, [field]: value } : proj)),
    )

  const addTechnology = (i: number) =>
    updateProjects(
      projects.map((proj, idx) =>
        idx === i ? { ...proj, technologies: [...proj.technologies, ''] } : proj,
      ),
    )

  const removeTechnology = (i: number, j: number) =>
    updateProjects(
      projects.map((proj, idx) =>
        idx === i
          ? { ...proj, technologies: proj.technologies.filter((_, jdx) => jdx !== j) }
          : proj,
      ),
    )

  const updateTechnology = (i: number, j: number, value: string) =>
    updateProjects(
      projects.map((proj, idx) =>
        idx === i
          ? {
              ...proj,
              technologies: proj.technologies.map((tech, jdx) => (jdx === j ? value : tech)),
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
            variants="ghost"
            icon={<Plus size={20} />}
            iconPosition="left"
            onClick={addProject}
          >
            Add Project
          </Button>
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

interface ProjectCardProps {
  project: Project
  canRemove: boolean
  onRemove: () => void
  onUpdate: (field: keyof Project, value: string) => void
  onAddTechnology: () => void
  onRemoveTechnology: (j: number) => void
  onUpdateTechnology: (j: number, value: string) => void
}

function ProjectCard({
  project,
  canRemove,
  onRemove,
  onUpdate,
  onAddTechnology,
  onRemoveTechnology,
  onUpdateTechnology,
}: ProjectCardProps) {
  return (
    <div className="w-full p-4 border border-border flex flex-col gap-4">
      <div className="w-full flex items-start gap-2">
        <div className="flex-1 grid grid-cols-2 gap-4">
          <FormField
            label="Project Name"
            name="project_name"
            placeholder="My Awesome App"
            value={project.name}
            onChange={(e) => onUpdate('name', e.target.value)}
          />
          <FormField
            label="Live URL"
            name="live_url"
            placeholder="https://myapp.com"
            value={project.live_url}
            onChange={(e) => onUpdate('live_url', e.target.value)}
          />
        </div>
        {canRemove && (
          <button type="button" onClick={onRemove} className="text-red-500 mt-6">
            <Trash2 size={24} />
          </button>
        )}
      </div>
      <FormField
        label="Description"
        name="description"
        placeholder="A brief summary of what the project does and your role in it."
        value={project.description}
        onChange={(e) => onUpdate('description', e.target.value)}
      />
      <div className="flex flex-col gap-2">
        <span className="text-sm">Technologies</span>
        <div className="flex flex-col gap-2">
          {project.technologies.map((tech, j) => (
            <div key={j} className="flex items-center gap-2">
              <FormField
                name="technology"
                classname="flex-1"
                placeholder="e.g. React"
                value={tech}
                onChange={(e) => onUpdateTechnology(j, e.target.value)}
              />
              <button
                type="button"
                onClick={() => onRemoveTechnology(j)}
                className="text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
        <Button
          variants="ghost"
          icon={<Plus size={16} />}
          iconPosition="left"
          onClick={onAddTechnology}
        >
          Add Technology
        </Button>
      </div>
    </div>
  )
}
