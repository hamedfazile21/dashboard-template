import React from 'react'
import PatternCard from './pattern-card'
import {
  AlertTriangle,
  ArrowUpToLine,
  CheckCircle2,
  Info,
  Pencil,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useModal } from './modal-provider'

const PatternsSection = () => {
  const { t } = useTranslation()
  const { setOpen } = useModal()
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold text-foreground">
        {t('Patterns')}
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <PatternCard
          icon={Info}
          iconColor="bg-blue-500/15 text-blue-500"
          title="Basic"
          description="Title, body copy, and a single acknowledging action."
          onOpen={() => setOpen('basic')}
        />
        <PatternCard
          icon={AlertTriangle}
          iconColor="bg-red-500/15 text-red-500"
          title="Confirmation"
          description="Destructive action — outside click is disabled on purpose."
          onOpen={() => setOpen('confirmation')}
        />
        <PatternCard
          icon={Pencil}
          iconColor="bg-primary/15 text-primary"
          title="Form"
          description="Inline fields with Cancel / Save actions."
          onOpen={() => setOpen('form')}
        />
        <PatternCard
          icon={ArrowUpToLine}
          iconColor="bg-indigo-500/15 text-indigo-500"
          title="Top-anchored"
          description="Anchored near the top — quick-create, announcements."
          onOpen={() => setOpen('top')}
        />
        <PatternCard
          icon={CheckCircle2}
          iconColor="bg-emerald-500/15 text-emerald-500"
          title="Success"
          description="No title bar — fully custom centered content."
          onOpen={() => setOpen('success')}
        />
      </div>
    </section>
  )
}

export default PatternsSection
