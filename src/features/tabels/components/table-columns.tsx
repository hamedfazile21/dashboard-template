import { createColumnHelper } from '@tanstack/react-table'
import type { Person } from '..'

const columnHelper = createColumnHelper<Person>()

export const columns = [
  columnHelper.accessor('firstName', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: 'lastName',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('visits', {
    header: () => <span>Visits</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
    footer: (info) => info.column.id,
  }),
]

export const selectColumn = columnHelper.display({
  id: 'select',
  size: 10,
  header: ({ table }) => (
    <input
      type="checkbox"
      className="checkbox"
      checked={table.getIsAllRowsSelected()}
      // indeterminate={table.getIsSomeRowsSelected()}
      onChange={table.getToggleAllRowsSelectedHandler()}
      aria-label="Select all rows"
    />
  ),
  cell: ({ row }) => (
    <input
      type="checkbox"
      className="checkbox"
      checked={row.getIsSelected()}
      onChange={row.getToggleSelectedHandler()}
      aria-label="Select row"
    />
  ),
})
