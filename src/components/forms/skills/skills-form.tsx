import { useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '../../common/button'
import { SkillGroupCard } from './skill-group-card'
import type { FormProps } from '#/types/section-forms.type'

export const SkillsForm = ({ resumeData, dispatch }: FormProps) => {
  const skills = resumeData.skills

  useEffect(() => {
    if (skills.length === 0) dispatch({ type: 'ADD_SKILL' })
  }, [])

  const addSkill = () => dispatch({ type: 'ADD_SKILL' })

  const removeSkill = (i: number) => dispatch({ type: 'REMOVE_SKILL', index: i })

  const updateSkillName = (i: number, value: string) =>
    dispatch({ type: 'UPDATE_SKILL_NAME', index: i, value })

  const addSubSkill = (i: number) =>
    dispatch({ type: 'ADD_SUB_SKILL', index: i })

  const removeSubSkill = (i: number, j: number) =>
    dispatch({ type: 'REMOVE_SUB_SKILL', skillIndex: i, subSkillIndex: j })

  const updateSubSkill = (i: number, j: number, value: string) =>
    dispatch({
      type: 'UPDATE_SUB_SKILL',
      skillIndex: i,
      subSkillIndex: j,
      value,
    })

  return (
    <>
      <div className="flex flex-col pb-5 border-b border-border">
        <span className="text-4xl font-semibold">Skills</span>
        <p className="text-sm text-secondary">
          List your technical and soft skills grouped by category.
        </p>
      </div>
      <div className="w-full flex flex-col gap-4 mt-5">
        <div className="w-full flex items-center justify-between">
          <span className="text-2xl font-medium">Skill Groups</span>
          <Button
            text="Add Skill Group"
            variants="ghost"
            icon={<Plus size={20} />}
            iconPosition="left"
            onClick={addSkill}
          />
        </div>
        {skills.map((skill, i) => (
          <SkillGroupCard
            key={i}
            skill={skill}
            canRemove={skills.length > 1}
            onRemove={() => removeSkill(i)}
            onAddSubSkill={() => addSubSkill(i)}
            onRemoveSubSkill={(j) => removeSubSkill(i, j)}
            onUpdateName={(value) => updateSkillName(i, value)}
            onUpdateSubSkill={(j, value) => updateSubSkill(i, j, value)}
          />
        ))}
      </div>
    </>
  )
}
