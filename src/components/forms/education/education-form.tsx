import { useEffect } from 'react'
import { Button } from '../../common/button'
import { Plus } from 'lucide-react'
import type { Education } from '#/types/template.type'
import type { FormProps } from '#/types/section-forms.type'
import { EducationCard } from './education-card'

export const EducationForm = ({ resumeData, dispatch }: FormProps) => {
  const education = resumeData.education

  useEffect(() => {
    if (education.length === 0) dispatch({ type: 'ADD_EDUCATION' })
  }, [])

  const addEducation = () => dispatch({ type: 'ADD_EDUCATION' })

  const removeEducation = (i: number) =>
    dispatch({ type: 'REMOVE_EDUCATION', index: i })

  const updateEducationField = (
    i: number,
    field: keyof Education,
    value: string,
  ) => dispatch({ type: 'UPDATE_EDUCATION', index: i, field, value })

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
