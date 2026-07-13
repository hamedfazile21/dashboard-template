import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/chat/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello chat!</div>
}
