import { ChevronRight, Icon, type Info } from 'lucide-react'
import React, { type FC } from 'react'
import { useTranslation } from 'react-i18next'

interface props {
  icon: typeof Info
  iconColor: string
  title: string
  description: string
  onOpen: () => void
}

const PatternCard: FC<props> = ({
  description,
  icon: Icon,
  iconColor,
  onOpen,
  title,
}) => {
  const { t } = useTranslation()
  return (
    <button
      type="button"
      onClick={onOpen}
      className="card card-hover group flex w-full flex-col items-start gap-y-3 p-5 text-left"
    >
      <div
        className={`flex size-10 items-center justify-center rounded-full ${iconColor}`}
      >
        <Icon size={18} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted">{description}</p>
      </div>
      <span className="flex items-center gap-x-1 text-xs font-medium text-primary opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        {t('Preview')}
        <ChevronRight size={13} />
      </span>
    </button>
  )
}

export default PatternCard
