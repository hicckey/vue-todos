// 认证状态
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/user'
import { getToken, setToken, removeToken } from '@/utils/storage'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(getToken())

  const setUser = (userData: User) => {
    user.value = userData
  }

  const setAuthToken = (authToken: string) => {
    token.value = authToken
    setToken(authToken)
  }

  const logout = () => {
    user.value = null
    token.value = null
    removeToken()
  }

  const isAuthenticated = () => {
    return !!token.value
  }

  return {
    user,
    token,
    setUser,
    setAuthToken,
    logout,
    isAuthenticated,
  }
})
