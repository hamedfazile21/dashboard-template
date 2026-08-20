import React, { useState, type FC } from 'react'
import type { ModalDialogType } from './modal-provider'
import Dialog from '#/components/dialog'
import Input from '#/components/input'
import { useTranslation } from 'react-i18next'

interface props {
  open: boolean
  onClose: (str: ModalDialogType | null) => void
}

const FormModal: FC<props> = ({ onClose, open }) => {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    onClose('basic')
  }
  return (
    <>
      <Dialog open={open} onClose={() => onClose('form')} title="Edit profile">
        <form onSubmit={handleSave} className="flex flex-col gap-y-4">
          <Input
            id="modal-name"
            label={t('Name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Hamed Fazeli"
          />
          <Input
            id="modal-email"
            type="email"
            label={t('Email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <div className="mt-2 flex items-center justify-end gap-x-2 border-t border-white/10 pt-4 dark:border-white/8">
            <button
              type="button"
              onClick={() => onClose('form')}
              className="btn btn-secondary"
            >
              {t('Cancel')}
            </button>
            <button type="submit" className="btn btn-primary">
              {t('Save changes')}
            </button>
          </div>
        </form>
      </Dialog>
    </>
  )
}

export default FormModal
