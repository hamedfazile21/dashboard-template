import { useMemo, useState } from 'react'
import { flexRender, type RowData } from '@tanstack/react-table'
import {
  legacyCreateColumnHelper,
  type LegacyColumnDef,
} from '@tanstack/react-table/legacy'
import {
  ArrowUp,
  ArrowDown,
  ChevronsUpDown,
  Search,
  SlidersHorizontal,
  Inbox,
} from 'lucide-react'
import { useDataTable } from './use-data-table'
import IndeterminateCheckbox from './indeterminate-checkbox'
import Pagination from '../pagination'
import Popover from '../popover'

interface DataTableProps<TData extends RowData> {
  columns: LegacyColumnDef<TData, any>[]
  data: TData[]
  searchableColumns?: (keyof TData)[]
  searchPlaceholder?: string
  /** Show the built-in row-selection checkbox column. Default true. */
  enableSelection?: boolean
  pageSizeOptions?: number[]
  /** Slot for extra buttons (e.g. "New Task", "Export") next to the search bar */
  toolbarActions?: React.ReactNode
  emptyMessage?: string
  isLoading?: boolean
}

function DataTable<TData extends RowData>({
  columns,
  data,
  searchableColumns,
  searchPlaceholder = 'Search...',
  enableSelection = true,
  pageSizeOptions = [10, 25, 50],
  toolbarActions,
  emptyMessage = 'No results found.',
  isLoading = false,
}: DataTableProps<TData>) {
  const [columnVisibilityOpen, setColumnVisibilityOpen] = useState(false)

  const finalColumns = useMemo<LegacyColumnDef<TData, any>[]>(() => {
    if (!enableSelection) return columns
    const helper = legacyCreateColumnHelper<TData>()
    const selectionColumn = helper.display({
      id: 'select',
      size: 32,
      header: ({ table }) => (
        <IndeterminateCheckbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
          aria-label="Select all rows"
        />
      ),
      cell: ({ row }) => (
        <IndeterminateCheckbox
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          aria-label="Select row"
        />
      ),
    })
    return [selectionColumn as LegacyColumnDef<TData, any>, ...columns]
  }, [columns, enableSelection])

  const table = useDataTable({ data, columns: finalColumns, searchableColumns })

  const { pageIndex, pageSize } = table.getState().pagination
  const pageCount = table.getPageCount()
  const selectedCount = table.getSelectedRowModel().rows.length

  return (
    <div className="card w-full p-0">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-borderColor p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={15}
            className="pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted ltr:left-3 rtl:right-3"
          />
          <input
            type="text"
            value={table.getState().globalFilter ?? ''}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            placeholder={searchPlaceholder}
            className="glass-solid w-full rounded-md py-2 text-sm text-foreground outline-none
              transition-all duration-200 placeholder:text-muted
              focus:border-primary/50 focus:ring-2 focus:ring-primary/30
              ltr:pl-9 ltr:pr-3 rtl:pr-9 rtl:pl-3"
          />
        </div>

        <div className="flex items-center gap-x-2">
          {toolbarActions}

          <Popover
            trigger={
              <button
                type="button"
                aria-label="Toggle columns"
                className="flex items-center gap-x-1.5 rounded-md border border-borderColor px-3 py-2 text-xs font-medium text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
              >
                <SlidersHorizontal size={14} />
                Columns
              </button>
            }
            open={columnVisibilityOpen}
            onOpenChange={setColumnVisibilityOpen}
            placement="bottom-end"
            showArrow={false}
          >
            <div className="flex min-w-40 flex-col gap-y-0.5">
              {table
                .getAllColumns()
                .filter((col) => col.getCanHide())
                .map((col) => (
                  <label
                    key={col.id}
                    className="flex items-center gap-x-2 rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-surface-hover"
                  >
                    <input
                      type="checkbox"
                      checked={col.getIsVisible()}
                      onChange={col.getToggleVisibilityHandler()}
                      className="checkbox"
                    />
                    {col.id}
                  </label>
                ))}
            </div>
          </Popover>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-borderColor">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort()
                  const sorted = header.column.getIsSorted()

                  return (
                    <th
                      key={header.id}
                      className="whitespace-nowrap px-4 py-3 text-xs font-medium text-muted"
                    >
                      {header.isPlaceholder ? null : (
                        <button
                          type="button"
                          disabled={!canSort}
                          onClick={header.column.getToggleSortingHandler()}
                          className={`flex items-center gap-x-1 ${canSort ? 'cursor-pointer hover:text-foreground' : ''}`}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {canSort &&
                            (sorted === 'asc' ? (
                              <ArrowUp size={13} />
                            ) : sorted === 'desc' ? (
                              <ArrowDown size={13} />
                            ) : (
                              <ChevronsUpDown
                                size={13}
                                className="opacity-40"
                              />
                            ))}
                        </button>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={finalColumns.length}
                  className="px-4 py-12 text-center text-sm text-muted"
                >
                  Loading...
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={finalColumns.length}>
                  <div className="flex flex-col items-center gap-y-2 py-12 text-center">
                    <Inbox size={24} className="text-muted" />
                    <p className="text-sm text-muted">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                  className="border-b border-borderColor/60 transition-colors duration-150 last:border-b-0 hover:bg-surface-hover/40 data-[state=selected]:bg-primary/5"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-foreground">
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
      </div>

      {/* Footer — pagination + row count + page size */}
      <div className="flex flex-col gap-3 border-t border-borderColor p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          {enableSelection && selectedCount > 0
            ? `${selectedCount} of ${table.getFilteredRowModel().rows.length} row(s) selected`
            : `${table.getFilteredRowModel().rows.length} row(s) total`}
        </p>

        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-2 text-xs text-muted">
            Rows per page
            <select
              value={pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="glass-solid rounded-md px-2 py-1 text-xs text-foreground outline-none"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <Pagination
            currentPage={pageIndex + 1}
            totalPages={Math.max(pageCount, 1)}
            onPageChange={(page) => table.setPageIndex(page - 1)}
          />
        </div>
      </div>
    </div>
  )
}

export default DataTable
