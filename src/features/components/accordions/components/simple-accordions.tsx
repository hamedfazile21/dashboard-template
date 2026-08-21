import Accordion from '#/components/accordions/accordion'
import { faq } from '../data/FAQ'

const SimpleAccordions = () => {
  return (
    <section className="card p-5 w-full lg:w-1/2">
      <p className="mb-3 text-sm font-semibold text-foreground">
        Simple{' '}
        <span className="ml-2 text-xs font-normal text-muted">
          variant="simple"
        </span>
      </p>
      <Accordion type="single" variant="simple" defaultValue="q1">
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

export default SimpleAccordions
