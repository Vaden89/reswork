import { useEffect } from 'react'
import { Button } from '../common/button'
import { FormField } from '../common/form'
import { Plus, Trash2 } from 'lucide-react'
import type { TemplateData } from '#/types/template.type'
import type { SetField } from '#/hooks/use-resume-data'

type Skill = TemplateData['skills'][number]

interface SkillItemRowProps {
  value: string
  onChange: (value: string) => void
  onRemove: () => void
}

function SkillItemRow({ value, onChange, onRemove }: SkillItemRowProps) {
  return (
    <div className="w-full flex items-center gap-2">
      <FormField
        name="sub_skill"
        classname="flex-1"
        placeholder="e.g. TypeScript"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="button" onClick={onRemove} className="text-red-500">
        <Trash2 size={18} />
      </button>
    </div>
  )
}

interface SkillGroupCardProps {
  skill: Skill
  canRemove: boolean
  onRemove: () => void
  onAddSubSkill: () => void
  onUpdateName: (value: string) => void
  onUpdateSubSkill: (subIndex: number, value: string) => void
  onRemoveSubSkill: (subIndex: number) => void
}

function SkillGroupCard({
  skill,
  canRemove,
  onRemove,
  onUpdateName,
  onAddSubSkill,
  onUpdateSubSkill,
  onRemoveSubSkill,
}: SkillGroupCardProps) {
  return (
    <div className="w-full p-4 border border-border flex flex-col gap-4">
      <div className="w-full flex items-end gap-2">
        <FormField
          label="Category"
          name="skill_name"
          classname="flex-1"
          value={skill.skill_name}
          placeholder="e.g. Frontend"
          onChange={(e) => onUpdateName(e.target.value)}
        />
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-red-500 mb-1"
          >
            <Trash2 size={24} />
          </button>
        )}
      </div>
      <div className="w-full flex flex-col gap-2">
        <span className="text-sm">Sub-skills</span>
        <div className="w-full flex flex-col gap-2">
          {skill.sub_skills.map((subSkill, subIndex) => (
            <SkillItemRow
              key={subIndex}
              value={subSkill}
              onChange={(value) => onUpdateSubSkill(subIndex, value)}
              onRemove={() => onRemoveSubSkill(subIndex)}
            />
          ))}
        </div>
        <Button
          text="Add Sub-skill"
          variants="ghost"
          icon={<Plus size={16} />}
          iconPosition="left"
          onClick={onAddSubSkill}
        />
      </div>
    </div>
  )
}

interface SkillsFormProps {
  resumeData: TemplateData
  setField: SetField
}

export const SkillsForm = ({ resumeData, setField }: SkillsFormProps) => {
  const skills = resumeData.skills

  useEffect(() => {
    if (skills.length === 0)
      setField('skills', [{ skill_name: '', sub_skills: [''] }])
  }, [])

  const updateSkills = (updated: Skill[]) => setField('skills', updated)

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
