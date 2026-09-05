import type { Task } from '..'

export const defaultData: Array<Task> = [
  {
    id: 'TASK-101',
    title: 'Fix login validation when users submit an expired session token',
    label: 'Bug',
    priority: 'High',
    status: 'In Progress',
  },
  {
    id: 'TASK-102',
    title:
      'Add a persistent dark mode toggle to the account preferences screen',
    label: 'Feature',
    priority: 'Medium',
    status: 'Todo',
  },
  {
    id: 'TASK-103',
    title:
      'Update the API documentation with authentication and pagination examples',
    label: 'Documentation',
    priority: 'Low',
    status: 'Backlog',
  },
  {
    id: 'TASK-104',
    title:
      'Refactor dashboard widgets to support responsive layouts on smaller screens',
    label: 'Feature',
    priority: 'Critical',
    status: 'Done',
  },
  {
    id: 'TASK-105',
    title:
      'Fix the task search filter when the mobile keyboard changes the viewport size',
    label: 'Bug',
    priority: 'High',
    status: 'In Progress',
  },
  {
    id: 'TASK-106',
    title:
      'Review access control rules for project members with limited permissions',
    label: 'Documentation',
    priority: 'Medium',
    status: 'Canceled',
  },
  {
    id: 'TASK-107',
    title:
      'Prepare release notes covering the new reporting and workspace management features',
    label: 'Documentation',
    priority: 'Low',
    status: 'Todo',
  },
  {
    id: 'TASK-108',
    title:
      'Implement CSV export with visible columns, applied filters, and selected rows',
    label: 'Feature',
    priority: 'High',
    status: 'Backlog',
  },
  {
    id: 'TASK-109',
    title:
      'Improve notification delivery retries when the external provider is unavailable',
    label: 'Feature',
    priority: 'Critical',
    status: 'In Progress',
  },
  {
    id: 'TASK-110',
    title:
      'Add bulk editing controls for changing labels across multiple selected tasks',
    label: 'Feature',
    priority: 'High',
    status: 'Todo',
  },
  {
    id: 'TASK-111',
    title:
      'Document the workspace invitation flow and common account recovery questions',
    label: 'Documentation',
    priority: 'Low',
    status: 'Done',
  },
  {
    id: 'TASK-112',
    title:
      'Investigate slow table rendering after applying several combined filters',
    label: 'Bug',
    priority: 'Critical',
    status: 'Backlog',
  },
  {
    id: 'TASK-113',
    title:
      'Create an onboarding checklist for teams configuring their first project',
    label: 'Documentation',
    priority: 'Medium',
    status: 'Todo',
  },
  {
    id: 'TASK-114',
    title:
      'Resolve duplicate task entries after reconnecting a workspace integration',
    label: 'Bug',
    priority: 'High',
    status: 'Canceled',
  },
  {
    id: 'TASK-115',
    title:
      'Add keyboard navigation for the status and priority filter popovers',
    label: 'Feature',
    priority: 'Medium',
    status: 'In Progress',
  },
  {
    id: 'TASK-116',
    title:
      'Verify archived task visibility across search, pagination, and column filters',
    label: 'Bug',
    priority: 'Low',
    status: 'Done',
  },
  ...Array.from({ length: 100 }, (_, index): Task => {
    const taskNumber = index + 117
    const priorities: Task['priority'][] = ['Low', 'Medium', 'High', 'Critical']
    const statuses: Task['status'][] = [
      'Backlog',
      'Todo',
      'In Progress',
      'Done',
      'Canceled',
    ]
    const labels: Task['label'][] = ['Bug', 'Feature', 'Documentation']

    return {
      id: `TASK-${taskNumber}`,
      title: `Review and improve the ${['workspace reporting', 'task management', 'team notification', 'project settings'][index % 4]} workflow for scenario ${taskNumber}`,
      label: labels[index % labels.length],
      priority: priorities[index % priorities.length],
      status: statuses[index % statuses.length],
    }
  }),
]
