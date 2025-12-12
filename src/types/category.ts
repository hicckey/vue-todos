// 分类相关类型
export interface Category {
  id: number
  name: string
  color?: string
  icon?: string
  createdAt?: string
  updatedAt?: string
}

export interface CategoryCreateParams {
  name: string
  color?: string
  icon?: string
}

export interface CategoryUpdateParams extends Partial<CategoryCreateParams> {
  id: number
}
