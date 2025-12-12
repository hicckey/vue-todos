<template>
  <div class="task-form-container">
    <el-card>
      <template #header>
        <div class="header">
          <h2>{{ isEdit ? '编辑任务' : '创建任务' }}</h2>
          <el-button @click="handleBack">返回</el-button>
        </div>
      </template>
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title" placeholder="请输入任务标题" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            v-model="formData.description"
            type="textarea"
            :rows="4"
            placeholder="请输入任务描述"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formData.status" placeholder="请选择状态">
            <el-option label="待处理" value="pending" />
            <el-option label="进行中" value="in_progress" />
            <el-option label="已完成" value="completed" />
          </el-select>
        </el-form-item>
        <el-form-item label="优先级" prop="priority">
          <el-select v-model="formData.priority" placeholder="请选择优先级">
            <el-option label="低" value="low" />
            <el-option label="中" value="medium" />
            <el-option label="高" value="high" />
          </el-select>
        </el-form-item>
        <el-form-item label="截止日期" prop="dueDate">
          <el-date-picker
            v-model="formData.dueDate"
            type="date"
            placeholder="请选择截止日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit" :loading="loading">
            {{ isEdit ? '更新' : '创建' }}
          </el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { createTask, updateTask, getTaskDetail } from '@/api/task'
import { taskTitleRules } from '@/utils/validators'
import type { TaskCreateParams } from '@/types/task'

const route = useRoute()
const router = useRouter()
const formRef = ref<FormInstance>()
const loading = ref(false)
const isEdit = ref(false)

const formData = reactive<TaskCreateParams>({
  title: '',
  description: '',
  status: 'pending',
  priority: 'medium',
  dueDate: '',
})

const rules: FormRules = {
  ...taskTitleRules,
}

onMounted(async () => {
  const id = route.query.id
  if (id) {
    isEdit.value = true
    const data = await getTaskDetail(Number(id))
    if (data) {
      Object.assign(formData, {
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        dueDate: data.dueDate,
      })
    }
  }
})

const handleSubmit = async () => {
  if (!formRef.value) return
  try {
    await formRef.value.validate()
    loading.value = true
    if (isEdit.value) {
      const id = Number(route.query.id)
      await updateTask(id, { ...formData, id })
      ElMessage.success('更新成功')
    } else {
      await createTask(formData)
      ElMessage.success('创建成功')
    }
    router.push('/task')
  } catch (error) {
    console.error('提交失败:', error)
  } finally {
    loading.value = false
  }
}

const handleReset = () => {
  formRef.value?.resetFields()
}

const handleBack = () => {
  router.back()
}
</script>

<style scoped lang="less">
.task-form-container {
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
