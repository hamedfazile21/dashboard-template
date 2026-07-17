import EmailVerificationCover from '#/features/email-verification/email-verification-cover'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_page/_email-verification/emailVerification-cover/',
)({
  component: EmailVerificationCover,
})
