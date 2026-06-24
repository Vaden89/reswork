import { useRef, useState } from 'react'
import { Button } from '#/components/common/button'
import { TEMPLATES } from '#/data/templates/registry'
import { TemplateCard } from '#/components/template-card'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/builder/')({
  component: RouteComponent,
})

function RouteComponent() {
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

  return (
    <main className="w-full flex flex-col justify-center items-center">
      <section className="w-full max-w-6xl px-4 sm:px-8 xl:px-0 pt-10 sm:py-10 min-[1440px]:py-20">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl sm:text-6xl font-semibold">
            Template Gallery
          </h2>
          <p className="text-secondary sm:text-lg font-medium">
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
        <div className="w-full flex items-center justify-between px-2 mt-4">
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
          <Link to="/builder/preview">
            <Button
              text="CONTINUE"
              iconPosition="right"
              className="py-2 px-3"
              icon={<ArrowRightIcon size={16} />}
            />
          </Link>
        </div>
      </section>
    </main>
  )
}
