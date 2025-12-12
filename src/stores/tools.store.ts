import { defineStore } from 'pinia'
import { getToolsList, setToolsList } from '@/utils/storage'
import type { Tool, updatedToolParams } from '@/types/tools'
import { ref } from 'vue'
export const useToolsStore = defineStore('tools', () => {
  const toolsList = ref<Tool[]>(getToolsList())
  // 存储
  const saveToStorage = () => {
    setToolsList(toolsList.value)
  }
  // 更新工具列表
  const updatedTools = (id: number, params: updatedToolParams) => {
    const index = toolsList.value.findIndex((item) => (item.id = id))
    if (index !== -1) {
      toolsList.value[index] = {
        ...toolsList.value[index],
        ...params,
      } as Tool
    }
    // 重新存储进去
    saveToStorage()
  }
  // 新增工具列表
  const addTools = (params: Tool) => {
    toolsList.value.push(params)
    saveToStorage()
  }
  // 删除工具列表
  const deleteTools = (id: number) => {
    const index = toolsList.value.findIndex((item) => item.id === id)
    if (index !== -1) {
      toolsList.value.splice(index, 1)
      saveToStorage()
    }
  }
  // 更新整个列表
  const setToolsList = (data: Tool[]) => {
    if (data.length) {
      toolsList.value = data
      saveToStorage()
    }
  }

  return {
    toolsList,
    updatedTools,
    addTools,
    deleteTools,
    setToolsList,
  }
})
