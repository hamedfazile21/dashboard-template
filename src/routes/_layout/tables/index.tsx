import TablesShowCase from '#/features/tabels'
import { TaskProvider } from '#/features/tabels/components/task-provider'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/tables/')({
  component: () => (
    <TaskProvider>
      <TablesShowCase />
    </TaskProvider>
  ),
})
