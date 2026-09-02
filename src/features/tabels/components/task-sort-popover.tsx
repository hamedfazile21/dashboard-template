import Popover from '#/components/popover'
import { ArrowDown, ArrowUp, EyeOff } from 'lucide-react'
import React, { type FC } from 'react'
import { useTranslation } from 'react-i18next'

interface props {
  children: React.ReactNode
  sortBy: 'asc' | 'desc' | 'hidden'
  setSortBy: (sortBy: 'asc' | 'desc' | 'hidden') => void
}

const TaskSortPopover: FC<props> = ({ children, sortBy, setSortBy }) => {
  const { t } = useTranslation()
  return (
    <Popover
      className="w-34 p-1!"
      trigger={<div className="w-fit">{children}</div>}

      placement="bottom-end"
    >
      <div className="flex flex-col gap-y-1 ">
        <button className="flex items-center gap-x-2 text-foreground hover:bg-surface-hover px-2 py-1.5 rounded-md w-full text-start">
          <span>
            <ArrowUp className="text-muted text-sm" size={17} />
          </span>
          <span className="text-system">{t('Asc')}</span>
        </button>
        <button className="flex items-center gap-x-2 text-foreground hover:bg-surface-hover px-2 py-1.5 rounded-md w-full text-start">
          <span>
            <ArrowDown className="text-muted text-sm" size={17} />
          </span>
          <span className="text-system">{t('Desc')}</span>
        </button>
        <div className="border-t border-borderColor" />
        <button className="flex items-center gap-x-2 text-foreground hover:bg-surface-hover px-2 py-1.5 rounded-md w-full text-start">
          <span>
            <EyeOff className="text-muted text-sm" size={17} />
          </span>
          <span className="text-system">{t('Hidden')}</span>
        </button>
      </div>
    </Popover>
  )
}

export default TaskSortPopover
