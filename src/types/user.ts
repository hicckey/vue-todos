// 用户相关类型
export interface User {
  id: number
  username: string
  email: string
  avatar?: string
  createdAt?: string
  updatedAt?: string
}

export interface LoginParams {
  username: string
  password: string
}

export interface RegisterParams {
  username: string
  email: string
  password: string
}
