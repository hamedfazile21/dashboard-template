import TodoList from '#/features/to-do-list'
import { TodoProvider } from '#/features/to-do-list/components/todo-provider'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/to-do-list/')({
  component: () => (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  ),
})
