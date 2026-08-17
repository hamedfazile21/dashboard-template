import Dialog from '#/components/dialog'
import React, { type FC } from 'react'
import type { ModalDialogType } from './modal-provider'
import { useTranslation } from 'react-i18next'

interface props {
  open: boolean
  onClose: (str: ModalDialogType | null) => void
}

const BasicModal: FC<props> = ({ onClose, open }) => {
  const { t } = useTranslation()
  return (
    <>
      <Dialog
        open={open}
        onClose={() => onClose('basic')}
        title="About this workspace"
      >
        <p className="text-sm text-muted">
          {t(`This workspace was created on Aug 12, 2026 and currently has 8 active
          members. You can manage access and billing from the workspace settings
          page.`)}
        </p>
        <div className="mt-6 flex justify-end border-t border-white/10 pt-4 dark:border-white/8">
          <button
            type="button"
            onClick={() => onClose('basic')}
            className="btn btn-primary w-auto px-4"
          >
            {t('Got it')}
          </button>
        </div>
      </Dialog>
    </>
  )
}

export default BasicModal
