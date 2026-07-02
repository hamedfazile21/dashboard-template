import { ChartNoAxesCombined, ChevronRight } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Sidebar = () => {
  const { t } = useTranslation()
  return (
    <div className="h-screen border-r border-light w-75 ">
      <div className="h-14 border-b border-light flex items-center justify-between px-2">
        <p>{t('Name')}</p>
        <p>{t('Icon')}</p>
      </div>
      <div className="p-2 flex flex-col gap-y-2">
        <div className="flex items-center justify-between rounded bg-primary/10 p-2 hover:bg-gray-200 cursor-pointer">
          <div className='flex items-center gap-x-2'>
            <ChartNoAxesCombined />
            <span className='text-system'>{t('Dashboard')}</span>
          </div>
          <div>
            <ChevronRight size={18} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Sidebar
