import { Trash2, Plus } from 'lucide-react'
import { FormField } from '../../common/form'
import { Button } from '../../common/button'
import type { WorkExperience } from '#/types/template.type'
import { ResponsibilityInput } from './responsibility-input'

export interface WorkExperienceCardProps {
  exp: WorkExperience
  canRemove: boolean
  onRemove: () => void
  onAddResponsibility: () => void
  onRemoveResponsibility: (rspIdx: number) => void
  onUpdate: (field: keyof WorkExperience, value: string) => void
  onUpdateResponsibility: (rspIdx: number, value: string) => void
}

export function WorkExperienceCard({
  exp,
  canRemove,
  onRemove,
  onUpdate,
  onAddResponsibility,
  onUpdateResponsibility,
  onRemoveResponsibility,
}: WorkExperienceCardProps) {
  return (
    <div className="w-full p-4 border border-border flex flex-col gap-4">
      <div className="w-full flex items-start gap-2">
        <div className="flex-1 grid grid-cols-2 gap-4">
          <FormField
            label="Company"
            name="company"
            placeholder="Acme Corp"
            value={exp.company}
            onChange={(e) => onUpdate('company', e.target.value)}
          />
          <FormField
            label="Location"
            name="location"
            placeholder="Lagos, Nigeria"
            value={exp.location}
            onChange={(e) => onUpdate('location', e.target.value)}
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
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <FormField
          name="position"
          label="Job Title"
          value={exp.position}
          placeholder="Software Engineer"
          classname="col-span-2 sm:col-span-1"
          onChange={(e) => onUpdate('position', e.target.value)}
        />
        <FormField
          label="Start Date"
          name="start_date"
          placeholder="Jan 2022"
          value={exp.start_date}
          onChange={(e) => onUpdate('start_date', e.target.value)}
        />
        <FormField
          label="End Date"
          name="end_date"
          placeholder="Present"
          value={exp.end_date}
          onChange={(e) => onUpdate('end_date', e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm">Responsibilities</span>
        <div className="flex flex-col gap-2">
          {exp.responsibilities.map((rsp, j) => (
            <ResponsibilityInput
              key={j}
              value={rsp}
              onChange={(value) => onUpdateResponsibility(j, value)}
              onRemove={() => onRemoveResponsibility(j)}
            />
          ))}
        </div>
        <Button
          text="Add Responsibility"
          variants="ghost"
          icon={<Plus size={16} />}
          iconPosition="left"
          onClick={onAddResponsibility}
        />
      </div>
    </div>
  )
}
