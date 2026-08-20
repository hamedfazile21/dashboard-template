import { useModal, type TransitionVariant } from './modal-provider'
import { useTranslation } from 'react-i18next'

const TransitionsSection = () => {
  const { t } = useTranslation()
  const {
    transitionOptions,
    activeTransition,
    setActiveTransition,
    open,
    setOpen,
  } = useModal()

  const openTransition = (variant: TransitionVariant) => {
    setOpen('transition')
    setActiveTransition(variant)
  }
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          {t('Transitions')}
        </h2>
        <p className="text-xs text-muted">{t('Click any to preview')}</p>
      </div>

      <div className="card grid grid-cols-2 gap-2 p-3 sm:grid-cols-4">
        {transitionOptions.map(({ variant, label, icon: Icon }) => (
          <button
            key={variant}
            type="button"
            onClick={() => openTransition(variant)}
            className={`flex flex-col items-center gap-y-2 rounded-lg border py-4 text-xs font-medium transition-all duration-150 ${
              activeTransition === variant && open === 'transition'
                ? 'border-primary/40 bg-primary/10 text-primary'
                : 'border-transparent text-muted hover:border-white/10 hover:bg-surface-hover hover:text-foreground'
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>
    </section>
  )
}

export default TransitionsSection
