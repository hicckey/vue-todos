<template>
  <div class="task-list-container">
    <div class="header">
      <h1>任务列表</h1>
      <el-button type="primary" @click="handleCreate">创建任务</el-button>
    </div>
    <el-table :data="tableData" :loading="loading" style="width: 100%">
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="priority" label="优先级" />
      <el-table-column prop="dueDate" label="截止日期" />
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button size="small" @click="handleView(row)">查看</el-button>
          <el-button size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pagination.currentPage"
      v-model:page-size="pagination.pageSize"
      :total="total"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getTaskList, deleteTask } from '@/api/task'
import { useTable } from '@/composables/useTable'
import type { Task } from '@/types/task'

const router = useRouter()

const getTaskListWithPagination = async (params: any) => {
  const allTasks = await getTaskList(params)
  const page = params.page || 1
  const pageSize = params.pageSize || 10
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return {
    list: allTasks.slice(start, end),
    total: allTasks.length,
  }
}

const { loading, tableData, total, pagination, loadData, handleSizeChange, handleCurrentChange } =
  useTable<Task>(getTaskListWithPagination)

onMounted(() => {
  console.log('onMounted')
  loadData()
})

const handleCreate = () => {
  router.push('/task/form')
}

const handleView = (row: Task) => {
  router.push(`/task/${row.id}/detail`)
}

const handleEdit = (row: Task) => {
  router.push(`/task/form?id=${row.id}`)
}

const handleDelete = async (row: Task) => {
  try {
    await ElMessageBox.confirm('确定要删除这个任务吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    await deleteTask(row.id)
    ElMessage.success('删除成功')
    loadData()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除失败:', error)
    }
  }
}
</script>

<style scoped lang="less">
.task-list-container {
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h1 {
      margin: 0;
    }
  }
}
</style>
