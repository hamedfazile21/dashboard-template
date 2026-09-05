import { createColumnHelper } from '@tanstack/react-table'
import type { Task } from '..'
import CheckBox from '#/components/checkbox'
import { useTranslation } from 'react-i18next'
import {
  AlarmClock,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ChevronsUpDown,
  CircleAlert,
  CircleCheckBig,
  CircleOff,
  CirclePlay,
} from 'lucide-react'
import { useAppSelector } from '#/hooks/redux'
import TaskSortPopover from './task-sort-popover'

const columnHelper = createColumnHelper<Task>()

export const columns = [
  columnHelper.accessor('id', {
    header: () => {
      const { t } = useTranslation()
      return <span>{t('Task')}</span>
    },
    cell: (info) => (
      <span className="text-system font-medium">{info.getValue()}</span>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('title', {
    header: ({ column }) => {
      const { t } = useTranslation()
      return (
        <div className="">
          <TaskSortPopover
            children={
              <div className="hover:bg-surface-hover cursor-pointer py-1.5 px-2 rounded-lg flex items-center gap-x-1 w-fit ">
                <span className="">{t('Title')}</span>
                <span>
                  {column.getIsSorted() === 'desc' && (
                    <ArrowUp className="text-muted" size={16} />
                  )}
                  {column.getIsSorted() === 'asc' && (
                    <ArrowDown className="text-muted" size={16} />
                  )}
                  {column.getIsSorted() === false && (
                    <ChevronsUpDown className="text-muted" size={16} />
                  )}
                </span>
              </div>
            }
            sortBy={column.getIsSorted() ?? 'hidden'}
            setSortBy={(value) => {
              if (value === 'hidden') {
                column.getIsVisible() && column.toggleVisibility(false)
              }

              column.toggleSorting(value === 'asc')
            }}
          />
        </div>
      )
    },
    cell: (info) => {
      const task = info.row.original

      return (
        <div className="flex items-center gap-x-2 px-2">
          <span className="text-xs px-2 font-medium border border-borderColor rounded-xl">
            {task.label}
          </span>
          <span className="font-medium text-system text-foreground">
            {info.getValue()}
          </span>
        </div>
      )
    },
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor('priority', {
    header: ({ column }) => {
      const { t } = useTranslation()
      return (
        <div className="">
          <TaskSortPopover
            children={
              <div className="hover:bg-surface-hover cursor-pointer py-1.5 px-2 rounded-lg flex items-center gap-x-1 w-fit ">
                <span className="">{t('Priority')}</span>
                <span>
                  {column.getIsSorted() === 'desc' && (
                    <ArrowUp className="text-muted" size={16} />
                  )}
                  {column.getIsSorted() === 'asc' && (
                    <ArrowDown className="text-muted" size={16} />
                  )}
                  {column.getIsSorted() === false && (
                    <ChevronsUpDown className="text-muted" size={16} />
                  )}
                </span>
              </div>
            }
            sortBy={column.getIsSorted() ?? 'hidden'}
            setSortBy={(value) => {
              if (value === 'hidden') {
                column.getIsVisible() && column.toggleVisibility(false)
              }

              column.toggleSorting(value === 'asc')
            }}
          />
        </div>
      )
    },
    cell: (info) => {
      const { direction } = useAppSelector((state) => state.themeConfig)
      return (
        <div className="flex items-center gap-x-2">
          <span className="text-muted">
            {info.getValue() === 'Low' && <ArrowDown size={17} />}
            {info.getValue() === 'High' && <ArrowUp size={17} />}
            {info.getValue() === 'Medium' && (
              <ArrowRight
                className={`${direction === 'rtl' && 'rotate-180'}`}
                size={17}
              />
            )}
            {info.getValue() === 'Critical' && <CircleAlert size={17} />}
          </span>
          <span className="text-system font-medium">{info.getValue()}</span>
        </div>
      )
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('status', {
    filterFn: (row, columnId, filterValue) => {
      const selectedStatuses = filterValue as string[]
      return (
        selectedStatuses.length === 0 ||
        selectedStatuses.includes(String(row.getValue(columnId)))
      )
    },
    header: ({ column }) => {
      const { t } = useTranslation()
      return (
        <TaskSortPopover
          children={
            <div className="hover:bg-surface-hover cursor-pointer py-1.5 px-2 rounded-lg flex items-center gap-x-1 w-fit ">
              <span className="">{t('Status')}</span>
              <span>
                {column.getIsSorted() === 'desc' && (
                  <ArrowUp className="text-muted" size={16} />
                )}
                {column.getIsSorted() === 'asc' && (
                  <ArrowDown className="text-muted" size={16} />
                )}
                {column.getIsSorted() === false && (
                  <ChevronsUpDown className="text-muted" size={16} />
                )}
              </span>
            </div>
          }
          sortBy={column.getIsSorted() ?? 'hidden'}
          setSortBy={(value) => {
            if (value === 'hidden') {
              column.getIsVisible() && column.toggleVisibility(false)
            }

            column.toggleSorting(value === 'asc')
          }}
        />
      )
    },
    cell: (info) => {
      return (
        <div className="flex items-center gap-x-2">
          <span className="text-muted">
            {info.getValue() === 'Canceled' && <CircleOff size={17} />}
            {info.getValue() === 'Done' && <CircleCheckBig size={17} />}
            {info.getValue() === 'Backlog' && <CircleAlert size={17} />}
            {info.getValue() === 'In Progress' && <AlarmClock size={17} />}
            {info.getValue() === 'Todo' && <CirclePlay size={17} />}
          </span>
          <span className="text-system font-medium">{info.getValue()}</span>
        </div>
      )
    },
    footer: (info) => info.column.id,
  }),
]

export const selectColumn = columnHelper.display({
  id: 'select',
  size: 25,
  minSize: 25,
  maxSize: 25,
  meta: { width: '25px' },
  header: ({ table }) => {
    const isIndeterminate = table.getIsSomeRowsSelected()

    return (
      <div
        style={{ width: '25px', display: 'flex', justifyContent: 'flex-start' }}
      >
        <CheckBox
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
          isIndeterminate={isIndeterminate}
          rounded
          aria-label="Select all rows"
        />
      </div>
    )
  },
  cell: ({ row }) => (
    <div
      style={{ width: '25px', display: 'flex', justifyContent: 'flex-start' }}
    >
      <CheckBox
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        rounded
        aria-label="Select row"
      />
    </div>
  ),
})
