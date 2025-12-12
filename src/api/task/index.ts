// 任务相关API
import type { Task, TaskListParams, TaskCreateParams, TaskUpdateParams } from '@/types/task'
import { getTasks, setTasks } from '@/utils/storage'
import { useTaskStore } from '@/stores/task.store'

/**
 * 获取任务列表
 */
export const getTaskList = async (params?: TaskListParams): Promise<Task[]> => {
  const taskStore = useTaskStore()
  let tasks = taskStore.tasks

  // 如果没有数据，从 localStorage 加载
  if (tasks.length === 0) {
    tasks = getTasks()
    taskStore.setTasks(tasks)
  }

  // 应用过滤条件
  if (params) {
    if (params.status) {
      tasks = tasks.filter((task) => task.status === params.status)
    }
    if (params.categoryId) {
      tasks = tasks.filter((task) => task.categoryId === params.categoryId)
    }
    if (params.keyword) {
      const keyword = params.keyword.toLowerCase()
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(keyword) ||
          task.description?.toLowerCase().includes(keyword),
      )
    }
  }

  return Promise.resolve(tasks)
}

/**
 * 获取任务详情
 */
export const getTaskDetail = async (id: number): Promise<Task | undefined> => {
  const taskStore = useTaskStore()
  const task = taskStore.tasks.find((t) => t.id === id)
  if (task) {
    return Promise.resolve(task)
  }
  // 如果 store 中没有，从 localStorage 查找
  const tasks = getTasks()
  return Promise.resolve(tasks.find((t) => t.id === id))
}

/**
 * 创建任务
 */
export const createTask = async (data: TaskCreateParams): Promise<Task> => {
  const taskStore = useTaskStore()
  const tasks = taskStore.tasks.length > 0 ? taskStore.tasks : getTasks()

  // 生成新 ID
  const maxId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) : 0
  const newTask: Task = {
    id: maxId + 1,
    title: data.title,
    description: data.description,
    status: data.status || 'pending',
    priority: data.priority || 'medium',
    categoryId: data.categoryId,
    dueDate: data.dueDate,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  taskStore.addTask(newTask)
  return Promise.resolve(newTask)
}

/**
 * 更新任务
 */
export const updateTask = async (id: number, data: TaskUpdateParams): Promise<Task | null> => {
  const taskStore = useTaskStore()
  const task = taskStore.tasks.find((t) => t.id === id)

  if (!task) {
    return Promise.resolve(null)
  }

  const updatedTask: Task = {
    ...task,
    ...data,
    id, // 确保 ID 不被覆盖
    updatedAt: new Date().toISOString(),
  }

  taskStore.updateTask(id, updatedTask)
  return Promise.resolve(updatedTask)
}

/**
 * 删除任务
 */
export const deleteTask = async (id: number): Promise<boolean> => {
  const taskStore = useTaskStore()
  taskStore.removeTask(id)
  return Promise.resolve(true)
}
