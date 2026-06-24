import { Button } from './common/button'
import { FormField } from './common/form'
import { Plus, Trash2 } from 'lucide-react'
import type { Project } from '#/types/template.type'

interface ProjectCardProps {
  project: Project
  canRemove: boolean
  onRemove: () => void
  onUpdate: (field: keyof Project, value: string) => void
  onAddTechnology: () => void
  onRemoveTechnology: (j: number) => void
  onUpdateTechnology: (j: number, value: string) => void
}

export function ProjectCard({
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
          <button
            type="button"
            onClick={onRemove}
            className="text-red-500 mt-6"
          >
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
          text="Add Technology"
          variants="ghost"
          icon={<Plus size={16} />}
          iconPosition="left"
          onClick={onAddTechnology}
        />
      </div>
    </div>
  )
}
