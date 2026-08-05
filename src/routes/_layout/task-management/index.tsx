import TaskManagement from '#/features/task-management'
import { TaskProvider } from '#/features/task-management/components/task-provider'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/task-management/')({
  component: () => (
    <TaskProvider>
      <TaskManagement />
    </TaskProvider>
  ),
})
