import type { Template } from '#/data/templates/registry'

export function TemplateCard({
  template,
  isSelected,
  onSelect,
}: {
  template: Template
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <div
      className="w-4/5 sm:w-1/3 shrink-0 flex flex-col gap-4 cursor-pointer snap-center"
      onClick={onSelect}
    >
      <img
        src={template.image}
        alt={template.label}
        className={`sm:w-4/5 aspect-auto rounded-sm transition-all duration-200 ${
          isSelected
            ? 'ring-2 ring-offset-2 ring-black scale-[1.02]'
            : 'ring-1 ring-transparent hover:ring-gray-300'
        }`}
      />
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-start">
          {template.label}
        </span>
        <span className="text-xs text-secondary text-start">
          {template.subText}
        </span>
      </div>
    </div>
  )
}
