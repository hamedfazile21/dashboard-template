import LoginCover from '#/features/login/login-cover'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_page/_login/login-cover/')({
  component: LoginCover,
})