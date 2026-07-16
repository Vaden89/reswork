import { useEffect, useState } from 'react'
import { cn } from '#/utils/cn'

interface PdfPreviewProps {
  url: string | null
  title?: string
  className?: string
}

export function PdfPreview({
  url,
  title = 'PDF Preview',
  className,
}: PdfPreviewProps) {
  const [slots, setSlots] = useState<[string | null, string | null]>([
    null,
    null,
  ])
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!url) return
    setSlots((prev) => {
      if (prev[active] === url || prev[1 - active] === url) return prev
      const next: [string | null, string | null] = [prev[0], prev[1]]
      next[1 - active] = url
      return next
    })
  }, [url, active])

  const handleLoad = (index: number) => {
    if (index !== active && slots[index] === url) setActive(index)
  }

  return (
    <div className={cn('relative', className)}>
      {slots.map((slotUrl, index) => (
        <iframe
          key={index}
          title={`${title} ${index + 1}`}
          src={slotUrl ? `${slotUrl}#toolbar=1` : undefined}
          onLoad={() => handleLoad(index)}
          className={cn(
            'absolute inset-0 w-full h-full',
            index === active ? 'opacity-100' : 'opacity-0 pointer-events-none',
          )}
        />
      ))}
    </div>
  )
}
