// 任务状态
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Task } from '@/types/task'
import { getTasks, setTasks as saveTasksToStorage } from '@/utils/storage'

export const useTaskStore = defineStore('task', () => {
  // 从 localStorage 初始化数据
  const tasks = ref<Task[]>(getTasks())
  const currentTask = ref<Task | null>(null)

  // 保存到 localStorage 的辅助函数
  const saveToStorage = () => {
    saveTasksToStorage(tasks.value)
  }

  const setTasks = (taskList: Task[]) => {
    tasks.value = taskList
    saveToStorage()
  }

  const addTask = (task: Task) => {
    tasks.value.push(task)
    saveToStorage()
  }

  const updateTask = (id: number, task: Partial<Task>) => {
    const index = tasks.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      tasks.value[index] = {
        ...tasks.value[index],
        ...task,
        updatedAt: new Date().toISOString(),
      }
      saveToStorage()
    }
  }

  const removeTask = (id: number) => {
    const index = tasks.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      tasks.value.splice(index, 1)
      saveToStorage()
    }
  }

  const setCurrentTask = (task: Task | null) => {
    currentTask.value = task
  }

  // 从 localStorage 重新加载数据
  const loadTasks = () => {
    tasks.value = getTasks()
  }

  return {
    tasks,
    currentTask,
    setTasks,
    addTask,
    updateTask,
    removeTask,
    setCurrentTask,
    loadTasks,
  }
})
