import useDialogState from '#/hooks/use-dialog-state'
import React, { createContext, useContext } from 'react'

export type TodoDialogType =
  | 'fadeIn'
  | 'slideInDown'
  | 'fadeInUp'
  | 'slideInUp'
  | 'fadeInLeft'
  | 'rotateInLeft'
  | 'fadeInRight'
  | 'zoomInUp'
  | 'basic'
  | 'confirmation'
  | 'form'
  | 'top'
  | 'success'

type ModalContextType = {
  open: TodoDialogType | null
  setOpen: (str: TodoDialogType | null) => void
}

const ModalContext = createContext<ModalContextType | null>(null)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<TodoDialogType>(null)

  return (
    <ModalContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const tasksContext = useContext(ModalContext)

  if (!tasksContext) {
    throw new Error('useTasks has to be used within <TasksContext>')
  }

  return tasksContext
}
