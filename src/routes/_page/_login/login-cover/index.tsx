import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_page/_login/login-cover/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello Login Cover!</div>
}
