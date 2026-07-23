import Input from '#/components/Input'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { todoData, type TodoType } from './data/todos'
import { CircleCheckBig, Diamond, ListChecks, Star, Trash2 } from 'lucide-react'
import TaskRow from './components/task-row'

const FILTERS: Record<number, (item: TodoType) => boolean> = {
  1: () => true,
  2: (item) => item.status === 'complete',
  3: (item) => item.isImportant,
  4: (item) => item.status === 'trashed',
  5: (item) => item.priority === 'Low',
  6: (item) => item.priority === 'Medium',
  7: (item) => item.priority === 'High',
}

function TodoList() {
  const [activeItem, setActiveItem] = useState<number>(1)
  const { t } = useTranslation()
  const [todos, setTodos] = useState<TodoType[]>(todoData)

  const handelActiveItem = (item: number) => {
    setActiveItem(item)
  }

  const handelCompleteTask = (id: number) => {
    const updatedData: TodoType[] = todos.map((item) =>
      item.id === id
        ? {
            ...item,
            status: item.status === 'complete' ? 'pending' : 'complete',
          }
        : item,
    )
    setTodos(updatedData)
  }

  const handelToggleImportant = (id: number) => {
    const updatedData: TodoType[] = todos.map((item) =>
      item.id === id
        ? {
            ...item,
            isImportant: !item.isImportant,
          }
        : item,
    )
    setTodos(updatedData)
  }

  const handelDeleteTask = (id: number) => {
    setTodos(todos.filter((item) => item.id !== id))
  }

  return (
    <div className="w-full flex items-stretch gap-x-2">
      <div className="card h-[calc(100vh-7rem)] w-[20%] relative">
        <div className="card-header flex items-center justify-between border-b border-borderColor">
          <h1>{t('To Do List')}</h1>
        </div>
        <div className="card-body w-full space-y-1">
          <div className="border-b border-borderColor pb-2">
            <p className="text-muted uppercase mb-1">{t('status')}</p>

            <button
              onClick={() => handelActiveItem(1)}
              className={`flex group items-center justify-between w-full py-1 transition-colors duration-150 ${activeItem === 1 ? 'bg-surface/40' : 'hover:bg-surface-hover dark:hover:bg-surface-hover/40'} px-2 rounded-lg text-[16px]`}
            >
              <div className="flex items-center gap-x-2">
                <ListChecks
                  className="shrink-0 transition-transform duration-150 group-hover:scale-110"
                  size={20}
                />
                <span>{t('Inbox')}</span>
              </div>
              <span className="text-sm rounded-lg bg-surface p-1">
                {todos.length}
              </span>
            </button>
            <button
              onClick={() => handelActiveItem(2)}
              className={`flex group items-center justify-between w-full py-1 transition-colors duration-150 ${activeItem === 2 ? 'bg-surface/40' : 'hover:bg-surface-hover dark:hover:bg-surface-hover/40'} px-2 rounded-lg text-[16px]`}
            >
              <div className="flex items-center gap-x-2">
                <CircleCheckBig
                  className="shrink-0 transition-transform duration-150 group-hover:scale-110"
                  size={20}
                />
                <span>{t('Done')}</span>
              </div>
              <span className="text-sm rounded-lg bg-surface p-1">
                {todos.filter((item) => item.status === 'complete').length}
              </span>
            </button>
            <button
              onClick={() => handelActiveItem(3)}
              className={`flex group items-center w-full justify-between py-1 transition-colors duration-150 ${activeItem === 3 ? 'bg-surface/40' : 'hover:bg-surface-hover dark:hover:bg-surface-hover/40'} px-2 rounded-lg text-[16px]`}
            >
              <div className="flex items-center gap-x-2">
                <Star
                  className="shrink-0 transition-transform duration-150 group-hover:scale-110"
                  size={20}
                />
                <span>{t('Important')}</span>
              </div>
              <span className="text-sm rounded-lg bg-surface p-1">
                {todos.filter((item) => item.isImportant).length}
              </span>
            </button>
            <button
              onClick={() => handelActiveItem(4)}
              className={`flex group items-center w-full justify-between py-1 transition-colors duration-150 ${activeItem === 4 ? 'bg-surface/40' : 'hover:bg-surface-hover dark:hover:bg-surface-hover/40'} px-2 rounded-lg text-[16px] text-red-800`}
            >
              <div className="flex items-center gap-x-2">
                <Trash2
                  className="shrink-0 transition-transform duration-150 group-hover:scale-110"
                  size={20}
                />
                <span>{t('Trash')}</span>
              </div>
              <span className="text-sm text-muted rounded-lg bg-surface p-1">
                {todos.filter((item) => item.status === 'trashed').length}
              </span>
            </button>
          </div>
          <div className="">
            <p className="text-muted uppercase mb-1 mt-3">{t('Filters')}</p>
            <button
              onClick={() => handelActiveItem(5)}
              className={`flex group items-center w-full gap-x-2 py-2 transition-colors duration-150 ${activeItem === 5 ? 'bg-surface/40' : 'hover:bg-surface-hover dark:hover:bg-surface-hover/40'} px-2 rounded-lg text-[16px]`}
            >
              <Diamond
                className="shrink-0 transition-transform duration-150 group-hover:scale-110 fill-emerald-500 text-emerald-500"
                size={15}
              />
              <span className="text-emerald-500">{t('Low')}</span>
            </button>
            <button
              onClick={() => handelActiveItem(6)}
              className={`flex group items-center w-full gap-x-2 py-2 transition-colors duration-150 ${activeItem === 6 ? 'bg-surface/40' : 'hover:bg-surface-hover dark:hover:bg-surface-hover/40'} px-2 rounded-lg text-[16px]`}
            >
              <Diamond
                className="shrink-0 transition-transform duration-150 group-hover:scale-110 fill-blue-500 text-blue-500"
                size={15}
              />
              <span className="text-blue-500">{t('Medium')}</span>
            </button>
            <button
              onClick={() => handelActiveItem(7)}
              className={`flex group items-center w-full gap-x-2 py-2 transition-colors duration-150 ${activeItem === 7 ? 'bg-surface/40' : 'hover:bg-surface-hover dark:hover:bg-surface-hover/40'} px-2 rounded-lg text-[16px]`}
            >
              <Diamond
                className="shrink-0 transition-transform duration-150 group-hover:scale-110 fill-red-500 text-red-500"
                size={15}
              />
              <span className="text-red-500">{t('Hight')}</span>
            </button>
          </div>
          <button className="absolute bottom-3 btn btn-primary w-[90%]!">
            {t('New Task')}
          </button>
        </div>
      </div>
      <div className="card h-[calc(100vh-7rem)] w-[80%]">
        <div className="card-header  flex items-center justify-between border-b border-borderColor">
          <div>
            <Input type="text" placeholder={t('Search Task')} />
          </div>
        </div>
        <div className="card-body w-full">
          {todos
            .filter(FILTERS[activeItem] ?? (() => true))
            .map((item, index) => {
              return (
                <TaskRow
                  rowKey={index}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  priority={item.priority}
                  date={item.date}
                  assignee={item.assignee}
                  isImportant={item.isImportant}
                  status={item.status}
                  completeAction={() => handelCompleteTask(item.id)}
                  handelToggleImportant={() => handelToggleImportant(item.id)}
                  handelDeleteTask={() => handelDeleteTask(item.id)}
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default TodoList
