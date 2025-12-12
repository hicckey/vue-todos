// API请求逻辑复用
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export function useApi<T = any>(apiFn: (...args: any[]) => Promise<T>) {
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const execute = async (...args: any[]): Promise<T | null> => {
    loading.value = true
    error.value = null
    try {
      const result = await apiFn(...args)
      return result
    } catch (err) {
      error.value = err as Error
      ElMessage.error(err instanceof Error ? err.message : '请求失败')
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    execute,
  }
}
