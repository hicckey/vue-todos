/// <reference types="cypress" />

/**
 * 登录命令
 * @param username - 用户名，默认为 'testuser'
 * @param password - 密码，默认为 'password123'
 * @example
 * cy.login()
 * cy.login('myuser', 'mypass')
 */
Cypress.Commands.add('login', (username: string = 'testuser', password: string = 'password123') => {
  cy.visit('/login')
  cy.get('input[placeholder*="用户名"]').type(username)
  cy.get('input[type="password"]').type(password)
  cy.contains('登录').click()
  // 等待登录完成，验证跳转
  cy.url().should('not.include', '/login')
})

/**
 * 设置认证状态（不经过登录流程）
 * 用于快速设置已登录状态
 * @example
 * cy.setAuth()
 * cy.visit('/task')
 */
Cypress.Commands.add('setAuth', () => {
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
})

/**
 * 清除认证状态
 * @example
 * cy.clearAuth()
 */
Cypress.Commands.add('clearAuth', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('token')
    win.localStorage.removeItem('user')
  })
})

/**
 * 等待 Element Plus 消息提示消失
 * @example
 * cy.waitForMessage('创建成功')
 */
Cypress.Commands.add('waitForMessage', (message: string) => {
  cy.contains(message, { timeout: 5000 }).should('be.visible')
  // 等待消息自动消失（Element Plus 默认 3 秒）
  cy.contains(message, { timeout: 5000 }).should('not.exist')
})

// TypeScript 类型声明
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * 登录命令
       * @param username - 用户名
       * @param password - 密码
       */
      login(username?: string, password?: string): Chainable<void>
      /**
       * 设置认证状态
       */
      setAuth(): Chainable<void>
      /**
       * 清除认证状态
       */
      clearAuth(): Chainable<void>
      /**
       * 等待消息提示
       * @param message - 消息内容
       */
      waitForMessage(message: string): Chainable<void>
    }
  }
}

export {}
