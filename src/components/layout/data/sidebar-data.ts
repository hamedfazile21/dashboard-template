import { ChartNoAxesCombined, Users } from 'lucide-react'

export type SidebarChild = {
  title: string
  href: string
}

export type SidebarItem = {
  id: string
  title: string
  icon?: typeof ChartNoAxesCombined
  href?: string
  type?: 'group'
  children?: SidebarChild[] | SidebarItem[]
}

export const sidebar_data: SidebarItem[] = [
  {
    id: 'main-group',
    title: 'Main',
    type: 'group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        icon: ChartNoAxesCombined,
        href: '',
        children: [
          {
            title: 'Overview',
            href: '/',
          },
          {
            title: 'Analytics',
            href: '/dashboard/analytics',
          },
        ],
      },
      {
        id: 'users',
        title: 'Users',
        icon: Users,
        children: [
          {
            title: 'All Users',
            href: '/sd',
          },
          {
            title: 'Create User',
            href: '/users/create',
          },
        ],
      },
    ],
  },
  {
    id: 'main-group',
    title: 'HR',
    type: 'group',
    children: [
      {
        id: 'dashboard12',
        title: 'Dashboard',
        icon: ChartNoAxesCombined,
        href: '',
        children: [
          {
            title: 'Overview',
            href: '/dashboard',
          },
          {
            title: 'Analytics',
            href: '/dashboard/analytics',
          },
          {
            title: 'Analytics-2',
            href: '/dashboard/analytics',
          },
        ],
      },
      {
        id: 'userssds',
        title: 'Users',
        icon: Users,
        children: [
          {
            title: 'All Users',
            href: '/sd',
          },
          {
            title: 'Create User',
            href: '/users/create',
          },
        ],
      },
    ],
  },
]
