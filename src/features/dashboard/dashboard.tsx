import i18n from '#/app/i18n'
import Custome from '#/components/custome'
import Dropdown from '#/components/drop-down'
import AnimateTooltip from '#/components/tooltip'
import Tippy from '@tippyjs/react'
import { useAppSelector } from '#/hooks/redux'
import { useTranslation } from 'react-i18next'
import Tooltip from '#/components/tooltip'
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
  const { counter } = useAppSelector((state) => state.dashboard)
  return (
    <div className="bg-yellow-500/20">
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

      <div className="bg-primary text-primary-foreground">{t('name')}</div>

      <div>
        <button onClick={handelChangeThemeColor}>Change Theme Color</button>
      </div>
      <Tooltip
        placement={'right'}
        content={'Hover Me'}
        children={<button>Click</button>}
      />
    </div>
  )
}

export default Dashboard
