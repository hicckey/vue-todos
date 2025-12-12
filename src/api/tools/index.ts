import { useToolsStore } from '@/stores/tools.store'
import type { Tool, updatedToolParams } from '@/types/tools'
import { getToolsList } from '@/utils/storage'

/**
 * 获取工具列表
 */

export const getToolsListFn = (): Promise<Tool[]> => {
  const store = useToolsStore()
  let list = store.toolsList
  if (!list.length) {
    list = getToolsList()
    store.setToolsList(list)
  }
  return Promise.resolve(list)
}
/**
 * 获取单个工具详情
 */
export const getToolsDetail = (id: number): Promise<Tool> => {
  const store = useToolsStore()
  const list = store.toolsList
  const item = list.find((item) => item.id === id)
  if (item) {
    return Promise.resolve(item)
  }
  const cache = getToolsList()
  return cache.find((item) => item.id === id)
}

/**
 * 创建一个新的工具
 */
export const createTool = (params: Tool) => {
  const store = useToolsStore()
  store.addTools(params)
  return Promise.resolve(true)
}
/**
 * 删除一个工具
 */

export const deleteTools = (id: number) => {
  const store = useToolsStore()
  store.deleteTools(id)
  return Promise.resolve(true)
}

/**
 * 更新一个分类
 */
export const updateTool = (id: number, params: updatedToolParams) => {
  const store = useToolsStore()
  store.updatedTools(id, params)
  return Promise.resolve(true)
}
