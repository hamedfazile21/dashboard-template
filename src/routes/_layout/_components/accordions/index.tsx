import AccordionShowcase from '#/features/components/accordions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_components/accordions/')({
  component: AccordionShowcase,
})
