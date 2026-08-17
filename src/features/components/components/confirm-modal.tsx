import React, { type FC } from 'react'
import type { ModalDialogType } from './modal-provider'
import Dialog from '#/components/dialog'
import { AlertTriangle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface props {
  open: boolean
  onClose: (str: ModalDialogType | null) => void
}

const ConfirmModal: FC<props> = ({ onClose, open }) => {
  const { t } = useTranslation('')
  return (
    <>
      <Dialog
        open={open}
        onClose={() => onClose('confirmation')}
        closeOnOutsideClick={false}
        size="sm"
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-red-500/15 text-red-500">
            <AlertTriangle size={22} />
          </div>
          <h3 className="mt-4 text-base font-semibold text-foreground">
            {t('Delete this project?')}
          </h3>
          <p className="mt-1.5 text-sm text-muted">
            {t(`This will permanently delete the project and all of its tasks. This
            action can't be undone.`)}
          </p>
        </div>
        <div className="mt-6 flex items-center justify-center gap-x-2">
          <button
            type="button"
            onClick={() => onClose('confirmation')}
            className="btn btn-secondary"
          >
            {t('Cancel')}
          </button>
          <button
            type="button"
            onClick={() => onClose('confirmation')}
            className="btn w-full justify-center rounded-md bg-red-500 p-2 text-sm font-semibold text-white! transition-colors hover:bg-red-600"
          >
            {t('Delete')}
          </button>
        </div>
      </Dialog>
    </>
  )
}

export default ConfirmModal
