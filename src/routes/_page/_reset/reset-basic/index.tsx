import ResetBasic from '#/features/reset/reset-basic'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_page/_reset/reset-basic/')({
  component: ResetBasic,
})
