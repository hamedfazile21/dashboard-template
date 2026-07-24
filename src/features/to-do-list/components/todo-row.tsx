import CheckBox from '#/components/Checkbox'
import Dropdown from '#/components/drop-down'
import { Ellipsis, SquarePen, Star, StarOff, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Priority, TodoStatus, TodoType } from '../data/todos'
import { useTodo } from './todo-provider'
import type { Dispatch, SetStateAction } from 'react'

interface TaskRowProps {
  rowKey: number
  id: number
  title: string
  description: string
  priority: Priority
  date: string
  assignee: string
  isImportant: boolean
  status: TodoStatus,
  setActiveItem : Dispatch<SetStateAction<number>>
}

const categoryStyles = {
  red: 'border-red-500/30 bg-red-500/10 text-red-500',
  blue: 'border-blue-500/30 bg-blue-500/10 text-blue-500',
  emerald: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500',
  amber: 'border-amber-500/30 bg-amber-500/10 text-amber-500',
}

function TodoRow({
  rowKey,
  id,
  title,
  description,
  priority,
  date,
  assignee,
  status,
  isImportant,
  setActiveItem
}: TaskRowProps) {
  const { t } = useTranslation()
  const { todos, setTodos } = useTodo()
  const priorityStyle =
    priority === 'Low' ? 'emerald' : priority === 'Medium' ? 'blue' : 'red'

  const completeAction = (id: number) => {
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
    const deleteData: TodoType[] = todos.map((item) =>
      item.id === id
        ? {
            ...item,
            status: 'trashed',
          }
        : item,
    )
    setActiveItem(4)
    setTodos(deleteData)
  }

  return (
    <div key={rowKey} className={`group border-b border-borderColor`}>
      <div
        className={`w-full flex items-center gap-x-3 rounded-lg px-2 py-2.5 transition-colors duration-150 hover:bg-surface-hover/40  ${status === 'complete' && 'bg-surface/30'}`}
      >
        <div className="shrink-0 flex items-start gap-x-2 text-sm text-muted">
          <CheckBox
            checked={status === 'complete'}
            onChange={() => completeAction(id)}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start">
          <h3
            className={`w-full truncate text-sm font-medium ${
              status === 'complete'
                ? 'text-muted line-through'
                : 'text-foreground'
            }`}
          >
            {title}
          </h3>
          <p className="w-full truncate text-xs text-muted">{description}</p>
        </div>

        <div className="hidden shrink-0 sm:block">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-medium ${categoryStyles[priorityStyle]}`}
          >
            {priority}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-x-3">
          <p className="hidden text-xs text-muted md:block">{date}</p>

          <div className="flex size-9 items-center justify-center rounded-full border border-borderColor bg-surface-hover text-xs font-medium text-foreground">
            <img src={assignee} />
          </div>

          <Dropdown
            menuItemClassName="!w-[150px]"
            menuButtonClassName="bg-transparent! border-0! shadow-none! p-0!"
            menuButtonContent={
              <div className="flex items-center text-foreground">
                <Ellipsis size={18} />
              </div>
            }
            menuItemContent={[
              {
                className: ``,
                onClick: () => {},
                title: 'Edit',
                icon: <SquarePen size={18} />,
              },

              {
                className: ``,
                onClick: () => handelToggleImportant(id),
                title: isImportant ? 'Not Important' : 'Important',
                icon: isImportant ? <StarOff size={18} /> : <Star size={18} />,
              },
              {
                className: `text-red-500`,
                onClick: () => handelDeleteTask(id),
                title: 'Delete',
                icon: <Trash2 size={18} />,
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default TodoRow
