import { NavBar } from '#/components/common/nav-bar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/builder/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="w-full h-[90vh]">
      <header className="w-full px-20">
        <NavBar />
      </header>
      <section className="w-full px-20 py-20">
        <div className="flex flex-col gap-2">
          <h2 className="text-6xl font-semibold">Template Gallery</h2>
          <p className="text-secondary text-lg font-medium">
            Select a foundation for your professional narrative. Our minimalist,
            editorially-structured <br /> layouts ensure your content remains
            the focal point.
          </p>
        </div>
        <div></div>
      </section>
    </main>
  )
}
