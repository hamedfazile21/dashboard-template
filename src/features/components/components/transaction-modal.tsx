import Dialog from '#/components/dialog'
import  { type FC } from 'react'
import {
  type ModalDialogType,
  type transitionOption,
  type TransitionVariant,
} from './modal-provider'

interface props {
  open: boolean
  onClose: (str: ModalDialogType | null) => void
  activeTransition: TransitionVariant
  transitionOptions: transitionOption[]
}

const TransactionModal: FC<props> = ({
  onClose,
  open,
  activeTransition,
  transitionOptions,
}) => {
  return (
    <Dialog
      open={open}
      position="top"
      onClose={() => onClose('transition')}
      title={
        transitionOptions.find((o) => o.variant === activeTransition)?.label
      }
      transition={activeTransition}
      size="sm"
    >
      <p className="text-sm text-muted">
        Opened with the{' '}
        <span className="font-medium text-foreground">{activeTransition}</span>{' '}
        transition.
      </p>
      <div className="mt-6 flex justify-end border-t border-white/10 pt-4 dark:border-white/8">
        <button
          type="button"
          onClick={() => onClose('transition')}
          className="btn btn-primary w-auto px-4"
        >
          Close
        </button>
      </div>
    </Dialog>
  )
}

export default TransactionModal
