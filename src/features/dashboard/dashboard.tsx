import i18n from '#/app/i18n'
import { useAppSelector } from '#/hooks/redux'
import { useTranslation } from 'react-i18next'

const Dashboard = () => {
  const { t } = useTranslation()
  const { counter } = useAppSelector((state) => state.dashboard)
  return (
    <div className="bg-yellow-500/20">
      <div className="">{t('name')}</div>
    </div>
  )
}

export default Dashboard
