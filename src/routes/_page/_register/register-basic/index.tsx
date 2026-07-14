import RegisterBasic from '#/features/register/register-basic'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_page/_register/register-basic/')({
  component: RegisterBasic,
})
