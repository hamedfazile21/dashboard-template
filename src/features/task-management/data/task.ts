export type Priority = 'Low' | 'Medium' | 'High'
export type ColumnId = 'todo' | 'pending' | 'done'
export interface Task {
  id: string
  title: string
  assignee: string
  priority: Priority
  description: string
}

export const teaksData: Record<ColumnId, Task[]> = {
  todo: [
    {
      id: 't1',
      title: 'Design the onboarding flow',
      assignee: 'Sara Ahmadi',
      priority: 'High',
      description: 'First-run experience for new users.',
    },
    {
      id: 't2',
      title: 'Write API documentation',
      assignee: 'Hamed Fazeli',
      priority: 'Low',
      description: 'Cover the auth and tasks endpoints.',
    },
  ],
  pending: [
    {
      id: 't3',
      title: 'Review pull request #482',
      assignee: 'Leila Karimi',
      priority: 'Medium',
      description: 'Check the auth flow changes before merging.',
    },
  ],
  done: [
    {
      id: 't4',
      title: 'Set up CI pipeline',
      assignee: 'Sara Ahmadi',
      priority: 'Medium',
      description: 'Run tests and lint on every push.',
    },
  ],
}
