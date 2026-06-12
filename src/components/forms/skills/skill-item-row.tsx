import { Trash2 } from 'lucide-react'
import { FormField } from '../../common/form'

export interface SkillItemRowProps {
  value: string
  onChange: (value: string) => void
  onRemove: () => void
}

export function SkillItemRow({ value, onChange, onRemove }: SkillItemRowProps) {
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
