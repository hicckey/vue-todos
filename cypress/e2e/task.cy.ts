/// <reference types="cypress" />

describe('任务管理', () => {
  beforeEach(() => {
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
  })

  it('应该显示任务列表页面', () => {
    cy.contains('任务').should('be.visible')
  })

  it('应该能够导航到创建任务页面', () => {
    cy.contains('创建').click()
    cy.url().should('include', '/task/form')
  })

  it('应该能够填写任务表单', () => {
    cy.visit('/task/form')

    // 填写标题
    cy.get('input[placeholder*="任务标题"]').type('测试任务')

    // 填写描述
    cy.get('textarea[placeholder*="任务描述"]').type('这是一个测试任务描述')

    // 选择状态
    cy.get('select').first().select('in_progress')

    // 选择优先级
    cy.get('select').last().select('high')
  })

  it('应该能够提交任务表单', () => {
    cy.visit('/task/form')

    cy.get('input[placeholder*="任务标题"]').type('新任务')
    cy.get('textarea[placeholder*="任务描述"]').type('任务描述')

    // 点击创建按钮
    cy.contains('创建').click()

    // 验证跳转回任务列表
    cy.url().should('include', '/task')
  })

  it('应该能够重置表单', () => {
    cy.visit('/task/form')

    cy.get('input[placeholder*="任务标题"]').type('测试')
    cy.contains('重置').click()

    // 验证表单已清空
    cy.get('input[placeholder*="任务标题"]').should('have.value', '')
  })
})
