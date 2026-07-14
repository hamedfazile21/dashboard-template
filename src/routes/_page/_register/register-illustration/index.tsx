import RegisterIllustration from '#/features/register/register-illustration'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_page/_register/register-illustration/')(
  {
    component: RegisterIllustration,
  },
)
