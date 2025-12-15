// 分类相关API
import type {
  Category,
  CategoryCreateParams,
  CategoryUpdateParams,
  CategoryListParams,
} from '@/types/category'
import { getCategories } from '@/utils/storage'
import { useCategoryStore } from '@/stores/category.store'

/**
 * 获取分类列表
 */
export const getCategoryList = async (params?: CategoryListParams): Promise<Category[]> => {
  const categoryStore = useCategoryStore()
  let categories = categoryStore.categories
  // 过滤先不处理

  // 如果没有数据，从 localStorage 加载
  if (categories.length === 0) {
    categories = getCategories()
    categoryStore.setCategories(categories)
  }

  return Promise.resolve(categories)
}

/**
 * 获取分类详情
 */
export const getCategoryDetail = async (id: number): Promise<Category | undefined> => {
  const categoryStore = useCategoryStore()
  const category = categoryStore.categories.find((c) => c.id === id)
  if (category) {
    return Promise.resolve(category)
  }
  // 如果 store 中没有，从 localStorage 查找
  const categories = getCategories()
  return Promise.resolve(categories.find((c) => c.id === id))
}

/**
 * 创建分类
 */
export const createCategory = async (data: CategoryCreateParams): Promise<Category> => {
  console.log('createCategory', data)
  const categoryStore = useCategoryStore()
  const categories =
    categoryStore.categories.length > 0 ? categoryStore.categories : getCategories()

  // 生成新 ID
  const maxId = categories.length > 0 ? Math.max(...categories.map((c) => c.id)) : 0
  const newCategory: Category = {
    id: maxId + 1,
    name: data.name,
    color: data.color,
    icon: data.icon,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  categoryStore.addCategory(newCategory)
  return Promise.resolve(newCategory)
}

/**
 * 更新分类
 */
export const updateCategory = async (
  id: number,
  data: CategoryUpdateParams,
): Promise<Category | null> => {
  const categoryStore = useCategoryStore()
  const category = categoryStore.categories.find((c) => c.id === id)

  if (!category) {
    return Promise.resolve(null)
  }

  const updatedCategory: Category = {
    ...category,
    ...data,
    id, // 确保 ID 不被覆盖
    updatedAt: new Date().toISOString(),
  }

  categoryStore.updateCategory(id, updatedCategory)
  return Promise.resolve(updatedCategory)
}

/**
 * 删除分类
 */
export const deleteCategory = async (id: number): Promise<boolean> => {
  const categoryStore = useCategoryStore()
  categoryStore.removeCategory(id)
  return Promise.resolve(true)
}
