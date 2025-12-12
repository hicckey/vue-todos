// 任务相关类型
export interface Task {
  id: number
  title: string
  description?: string
  status: 'pending' | 'in_progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  categoryId?: number
  dueDate?: string
  createdAt: string
  updatedAt: string
}

export interface TaskListParams {
  page?: number
  pageSize?: number
  status?: Task['status']
  categoryId?: number
  keyword?: string
}

export interface TaskCreateParams {
  title: string
  description?: string
  status?: Task['status']
  priority?: Task['priority']
  categoryId?: number
  dueDate?: string
}

export interface TaskUpdateParams extends Partial<TaskCreateParams> {
  id: number
}
