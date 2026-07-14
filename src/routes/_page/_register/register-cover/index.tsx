import RegisterCover from '#/features/register/register-cover'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_page/_register/register-cover/')({
  component: RegisterCover,
})
