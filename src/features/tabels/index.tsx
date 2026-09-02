import { useTranslation } from 'react-i18next'

import Input from '#/components/input'
import TaskTable from './components/task-table'
import { useTask } from './components/task-provider'

export interface Task {
  id: string
  title: string
  label: 'Bug' | 'Feature' | 'Documentation'
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  status: 'Backlog' | 'Todo' | 'In Progress' | 'Done' | 'Canceled'
}

function TablesShowCase() {
  const { t } = useTranslation()
  const { globalFilter, setGlobalFilter } = useTask()

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
        <TaskTable />
      </div>
    </div>
  )
}

export default TablesShowCase
