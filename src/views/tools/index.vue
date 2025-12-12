<template>
  <div class="tools-container">
    <div class="header">
      <h1>工具列表</h1>
      <el-button type="primary" @click="handleCreate">创建工具</el-button>
    </div>
    <TableComp :data="tools" :loading="loading">
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="description" label="描述" />
      <el-table-column label="操作" width="200">
        <template #default="{ row }: { row: Tool }">
          <el-button type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </TableComp>
  </div>
  <!-- 创建编辑框 -->
</template>
<script setup lang="ts">
import TableComp from '@/components/common/Table/index.vue'
import { ref, onMounted } from 'vue'
import type { Tool } from '@/types/tools'
import {
  getToolsListFn,
  getToolsDetail,
  createTool,
  deleteTools,
  updateTool,
} from '@/api/tools/index'

const tools = ref<Tool[]>([])
const loading = ref(false)
onMounted(async () => {
  loading.value = true
  const data = await getToolsListFn()
  console.log(data, '==========')
  tools.value = data
  loading.value = false
})
const handleEdit = (row: Tool) => {
  console.log(row, '==========')
}
const handleDelete = (row: Tool) => {
  console.log(row, '==========')
}
const handleCreate = () => {
  console.log('创建工具')
}
</script>
<style scoped lang="less">
.tools-container {
  width: 100%;
  padding: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
}
</style>
