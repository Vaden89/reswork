import { useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '../../common/button'
import type { WorkExperience } from '#/types/template.type'
import type { FormProps } from '#/types/section-forms.type'
import { EMPTY_EXPERIENCE } from '#/data/constants/form-defaults'
import { WorkExperienceCard } from './work-experience-card'

export const ExperienceForm = ({ resumeData, setField }: FormProps) => {
  const experiences = resumeData.workExperience

  useEffect(() => {
    if (experiences.length === 0)
      setField('workExperience', [{ ...EMPTY_EXPERIENCE }])
  }, [])

  const updateExperiences = (updated: WorkExperience[]) =>
    setField('workExperience', updated)

  const addExperience = () =>
    updateExperiences([
      { ...EMPTY_EXPERIENCE, responsibilities: [''] },
      ...experiences,
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
