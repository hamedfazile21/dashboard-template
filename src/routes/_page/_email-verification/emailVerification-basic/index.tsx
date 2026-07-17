import EmailVerificationBasic from '#/features/email-verification/email-verification-basic'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_page/_email-verification/emailVerification-basic/',
)({
  component: EmailVerificationBasic,
})
