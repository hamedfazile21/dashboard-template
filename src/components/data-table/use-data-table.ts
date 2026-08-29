import { useState } from 'react'
import {
  useLegacyTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  type LegacyColumnDef,
} from '@tanstack/react-table/legacy'
import type {
  ColumnFiltersState,
  ColumnVisibilityState,
  PaginationState,
  RowData,
  RowSelectionState,
  SortingState,
} from '@tanstack/react-table'

/**
 * NOTE: this uses TanStack Table v9's `useLegacyTable` bridge — it accepts
 * the same v8-shaped API as before, running on the v9 engine underneath.
 * This is a deprecated compatibility layer (removed in v10, ships every
 * feature so the bundle is larger, and doesn't get v9's fine-grained
 * table.Subscribe re-render optimizations). It's the fast path to get
 * things working again; migrating to the real v9 useTable API with
 * explicit feature registration is the long-term correct move.
 *
 * `extends RowData` is required in v9 — TData's implicit constraint from
 * v8 (`unknown`) was tightened to `Record<string, any> | Array<any>`.
 */
interface UseDataTableOptions<TData extends RowData> {
  data: TData[]
  columns: LegacyColumnDef<TData, any>[]
  searchableColumns?: (keyof TData)[]
  initialPageSize?: number
}

export function useDataTable<TData extends RowData>({
  data,
  columns,
  searchableColumns,
  initialPageSize = 10,
}: UseDataTableOptions<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] =
    useState<ColumnVisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  })

  const table = useLegacyTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
      pagination,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    globalFilterFn: (row, _columnId, filterValue) => {
      const search = String(filterValue).toLowerCase()
      const cols =
        searchableColumns ??
        (Object.keys(row.original as object) as (keyof TData)[])
      return cols.some((col) => {
        const value = row.getValue(col as string)
        return value != null && String(value).toLowerCase().includes(search)
      })
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return table
}
