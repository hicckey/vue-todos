// 分类状态
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Category } from '@/types/category'
import { getCategories, setCategories as saveCategoriesToStorage } from '@/utils/storage'

export const useCategoryStore = defineStore('category', () => {
  // 从 localStorage 初始化数据
  const categories = ref<Category[]>(getCategories())
  const currentCategory = ref<Category | null>(null)

  // 保存到 localStorage 的辅助函数
  const saveToStorage = () => {
    saveCategoriesToStorage(categories.value)
  }

  const setCategories = (categoryList: Category[]) => {
    categories.value = categoryList
    saveToStorage()
  }

  const addCategory = (category: Category) => {
    categories.value.push(category)
    saveToStorage()
  }

  const updateCategory = (id: number, category: Partial<Category>) => {
    const index = categories.value.findIndex((c) => c.id === id)
    if (index !== -1) {
      categories.value[index] = {
        ...categories.value[index],
        ...category,
        updatedAt: new Date().toISOString(),
      } as Category
      saveToStorage()
    }
  }

  const removeCategory = (id: number) => {
    const index = categories.value.findIndex((c) => c.id === id)
    if (index !== -1) {
      categories.value.splice(index, 1)
      saveToStorage()
    }
  }

  const setCurrentCategory = (category: Category | null) => {
    currentCategory.value = category
  }

  // 从 localStorage 重新加载数据
  const loadCategories = () => {
    categories.value = getCategories()
  }

  return {
    categories,
    currentCategory,
    setCategories,
    addCategory,
    updateCategory,
    removeCategory,
    setCurrentCategory,
    loadCategories,
  }
})
