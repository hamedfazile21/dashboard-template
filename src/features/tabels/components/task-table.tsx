import { useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
} from '@tanstack/react-table'
// import { columns, selectColumn } from './components/table-columns'

import Pagination from '#/components/pagination'
import { defaultData } from '../data/task'
import { columns, selectColumn } from './task-columns'
import { useTask } from './task-provider'
import Input from '#/components/input'
import { useTranslation } from 'react-i18next'
import Popover from '#/components/popover'
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react'
import CheckBox from '#/components/checkbox'

const statusOptions = [
  'Backlog',
  'Todo',
  'In Progress',
  'Done',
  'Canceled',
] as const

const TaskTable = () => {
  const { t } = useTranslation()
  const {
    globalFilter,
    setGlobalFilter,
    sorting,
    setSorting,
    setColumnVisibility,
    columnVisibility,
  } = useTask()
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [statusSearch, setStatusSearch] = useState('')
  const table = useReactTable({
    data: defaultData,
    columns: [selectColumn, ...columns],
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
      globalFilter,
      pagination,
      sorting,
      columnVisibility,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
    // search
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue) => {
      const search = String(filterValue).toLowerCase()
      return Object.keys(row.original as object).some((key) => {
        const value = row.getValue(key)
        return value != null && String(value).toLowerCase().includes(search)
      })
    },
    getFilteredRowModel: getFilteredRowModel(),
    // pagination
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),

    // sorting
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    //visible
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
  })

  const selectedStatuses =
    (table.getColumn('status')?.getFilterValue() as string[] | undefined) ?? []
  const visibleStatuses = statusOptions.filter((status) =>
    status.toLowerCase().includes(statusSearch.toLowerCase()),
  )

  const { pageIndex, pageSize } = table.getState().pagination

  const handelChangePageSize = (page: number) => {
    table.setPageSize(page)
  }
  return (
    <div>
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
            className="w-48 p-0! py-1!"
            trigger={
              <button className="border border-dashed border-borderColor py-1.5 text-[13px] px-3 rounded-md flex items-center gap-x-2 hover:bg-surface-hover transition-colors">
                <span>
                  <Sparkles size={17} className="text-muted" />
                </span>
                <span className="font-medium">{t('Status')}</span>
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
                  className="border-0 w-34.5 outline-none text-system"
                  placeholder={t('Search...')}
                  value={statusSearch}
                  onChange={(event) => setStatusSearch(event.target.value)}
                />
              </div>
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
                    <CheckBox
                      size="sm"
                      checked={isSelected}
                      onChange={() => undefined}
                    />
                    <span>{status}</span>
                  </button>
                )
              })}
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
      <div className="table-wrapper">
        <table className="w-full text-left text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="table-header-row" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    style={{
                      width:
                        header.getSize() !== 0 ? header.getSize() : undefined,
                    }}
                    className="table-header-cell"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={table.getAllColumns().length}>
                  <div className="table-empty-state">No results found.</div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                  className="table-body-row"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className="table-body-cell"
                      style={{
                        width:
                          cell.column.getSize() !== 0
                            ? cell.column.getSize()
                            : undefined,
                      }}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between py-4 px-5 border-t border-borderColor">
          <Pagination
            currentPage={pageIndex + 1} // Pagination is 1-indexed, TanStack's pageIndex is 0-indexed
            totalPages={Math.max(table.getPageCount(), 1)}
            onPageChange={(page) => table.setPageIndex(page - 1)}
            perPage={pageSize}
            setPerPage={handelChangePageSize}
          />
        </div>
      </div>
    </div>
  )
}

export default TaskTable
