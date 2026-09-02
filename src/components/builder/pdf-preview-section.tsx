import { Download } from 'lucide-react'
import { usePDF } from '@react-pdf/renderer'
import { Button } from '#/components/common/button'
import { TEMPLATES } from '#/data/templates/registry'
import { pdfBlobToThumbnail } from '#/utils/thumbnail'
import { useCallback, useEffect, useRef } from 'react'
import type { TemplateData } from '#/types/template.type'
import { PdfPreview } from '#/components/common/pdf-preview'
import { Template1 } from '#/components/templates/template-1'
import { useDataSource } from '#/context/data-source.context'

const SNAPSHOT_IDLE_MS = 2500

interface PdfPreviewSectionProps {
  resumeId: string
  title: string
  templateId?: string
  previewData: TemplateData
  isPreviewVisible: boolean
}

export const PdfPreviewSection = ({
  resumeId,
  title,
  templateId,
  previewData,
  isPreviewVisible,
}: PdfPreviewSectionProps) => {
  const [instance, updatePDF] = usePDF()
  const { repository } = useDataSource()
  const savedBlobRef = useRef<Blob | null>(null)

  const captureAndSave = useCallback(
    async (blob: Blob | null) => {
      if (!blob || savedBlobRef.current === blob) return
      savedBlobRef.current = blob
      try {
        const thumbnail = await pdfBlobToThumbnail(blob)
        await repository.savePreview(resumeId, thumbnail)
      } catch (error) {
        savedBlobRef.current = null
      }
    },
    [repository, resumeId],
  )

  useEffect(() => {
    const template = TEMPLATES.find((t) => t.id === templateId)
    const SelectedTemplate = template?.component ?? Template1
    updatePDF(<SelectedTemplate data={previewData} />)
  }, [previewData, templateId, updatePDF])

  useEffect(() => {
    if (instance.loading || !instance.blob) return
    const blob = instance.blob
    const timer = setTimeout(() => void captureAndSave(blob), SNAPSHOT_IDLE_MS)
    return () => clearTimeout(timer)
  }, [instance.blob, instance.loading, captureAndSave])

  return (
    <div
      className={`${isPreviewVisible ? 'flex' : 'hidden lg:flex'} flex-1 min-h-0 flex-col`}
    >
      <div className="py-2 xl:py-5 px-2 xl:px-4 flex items-center justify-between border-b border-border">
        <span className="text-lg text-secondary font-medium">LIVE PREVIEW</span>
        <Button
          text="Export PDF"
          icon={<Download size={20} />}
          iconPosition="left"
          className="px-4 text-[13px] py-2"
          onClick={() => {
            if (!instance.url) return
            const a = document.createElement('a')
            a.href = instance.url
            a.download = `${title}.pdf`
            a.click()
            void captureAndSave(instance.blob)
          }}
        />
      </div>
      <div className="flex-1 min-h-0 border-l border-border relative">
        {instance.loading && (
          <div className="absolute top-2 right-2 z-10 pointer-events-none">
            <span className="text-xs text-secondary bg-white/80 border border-border px-2 py-1">
              Updating preview…
            </span>
          </div>
        )}
        <PdfPreview url={instance.url} className="absolute inset-0" />
      </div>
    </div>
  )
}
