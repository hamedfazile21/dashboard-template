import Dialog from '#/components/dialog'
import  { type FC } from 'react'
import type { ModalDialogType, Size, sizeOption } from './modal-provider'
import { useTranslation } from 'react-i18next'

interface props {
  open: boolean
  onClose: (str: ModalDialogType | null) => void
  sizeOptions: sizeOption[]
  activeSize: Size
}

const SizeModal: FC<props> = ({ onClose, open, sizeOptions, activeSize }) => {
  const { t } = useTranslation()
  return (
    <>
      <Dialog
        open={open}
        onClose={() => onClose('size')}
        title={sizeOptions.find((o) => o.size === activeSize)?.label}
        size={activeSize}
      >
        <p className="text-sm text-muted">
          This dialog is using the{' '}
          <span className="font-medium text-foreground">{activeSize}</span> size
          (
          {
            { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-xl' }[
              activeSize
            ]
          }
          ).
        </p>
        <div className="mt-6 flex justify-end border-t border-white/10 pt-4 dark:border-white/8">
          <button
            type="button"
            onClick={() => onClose('size')}
            className="btn btn-primary w-auto px-4"
          >
            {t('Close')}
          </button>
        </div>
      </Dialog>
    </>
  )
}

export default SizeModal
