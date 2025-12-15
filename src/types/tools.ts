export interface Tool {
  id: number
  name: string
  description: string
}
export interface createToolParams {
  name: string
  description: string
}

export interface ToolListParams {
  page?: number
  pageSize?: number
  keyword?: string
}

export interface updatedToolParams extends Partial<Tool> {
  id: number
}
