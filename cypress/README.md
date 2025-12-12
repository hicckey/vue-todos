# Cypress E2E 测试

## 🚀 快速开始

### 运行测试

```bash
# 运行所有测试（无头模式）
pnpm test:e2e

# 打开 Cypress 测试界面（交互模式）
pnpm exec cypress open
```

### 查看详细文档

请查看 [CYPRESS_GUIDE.md](./CYPRESS_GUIDE.md) 获取完整的测试编写指南。

## 📁 文件结构

```
cypress/
├── e2e/              # 测试文件目录
│   ├── auth.cy.ts    # 认证相关测试
│   ├── task.cy.ts    # 任务管理测试
│   ├── category.cy.ts # 分类管理测试
│   ├── navigation.cy.ts # 导航测试
│   └── example.cy.ts # 示例测试
├── fixtures/         # 测试数据文件
├── screenshots/      # 失败测试截图
├── support/          # 支持文件
│   ├── commands.ts   # 自定义命令
│   └── e2e.ts        # E2E 测试配置
├── CYPRESS_GUIDE.md  # 详细指南
└── README.md         # 本文件
```

## 📝 测试文件说明

### auth.cy.ts

用户认证相关测试，包括：

- 登录功能
- 注册功能
- 路由守卫

### task.cy.ts

任务管理相关测试，包括：

- 任务列表
- 创建任务
- 编辑任务
- 删除任务

### category.cy.ts

分类管理相关测试，包括：

- 分类列表
- 创建分类
- 编辑分类
- 删除分类

### navigation.cy.ts

页面导航测试，包括：

- 菜单导航
- 路由跳转
- 页面高亮

## 🛠️ 自定义命令

### cy.login(username?, password?)

快速登录命令

```typescript
cy.login() // 使用默认账号
cy.login('myuser', 'mypass') // 使用自定义账号
```

### cy.setAuth()

设置认证状态（不经过登录流程）

```typescript
cy.setAuth()
cy.visit('/task')
```

### cy.clearAuth()

清除认证状态

```typescript
cy.clearAuth()
cy.visit('/login')
```

### cy.waitForMessage(message)

等待 Element Plus 消息提示

```typescript
cy.waitForMessage('创建成功')
```

## 💡 快速示例

### 基本测试结构

```typescript
describe('功能描述', () => {
  beforeEach(() => {
    cy.setAuth() // 设置登录状态
    cy.visit('/page')
  })

  it('应该能够执行某个操作', () => {
    cy.get('button').click()
    cy.contains('成功').should('be.visible')
  })
})
```

### 表单测试

```typescript
it('应该能够提交表单', () => {
  cy.get('input[name="field"]').type('value')
  cy.contains('提交').click()
  cy.waitForMessage('操作成功')
})
```

### 列表测试

```typescript
it('应该显示列表项', () => {
  cy.get('.list-item').should('have.length.greaterThan', 0)
})
```

## 🔍 调试技巧

1. **使用 `.pause()`** - 暂停测试执行

   ```typescript
   cy.get('button').pause().click()
   ```

2. **使用 `.debug()`** - 打印调试信息

   ```typescript
   cy.get('button').debug()
   ```

3. **查看截图** - 测试失败时自动截图在 `cypress/screenshots/`

4. **使用测试运行器** - `pnpm exec cypress open` 打开交互界面

## 📚 更多资源

- [详细指南](./CYPRESS_GUIDE.md) - 完整的测试编写指南
- [Cypress 官方文档](https://docs.cypress.io/)
- [Cypress 最佳实践](https://docs.cypress.io/guides/references/best-practices)

## ⚠️ 注意事项

1. **测试隔离** - 每个测试应该是独立的，不依赖其他测试
2. **等待策略** - 使用条件等待而不是固定时间等待
3. **选择器** - 优先使用 `data-testid` 属性
4. **数据清理** - 测试前后清理状态（localStorage、sessionStorage）
