import { useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '../../common/button'
import type { WorkExperience } from '#/types/template.type'
import type { FormProps } from '#/types/section-forms.type'
import { WorkExperienceCard } from './work-experience-card'

export const ExperienceForm = ({ resumeData, dispatch }: FormProps) => {
  const experiences = resumeData.workExperience

  useEffect(() => {
    if (experiences.length === 0) dispatch({ type: 'ADD_WORK_EXPERIENCE' })
  }, [])

  const addExperience = () => dispatch({ type: 'ADD_WORK_EXPERIENCE' })

  const removeExperience = (i: number) =>
    dispatch({ type: 'REMOVE_WORK_EXPERIENCE', index: i })

  const updateExperienceField = (
    i: number,
    field: keyof WorkExperience,
    value: string,
  ) => dispatch({ type: 'UPDATE_WORK_EXPERIENCE', index: i, field, value })

  const addResponsibility = (i: number) =>
    dispatch({ type: 'ADD_WORK_RESPONSIBILITY', index: i })

  const removeResponsibility = (i: number, j: number) =>
    dispatch({
      type: 'REMOVE_WORK_RESPONSIBILITY',
      workExpIndex: i,
      resIndex: j,
    })

  const updateResponsibility = (i: number, j: number, value: string) =>
    dispatch({
      type: 'UPDATE_WORK_RESPONSIBILITY',
      workExpIndex: i,
      resIndex: j,
      value,
    })

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
