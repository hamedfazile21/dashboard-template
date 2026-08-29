import TablesShowCase from '#/features/tabels'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/tables/')({
  component: TablesShowCase,
})

