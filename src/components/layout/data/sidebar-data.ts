import { ChartNoAxesCombined, Users } from 'lucide-react'

export const sidebar = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: ChartNoAxesCombined,
    href: '/dashboard',
  },
  {
    id: 'users',
    title: 'Users',
    icon: Users,
    children: [
      {
        title: 'All Users',
        href: '/users',
      },
      {
        title: 'Create User',
        href: '/users/create',
      },
    ],
  },
]
