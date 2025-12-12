import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173',
    // 增加默认超时时间
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    // 页面加载超时
    pageLoadTimeout: 30000,
    // 视频录制（可选）
    video: false,
    // 失败时截图
    screenshotOnRunFailure: true,
    // 视口大小
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      // 可以在这里添加插件配置
      return config
    },
  },
})
