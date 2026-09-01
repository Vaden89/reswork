import { usePDF } from '@react-pdf/renderer'
import { useEffect } from 'react'
import { Download } from 'lucide-react'
import { Button } from '#/components/common/button'
import { TEMPLATES } from '#/data/templates/registry'
import { PdfPreview } from '#/components/common/pdf-preview'
import { Template1 } from '#/components/templates/template-1'
import type { TemplateData } from '#/types/template.type'

interface PdfPreviewSectionProps {
  title: string
  templateId?: string
  previewData: TemplateData
  isPreviewVisible: boolean
}

export const PdfPreviewSection = ({
  title,
  templateId,
  previewData,
  isPreviewVisible,
}: PdfPreviewSectionProps) => {
  const [instance, updatePDF] = usePDF()

  useEffect(() => {
    const template = TEMPLATES.find((t) => t.id === templateId)
    const SelectedTemplate = template?.component ?? Template1
    updatePDF(<SelectedTemplate data={previewData} />)
  }, [previewData, templateId, updatePDF])

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
