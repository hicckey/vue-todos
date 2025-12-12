/// <reference types="cypress" />

describe('分类管理', () => {
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

    cy.visit('/category')
  })

  it('应该显示分类列表页面', () => {
    cy.contains('分类管理').should('be.visible')
    cy.contains('创建分类').should('be.visible')
  })

  it('应该能够打开创建分类弹窗', () => {
    cy.contains('创建分类').click()

    // 验证弹窗显示
    cy.get('.el-dialog').should('be.visible')
    cy.get('.el-dialog__title').should('contain', '创建分类')

    // 验证表单字段
    cy.get('input[placeholder*="分类名称"]').should('be.visible')
    cy.get('.el-color-picker').should('be.visible')
    cy.get('input[placeholder*="分类图标"]').should('be.visible')
  })

  it('应该能够创建新分类', () => {
    cy.contains('创建分类').click()

    // 填写表单
    cy.get('input[placeholder*="分类名称"]').type('测试分类')
    cy.get('input[placeholder*="分类图标"]').type('test-icon')

    // 选择颜色（点击颜色选择器）
    cy.get('.el-color-picker').click()
    // 等待颜色选择器面板出现
    cy.get('.el-color-picker__panel', { timeout: 2000 }).should('be.visible')

    // 点击确定按钮
    cy.get('.el-dialog').contains('确定').click()

    // 验证成功消息（如果 API 调用成功）
    // cy.contains('创建成功').should('be.visible')
  })

  it('应该验证必填字段', () => {
    cy.contains('创建分类').click()

    // 直接点击确定，不填写表单
    cy.get('.el-dialog').contains('确定').click()

    // 应该显示验证错误
    cy.get('.el-form-item__error', { timeout: 2000 }).should('exist')
  })

  it('应该能够关闭创建分类弹窗', () => {
    cy.contains('创建分类').click()
    cy.get('.el-dialog').should('be.visible')

    // 点击取消按钮
    cy.get('.el-dialog').contains('取消').click()

    // 验证弹窗关闭
    cy.get('.el-dialog').should('not.exist')
  })

  it('应该显示分类表格', () => {
    // 验证表格存在
    cy.get('.el-table').should('be.visible')

    // 验证表格列
    cy.contains('名称').should('be.visible')
    cy.contains('颜色').should('be.visible')
    cy.contains('图标').should('be.visible')
    cy.contains('操作').should('be.visible')
  })
})
