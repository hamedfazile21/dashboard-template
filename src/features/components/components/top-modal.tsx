import { type FC } from 'react'
import type { ModalDialogType } from './modal-provider'
import Dialog from '#/components/dialog'
import Input from '#/components/input'

interface props {
  open: boolean
  onClose: (str: ModalDialogType | null) => void
}

const TopModal: FC<props> = ({ onClose, open }) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={() => onClose('top')}
        title="Quick create"
        position="top"
        size="sm"
      >
        <Input id="quick-create" placeholder="Task title..." autoFocus />
        <div className="mt-4 flex justify-end gap-x-2">
          <button
            type="button"
            onClick={() => onClose('top')}
            className="btn btn-secondary w-auto px-4"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onClose('top')}
            className="btn btn-primary w-auto px-4"
          >
            Create
          </button>
        </div>
      </Dialog>
    </>
  )
}

export default TopModal
