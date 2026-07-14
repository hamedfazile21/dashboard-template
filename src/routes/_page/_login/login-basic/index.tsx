import LoginBasic from '#/features/login/login-basic'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_page/_login/login-basic/')({
  component: LoginBasic

})