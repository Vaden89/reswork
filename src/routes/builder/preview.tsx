import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/builder/preview')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/builder/preview"!</div>
}
