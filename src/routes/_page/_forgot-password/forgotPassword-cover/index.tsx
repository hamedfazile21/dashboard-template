import ForgotPasswordCover from '#/features/forgot-password/forgot-password-cover'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_page/_forgot-password/forgotPassword-cover/',
)({
  component: ForgotPasswordCover,
})
