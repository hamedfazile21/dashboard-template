import CheckBox from '#/components/Checkbox'
import Dropdown from '#/components/drop-down'
import { Ellipsis, SquarePen, Star, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface TaskRowProps {
  key: number
  title: string
  description: string
  priority: string
  categoryColor?: 'red' | 'blue' | 'emerald' | 'amber'
  date: string
  assignee: string
  completed: boolean
  onToggle: () => void
  onOpenMenu?: () => void
}

const categoryStyles = {
  red: 'border-red-500/30 bg-red-500/10 text-red-500',
  blue: 'border-blue-500/30 bg-blue-500/10 text-blue-500',
  emerald: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500',
  amber: 'border-amber-500/30 bg-amber-500/10 text-amber-500',
}

function TaskRow({
  key,
  title,
  description,
  priority,
  categoryColor = 'red',
  date,
  assignee,
  completed,
  onToggle,
  onOpenMenu,
}: TaskRowProps) {
  const { t } = useTranslation()
  return (
    <div key={key} className={`group odd:border-b odd:border-borderColor `}>
      <div className="w-full flex items-center gap-x-3 rounded-lg px-2 py-2.5 transition-colors duration-150 hover:bg-surface-hover/40">
        <div className="shrink-0 flex items-start gap-x-2 text-sm text-muted">
          <CheckBox checked={completed} onChange={onToggle} />
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start">
          <h3
            className={`w-full truncate text-sm font-medium ${
              completed ? 'text-muted line-through' : 'text-foreground'
            }`}
          >
            {title}
          </h3>
          <p className="w-full truncate text-xs text-muted">{description}</p>
        </div>

        <div className="hidden shrink-0 sm:block">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-medium ${categoryStyles[categoryColor]}`}
          >
            {priority}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-x-3">
          <p className="hidden text-xs text-muted md:block">{date}</p>

          <div className="flex size-9 items-center justify-center rounded-full border border-borderColor bg-surface-hover text-xs font-medium text-foreground">
            <img src={assignee} />
          </div>

          {/* <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Task options"
            className="rounded-md p-1.5 text-muted opacity-0 transition-all duration-150
            hover:bg-surface-hover hover:text-foreground
            focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
            group-hover:opacity-100"
          >
            <Ellipsis size={18} />
          </button> */}
          <Dropdown
            menuItemClassName="!w-[150px]"
            menuButtonClassName='bg-transparent! border-0'
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
                onClick: () => {},
                title: 'Delete',
                icon: <Trash2 size={18} />,
              },

              {
                className: ``,
                onClick: () => {},
                title: 'Important',
                icon: <Star size={18} />,
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default TaskRow
