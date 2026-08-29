import {
  legacyCreateColumnHelper,
  type LegacyColumnDef,
} from '@tanstack/react-table/legacy'
import type { Task } from '..'

const columnHelper = legacyCreateColumnHelper<Task>()

const priorityStyles: Record<Task['priority'], string> = {
  Low: 'bg-emerald-500/15 text-emerald-500',
  Medium: 'bg-amber-500/15 text-amber-500',
  High: 'bg-red-500/15 text-red-500',
}
export const TaskColumns: LegacyColumnDef<Task, any>[] = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => (
      <span className="font-mono text-xs text-muted">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor('title', {
    header: 'Title',
    cell: (info) => (
      <span
        className={
          info.row.original.completed
            ? 'text-muted line-through'
            : 'text-foreground'
        }
      >
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor('assignee', {
    header: 'Assignee',
  }),
  columnHelper.accessor('priority', {
    header: 'Priority',
    cell: (info) => {
      const priority = info.getValue()
      return (
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium`}
        >
          {priority}
        </span>
      )
    },
  }),
]
