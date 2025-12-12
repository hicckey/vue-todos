/// <reference types="cypress" />

describe('页面导航', () => {
  beforeEach(() => {
    // 设置登录状态以便访问受保护页面
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

  it('应该能够通过导航菜单切换页面', () => {
    cy.visit('/')

    // 点击任务列表
    cy.contains('任务列表').click()
    cy.url().should('include', '/task')

    // 点击分类列表
    cy.contains('分类列表').click()
    cy.url().should('include', '/category')

    // 点击首页
    cy.contains('首页').click()
    cy.url().should('include', '/')
  })

  it('应该高亮当前页面的菜单项', () => {
    cy.visit('/task')
    cy.get('.el-menu-item.is-active').should('contain', '任务列表')

    cy.visit('/category')
    cy.get('.el-menu-item.is-active').should('contain', '分类列表')
  })

  it('应该显示页脚信息', () => {
    cy.visit('/')
    cy.contains('版权所有').should('be.visible')
  })
})
