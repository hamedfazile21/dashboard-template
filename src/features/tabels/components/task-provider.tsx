import useDialogState from '#/hooks/use-dialog-state'
import type { SortingState, VisibilityState } from '@tanstack/react-table'
import React, {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'

export type TodoDialogType = 'create' | 'update' | 'details'

type TaskContextType = {
  open: TodoDialogType | null
  setOpen: (str: TodoDialogType | null) => void
  globalFilter: string
  setGlobalFilter: Dispatch<SetStateAction<string>>
  sorting: SortingState
  setSorting: Dispatch<SetStateAction<SortingState>>
  columnVisibility: VisibilityState
  setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>
}

const TaskContext = createContext<TaskContextType | null>(null)

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<TodoDialogType>(null)
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  return (
    <TaskContext.Provider
      value={{
        open,
        setOpen,
        globalFilter,
        setGlobalFilter,
        setSorting,
        sorting,
        columnVisibility,
        setColumnVisibility,
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
