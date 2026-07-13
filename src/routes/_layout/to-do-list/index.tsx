import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/to-do-list/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello To Do List</div>
}
