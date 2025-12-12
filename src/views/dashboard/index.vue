<template>
  <div class="dashboard-container">
    <h1>仪表板</h1>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div class="stat-item">
            <div class="stat-value">{{ total }}</div>
            <div class="stat-label">总任务数</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="stat-item">
            <div class="stat-value">{{ pending }}</div>
            <div class="stat-label">待完成</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="stat-item">
            <div class="stat-value">{{ inProgress }}</div>
            <div class="stat-label">进行中</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="stat-item">
            <div class="stat-value">{{ completed }}</div>
            <div class="stat-label">已完成</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getTaskList } from '@/api/task'

// 仪表板页面
const total = ref(0)
const pending = ref(0)
const inProgress = ref(0)
const completed = ref(0)
const getTaskStatus = async (params: string): Promise<number> => {
  const tasks = await getTaskList()
  switch (params) {
    case 'pending':
      return tasks.filter((task) => task.status === 'pending').length
    case 'in_progress':
      return tasks.filter((task) => task.status === 'in_progress').length
    case 'completed':
      return tasks.filter((task) => task.status === 'completed').length
    default:
      return tasks.length
  }
}
onMounted(() => {
  Promise.all([
    getTaskStatus('total'),
    getTaskStatus('pending'),
    getTaskStatus('in_progress'),
    getTaskStatus('completed'),
  ]).then(([tTotal, tPending, tInProgress, tCompleted]) => {
    total.value = tTotal
    pending.value = tPending
    inProgress.value = tInProgress
    completed.value = tCompleted
  })
})
</script>

<style scoped lang="less">
.dashboard-container {
  padding: 20px;

  .stat-item {
    text-align: center;

    .stat-value {
      font-size: 32px;
      font-weight: bold;
      color: #409eff;
      margin-bottom: 10px;
    }

    .stat-label {
      font-size: 14px;
      color: #909399;
    }
  }
}
</style>
