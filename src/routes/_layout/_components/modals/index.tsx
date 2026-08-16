import { ModalProvider } from '#/features/components/components/modal-provider'
import Modals from '#/features/components/modals'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_components/modals/')({
  component: () => (
    <ModalProvider>
      <Modals />
    </ModalProvider>
  ),
})
