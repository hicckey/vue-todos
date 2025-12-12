// 路由守卫
import type { Router } from 'vue-router'
import { getToken } from '@/utils/storage'

/**
 * 认证守卫
 */
export function setupAuthGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const token = getToken()
    const isLoginPage = to.path === '/login' || to.path === '/register'

    if (!token && !isLoginPage) {
      next({ path: '/login', replace: true })
    } else if (token && isLoginPage) {
      // 登录后自动跳转
      next({ path: '/', replace: true })
    } else {
      next()
    }
  })
}
