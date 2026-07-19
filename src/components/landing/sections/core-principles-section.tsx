import { FileText, LayoutDashboard, Pencil } from 'lucide-react'

export const CorePrinciplesSection = () => {
  return (
    <section className="max-w-6xl px-4 sm:px-8 xl:px-0 w-full flex mt-12 py-12 gap-5 sm:gap-10 border-t border-t-border flex-col">
      <div className="w-full flex items-end justify-between">
        <span className="text-xl sm:font-normal font-medium">
          CORE PRINCIPLES
        </span>
        <span className="hidden sm:block text-xs tracking-[0.2em] text-secondary">
          01 — 03
        </span>
      </div>
      <div className="w-full flex flex-col sm:grid sm:grid-cols-6 gap-5">
        <div className="bg-white sm:col-span-4 sm:p-8 p-6 border border-border shrink-0 transition-colors duration-300 hover:border-primary">
          <div className="p-3 border border-border bg-neutral w-fit">
            <LayoutDashboard size={20} />
          </div>
          <div className="flex flex-col gap-2 mt-5 sm:mt-10">
            <span className="text-xl font-medium">Clean Templates</span>
            <p className="sm:w-3/4 text-tertiary text-sm font-light">
              Mathematically balanced, ATS-optimized layouts designed to present
              your experience without visual noise or distraction.
            </p>
          </div>
        </div>
        <div className="bg-white sm:col-span-2 sm:p-8 p-6 border border-border transition-colors duration-300 hover:border-primary">
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
        <div className="bg-white sm:p-8 p-6 border border-border sm:col-span-6 sm:flex items-center gap-4 transition-colors duration-300 hover:border-primary">
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
  )
}
