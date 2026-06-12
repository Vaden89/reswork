import { Trash2, Plus } from 'lucide-react'
import { FormField } from '../../common/form'
import { Button } from '../../common/button'
import type { TemplateData } from '#/types/template.type'
import { SkillItemRow } from './skill-item-row'

type Skill = TemplateData['skills'][number]

export interface SkillGroupCardProps {
  skill: Skill
  canRemove: boolean
  onRemove: () => void
  onAddSubSkill: () => void
  onUpdateName: (value: string) => void
  onUpdateSubSkill: (subIndex: number, value: string) => void
  onRemoveSubSkill: (subIndex: number) => void
}

export function SkillGroupCard({
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
