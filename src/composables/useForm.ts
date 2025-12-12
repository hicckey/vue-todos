// 表单逻辑复用
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

export function useForm<T extends Record<string, any>>(initialData?: Partial<T>) {
  const formRef = ref<FormInstance>()
  const formData = reactive<T>({ ...initialData } as T)
  const rules = reactive<FormRules<T>>({})

  const resetForm = () => {
    formRef.value?.resetFields()
    Object.assign(formData, initialData || {})
  }

  const validate = async (): Promise<boolean> => {
    if (!formRef.value) return false
    try {
      await formRef.value.validate()
      return true
    } catch {
      return false
    }
  }

  return {
    formRef,
    formData,
    rules,
    resetForm,
    validate,
  }
}
