import useDialogState from '#/hooks/use-dialog-state'
import React, {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { todoData, type TodoType } from '../data/todos'

export type TodoDialogType = 'create' | 'update' | 'delete'

type TodoContextType = {
  open: TodoDialogType | null
  setOpen: (str: TodoDialogType | null) => void
  todos: TodoType[]
  setTodos: Dispatch<SetStateAction<TodoType[]>>
}

const TodoContext = createContext<TodoContextType | null>(null)

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<TodoDialogType>(null)
  const [todos, setTodos] = useState<TodoType[]>(todoData)

  return (
    <TodoContext.Provider value={{ open, setOpen, todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodo = () => {
  const tasksContext = useContext(TodoContext)

  if (!tasksContext) {
    throw new Error('useTasks has to be used within <TasksContext>')
  }

  return tasksContext
}
