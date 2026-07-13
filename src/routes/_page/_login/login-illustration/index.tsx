import LoginIllustration from '#/features/login/login-illustration'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_page/_login/login-illustration/')({
  component: LoginIllustration,
})
