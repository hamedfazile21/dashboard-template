import type { Task } from '..'

export const tasks: Task[] = [
  {
    id: 'T-101',
    title: 'Review pull request #482',
    assignee: 'Sara Ahmadi',
    priority: 'High',
    completed: false,
  },
  {
    id: 'T-102',
    title: 'Update the design system docs',
    assignee: 'Hamed Fazeli',
    priority: 'Medium',
    completed: false,
  },
  {
    id: 'T-103',
    title: 'Reply to client feedback',
    assignee: 'Leila Karimi',
    priority: 'Low',
    completed: true,
  },
  {
    id: 'T-104',
    title: 'Fix RTL layout on settings page',
    assignee: 'Hamed Fazeli',
    priority: 'High',
    completed: false,
  },
  {
    id: 'T-105',
    title: 'Set up CI pipeline',
    assignee: 'Sara Ahmadi',
    priority: 'Medium',
    completed: true,
  },
]
