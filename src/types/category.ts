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

// CategoryUpdateParams 表示用于更新分类时的参数类型。
// 它继承自 Partial<CategoryCreateParams>，也就是说 name、color、icon 这几个字段都是可选的。
// 但它额外要求必须有 id: number 字段，用来指定要更新的分类的唯一标识符。
// 这种设计方式允许调用方仅传递要变更的字段（除了 id 必须存在），而不用包含所有字段。
export interface CategoryUpdateParams extends Partial<CategoryCreateParams> {
  id: number
}
