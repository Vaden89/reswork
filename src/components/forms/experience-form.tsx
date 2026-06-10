import { useEffect } from 'react'
import { Button } from '../common/button'
import { FormField } from '../common/form'
import { Plus, Trash2 } from 'lucide-react'
import type { TemplateData, WorkExperience } from '#/types/template.type'
import type { SetField } from '#/hooks/use-resume-data'

interface ExperienceFormProps {
  resumeData: TemplateData
  setField: SetField
}

export const ExperienceForm = ({
  resumeData,
  setField,
}: ExperienceFormProps) => {
  const experiences = resumeData.workExperience

  useEffect(() => {
    if (experiences.length === 0)
      setField('workExperience', [{ ...EMPTY_EXPERIENCE }])
  }, [])

  const updateExperiences = (updated: WorkExperience[]) =>
    setField('workExperience', updated)

  const addExperience = () =>
    updateExperiences([
      ...experiences,
      { ...EMPTY_EXPERIENCE, responsibilities: [''] },
    ])

  const removeExperience = (i: number) =>
    updateExperiences(experiences.filter((_, idx) => idx !== i))

  const updateExperienceField = (
    i: number,
    field: keyof WorkExperience,
    value: string,
  ) =>
    updateExperiences(
      experiences.map((exp, idx) =>
        idx === i ? { ...exp, [field]: value } : exp,
      ),
    )

  const addResponsibility = (i: number) =>
    updateExperiences(
      experiences.map((exp, idx) =>
        idx === i
          ? { ...exp, responsibilities: [...exp.responsibilities, ''] }
          : exp,
      ),
    )

  const removeResponsibility = (i: number, j: number) =>
    updateExperiences(
      experiences.map((exp, idx) =>
        idx === i
          ? {
              ...exp,
              responsibilities: exp.responsibilities.filter(
                (_, jdx) => jdx !== j,
              ),
            }
          : exp,
      ),
    )

  const updateResponsibility = (i: number, j: number, value: string) =>
    updateExperiences(
      experiences.map((exp, idx) =>
        idx === i
          ? {
              ...exp,
              responsibilities: exp.responsibilities.map((rsp, jdx) =>
                jdx === j ? value : rsp,
              ),
            }
          : exp,
      ),
    )

  return (
    <>
      <div className="flex flex-col pb-5 border-b border-border">
        <span className="text-4xl font-semibold">Work Experience</span>
        <p className="text-sm text-secondary">
          Add your work history starting with the most recent role.
        </p>
      </div>
      <div className="w-full flex flex-col gap-4 mt-5">
        <div className="w-full flex items-center justify-between">
          <span className="text-2xl font-medium">Positions</span>
          <Button
            text="Add Position"
            variants="ghost"
            icon={<Plus size={20} />}
            iconPosition="left"
            onClick={addExperience}
          />
        </div>
        {experiences.map((exp, i) => (
          <WorkExperienceCard
            key={i}
            exp={exp}
            canRemove={experiences.length > 1}
            onRemove={() => removeExperience(i)}
            onAddResponsibility={() => addResponsibility(i)}
            onRemoveResponsibility={(j) => removeResponsibility(i, j)}
            onUpdate={(field, value) => updateExperienceField(i, field, value)}
            onUpdateResponsibility={(j, value) =>
              updateResponsibility(i, j, value)
            }
          />
        ))}
      </div>
    </>
  )
}

const EMPTY_EXPERIENCE: WorkExperience = {
  company: '',
  end_date: '',
  location: '',
  position: '',
  responsibilities: [''],
  start_date: '',
}

interface ResponsibilityInputProps {
  value: string
  onChange: (value: string) => void
  onRemove: () => void
}

function ResponsibilityInput({
  value,
  onChange,
  onRemove,
}: ResponsibilityInputProps) {
  return (
    <div className="flex items-center gap-2">
      <FormField
        value={value}
        classname="flex-1"
        name="responsibility"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Built and maintained internal tooling that reduced deployment time by 50%"
      />
      <button type="button" onClick={onRemove} className="text-red-500">
        <Trash2 size={18} />
      </button>
    </div>
  )
}

interface WorkExperienceCardProps {
  exp: WorkExperience
  canRemove: boolean
  onRemove: () => void
  onAddResponsibility: () => void
  onRemoveResponsibility: (rspIdx: number) => void
  onUpdate: (field: keyof WorkExperience, value: string) => void
  onUpdateResponsibility: (rspIdx: number, value: string) => void
}

function WorkExperienceCard({
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
      <div className="grid grid-cols-3 gap-4">
        <FormField
          label="Job Title"
          name="position"
          placeholder="Software Engineer"
          value={exp.position}
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
