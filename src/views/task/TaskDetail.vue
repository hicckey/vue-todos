<template>
  <div class="task-detail-container">
    <el-card v-if="task">
      <template #header>
        <div class="header">
          <h2>{{ task.title }}</h2>
          <el-button @click="handleBack">返回</el-button>
        </div>
      </template>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusType(task.status)">{{ getStatusText(task.status) }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="优先级">
          <el-tag :type="getPriorityType(task.priority)">{{
            getPriorityText(task.priority)
          }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="描述" :span="2">
          {{ task.description || '无' }}
        </el-descriptions-item>
        <el-descriptions-item label="截止日期">
          {{ task.dueDate || '无' }}
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">
          {{ task.createdAt }}
        </el-descriptions-item>
        <el-descriptions-item label="更新时间">
          {{ task.updatedAt }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-empty v-else description="任务不存在" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getTaskDetail } from '@/api/task'
import type { Task } from '@/types/task'

const route = useRoute()
const router = useRouter()
const task = ref<Task | null>(null)

onMounted(async () => {
  console.log(route.params, 111)
  const id = route.params.id
  console.log(id, 111)
  if (id) {
    const data = await getTaskDetail(Number(id))
    if (data) {
      task.value = data
    }
  }
})

const handleBack = () => {
  router.back()
}

const getStatusType = (status: Task['status']) => {
  const map = {
    pending: 'info',
    in_progress: 'warning',
    completed: 'success',
  }
  return map[status]
}

const getStatusText = (status: Task['status']) => {
  const map = {
    pending: '待处理',
    in_progress: '进行中',
    completed: '已完成',
  }
  return map[status]
}

const getPriorityType = (priority: Task['priority']) => {
  const map = {
    low: 'info',
    medium: 'warning',
    high: 'danger',
  }
  return map[priority]
}

const getPriorityText = (priority: Task['priority']) => {
  const map = {
    low: '低',
    medium: '中',
    high: '高',
  }
  return map[priority]
}
</script>

<style scoped lang="less">
.task-detail-container {
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      margin: 0;
    }
  }
}
</style>
