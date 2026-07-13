import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_page/lock-screen/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello lock-screen!</div>
}
