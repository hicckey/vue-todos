# Vue Todos

一个基于 Vue 3 + TypeScript + Element Plus 的任务管理应用。

## 项目结构

```
src/
├── api/                    # API接口层
│   ├── task/              # 任务相关API
│   ├── user/              # 用户相关API
│   ├── category/          # 分类相关API
│   └── index.ts           # API统一导出
├── assets/                # 静态资源
│   ├── css/               # 全局样式
│   └── images/            # 图片资源
├── components/            # 公共组件
│   ├── common/            # 通用组件
│   │   ├── Layout/        # 布局组件
│   │   ├── Modal/         # 模态框组件
│   │   ├── Table/         # 表格组件
│   │   └── Pagination/    # 分页组件
│   └── task/              # 任务相关业务组件
├── composables/           # 组合式函数
│   ├── useTable.ts        # 表格逻辑复用
│   ├── useForm.ts         # 表单逻辑复用
│   └── useApi.ts          # API请求逻辑复用
├── router/                # 路由配置
│   ├── index.ts           # 路由主文件
│   └── guards/            # 路由守卫
├── stores/                # Pinia状态管理
│   ├── auth.store.ts      # 认证状态
│   ├── task.store.ts      # 任务状态
│   ├── category.store.ts  # 分类状态
│   └── ui.store.ts        # UI状态
├── types/                 # TypeScript类型定义
│   ├── task.ts            # 任务相关类型
│   ├── user.ts            # 用户相关类型
│   ├── api.ts             # API响应类型
│   └── index.ts           # 类型统一导出
├── utils/                 # 工具函数
│   ├── request.ts         # 请求封装
│   ├── storage.ts         # 本地存储
│   └── validators.ts      # 表单验证
├── views/                 # 页面组件
│   ├── auth/              # 认证相关页面
│   │   ├── Login.vue      # 登录页
│   │   └── Register.vue    # 注册页
│   ├── dashboard/         # 仪表板
│   ├── task/              # 任务管理
│   │   ├── TaskList.vue   # 任务列表
│   │   ├── TaskDetail.vue # 任务详情
│   │   └── TaskForm.vue   # 任务表单
│   ├── category/          # 分类管理
│   └── settings/          # 系统设置
├── App.vue                # 根组件
└── main.ts                # 入口文件
```

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全的 JavaScript 超集
- **Element Plus** - 基于 Vue 3 的组件库
- **Pinia** - Vue 的状态管理库
- **Vue Router** - Vue 官方路由管理器

## 功能特性

- ✅ 用户认证（登录/注册）
- ✅ 任务管理（创建、编辑、删除、查看）
- ✅ 分类管理
- ✅ 本地存储
- ✅ 响应式设计

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 运行测试
pnpm test
```
