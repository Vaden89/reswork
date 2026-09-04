import { Trash2 } from 'lucide-react'

export function DeleteCardBtn({
  onDelete,
  toolTip,
}: {
  onDelete: () => void
  toolTip: string
}) {
  return (
    <div className="group  mt-6 absolute -top-2 right-4">
      <button
        type="button"
        onClick={onDelete}
        className="text-red-500 relative"
      >
        <div className="pointer-events-none absolute bottom-full mb-2 flex -right-3 translate-y-1 scale-95 items-center justify-center rounded-lg bg-tertiary px-3 py-1 text-border opacity-0 shadow-md transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100 group-focus-visible:opacity-100">
          <span className="whitespace-nowrap text-xs">{toolTip}</span>
          <span className="absolute right-3.5 top-full size-2 -translate-y-1/2 rotate-45 bg-tertiary" />
        </div>
        <Trash2 size={16} />
      </button>
    </div>
  )
}
