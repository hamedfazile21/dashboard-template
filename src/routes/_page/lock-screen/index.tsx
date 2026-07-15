import LockScreen from '#/features/lock-screen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_page/lock-screen/')({
  component: LockScreen,
})
