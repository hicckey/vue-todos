<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterView } from 'vue-router'
import { ElMenu, ElMenuItem } from 'element-plus'
import { useRoute } from 'vue-router'

const route = useRoute()
const getActiveIndex = (path: string) => {
  if (path === '/') return '0'
  if (path.startsWith('/task')) return '1'
  if (path.startsWith('/category')) return '2'
  return '0'
}

const activeIndex = ref(getActiveIndex(route.path))

watch(
  () => route.path,
  (newPath: string) => {
    activeIndex.value = getActiveIndex(newPath)
  },
)
</script>

<template>
  <!-- 页面布局 -->
  <div class="app-container">
    <div class="menu-bar">
      <el-menu mode="horizontal" :default-active="activeIndex" class="el-menu-vertical-demo">
        <el-menu-item index="0">
          <RouterLink class="custom-router-link" to="/">首页</RouterLink>
        </el-menu-item>
        <el-menu-item index="1">
          <RouterLink class="custom-router-link" to="/task">任务列表</RouterLink>
        </el-menu-item>
        <el-menu-item index="2">
          <RouterLink class="custom-router-link" to="/category">分类列表</RouterLink>
        </el-menu-item>
        <el-menu-item index="3">
          <RouterLink class="custom-router-link" to="/tools">工具列表</RouterLink>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main-content">
      <RouterView />
    </div>
    <div class="footer-bar">
      <span>版权所有 © 2025</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.app-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .menu-bar {
    width: 100%;
    height: 60px;
    :deep(.el-menu) {
      border-right: none;
    }
    .custom-router-link {
      text-decoration: none;
    }
  }
  .main-content {
    flex: 1;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
  .footer-bar {
    width: 100%;
    height: 50px;
    border-top: 1px solid #e6e6e6;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
    color: #fff;
  }
}
</style>
