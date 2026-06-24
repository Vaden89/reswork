import { Trash2 } from 'lucide-react'
import { FormField, FormSelect } from '../../common/form'
import type { Education } from '#/types/template.type'
import { DEGREE_TYPES } from '#/data/constants/degree-types'

export interface EducationCardProps {
  edu: Education
  canRemove: boolean
  onRemove: () => void
  onUpdate: (field: keyof Education, value: string) => void
}

export function EducationCard({
  edu,
  canRemove,
  onRemove,
  onUpdate,
}: EducationCardProps) {
  return (
    <div className="w-full p-4 border border-border flex flex-col gap-4">
      <div className="w-full flex items-start gap-2">
        <div className="flex-1 grid grid-cols-2 gap-2 sm:gap-4">
          <FormField
            label="School"
            name="school"
            placeholder="University of Lagos"
            value={edu.school}
            onChange={(e) => onUpdate('school', e.target.value)}
          />
          <FormField
            label="Location"
            name="location"
            placeholder="Lagos, Nigeria"
            value={edu.location}
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
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <FormSelect
          label="Degree Type"
          name="degree_type"
          options={DEGREE_TYPES}
          value={edu.degree_type}
          onChange={(e) => onUpdate('degree_type', e.target.value)}
        />
        <FormField
          label="Course / Major"
          name="course"
          placeholder="Computer Science"
          value={edu.course}
          onChange={(e) => onUpdate('course', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
        <FormField
          label="Start Date"
          name="start_date"
          placeholder="Sep 2018"
          value={edu.start_date}
          onChange={(e) => onUpdate('start_date', e.target.value)}
        />
        <FormField
          label="End Date"
          name="end_date"
          placeholder="Jun 2022"
          value={edu.end_date}
          onChange={(e) => onUpdate('end_date', e.target.value)}
        />
        <FormField
          name="gpa"
          label="GPA"
          value={edu.gpa}
          placeholder="4.0"
          classname="col-span-2 sm:col-span-1"
          onChange={(e) => onUpdate('gpa', e.target.value)}
        />
      </div>
    </div>
  )
}
