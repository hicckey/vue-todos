# Cypress 测试用例编写指南

## 📚 目录

- [快速开始](#快速开始)
- [基础概念](#基础概念)
- [常用命令](#常用命令)
- [测试场景示例](#测试场景示例)
- [自定义命令](#自定义命令)
- [最佳实践](#最佳实践)
- [调试技巧](#调试技巧)

## 快速开始

### 运行测试

```bash
# 运行 E2E 测试（无头模式）
pnpm test:e2e

# 打开 Cypress 测试界面（交互模式）
pnpm exec cypress open

# 开发模式运行测试（使用 dev 服务器）
pnpm test:e2e:dev
```

### 测试文件位置

所有测试文件放在 `cypress/e2e/` 目录下，文件命名格式：`*.cy.ts` 或 `*.spec.ts`

### ⚠️ 常见问题

#### 1. 路由访问错误（404 或找不到路径）

**问题**：访问 `/login` 等路由时提示找不到路径

**解决方案**：

- 确保应用服务器已启动（`pnpm preview` 或 `pnpm dev`）
- 在访问路由前等待页面加载完成
- 清除可能影响路由的 localStorage 状态

```typescript
beforeEach(() => {
  // 清除认证状态，避免路由守卫干扰
  cy.window().then((win) => {
    win.localStorage.clear()
  })

  cy.visit('/login')

  // 等待页面关键元素加载完成
  cy.contains('登录', { timeout: 10000 }).should('be.visible')
})
```

#### 2. 页面加载超时

**解决方案**：增加超时时间或等待特定元素

```typescript
// 方法1：增加超时时间
cy.visit('/login', { timeout: 30000 })

// 方法2：等待特定元素
cy.visit('/login')
cy.get('h2', { timeout: 10000 }).should('contain', '登录')
```

## 基础概念

### 测试结构

```typescript
describe('测试套件名称', () => {
  beforeEach(() => {
    // 每个测试用例前执行
    cy.visit('/')
  })

  it('测试用例描述', () => {
    // 测试步骤
    cy.get('selector').should('be.visible')
  })
})
```

### 常用钩子函数

- `before()` - 所有测试前执行一次
- `beforeEach()` - 每个测试前执行
- `after()` - 所有测试后执行一次
- `afterEach()` - 每个测试后执行

## 常用命令

### 1. 页面导航

```typescript
// 访问页面
cy.visit('/')
cy.visit('/login')
cy.visit('/task')

// 等待页面加载
cy.wait(1000) // 等待 1 秒（不推荐，尽量用 should）
```

### 2. 元素查找

```typescript
// 通过选择器查找
cy.get('.class-name') // 类选择器
cy.get('#id-name') // ID 选择器
cy.get('[data-testid="xxx"]') // 数据属性（推荐）
cy.get('button') // 标签选择器
cy.contains('文本内容') // 通过文本内容查找

// 查找子元素
cy.get('.parent').find('.child')
cy.get('.parent').children()

// 查找父元素
cy.get('.child').parent()
```

### 3. 元素交互

```typescript
// 点击
cy.get('button').click()
cy.contains('登录').click()

// 输入文本
cy.get('input[name="username"]').type('testuser')
cy.get('input[type="password"]').type('password123')

// 清空输入
cy.get('input').clear()

// 选择下拉框
cy.get('select').select('option-value')

// 上传文件
cy.get('input[type="file"]').selectFile('path/to/file.png')

// 键盘操作
cy.get('input').type('{enter}') // 回车
cy.get('input').type('{esc}') // ESC
cy.get('input').type('{backspace}') // 退格
```

### 4. 断言

```typescript
// 存在性断言
cy.get('.element').should('exist')
cy.get('.element').should('not.exist')

// 可见性断言
cy.get('.element').should('be.visible')
cy.get('.element').should('not.be.visible')

// 文本内容断言
cy.get('h1').should('contain', '欢迎')
cy.get('h1').should('have.text', '欢迎使用')

// 属性断言
cy.get('input').should('have.value', 'test')
cy.get('a').should('have.attr', 'href', '/login')
cy.get('button').should('have.class', 'primary')

// 数量断言
cy.get('.item').should('have.length', 5)
cy.get('.item').should('have.length.greaterThan', 3)

// 状态断言
cy.get('button').should('be.disabled')
cy.get('input').should('be.enabled')
cy.get('input').should('be.checked') // 复选框/单选框
```

### 5. 等待

```typescript
// 等待元素出现
cy.get('.element', { timeout: 10000 }).should('be.visible')

// 等待网络请求
cy.intercept('GET', '/api/users').as('getUsers')
cy.visit('/')
cy.wait('@getUsers')

// 等待元素消失
cy.get('.loading').should('not.exist')
```

### 6. 网络请求拦截

```typescript
// 拦截 GET 请求
cy.intercept('GET', '/api/tasks', { fixture: 'tasks.json' }).as('getTasks')

// 拦截 POST 请求
cy.intercept('POST', '/api/login', {
  statusCode: 200,
  body: { token: 'xxx', user: { id: 1, username: 'test' } },
}).as('login')

// 等待请求完成
cy.wait('@getTasks')
```

## 测试场景示例

### 1. 登录测试

```typescript
describe('用户登录', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('应该显示登录表单', () => {
    cy.get('input[name="username"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
    cy.contains('登录').should('be.visible')
  })

  it('应该能够成功登录', () => {
    // 拦截登录请求
    cy.intercept('POST', '**/api/user/login', {
      statusCode: 200,
      body: {
        token: 'test-token',
        user: {
          id: 1,
          username: 'testuser',
          email: 'test@example.com',
        },
      },
    }).as('loginRequest')

    // 填写表单
    cy.get('input[name="username"]').type('testuser')
    cy.get('input[type="password"]').type('password123')

    // 提交表单
    cy.contains('登录').click()

    // 等待请求完成
    cy.wait('@loginRequest')

    // 验证跳转
    cy.url().should('not.include', '/login')
    cy.url().should('include', '/')
  })

  it('应该显示错误信息当登录失败', () => {
    cy.intercept('POST', '**/api/user/login', {
      statusCode: 401,
      body: { message: '用户名或密码错误' },
    }).as('loginError')

    cy.get('input[name="username"]').type('wronguser')
    cy.get('input[type="password"]').type('wrongpass')
    cy.contains('登录').click()

    cy.wait('@loginError')
    cy.contains('登录失败').should('be.visible')
  })

  it('应该验证必填字段', () => {
    cy.contains('登录').click()
    // Element Plus 表单验证会显示错误信息
    cy.get('.el-form-item__error').should('be.visible')
  })
})
```

### 2. 任务管理测试

```typescript
describe('任务管理', () => {
  beforeEach(() => {
    // 模拟登录状态
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

    // 拦截任务列表请求
    cy.intercept('GET', '**/api/tasks', {
      statusCode: 200,
      body: [
        { id: 1, title: '任务1', status: 'pending' },
        { id: 2, title: '任务2', status: 'completed' },
      ],
    }).as('getTasks')

    cy.visit('/task')
    cy.wait('@getTasks')
  })

  it('应该显示任务列表', () => {
    cy.contains('任务1').should('be.visible')
    cy.contains('任务2').should('be.visible')
  })

  it('应该能够创建新任务', () => {
    cy.intercept('POST', '**/api/tasks', {
      statusCode: 200,
      body: { id: 3, title: '新任务', status: 'pending' },
    }).as('createTask')

    cy.contains('创建任务').click()
    cy.url().should('include', '/task/form')

    cy.get('input[name="title"]').type('新任务')
    cy.get('select[name="status"]').select('pending')
    cy.contains('创建').click()

    cy.wait('@createTask')
    cy.url().should('include', '/task')
    cy.contains('新任务').should('be.visible')
  })

  it('应该能够编辑任务', () => {
    cy.intercept('GET', '**/api/tasks/1', {
      statusCode: 200,
      body: { id: 1, title: '任务1', status: 'pending' },
    }).as('getTask')

    cy.intercept('PUT', '**/api/tasks/1', {
      statusCode: 200,
      body: { id: 1, title: '更新后的任务', status: 'in_progress' },
    }).as('updateTask')

    cy.contains('任务1').parent().contains('编辑').click()
    cy.wait('@getTask')

    cy.get('input[name="title"]').clear().type('更新后的任务')
    cy.get('select[name="status"]').select('in_progress')
    cy.contains('更新').click()

    cy.wait('@updateTask')
    cy.contains('更新后的任务').should('be.visible')
  })

  it('应该能够删除任务', () => {
    cy.intercept('DELETE', '**/api/tasks/1', {
      statusCode: 200,
    }).as('deleteTask')

    cy.contains('任务1').parent().contains('删除').click()
    cy.contains('确定').click() // 确认删除对话框

    cy.wait('@deleteTask')
    cy.contains('任务1').should('not.exist')
  })
})
```

### 3. 分类管理测试

```typescript
describe('分类管理', () => {
  beforeEach(() => {
    // 模拟登录
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'test-token')
    })

    cy.intercept('GET', '**/api/categories', {
      statusCode: 200,
      body: [
        { id: 1, name: '工作', color: '#409EFF', icon: 'work' },
        { id: 2, name: '生活', color: '#67C23A', icon: 'life' },
      ],
    }).as('getCategories')

    cy.visit('/category')
    cy.wait('@getCategories')
  })

  it('应该显示分类列表', () => {
    cy.contains('工作').should('be.visible')
    cy.contains('生活').should('be.visible')
  })

  it('应该能够创建新分类', () => {
    cy.intercept('POST', '**/api/categories', {
      statusCode: 200,
      body: { id: 3, name: '学习', color: '#E6A23C', icon: 'study' },
    }).as('createCategory')

    cy.contains('创建分类').click()

    // 填写表单
    cy.get('input[name="name"]').type('学习')
    cy.get('.el-color-picker').click()
    cy.get('input[type="text"]').type('#E6A23C')
    cy.get('input[name="icon"]').type('study')

    cy.contains('确定').click()
    cy.wait('@createCategory')

    cy.contains('学习').should('be.visible')
  })
})
```

### 4. 路由导航测试

```typescript
describe('路由导航', () => {
  it('应该能够导航到不同页面', () => {
    cy.visit('/')
    cy.url().should('include', '/')

    cy.contains('任务列表').click()
    cy.url().should('include', '/task')

    cy.contains('分类列表').click()
    cy.url().should('include', '/category')

    cy.contains('首页').click()
    cy.url().should('include', '/')
  })

  it('未登录用户应该重定向到登录页', () => {
    cy.window().then((win) => {
      win.localStorage.clear()
    })

    cy.visit('/task')
    cy.url().should('include', '/login')
  })
})
```

## 自定义命令

在 `cypress/support/commands.ts` 中添加自定义命令：

```typescript
// 登录命令
Cypress.Commands.add('login', (username: string = 'testuser', password: string = 'password123') => {
  cy.intercept('POST', '**/api/user/login', {
    statusCode: 200,
    body: {
      token: 'test-token',
      user: {
        id: 1,
        username,
        email: 'test@example.com',
      },
    },
  }).as('login')

  cy.visit('/login')
  cy.get('input[name="username"]').type(username)
  cy.get('input[type="password"]').type(password)
  cy.contains('登录').click()
  cy.wait('@login')
})

// 设置登录状态（不经过登录流程）
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

// 类型声明（在 commands.ts 文件末尾）
declare global {
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<void>
      setAuth(): Chainable<void>
    }
  }
}
```

使用自定义命令：

```typescript
describe('使用自定义命令', () => {
  it('使用登录命令', () => {
    cy.login('myuser', 'mypass')
    cy.url().should('not.include', '/login')
  })

  it('使用设置认证状态', () => {
    cy.setAuth()
    cy.visit('/task')
    cy.url().should('include', '/task')
  })
})
```

## 最佳实践

### 1. 使用数据属性选择器

在组件中添加 `data-testid` 属性：

```vue
<template>
  <button data-testid="login-button">登录</button>
</template>
```

在测试中使用：

```typescript
cy.get('[data-testid="login-button"]').click()
```

### 2. 使用 Fixtures 管理测试数据

创建 `cypress/fixtures/users.json`:

```json
{
  "validUser": {
    "username": "testuser",
    "password": "password123"
  },
  "invalidUser": {
    "username": "wronguser",
    "password": "wrongpass"
  }
}
```

在测试中使用：

```typescript
cy.fixture('users').then((users) => {
  cy.get('input[name="username"]').type(users.validUser.username)
  cy.get('input[type="password"]').type(users.validUser.password)
})
```

### 3. 页面对象模式（Page Object Model）

创建 `cypress/support/pages/LoginPage.ts`:

```typescript
class LoginPage {
  visit() {
    cy.visit('/login')
  }

  fillUsername(username: string) {
    cy.get('input[name="username"]').type(username)
  }

  fillPassword(password: string) {
    cy.get('input[type="password"]').type(password)
  }

  submit() {
    cy.contains('登录').click()
  }

  login(username: string, password: string) {
    this.fillUsername(username)
    this.fillPassword(password)
    this.submit()
  }
}

export default new LoginPage()
```

在测试中使用：

```typescript
import loginPage from '../support/pages/LoginPage'

describe('登录测试', () => {
  it('应该能够登录', () => {
    loginPage.visit()
    loginPage.login('testuser', 'password123')
  })
})
```

### 4. 测试隔离

每个测试应该是独立的，不依赖其他测试的状态：

```typescript
describe('任务管理', () => {
  beforeEach(() => {
    // 每个测试前重置状态
    cy.window().then((win) => {
      win.localStorage.clear()
    })
    cy.setAuth() // 重新设置认证状态
  })

  it('测试1', () => {
    /* ... */
  })
  it('测试2', () => {
    /* ... */
  })
})
```

### 5. 等待策略

避免使用固定等待时间，使用条件等待：

```typescript
// ❌ 不好
cy.wait(2000)

// ✅ 好
cy.get('.element').should('be.visible')
cy.wait('@apiRequest')
```

## 调试技巧

### 1. 使用 `.debug()`

```typescript
cy.get('button').debug().click()
```

### 2. 使用 `.pause()`

```typescript
cy.get('button').pause().click()
```

### 3. 使用 Cypress 测试运行器

```bash
pnpm exec cypress open
```

在测试运行器中可以：

- 查看每个命令的执行结果
- 查看 DOM 快照
- 查看网络请求
- 使用浏览器开发者工具

### 4. 截图和视频

Cypress 会自动在测试失败时截图，视频录制需要在 `cypress.config.ts` 中启用：

```typescript
export default defineConfig({
  e2e: {
    video: true,
    screenshotOnRunFailure: true,
  },
})
```

## 常用测试模式

### 表单测试模式

```typescript
describe('表单测试', () => {
  it('应该验证必填字段', () => {
    cy.get('form').submit()
    cy.get('.el-form-item__error').should('be.visible')
  })

  it('应该能够提交表单', () => {
    cy.intercept('POST', '**/api/xxx').as('submit')

    cy.get('input[name="field1"]').type('value1')
    cy.get('input[name="field2"]').type('value2')
    cy.get('form').submit()

    cy.wait('@submit')
    cy.contains('成功').should('be.visible')
  })
})
```

### 列表测试模式

```typescript
describe('列表测试', () => {
  it('应该显示列表项', () => {
    cy.get('.list-item').should('have.length.greaterThan', 0)
  })

  it('应该能够搜索', () => {
    cy.get('input[placeholder*="搜索"]').type('关键词')
    cy.get('.list-item').should('contain', '关键词')
  })

  it('应该能够分页', () => {
    cy.get('.pagination').contains('2').click()
    cy.url().should('include', 'page=2')
  })
})
```

## 参考资源

- [Cypress 官方文档](https://docs.cypress.io/)
- [Cypress 最佳实践](https://docs.cypress.io/guides/references/best-practices)
- [Cypress 示例](https://example.cypress.io/)

## 快速参考表

| 操作     | 命令                                          |
| -------- | --------------------------------------------- |
| 访问页面 | `cy.visit('/path')`                           |
| 查找元素 | `cy.get('.class')`                            |
| 点击     | `cy.get('button').click()`                    |
| 输入     | `cy.get('input').type('text')`                |
| 断言可见 | `cy.get('.el').should('be.visible')`          |
| 断言文本 | `cy.get('h1').should('contain', 'text')`      |
| 等待请求 | `cy.wait('@alias')`                           |
| 拦截请求 | `cy.intercept('GET', '/api', {}).as('alias')` |

---

**提示**: 开始编写测试时，可以先写一个简单的测试用例，然后逐步完善。记住：好的测试应该是可读的、可维护的和可靠的！
