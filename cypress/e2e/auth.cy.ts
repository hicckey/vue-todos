/// <reference types="cypress" />

describe('用户认证', () => {
  beforeEach(() => {
    // 清除本地存储
    cy.window().then((win) => {
      win.localStorage.clear()
    })
  })

  describe('登录页面', () => {
    beforeEach(() => {
      // 确保清除认证状态，避免路由守卫跳转
      cy.window().then((win) => {
        win.localStorage.clear()
      })
      cy.visit('/login')
      // 等待页面加载完成
      cy.contains('登录', { timeout: 10000 }).should('be.visible')
    })

    it('应该显示登录表单', () => {
      cy.get('input[placeholder*="用户名"]').should('be.visible')
      cy.get('input[type="password"]').should('be.visible')
      cy.contains('登录').should('be.visible')
    })

    it('应该能够成功登录', () => {
      // 填写登录表单
      cy.get('input[placeholder*="用户名"]').type('testuser')
      cy.get('input[type="password"]').type('password123')

      // 点击登录按钮
      cy.contains('登录').click()

      // 等待登录完成并验证跳转
      cy.url({ timeout: 10000 }).should('not.include', '/login')
      cy.url().should('include', '/')
    })

    it('应该显示验证错误信息', () => {
      // 直接点击登录按钮，不填写表单
      cy.contains('登录').click()

      // Element Plus 表单验证应该显示错误信息
      cy.get('.el-form-item__error', { timeout: 2000 }).should('exist')
    })

    it('应该能够重置表单', () => {
      cy.get('input[placeholder*="用户名"]').type('testuser')
      cy.get('input[type="password"]').type('password123')

      cy.contains('重置').click()

      cy.get('input[placeholder*="用户名"]').should('have.value', '')
      cy.get('input[type="password"]').should('have.value', '')
    })
  })

  describe('注册页面', () => {
    beforeEach(() => {
      // 确保清除认证状态
      cy.window().then((win) => {
        win.localStorage.clear()
      })
      cy.visit('/register')
      // 等待页面加载完成
      cy.contains('注册', { timeout: 10000 }).should('be.visible')
    })

    it('应该显示注册表单', () => {
      cy.get('input[placeholder*="用户名"]').should('be.visible')
      cy.get('input[placeholder*="邮箱"]').should('be.visible')
      cy.get('input[type="password"]').should('have.length', 2) // 密码和确认密码
      cy.contains('注册').should('be.visible')
    })

    it('应该能够成功注册', () => {
      cy.get('input[placeholder*="用户名"]').type('newuser')
      cy.get('input[placeholder*="邮箱"]').type('newuser@example.com')
      cy.get('input[type="password"]').first().type('password123')
      cy.get('input[type="password"]').last().type('password123')

      cy.contains('注册').click()

      // 等待注册完成并验证跳转
      cy.url({ timeout: 10000 }).should('not.include', '/register')
      cy.url().should('include', '/')
    })

    it('应该验证密码一致性', () => {
      cy.get('input[placeholder*="用户名"]').type('newuser')
      cy.get('input[placeholder*="邮箱"]').type('newuser@example.com')
      cy.get('input[type="password"]').first().type('password123')
      cy.get('input[type="password"]').last().type('different')

      cy.contains('注册').click()

      // 应该显示密码不一致的错误
      cy.get('.el-form-item__error', { timeout: 2000 }).should('contain', '不一致')
    })
  })

  describe('路由守卫', () => {
    it('未登录用户访问受保护页面应该重定向到登录页', () => {
      cy.window().then((win) => {
        win.localStorage.clear()
      })

      cy.visit('/task')
      // 等待路由守卫执行完成
      cy.url({ timeout: 10000 }).should('include', '/login')
    })

    it('已登录用户应该能够访问受保护页面', () => {
      // 设置登录状态
      cy.window().then((win) => {
        win.localStorage.setItem('token', 'test-token')
        win.localStorage.setItem(
          'user',
          JSON.stringify({
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
          }),
        )
      })

      cy.visit('/task')
      // 等待页面加载完成
      cy.url({ timeout: 10000 }).should('include', '/task')
    })
  })
})
