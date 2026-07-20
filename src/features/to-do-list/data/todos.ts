import { Avatar1, Avatar2 } from '../../../../dist/assets'

export type Priority = 'Low' | 'Medium' | 'Hight'
export type TodoStatus = 'complete' | 'pending' | 'trashed'

export interface TodoType {
  title: string
  assignee: string
  priority: Priority
  description: string
  date: string
  status: TodoStatus
  isImportant: boolean
}

export const todoData: TodoType[] = [
  {
    title: 'TODO APP',
    assignee: Avatar1,
    priority: 'Low',
    description: 'I am Hamed I am from Afghanistan and Herat , I am a Full-stack developer.',
    date: '10 Nov 2025',
    status: 'complete',
    isImportant: true,
  },
  {
    title: 'TODO APP',
    assignee: Avatar2,
    priority: 'Low',
    description: 'It Should handel',
    date: '10 Nov 2025',
    status: 'pending',
    isImportant: false,
  },
]
