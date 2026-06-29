import Dashboard from '#/features/dashboard/dashborad'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/')({
  component: Dashboard,
})
