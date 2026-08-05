import useDialogState from '#/hooks/use-dialog-state'
import React, {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { teaksData, type ColumnId, type Task } from '../data/task'

export type TaskDialogType = 'create' | 'update' | 'details'

type TodoContextType = {
  open: TaskDialogType | null
  setOpen: (str: TaskDialogType | null) => void
  tasks: Record<ColumnId, Task[]>
  setTasks: Dispatch<SetStateAction<Record<ColumnId, Task[]>>>
}

const TaskContext = createContext<TodoContextType | null>(null)

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<TaskDialogType>(null)
  const [tasks, setTasks] = useState<Record<ColumnId, Task[]>>(teaksData)

  return (
    <TaskContext.Provider
      value={{
        open,
        setOpen,
        tasks,
        setTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export const useTask = () => {
  const tasksContext = useContext(TaskContext)

  if (!tasksContext) {
    throw new Error('useTasks has to be used within <TasksContext>')
  }

  return tasksContext
}
