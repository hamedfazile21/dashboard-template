import { Fragment, useEffect } from 'react'
import type { ReactNode } from 'react'
import {
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle,
  Description,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
}

interface DialogProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  size?: keyof typeof sizeClasses
  /** 'center' = normal modal; 'top' = anchored near the top of the viewport */
  position?: 'center' | 'top'
  /** Hide the built-in X button if you want fully custom header content */
  showCloseButton?: boolean
  /**
   * Whether clicking the backdrop (outside the panel) closes the dialog.
   * Defaults to true. Escape and the X/footer buttons still close the
   * dialog either way — this only affects outside clicks.
   *
   * Note: Headless UI has no built-in way to distinguish "closed via
   * outside click" from "closed via Escape" — both fire the same onClose.
   * When this is false, we pass a no-op to Headless UI's onClose (which
   * disables both) and re-add Escape handling ourselves below.
   */
  closeOnOutsideClick?: boolean
}

export function Dialog({
  open,
  onClose,
  title,
  children,
  size = 'md',
  position = 'center',
  showCloseButton = true,
  closeOnOutsideClick = true,
}: DialogProps) {
  const { t } = useTranslation()

  // Re-add Escape-to-close ourselves when outside-click is disabled,
  // since disabling Headless UI's onClose disables Escape too.
  useEffect(() => {
    if (closeOnOutsideClick || !open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeOnOutsideClick, open, onClose])

  return (
    <Transition show={open} as={Fragment}>
      <HeadlessDialog
        onClose={closeOnOutsideClick ? onClose : () => {}}
        className="relative z-50"
      >
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
          />
        </TransitionChild>

        {/* Panel wrapper — controls center vs top anchoring */}
        <div
          className={`fixed inset-0 flex justify-center overflow-y-auto p-4 ${
            position === 'top' ? 'items-start pt-10' : 'items-center'
          }`}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95 translate-y-2"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className={`card w-full ${sizeClasses[size]} p-6`}>
              {(title || showCloseButton) && (
                <div className="card-header border-b! border-borderColor!">
                  <div>
                    {title && (
                      <DialogTitle className="text-base font-semibold text-foreground">
                        {t(title)}
                      </DialogTitle>
                    )}
                  </div>

                  {showCloseButton && (
                    <button
                      type="button"
                      onClick={onClose}
                      aria-label="Close"
                      className="shrink-0 rounded-md p-1 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              )}

              <>{children}</>
            </DialogPanel>
          </TransitionChild>
        </div>
      </HeadlessDialog>
    </Transition>
  )
}

export default Dialog
