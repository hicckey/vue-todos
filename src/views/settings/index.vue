<template>
  <div class="settings-container">
    <h1>系统设置</h1>
    <el-card>
      <el-form label-width="120px">
        <el-form-item label="主题">
          <el-radio-group v-model="theme">
            <el-radio label="light">浅色</el-radio>
            <el-radio label="dark">深色</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useUIStore } from '@/stores/ui.store'

const uiStore = useUIStore()
const theme = ref(uiStore.theme)

const handleSave = () => {
  uiStore.setTheme(theme.value)
  ElMessage.success('设置已保存')
}
</script>

<style scoped lang="less">
.settings-container {
  padding: 20px;

  h1 {
    margin-bottom: 20px;
  }
}
</style>
