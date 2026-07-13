import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_page/_login/login-basic/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello Login Basic</div>
}
