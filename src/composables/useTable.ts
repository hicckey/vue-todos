// 表格逻辑复用
import { ref, reactive } from 'vue'

// 泛型T为表格数据类型，fetchData为获取表格数据的方法 返回值为{ list: T[]; total: number }
export function useTable<T = any>(
  fetchData: (params: any) => Promise<{ list: T[]; total: number }> | { list: T[]; total: number },
) {
  const loading = ref(false)
  const tableData = ref<T[]>([])
  const total = ref(0)
  const pagination = reactive({
    currentPage: 1,
    pageSize: 10,
  })

  const loadData = async () => {
    loading.value = true
    try {
      const res = await Promise.resolve(
        fetchData({
          page: pagination.currentPage,
          pageSize: pagination.pageSize,
        }),
      )
      tableData.value = res.list
      total.value = res.total
    } catch (error) {
      console.error('加载数据失败:', error)
    } finally {
      loading.value = false
    }
  }

  const handleSizeChange = (size: number) => {
    pagination.pageSize = size
    pagination.currentPage = 1
    loadData()
  }

  const handleCurrentChange = (page: number) => {
    pagination.currentPage = page
    loadData()
  }

  return {
    loading,
    tableData,
    total,
    pagination,
    loadData,
    handleSizeChange,
    handleCurrentChange,
  }
}
