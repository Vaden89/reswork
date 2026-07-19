export const RefineResponsibilitySkeleton = () => {
  return (
    <div
      className="flex items-center gap-2"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Refining responsibility with AI...</span>
      <div className="flex h-10 flex-1 overflow-hidden border border-border ai-shimmer"></div>
    </div>
  )
}
