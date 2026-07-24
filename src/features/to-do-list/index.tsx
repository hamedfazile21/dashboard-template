import Input from '#/components/Input'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { todoData, type TodoType } from './data/todos'
import TodoRow from './components/todo-row'
import SidePanelFilter from './components/side-panel-filter'
import { TodoProvider, useTodo } from './components/todo-provider'
import TodoDialog from './components/todo-dialog'

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
  const { todos } = useTodo()
  const { t } = useTranslation()

  return (
    <>
      <div className="w-full flex items-stretch gap-x-2">
        <SidePanelFilter
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
        <div className="card h-[calc(100vh-7rem)] w-[80%]">
          <div className="card-header flex items-center justify-between border-b border-borderColor">
            <div>
              <Input type="text" placeholder={t('Search Task')} />
            </div>
          </div>
          <div className="card-body w-full">
            {todos
              .filter(FILTERS[activeItem] ?? (() => true))
              .map((item, index) => {
                return (
                  <TodoRow
                    rowKey={index}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    priority={item.priority}
                    date={item.date}
                    assignee={item.assignee}
                    isImportant={item.isImportant}
                    status={item.status}
                    setActiveItem={setActiveItem}
                  />
                )
              })}
          </div>
        </div>
      </div>
      <TodoDialog />
    </>
  )
}

export default TodoList
