import { useState, useRef, useCallback, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { cn } from '#/utils/cn'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface PdfPreviewProps {
  url: string | null
  title?: string
  className?: string
}

export function PdfPreview({ url, className }: PdfPreviewProps) {
  const [active, setActive] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const [slotPages, setSlotPages] = useState<[number, number]>([0, 0])
  const [slots, setSlots] = useState<[string | null, string | null]>([
    null,
    null,
  ])

  const urlRef = useRef(url)
  useEffect(() => {
    urlRef.current = url
  }, [url])

  const onContainerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return
    const ro = new ResizeObserver(([entry]) => {
      const width =
        entry.contentRect.width <= 500
          ? entry.contentRect.width * 2.2
          : entry.contentRect.width
      setContainerWidth(width)
    })
    ro.observe(node)

    const width =
      node.clientWidth <= 500 ? node.clientWidth * 2.2 : node.clientWidth
    setContainerWidth(width)
  }, [])

  useEffect(() => {
    if (!url) return
    setSlots((prev) => {
      if (prev[active] === url || prev[1 - active] === url) return prev
      const next: [string | null, string | null] = [prev[0], prev[1]]
      next[1 - active] = url
      return next
    })
  }, [url, active])

  return (
    <div
      ref={onContainerRef}
      className={cn('relative overflow-hidden', className)}
    >
      {([0, 1] as const).map((index) => {
        const slotUrl = slots[index]
        if (!slotUrl) return null
        return (
          <div
            key={index}
            className={cn(
              'absolute inset-0 overflow-y-auto',
              index === active
                ? 'opacity-100 z-10'
                : 'opacity-0 pointer-events-none z-0',
            )}
          >
            <Document
              file={slotUrl}
              onLoadSuccess={({ numPages }) =>
                setSlotPages((prev) => {
                  const next: [number, number] = [prev[0], prev[1]]
                  next[index] = numPages
                  return next
                })
              }
              loading={null}
              error={null}
              className="flex flex-col gap-4"
            >
              {Array.from({ length: slotPages[index] }, (_, i) => (
                <Page
                  key={i + 1}
                  pageNumber={i + 1}
                  width={containerWidth || undefined}
                  renderTextLayer
                  renderAnnotationLayer
                  onRenderSuccess={
                    i === 0
                      ? () => {
                          if (slotUrl === urlRef.current) setActive(index)
                        }
                      : undefined
                  }
                />
              ))}
            </Document>
          </div>
        )
      })}
    </div>
  )
}
