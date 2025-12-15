<template>
  <div class="category-container">
    <div class="header">
      <h1>分类管理</h1>
      <el-button type="primary" @click="handleCreate">创建分类</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="color" label="颜色">
        <template #default="{ row }">
          <el-tag :color="row.color">{{ row.color || '无' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="图标" />
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :total="total"
      :page-size="pagination.pageSize"
      :current-page="pagination.currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <!-- 创建分类弹窗 -->
  <Modal
    v-model="createCategoryModal"
    v-if="createCategoryModal"
    @confirm="handleCreateCategory"
    @close="handleCloseCreateCategory"
    :title="categoryId ? '编辑分类' : '创建分类'"
    width="500px"
  >
    <el-form :model="createCategoryForm" :rules="createCategoryRules" ref="createCategoryFormRef">
      <el-form-item label="名称" prop="name">
        <el-input v-model="createCategoryForm.name" placeholder="请输入分类名称" />
      </el-form-item>
      <el-form-item label="颜色" prop="color">
        <el-color-picker v-model="createCategoryForm.color" />
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="createCategoryForm.icon" placeholder="请输入分类图标" />
      </el-form-item>
    </el-form>
  </Modal>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getCategoryList, deleteCategory, createCategory } from '@/api/category'
import type { Category, CategoryCreateParams } from '@/types/category'
import type { FormInstance, FormRules } from 'element-plus'
import Modal from '@/components/common/Modal/index.vue'
import Pagination from '@/components/common/Pagination/index.vue'
import { useTable } from '@/composables/useTable'
const categoryList = ref<Category[]>([])
const categoryId = ref<number | null>(null)
onMounted(async () => {
  loadData()
})
const { loadData, handleSizeChange, handleCurrentChange, tableData, total, pagination } = useTable(
  async (params: any) => {
    const allCategories = await getCategoryList()
    const page = params.page || 1
    const pageSize = params.pageSize || 10
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return {
      list: allCategories.slice(start, end),
      total: allCategories.length,
    }
  },
)

const handleDelete = async (row: Category) => {
  try {
    await ElMessageBox.confirm('确定要删除这个分类吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    await deleteCategory(row.id)
    ElMessage.success('删除成功')
    loadData()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除失败:', error)
    }
  }
}

//
let createCategoryModal = ref(false)
let createCategoryForm = reactive<CategoryCreateParams>({
  name: '',
  color: '',
  icon: '',
})

let createCategoryFormRef = ref<FormInstance>()
let createCategoryRules = ref<FormRules>({
  name: [{ required: true, message: '请输入分类名称', trigger: 'change' }],
  icon: [{ required: true, message: '请输入分类图标', trigger: 'change' }],
})
function handleCreateCategory() {
  createCategoryFormRef.value?.validate(async (valid) => {
    console.log('valid', valid)
    console.log('form data:', createCategoryForm)
    if (valid) {
      await createCategory(createCategoryForm)
      console.log('createCategory success')
      ElMessage.success('创建成功')
      loadData()
      handleCloseCreateCategory()
    }
  })
}
function handleCloseCreateCategory() {
  Object.assign(createCategoryForm, {
    name: '',
    color: '',
    icon: '',
  })
  createCategoryModal.value = false
}

const handleCreate = () => {
  categoryId.value = null
  createCategoryModal.value = true
}

const handleEdit = (row: Category) => {
  // TODO: 实现编辑分类
  categoryId.value = row.id
  createCategoryModal.value = true
}
</script>

<style scoped lang="less">
.category-container {
  height: 100%;

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
