import { useTranslation } from 'react-i18next'
import { defaultData } from './data/task'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type PaginationState,
  type RowSelectionState,
} from '@tanstack/react-table'
import { columns, selectColumn } from './components/table-columns'
import { useState } from 'react'
import Input from '#/components/input'
import Pagination from '#/components/pagination'

export type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

export interface Task {
  id: string
  title: string
  assignee: string
  priority: 'Low' | 'Medium' | 'High'
  completed: boolean
}

function TablesShowCase() {
  const { t } = useTranslation()
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const table = useReactTable({
    data: defaultData,
    columns: [selectColumn, ...columns],
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
      globalFilter,
      pagination,
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
  })

  const { pageIndex, pageSize } = table.getState().pagination

  const handelChangePageSize = (page: number) => {
    table.setPageSize(page)
  }
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground">{t('Tasks')}</h1>
        <p className="mt-1 text-sm text-muted">
          {t('View, search, and manage every task assigned across your team.')}
        </p>
      </div>
      <div className="card w-full overflow-hidden p-0!">
        <div className="flex items-center justify-between border-b border-borderColor p-4">
          <div>
            <Input
              onChange={(e) => setGlobalFilter(e.target.value)}
              value={globalFilter}
              className="py-1!"
              type="text"
              placeholder="Search Task ..."
            />
          </div>
          <div>
            <button className="btn btn-primary">{t('New Task')}</button>
          </div>
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
    </div>
  )
}

export default TablesShowCase
