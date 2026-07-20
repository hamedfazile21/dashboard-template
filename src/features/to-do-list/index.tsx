import Input from '#/components/Input'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { todoData, type TodoType } from './data/todos'
import { CircleCheckBig, ListChecks, Star, Trash2 } from 'lucide-react'
import TaskRow from './data/components/task-row'

function TodoList() {
  const [activeItem, setActiveItem] = useState<number>(1)
  const { t } = useTranslation()
  const [todos, setTodos] = useState<TodoType[]>(todoData)
  const handelActiveItem = (item: number) => {
    setActiveItem(item)
  }

  return (
    <div className="w-full flex items-stretch gap-x-2">
      <div className="card h-[calc(100vh-7rem)] w-[20%]">
        <div className="card-header flex items-center justify-between border-b border-borderColor">
          <h1>{t('To Do List')}</h1>
        </div>
        <div className="card-body w-full space-y-1">
          <button
            onClick={() => handelActiveItem(1)}
            className={`flex group items-center justify-between w-full py-1 transition-colors duration-150 ${activeItem === 1 ? 'bg-surface/40' : 'hover:bg-surface-hover/40'} px-2 rounded-lg text-[16px]`}
          >
            <div className="flex items-center gap-x-3">
              <ListChecks
                className="shrink-0 transition-transform duration-150 group-hover:scale-110"
                size={20}
              />
              <span>{t('Inbox')}</span>
            </div>
            <span className="text-sm rounded-lg bg-surface p-1">12</span>
          </button>
          <button
            onClick={() => handelActiveItem(2)}
            className={`flex group items-center justify-between w-full py-1 transition-colors duration-150 ${activeItem === 2 ? 'bg-surface/40' : 'hover:bg-surface-hover/40'} px-2 rounded-lg text-[16px]`}
          >
            <div className="flex items-center gap-x-2">
              <CircleCheckBig
                className="shrink-0 transition-transform duration-150 group-hover:scale-110"
                size={20}
              />
              <span>{t('Done')}</span>
            </div>
            <span className="text-sm rounded-lg bg-surface p-1">2</span>
          </button>
          <button
            onClick={() => handelActiveItem(3)}
            className={`flex group items-center w-full justify-between py-1 transition-colors duration-150 ${activeItem === 3 ? 'bg-surface/40' : 'hover:bg-surface-hover/40'} px-2 rounded-lg text-[16px]`}
          >
            <div className="flex items-center gap-x-2">
              <Star
                className="shrink-0 transition-transform duration-150 group-hover:scale-110"
                size={20}
              />
              <span>{t('Important')}</span>
            </div>
            <span className="text-sm rounded-lg bg-surface p-1">1</span>
          </button>
          <button
            onClick={() => handelActiveItem(4)}
            className={`flex group items-center w-full justify-between py-1 transition-colors duration-150 ${activeItem === 4 ? 'bg-surface/40' : 'hover:bg-surface-hover/40'} px-2 rounded-lg text-[16px] text-red-800`}
          >
            <div className="flex items-center gap-x-2">
              <Trash2
                className="shrink-0 transition-transform duration-150 group-hover:scale-110"
                size={20}
              />
              <span>{t('Trash')}</span>
            </div>
            <span className="text-sm text-muted rounded-lg bg-surface p-1">
              1
            </span>
          </button>
        </div>
      </div>
      <div className="card h-[calc(100vh-7rem)] w-[80%]">
        <div className="card-header flex items-center justify-between border-b border-borderColor">
          <div>
            <Input type="text" placeholder={t('Search Task')} />
          </div>
        </div>
        <div className="card-body w-full">
          {todos.map((item, index) => {
            return (
              <TaskRow
                key={index}
                title={item.title}
                description={item.description}
                priority={item.priority}
                date={item.date}
                assignee={item.assignee}
                completed={false}
                onToggle={function (): void {
                  throw new Error('Function not implemented.')
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TodoList
