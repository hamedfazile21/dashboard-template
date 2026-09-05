import CheckBox from '#/components/checkbox'
import Input from '#/components/input'
import Popover from '#/components/popover'
import type { Table } from '@tanstack/react-table'
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTask } from './task-provider'
import type { Task } from '..'
import { statusIcon } from './task-columns'

const statusOptions = [
  'Backlog',
  'Todo',
  'In Progress',
  'Done',
  'Canceled',
] as const

interface TableToolbarProps {
  table: Table<Task>
}

const TableToolbar = ({ table }: TableToolbarProps) => {
  const { t } = useTranslation()
  const [statusSearch, setStatusSearch] = useState('')

  const { setGlobalFilter, globalFilter } = useTask()
  const selectedStatuses =
    (table.getColumn('status')?.getFilterValue() as string[] | undefined) ?? []
  const statusCounts = table
    .getPreFilteredRowModel()
    .rows.reduce<Record<string, number>>((counts, row) => {
      const status = String(row.getValue('status'))
      counts[status] = (counts[status] ?? 0) + 1
      return counts
    }, {})
  const visibleStatuses = statusOptions.filter((status) =>
    status.toLowerCase().includes(statusSearch.toLowerCase()),
  )

  return (
    <div className="flex items-center justify-between border-b border-borderColor p-4">
      <div className="flex items-center gap-x-2">
        <Input
          onChange={(e) => setGlobalFilter(e.target.value)}
          value={globalFilter}
          className="py-1.5!"
          type="text"
          placeholder="Search Task ..."
        />
        <Popover
          className="w-48 p-1!"
          trigger={
            <button className="border border-dashed border-borderColor py-1.5 text-[13px] px-3 rounded-md flex items-center gap-x-2 hover:bg-surface-hover transition-colors">
              <span>
                <Sparkles size={17} className="text-muted" />
              </span>
              <span className="font-medium">{t('Status')}</span>
              {selectedStatuses.length > 0 && (
                <div className="border-l border-borderColor h-5" />
              )}
              {selectedStatuses.length >= 3 ? (
                <span className="text-xs bg-muted/20 rounded-lg px-2 py-0.5 w-20">
                  {selectedStatuses.length} {t('Selected')}
                </span>
              ) : (
                selectedStatuses.map((item, index) => {
                  return (
                    <span
                      key={index}
                      className={`text-xs bg-muted/20 rounded-lg px-2 py-0.5 ${item === 'In Progress' ? 'w-24' : 'w-fit'}`}
                    >
                      {item}
                    </span>
                  )
                })
              )}
            </button>
          }

          placement="bottom-start"
          closeOn="outside"
        >
          <div className="flex flex-col gap-y-1 ">
            <div className="px-3 py-2 border-b border-borderColor relative">
              <Search
                size={17}
                className="text-muted absolute ltr:right-2 rtl:left-2 top-3"
              />
              <input
                className="border-0 w-34.5 outline-none text-system text-foreground"
                placeholder={t('Search...')}
                value={statusSearch}
                onChange={(event) => setStatusSearch(event.target.value)}
              />
            </div>
            {visibleStatuses.length > 0 ? (
              <>
                {visibleStatuses.map((status) => {
                  const isSelected = selectedStatuses.includes(status)

                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => {
                        const nextStatuses = isSelected
                          ? selectedStatuses.filter((value) => value !== status)
                          : [...selectedStatuses, status]

                        table.getColumn('status')?.setFilterValue(nextStatuses)
                      }}
                      className="flex items-center gap-x-1.5 text-foreground hover:bg-surface-hover px-3 py-1.5 rounded-md w-full text-start text-system"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-x-1.5">
                          <CheckBox
                            size="sm"
                            checked={isSelected}
                            onChange={() => undefined}
                          />
                          <span className="text-muted">
                            {statusIcon[status]}
                          </span>
                          <span>{status}</span>
                        </div>
                        <div>
                          <p className="text-xs">{statusCounts[status] ?? 0}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
                {selectedStatuses.length > 0 && (
                  <div className="border-t border-borderColor p-1">
                    <button
                      type="button"
                      onClick={() =>
                        table.getColumn('status')?.setFilterValue([])
                      }
                      className="flex items-center gap-x-1.5 text-foreground hover:bg-surface-hover px-3 py-1.5 rounded-md w-full text-system"
                    >
                      {t('Clear Filters')}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="p-2 text-system w-full text-center text-foreground">
                {t('No results found.')}
              </p>
            )}
          </div>
        </Popover>
      </div>
      <Popover
        className="w-38 p-0! py-1!"
        trigger={
          <button className="border border-dashed border-borderColor py-1.5 text-[13px] px-3 rounded-md flex items-center gap-x-2 hover:bg-surface-hover transition-colors">
            <span>
              <SlidersHorizontal size={17} className="text-muted" />
            </span>
            <span className="font-medium">{t('View')}</span>
          </button>
        }

        placement="bottom-start"
        closeOn="outside"
      >
        <div className="flex flex-col gap-y-1 ">
          <div className="px-3 py-2 border-b border-borderColor">
            <span className="text-system">{t('Toggle columns')}</span>
          </div>
          {table
            .getAllLeafColumns()
            .filter((column) => column.id !== 'select')
            .map((column) => {
              const headerLabels: Record<string, string> = {
                id: t('Task'),
                title: t('Title'),
                priority: t('Priority'),
                status: t('Status'),
              }

              if (!column.getCanHide()) return

              return (
                <button
                  key={column.id}
                  type="button"
                  disabled={!column.getCanHide()}
                  onClick={() => column.toggleVisibility()}
                  className="flex items-center justify-between gap-x-2 text-foreground hover:bg-surface-hover px-3 py-1.5 rounded-md w-full text-start text-system disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  <div className="flex items-center gap-x-1.5">
                    <CheckBox
                      size="sm"
                      checked={column.getIsVisible()}
                      onChange={() => column.toggleVisibility()}
                    />

                    <span>{headerLabels[column.id] ?? column.id}</span>
                  </div>
                </button>
              )
            })}
        </div>
      </Popover>
    </div>
  )
}

export default TableToolbar
