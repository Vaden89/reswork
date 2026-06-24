import { Trash2 } from 'lucide-react'
import { FormField } from '../../common/form'

export interface ResponsibilityInputProps {
  value: string
  onChange: (value: string) => void
  onRemove: () => void
}

export function ResponsibilityInput({
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
