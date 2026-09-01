import { createColumnHelper } from '@tanstack/react-table'
import type { Person } from '..'
import CheckBox from '#/components/checkbox'

const columnHelper = createColumnHelper<Person>()

export const columns = [
  columnHelper.accessor('firstName', {
    header: () => <span className="w-full ">First Name</span>,
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
