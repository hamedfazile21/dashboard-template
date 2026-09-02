import { useTranslation } from 'react-i18next'

import Input from '#/components/input'
import TaskTable from './components/task-table'
import { useTask } from './components/task-provider'
import { SlidersHorizontal } from 'lucide-react'
import Popover from '#/components/popover'

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
          <div className="flex items-center gap-x-2">
            <Input
              onChange={(e) => setGlobalFilter(e.target.value)}
              value={globalFilter}
              className="py-1.5!"
              type="text"
              placeholder="Search Task ..."
            />

            {/* <Popover
              className="w-34 p-1!"
              trigger={
                <button className="border border-borderColor py-1.5 text-[13px] px-3 rounded-md flex items-center gap-x-2 hover:bg-surface-hover transition-colors">
                  <span>
                    <SlidersHorizontal size={17} className="text-muted" />
                  </span>
                  <span className="font-medium">{t('View')}</span>
                </button>
              }

              placement="bottom-end"
            >
              <div className="flex flex-col gap-y-1 ">
                <button className="flex items-center gap-x-2 text-foreground hover:bg-surface-hover px-2 py-1.5 rounded-md w-full text-start text-system">
                  Title
                </button>
              </div>
            </Popover> */}
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
