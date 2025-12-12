// API响应类型
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

export interface PaginationResponse<T = any> {
  list: T[]
  total: number
  page: number
  pageSize: number
}
