// 用户相关API
// import request from '@/utils/request'
import type { User, LoginParams, RegisterParams } from '@/types/user'
import { setToken, setUser, getUser, removeToken, removeUser } from '@/utils/storage'

/**
 * 用户登录
 */
export const login = (data: LoginParams) => {
  // return request.post<{ token: string; user: User }>('/api/auth/login', data)
  const token = '1234567890'
  setToken(token)
  setUser({
    id: Math.floor(Math.random() * 1000000).toString(),
    username: data.username,
    password: data.password,
    email: '',
    createdAt: new Date().toISOString(),
  })
  return {
    token,
    user: {
      id: Math.floor(Math.random() * 1000000).toString(),
      username: data.username,
      password: data.password,
      email: '',
    },
  }
}

/**
 * 用户注册
 */
export const register = (data: RegisterParams) => {
  // return request.post<{ token: string; user: User }>('/api/auth/register', data)
  const token = '1234567890'
  setToken(token)
  setUser({
    id: Math.floor(Math.random() * 1000000).toString(),
    username: data.username,
    password: data.password,
    email: data.email,
    updatedAt: new Date().toISOString(),
  })
  return {
    token,
    user: {
      id: Math.floor(Math.random() * 1000000).toString(),
      username: data.username,
      password: data.password,
      email: data.email,
    },
  }
}

/**
 * 获取当前用户信息
 */
export const getCurrentUser = () => {
  // return request.get<User>('/api/user/current')
  return getUser()
}

/**
 * 更新用户信息
 */
export const updateUser = (data: Partial<User>) => {
  // return request.put<User>('/api/user', data)
  setUser({ ...(getUser() as User), ...data })
  return true
}

/**
 * 用户登出
 */
export const logout = () => {
  // return request.post('/api/auth/logout')
  removeToken()
  removeUser()
  return true
}
