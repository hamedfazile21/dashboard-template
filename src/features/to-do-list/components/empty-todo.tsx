import { ClipboardList, Plus } from 'lucide-react'

interface EmptyTodosProps {
  onAddTask?: () => void
  /** Customize copy depending on which filter is active (All / Completed / Important) */
  variant?: 'all' | 'completed' | 'important' | 'trashed' | 'search'
}

const copy = {
  all: {
    title: 'No tasks yet',
    description: 'Create your first task to get started.',
    showAction: true,
  },
  completed: {
    title: 'Nothing completed yet',
    description: 'Tasks you finish will show up here.',
    showAction: false,
  },
  important: {
    title: 'No important tasks',
    description: 'Mark a task as important to pin it here.',
    showAction: false,
  },
  trashed: {
    title: 'No deleted tasks',
    description: 'Tasks you deleted will show up here.',
    showAction: false,
  },
  search: {
    title: 'No matching tasks',
    description: 'Try a different search term.',
    showAction: false,
  },
}

function EmptyTodos({ onAddTask, variant = 'all' }: EmptyTodosProps) {
  const { title, description, showAction } = copy[variant]

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-3 px-6 py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <ClipboardList size={26} />
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-xs text-muted">{description}</p>
      </div>

      {showAction && onAddTask && (
        <button
          type="button"
          onClick={onAddTask}
          className="btn btn-primary mt-2 w-auto px-4"
        >
          <Plus size={16} />
          Add a task
        </button>
      )}
    </div>
  )
}

export default EmptyTodos
