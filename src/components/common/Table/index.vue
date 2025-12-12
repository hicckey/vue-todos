<template>
  <el-table
    :data="data"
    :loading="loading"
    v-bind="$attrs"
    border
    @selection-change="handleSelectionChange"
  >
    <slot />
  </el-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  data: any[]
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const emit = defineEmits<{
  'selection-change': [selection: any[]]
}>()

const handleSelectionChange = (selection: any[]) => {
  emit('selection-change', selection)
}
</script>

<style scoped lang="less"></style>
