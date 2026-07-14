import { useRef, useState } from 'react'
import { Button } from '#/components/common/button'
import { TEMPLATES } from '#/data/templates/registry'
import { TemplateCard } from '#/components/template-card'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useDataSource } from '#/context/data-source.context'

export const Route = createFileRoute('/builder/templates')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { repository } = useDataSource()
  const [loading, setLoading] = useState(false)
  const templateContainer = useRef<HTMLDivElement>(null)
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null,
  )

  const handleScroll = (direction: 'left' | 'right') => {
    if (!templateContainer.current) return
    const container = templateContainer.current
    const scrollAmount = direction === 'left' ? -1 : 1
    const card = container.querySelector<HTMLElement>(':scope > div')
    const cardWidth = card?.offsetWidth ?? container.offsetWidth
    container.scrollBy({
      left: scrollAmount * cardWidth + 16,
      behavior: 'smooth',
    })
  }

  const handleCreateResume = async () => {
    if (!selectedTemplateId) return
    setLoading(true)
    try {
      const rand = crypto.randomUUID().slice(0, 8)

      const resume_id = await repository.createResume({
        template_id: selectedTemplateId,
        title: `New Resume-${rand}`,
      })

      navigate({ to: `/builder/${resume_id}` })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="w-full flex flex-col justify-center items-center">
      <section className="w-full max-w-6xl px-4 sm:px-8 xl:px-0 pt-10 sm:py-10 min-[1440px]:py-20">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl 2xl:text-6xl font-semibold">
            Template Gallery
          </h2>
          <p className="text-secondary 2xl:text-lg">
            Select a foundation for your professional narrative. Our minimalist,
            editorially-structured <br className="hidden lg:block" /> layouts
            ensure your content remains the focal point.
          </p>
        </div>
        <div
          ref={templateContainer}
          className="w-full gap-6 sm:gap-0 sm:min-h-112.5 overflow-x-scroll flex-1 flex items-center mt-6 py-3 sm:py-6 px-4 noscroll snap-x snap-proximity"
        >
          {TEMPLATES.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={selectedTemplateId === template.id}
              onSelect={() => setSelectedTemplateId(template.id)}
            />
          ))}
        </div>

        <div className="w-full flex items-center justify-between px-2 my-4 lg:mb-0">
          <div className="flex gap-2">
            <Button
              onClick={() => handleScroll('left')}
              className="py-2 px-3"
              icon={<ArrowLeftIcon size={16} />}
            />
            <Button
              onClick={() => handleScroll('right')}
              className="py-2 px-3"
              icon={<ArrowRightIcon size={16} />}
            />
          </div>

          <Button
            iconPosition="right"
            className="py-2 px-3"
            onClick={handleCreateResume}
            icon={<ArrowRightIcon size={16} />}
            disabled={!selectedTemplateId || loading}
            text={loading ? 'Loading...' : 'CONTINUE'}
          />
        </div>
      </section>
    </main>
  )
}
