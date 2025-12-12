// 本地存储
const TOKEN_KEY = 'token'
const USER_KEY = 'user'
const TASKS_KEY = 'tasks'
const CATEGORIES_KEY = 'categories'
const TOOLS_KEY = 'tools'

/**
 * 获取token
 */
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * 设置token
 */
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token)
}

/**
 * 移除token
 */
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * 获取用户信息
 */
export const getUser = (): any | null => {
  const userStr = localStorage.getItem(USER_KEY)
  return userStr ? JSON.parse(userStr) : null
}

/**
 * 设置用户信息
 */
export const setUser = (user: any): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

/**
 * 移除用户信息
 */
export const removeUser = (): void => {
  localStorage.removeItem(USER_KEY)
}

/**
 * 获取任务列表
 */
export const getTasks = (): any[] => {
  const tasksStr = localStorage.getItem(TASKS_KEY)
  if (tasksStr) {
    return JSON.parse(tasksStr)
  }
  // 初始化默认数据
  const defaultTasks = [
    {
      id: 1,
      title: '任务1',
      description: '任务1描述',
      status: 'pending',
      priority: 'low',
      categoryId: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: '任务2',
      description: '任务2描述',
      status: 'in_progress',
      priority: 'medium',
      categoryId: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: '任务3',
      description: '任务3描述',
      status: 'completed',
      priority: 'high',
      categoryId: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]
  setTasks(defaultTasks)
  return defaultTasks
}

/**
 * 设置任务列表
 */
export const setTasks = (tasks: any[]): void => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
}

/**
 * 获取分类列表
 */
export const getCategories = (): any[] => {
  const categoriesStr = localStorage.getItem(CATEGORIES_KEY)
  if (categoriesStr) {
    return JSON.parse(categoriesStr)
  }
  // 初始化默认数据
  const defaultCategories = [
    {
      id: 1,
      name: '工作',
      color: '#409eff',
      icon: 'work',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: '生活',
      color: '#67c23a',
      icon: 'life',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 3,
      name: '学习',
      color: '#e6a23c',
      icon: 'study',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]
  setCategories(defaultCategories)
  return defaultCategories
}

/**
 * 设置分类列表
 */
export const setCategories = (categories: any[]): void => {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories))
}

/**
 * 获取工具列表
 */
export const getToolsList = (): any[] => {
  const listData = localStorage.getItem(TOOLS_KEY)
  if (listData) {
    return JSON.parse(listData)
  }
  const defaultTools = [
    {
      id: '1',
      name: 'JavaScript',
      description: 'JavaScript是一个提供前端客户交互的语言',
    },
    {
      id: '2',
      name: 'css',
      description: '通过编写css使得一个网站拥有一个漂亮的外观',
    },
    {
      id: '3',
      name: 'html',
      description: 'html是一个网站的骨架，css、js都是基于html来进行的',
    },
    {
      id: '4',
      name: 'typescript',
      description: `typescript是JavaScript的超集，JavaScript是一门弱类型语言，这意味着会存在类型隐式转化，例如"5" + 3 = "53"，
      而typescript存在类型校验，使得在开发阶段即编写代码时候就能发现类型错误，使得代码的安全性更高`,
    },
  ]
  setToolsList(defaultTools)
  return defaultTools
}
export function setToolsList(list: any[]) {
  localStorage.setItem(TOOLS_KEY, JSON.stringify(list))
}

/**
 * 清除所有存储
 */
export const clearStorage = (): void => {
  localStorage.clear()
}
