import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/task-management/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello task-management</div>
}
