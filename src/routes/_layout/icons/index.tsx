import IconShowcase from '#/features/icons'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/icons/')({
  component: IconShowcase,
})
