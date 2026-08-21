import Accordion from '#/components/accordions/accordion'
import { faq } from '../data/FAQ'

const BorderedAccordions = () => {
  return (
    <section className="w-full lg:w-1/2 border border-borderColor p-5 rounded-xl">
      <p className="mb-3 text-sm font-semibold text-foreground">
        Bordered{' '}
        <span className="ml-2 text-xs font-normal text-muted">
          variant="bordered"
        </span>
      </p>
      <Accordion type="single" variant="bordered" defaultValue="q1">
        {faq.map(({ value, q, a }) => (
          <Accordion.Item key={value} value={value}>
            <Accordion.Trigger>{q}</Accordion.Trigger>
            <Accordion.Content>{a}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </section>
  )
}

export default BorderedAccordions
