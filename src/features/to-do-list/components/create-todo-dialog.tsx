import Dialog from '#/components/dialog'
import React from 'react'
import type { TodoDialogType } from './todo-provider'
import { useTranslation } from 'react-i18next'

interface props {
  open: TodoDialogType | null
  setOpen: (str: TodoDialogType | null) => void
}

const CreateTodoDialog: React.FC<props> = ({ open, setOpen }) => {
  const { t } = useTranslation()
  const closeDialig = () => {
    setOpen('create')
  }
  return (
    <Dialog
      key={'todo-create'}
      open={open === 'create'}
      onClose={closeDialig}
      title="New To Do"
      position="top"
      closeOnOutsideClick={false}
      size={'lg'}
    >
      <div className="card-body">Gdd</div>
      <div className="card-footer">
        <div className="flex items-center gap-x-2">
          <button className="btn btn-primary">{t('Submit')}</button>
          <button className="btn btn-secondary" onClick={closeDialig}>
            {t('Cancel')}
          </button>
        </div>
      </div>
    </Dialog>
  )
}

export default CreateTodoDialog
