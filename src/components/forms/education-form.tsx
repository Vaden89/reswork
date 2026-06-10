import { useEffect } from 'react'
import { Button } from '../common/button'
import { Plus, Trash2 } from 'lucide-react'
import { FormField, FormSelect } from '../common/form'
import type { SetField } from '#/hooks/use-resume-data'
import { DEGREE_TYPES } from '#/data/constants/degree-types'
import { EMPTY_EDUCATION } from '#/data/constants/form-defaults'
import type { Education, TemplateData } from '#/types/template.type'

interface EducationFormProps {
  resumeData: TemplateData
  setField: SetField
}

export const EducationForm = ({ resumeData, setField }: EducationFormProps) => {
  const education = resumeData.education

  useEffect(() => {
    if (education.length === 0) setField('education', [EMPTY_EDUCATION])
  }, [])

  const updateEducation = (updated: Education[]) =>
    setField('education', updated)

  const addEducation = () => updateEducation([...education, EMPTY_EDUCATION])

  const removeEducation = (i: number) =>
    updateEducation(education.filter((_, idx) => idx !== i))

  const updateEducationField = (
    i: number,
    field: keyof Education,
    value: string,
  ) =>
    updateEducation(
      education.map((edu, idx) =>
        idx === i ? { ...edu, [field]: value } : edu,
      ),
    )

  return (
    <>
      <div className="flex flex-col pb-5 border-b border-border">
        <span className="text-4xl font-semibold">Education</span>
        <p className="text-sm text-secondary">
          Add your academic background starting with the most recent.
        </p>
      </div>
      <div className="w-full flex flex-col gap-4 mt-5">
        <div className="w-full flex items-center justify-between">
          <span className="text-2xl font-medium">Degrees</span>
          <Button
            text="Add Degree"
            variants="ghost"
            icon={<Plus size={20} />}
            iconPosition="left"
            onClick={addEducation}
          />
        </div>
        {education.map((edu, i) => (
          <EducationCard
            key={i}
            edu={edu}
            canRemove={education.length > 1}
            onRemove={() => removeEducation(i)}
            onUpdate={(field, value) => updateEducationField(i, field, value)}
          />
        ))}
      </div>
    </>
  )
}

interface EducationCardProps {
  edu: Education
  canRemove: boolean
  onRemove: () => void
  onUpdate: (field: keyof Education, value: string) => void
}

function EducationCard({
  edu,
  canRemove,
  onRemove,
  onUpdate,
}: EducationCardProps) {
  return (
    <div className="w-full p-4 border border-border flex flex-col gap-4">
      <div className="w-full flex items-start gap-2">
        <div className="flex-1 grid grid-cols-2 gap-4">
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
      <div className="grid grid-cols-2 gap-4">
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
      <div className="grid grid-cols-3 gap-4">
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
          label="GPA"
          name="gpa"
          placeholder="4.0"
          value={edu.gpa}
          onChange={(e) => onUpdate('gpa', e.target.value)}
        />
      </div>
    </div>
  )
}
