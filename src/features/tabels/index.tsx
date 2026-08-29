import DataTable from '#/components/data-table'

import { TaskColumns } from './components/table-columns'
import { tasks } from './data/task'

export interface Task {
  id: string
  title: string
  assignee: string
  priority: 'Low' | 'Medium' | 'High'
  completed: boolean
}

function TablesShowCase() {
  return (
    <div className="p-4">
      <DataTable
        columns={TaskColumns}
        data={tasks}
        searchableColumns={['id', 'title', 'assignee']}
        searchPlaceholder="Search tasks..."
        toolbarActions={
          <button type="button" className="btn btn-primary w-auto px-4">
            New Task
          </button>
        }
        emptyMessage="No tasks match your search."
      />
    </div>
  )
}

export default TablesShowCase
