// 路由配置
import { createRouter, createWebHistory } from 'vue-router'
import { setupAuthGuard } from './guards'
// 使用路由懒加载
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/homepage/index.vue'),
    },
    {
      path: '/index',
      component: () => import('../views/homepage/index.vue'),
    },
    {
      path: '/login',
      component: () => import('../views/auth/Login.vue'),
    },
    {
      path: '/register',
      component: () => import('../views/auth/Register.vue'),
    },
    {
      path: '/task',
      name: 'taskList',
      component: () => import('../views/task/TaskList.vue'),
    },
    {
      path: '/task/:id/detail',
      name: 'taskDetail',
      component: () => import('../views/task/TaskDetail.vue'),
    },
    {
      path: '/task/form',
      name: 'taskForm',
      component: () => import('../views/task/TaskForm.vue'),
    },
    {
      path: '/category',
      name: 'categoryList',
      component: () => import('../views/category/index.vue'),
    },
  ],
})
// 路由拦截
setupAuthGuard(router)
export default router
