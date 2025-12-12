/// <reference types="cypress" />

describe('示例测试', () => {
  it('应该访问首页', () => {
    cy.visit('/')
    cy.contains('首页').should('be.visible')
  })

  it('应该显示导航菜单', () => {
    cy.visit('/')
    cy.contains('任务列表').should('be.visible')
    cy.contains('分类列表').should('be.visible')
  })
})
