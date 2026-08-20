import { useModal } from './modal-provider'
import SuccessModal from './success-modal'
import TopModal from './top-modal'
import FormModal from './form-modal'
import ConfirmModal from './confirm-modal'
import BasicModal from './basic-modal'
import TransactionModal from './transaction-modal'
import SizeModal from './size-modal'

const Dialogs = () => {
  const {
    open,
    setOpen,
    transitionOptions,
    activeTransition,
    activeSize,
    sizeOptions,
  } = useModal()
  return (
    <>
      <SuccessModal
        key={'success-modal'}
        open={open === 'success'}
        onClose={() => setOpen('success')}
      />

      <TopModal
        key={'top-modal'}
        open={open === 'top'}
        onClose={() => setOpen('top')}
      />

      <FormModal
        key={'form-modal'}
        open={open === 'form'}
        onClose={() => setOpen('form')}
      />

      <ConfirmModal
        key={'confirm-modal'}
        open={open === 'confirmation'}
        onClose={() => setOpen('confirmation')}
      />

      <BasicModal
        key={'basic-modal'}
        open={open === 'basic'}
        onClose={() => setOpen('basic')}
      />

      <TransactionModal
        key={'transition-modal'}
        open={open === 'transition'}
        onClose={() => setOpen('transition')}
        activeTransition={activeTransition}
        transitionOptions={transitionOptions}
      />

      <SizeModal
        key={'size-modal'}
        open={open === 'size'}
        onClose={() => setOpen('size')}
        activeSize={activeSize}
        sizeOptions={sizeOptions}
      />
    </>
  )
}

export default Dialogs
