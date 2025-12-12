// UI状态
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const loading = ref(false)
  const sidebarCollapsed = ref(false)
  const theme = ref<'light' | 'dark'>('light')

  const setLoading = (value: boolean) => {
    loading.value = value
  }

  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  const setTheme = (themeValue: 'light' | 'dark') => {
    theme.value = themeValue
  }

  return {
    loading,
    sidebarCollapsed,
    theme,
    setLoading,
    toggleSidebar,
    setTheme,
  }
})
