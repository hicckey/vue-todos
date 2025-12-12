// 用户相关API
// import request from '@/utils/request'
import type { User, LoginParams, RegisterParams } from '@/types/user'
import { setToken, setUser, getUser, removeToken, removeUser } from '@/utils/storage'

/**
 * 用户登录
 */
export const login = (
  data: LoginParams,
): Promise<{ token: string; user: User }> | { token: string; user: User } => {
  // return request.post<{ token: string; user: User }>('/api/auth/login', data)
  const token = '1234567890'
  const userId = Math.floor(Math.random() * 1000000)
  setToken(token)
  setUser({
    id: userId,
    username: data.username,
    email: '',
    createdAt: new Date().toISOString(),
  })
  return {
    token,
    user: {
      id: userId,
      username: data.username,
      email: '',
    },
  }
}

/**
 * 用户注册
 */
export const register = (
  data: RegisterParams,
): Promise<{ token: string; user: User }> | { token: string; user: User } => {
  // return request.post<{ token: string; user: User }>('/api/auth/register', data)
  const token = '1234567890'
  const userId = Math.floor(Math.random() * 1000000)
  setToken(token)
  setUser({
    id: userId,
    username: data.username,
    email: data.email,
    createdAt: new Date().toISOString(),
  })
  return {
    token,
    user: {
      id: userId,
      username: data.username,
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
  setUser({ ...getUser(), ...data } as User)
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
