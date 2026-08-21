import SimpleAccordions from './components/simple-accordions'
import BorderedAccordions from './components/bordered-accordions'
import BoxedAccordions from './components/boxed-accordions'
import IconAccordions from './components/icon-accordions'
import PlusMinusAccordions from './components/plusMinus-accordions'
import GhostAccordions from './components/ghost-accordions'
import { useTranslation } from 'react-i18next'
import { GlassBlob1, GlassBlob2 } from '../../../../public/assets'

function AccordionShowcase() {
  const { t } = useTranslation()
  return (
    <div className="relative mx-auto flex w-full flex-col gap-y-8">
      <img src={GlassBlob1} className="absolute size-100 left-0 top-0 -z-10" />

      <img
        src={GlassBlob2}
        className="absolute right-0 bottom-0 size-100 -z-10"
      />
      <div>
        <h1 className="text-xl font-semibold text-foreground">Accordion</h1>

        <p className="mt-1 text-sm text-muted">
          {t(`  Six visual styles, all built on the same compound Accordion component
          — only the`)}{' '}
          <code className="rounded bg-surface-hover px-1 py-0.5 text-xs">
            variant
          </code>{' '}
          {t('prop changes.')}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-5 justify-between">
        <SimpleAccordions />
        <BorderedAccordions />
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-5 justify-between">
        <BoxedAccordions />
        <IconAccordions />
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-5 justify-between">
        <PlusMinusAccordions />
        <GhostAccordions />
      </div>
    </div>
  )
}

export default AccordionShowcase
