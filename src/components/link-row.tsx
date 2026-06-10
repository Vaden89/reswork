import { Trash2 } from 'lucide-react'
import { FormField } from './common/form'
import type { Link } from '#/types/template.type'

interface LinkRowProps {
  link: Link
  canRemove: boolean
  onRemove: () => void
  onUpdate: (field: keyof Link, value: string) => void
}

export function LinkRow({ link, canRemove, onRemove, onUpdate }: LinkRowProps) {
  return (
    <div className="w-full p-4 border border-border">
      <div className="w-full flex items-end gap-2">
        <FormField
          label="Label"
          name="link_label"
          placeholder="Github"
          classname="w-2/6"
          value={link.label}
          onChange={(e) => onUpdate('label', e.target.value)}
        />
        <FormField
          label="URL"
          name="link_url"
          classname="flex-1 w-3/6"
          placeholder="https://github.com/username"
          value={link.url}
          onChange={(e) => onUpdate('url', e.target.value)}
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
    </div>
  )
}
