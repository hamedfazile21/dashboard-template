import Dialogs from './components/dialogs'
import { useTranslation } from 'react-i18next'
import PatternsSection from './components/patterns-section'
import TransitionsSection from './components/transitions-section'
import SizeSection from './components/size-section'
import { GlassBlob1, GlassBlob2 } from '../../../../public/assets'

function Modals() {
  const { t } = useTranslation()

  return (
    <div className="relative mx-auto flex w-full flex-col gap-y-8">
      <img src={GlassBlob1} className="absolute size-100 right-0 top-0 -z-10" />
      <img
        src={GlassBlob2}
        className="absolute left-0 bottom-0 size-100 -z-10"
      />

      <div>
        <h1 className="text-xl font-semibold text-foreground">{t('Modals')}</h1>
        <p className="mt-1 text-sm text-muted">
          {t(`Reusable dialog patterns and enter/exit transitions, built on the
          shared Dialog component.`)}
        </p>
      </div>

      <TransitionsSection />
      <PatternsSection />
      <SizeSection />

      <Dialogs />
    </div>
  )
}

export default Modals
