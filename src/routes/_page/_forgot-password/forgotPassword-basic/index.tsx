import ForgotPasswordBasic from '#/features/forgot-password/forgot-password-basic'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_page/_forgot-password/forgotPassword-basic/',
)({
  component: ForgotPasswordBasic,
})
