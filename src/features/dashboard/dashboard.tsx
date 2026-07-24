import i18n from '#/app/i18n'
import Custome from '#/components/custome'
import Dropdown from '#/components/drop-down'
import AnimateTooltip from '#/components/tooltip'
import Tippy from '@tippyjs/react'
import { useAppSelector } from '#/hooks/redux'
import { useTranslation } from 'react-i18next'
import Tooltip from '#/components/tooltip'
import { User } from 'lucide-react'
import { toast } from 'sonner'
import ObjectViewer from '#/components/object-viewer'
import { showObjectToast } from '#/helper/toast-helper'
import Popover from '#/components/popover'
import Select from '#/components/input-select'
import InputSelect from '#/components/input-select'
import Dialog from '#/components/dialog'
import { useState } from 'react'
const Dashboard = () => {
  const { t } = useTranslation()
  const handelChangeLanguage = (language: string) => {
    if (language === 'fa') {
      document.dir = 'rtl'
      localStorage.setItem('dir', 'rtl')
      i18n.changeLanguage('fa')
    } else {
      document.dir = 'ltr'
      localStorage.setItem('dir', 'ltr')
      i18n.changeLanguage('en')
    }
  }
  const handelChangeThemeColor = () => {
    document.documentElement.style.setProperty(
      '--color-primary',
      'rgb(16 185 129)',
    )
    localStorage.setItem('primary-color', 'rgb(16 185 129)')
  }
  const handelChangeTheme = () => {
    document.documentElement.classList.toggle('dark')
  }
  const { counter } = useAppSelector((state) => state.dashboard)
  const [openModal, setOpenModal] = useState<boolean>(false)
  return (
    <div className="bg-blue-500/20">
      <Popover
        trigger={<button className="btn btn-secondary">Open</button>}
        placement="bottom-start"
      >
        <div className="flex flex-col gap-y-1">
          <p className="text-sm font-medium text-foreground">Notifications</p>
          <p className="text-xs text-muted">You're all caught up.</p>
        </div>
      </Popover>
      <Popover
        trigger={<button className="btn btn-secondary">Open</button>}
        placement="bottom-start"
      >
        <div className="flex flex-col gap-y-1">
          <p className="text-sm font-medium text-foreground">Notifications</p>
          <p className="text-xs text-muted">You're all caught up.</p>
        </div>
      </Popover>
      <button
        className="px-5 bg-primary"
        onClick={() => handelChangeLanguage('fa')}
      >
        Fa
      </button>
      <button
        className="px-5 bg-primary"
        onClick={() => handelChangeLanguage('en')}
      >
        EN
      </button>

      <div className="bg-primary text-primary-foreground ">{t('name')}</div>

      <div>
        <button onClick={handelChangeThemeColor}>Change Theme Color</button>
      </div>
      <div>
        <button onClick={handelChangeTheme}>Change Theme</button>
      </div>
      <button onClick={() => setOpenModal(true)}>Modal</button>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="New Task"
        position="top"
        closeOnOutsideClick={false}
        
      >
        <p>Ali</p>
      </Dialog>
    </div>
  )
}

export default Dashboard
