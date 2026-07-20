import TodoList from '#/features/to-do-list'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/to-do-list/')({
  component: TodoList,
})
