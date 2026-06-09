import { Button } from '#/components/common/button'
import { NavBar } from '#/components/common/nav-bar'
import type { TemplateData } from '#/types/template.type'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, FileText, LayoutDashboard, Pencil } from 'lucide-react'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="w-full flex flex-col justify-center items-center">
      <header className="max-w-6xl w-full">
        <NavBar />
      </header>
      <section className="max-w-6xl px-4 sm:px-8 xl:px-0 w-full flex justify-between items-center mt-12 gap-10">
        <div className="sm:w-1/2 flex flex-col gap-5">
          <h1 className="text-5xl font-bold">
            Build your professional future.
          </h1>
          <p className="text-secondary text-xl sm:text-2xl font-semibold">
            Precision and simplicity for modern professional. Construct a
            document that reflects your structural value
          </p>
          <Button className="py-2 px-5 capitalize">
            START BUILDING
            <ArrowRight size={16} />
          </Button>
        </div>
        <img
          src="/images/landing.svg"
          alt="Resume builder illustration"
          className="w-1/2 aspect-auto hidden sm:flex"
          fetchPriority="high"
        />
      </section>
      <section className="max-w-6xl px-4 sm:px-8 xl:px-0 w-full flex mt-12 py-12 gap-5 sm:gap-10 border-t border-t-border flex-col">
        <span className="text-xl sm:font-normal font-medium">
          CORE PRINCIPLES
        </span>
        <div className="w-full flex flex-col sm:grid sm:grid-cols-6 gap-5">
          <div className="bg-white sm:col-span-4 sm:p-8 p-6 border border-border shrink-0">
            <div className="p-3 border border-border bg-neutral w-fit">
              <LayoutDashboard size={20} />
            </div>
            <div className="flex flex-col gap-2 mt-5 sm:mt-10">
              <span className="text-xl font-medium">Clean Templates</span>
              <p className="sm:w-3/4 text-tertiary text-sm font-light">
                Mathematically balanced, ATS-optimized layouts designed to
                present your experience without visual noise or distraction.
              </p>
            </div>
          </div>
          <div className="bg-white sm:col-span-2 sm:p-8 p-6 border border-border">
            <div className="p-3 border border-border bg-neutral w-fit">
              <Pencil size={20} />
            </div>
            <div className="flex flex-col gap-2 mt-10">
              <span className="text-xl font-medium">Intuitive Editor</span>
              <p className="text-tertiary text-sm font-light">
                A structured, block-based entry system that enforces formatting
                consistency.
              </p>
            </div>
          </div>
          <div className="bg-white sm:p-8 p-6 border border-border sm:col-span-6 sm:flex items-center gap-4">
            <div className="p-3 border border-border bg-neutral w-fit">
              <FileText size={20} />
            </div>
            <div className="flex flex-col mt-5 sm:mt-0 gap-2 sm:gap-0">
              <span className="text-xl font-medium">Lossless PDF Export</span>
              <p className="text-tertiary text-[13px] font-light">
                Render your final document precisely as designed, optimized for
                ATS parsers and print.{' '}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
