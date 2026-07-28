import Chat from '#/features/chat'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/chat/')({
  component: Chat,
})