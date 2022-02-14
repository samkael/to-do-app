export interface Task {
  id: string
  title: string
  priority: TaskPriority
  isCompleted: boolean
}

export enum TaskPriority {
  low,
  normal,
  high
}

export enum TasksSortField {
  default,
  name,
  priority,
}
