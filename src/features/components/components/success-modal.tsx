import Dialog from '#/components/dialog'
import { CheckCircle2 } from 'lucide-react'
import React, { type Dispatch, type FC, type SetStateAction } from 'react'
import type { ModalDialogType } from './modal-provider'

interface props {
  open: boolean
  onClose: (str: ModalDialogType | null) => void
}

const SuccessModal: FC<props> = ({ onClose, open }) => {
  return (
    <Dialog
      open={open}
      onClose={() => onClose('success')}
      showCloseButton={false}
      size="sm"
    >
      <div className="flex flex-col items-center py-2 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
          <CheckCircle2 size={26} />
        </div>
        <h3 className="mt-4 text-base font-semibold text-foreground">
          Payment successful
        </h3>
        <p className="mt-1.5 text-sm text-muted">
          Your subscription is now active. A receipt has been sent to your
          email.
        </p>
        <button
          type="button"
          onClick={() => onClose('success')}
          className="btn btn-primary mt-6 w-full"
        >
          Continue
        </button>
      </div>
    </Dialog>
  )
}

export default SuccessModal
