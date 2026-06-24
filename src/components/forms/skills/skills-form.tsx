import { useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '../../common/button'
import { SkillGroupCard } from './skill-group-card'
import type { FormProps } from '#/types/section-forms.type'
import type { Skills } from '#/types/template.type'

export const SkillsForm = ({ resumeData, setField }: FormProps) => {
  const skills = resumeData.skills

  useEffect(() => {
    if (skills.length === 0)
      setField('skills', [{ skill_name: '', sub_skills: [''] }])
  }, [])

  const updateSkills = (updated: Skills[]) => setField('skills', updated)

  const addSkill = () =>
    updateSkills([...skills, { skill_name: '', sub_skills: [''] }])

  const removeSkill = (i: number) =>
    updateSkills(skills.filter((_, idx) => idx !== i))

  const updateSkillName = (i: number, value: string) =>
    updateSkills(
      skills.map((s, idx) => (idx === i ? { ...s, skill_name: value } : s)),
    )

  const addSubSkill = (i: number) =>
    updateSkills(
      skills.map((s, idx) =>
        idx === i ? { ...s, sub_skills: [...s.sub_skills, ''] } : s,
      ),
    )

  const removeSubSkill = (i: number, j: number) =>
    updateSkills(
      skills.map((s, idx) =>
        idx === i
          ? { ...s, sub_skills: s.sub_skills.filter((_, jdx) => jdx !== j) }
          : s,
      ),
    )

  const updateSubSkill = (i: number, j: number, value: string) =>
    updateSkills(
      skills.map((s, idx) =>
        idx === i
          ? {
              ...s,
              sub_skills: s.sub_skills.map((sk, jdx) =>
                jdx === j ? value : sk,
              ),
            }
          : s,
      ),
    )

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
