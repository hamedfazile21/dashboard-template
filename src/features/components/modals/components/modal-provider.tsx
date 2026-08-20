import useDialogState from '#/hooks/use-dialog-state'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  RotateCcw,
  Sparkles,
} from 'lucide-react'
import React, {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'

export type ModalDialogType =
  'transition' | 'basic' | 'confirmation' | 'form' | 'top' | 'success' | 'size'

export type TransitionVariant =
  | 'fadeIn'
  | 'slideInDown'
  | 'fadeInUp'
  | 'slideInUp'
  | 'fadeInLeft'
  | 'rotateInLeft'
  | 'fadeInRight'
  | 'zoomInUp'

export type Size = 'sm' | 'md' | 'lg' | 'xl'

export type transitionOption = {
  variant: TransitionVariant
  label: string
  icon: typeof ArrowDown
}

export type sizeOption = { size: Size; label: string; badgeWidth: string }

type ModalContextType = {
  open: ModalDialogType | null
  setOpen: (str: ModalDialogType | null) => void
  activeTransition: TransitionVariant
  setActiveTransition: Dispatch<SetStateAction<TransitionVariant>>
  transitionOptions: transitionOption[]
  activeSize: Size
  setActiveSize: Dispatch<SetStateAction<Size>>
  sizeOptions: sizeOption[]
}

const ModalContext = createContext<ModalContextType | null>(null)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<ModalDialogType>(null)
  const [activeTransition, setActiveTransition] =
    useState<TransitionVariant>('fadeIn')
  const [activeSize, setActiveSize] = useState<Size>('md')

  const transitionOptions: transitionOption[] = [
    { variant: 'fadeIn', label: 'Fade In', icon: Sparkles },
    { variant: 'slideInDown', label: 'Slide Down', icon: ArrowDown },
    { variant: 'fadeInUp', label: 'Fade Up', icon: ArrowUp },
    { variant: 'slideInUp', label: 'Slide Up', icon: ArrowUp },
    { variant: 'fadeInLeft', label: 'Fade Left', icon: ArrowLeft },
    { variant: 'rotateInLeft', label: 'Rotate Left', icon: RotateCcw },
    { variant: 'fadeInRight', label: 'Fade Right', icon: ArrowRight },
    { variant: 'zoomInUp', label: 'Zoom Up', icon: Sparkles },
  ]

  const sizeOptions: sizeOption[] = [
    { size: 'sm', label: 'Small', badgeWidth: 'w-6' },
    { size: 'md', label: 'Medium', badgeWidth: 'w-9' },
    { size: 'lg', label: 'Large', badgeWidth: 'w-12' },
    { size: 'xl', label: 'Extra Large', badgeWidth: 'w-16' },
  ]

  return (
    <ModalContext.Provider
      value={{
        open,
        setOpen,
        activeTransition,
        setActiveTransition,
        transitionOptions,
        activeSize,
        setActiveSize,
        sizeOptions,
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
