<template>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="total"
    :page-sizes="pageSizes"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  total: number
  pageSize?: number
  currentPage?: number
  pageSizes?: number[]
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 10,
  currentPage: 1,
  pageSizes: () => [10, 20, 50, 100],
})

const emit = defineEmits<{
  'size-change': [size: number]
  'current-change': [page: number]
}>()

const currentPage = ref(props.currentPage)
const pageSize = ref(props.pageSize)

watch(
  () => props.currentPage,
  (val) => {
    currentPage.value = val
  },
)

watch(
  () => props.pageSize,
  (val) => {
    pageSize.value = val
  },
)

const handleSizeChange = (size: number) => {
  pageSize.value = size
  emit('size-change', size)
}

const handleCurrentChange = (page: number) => {
  currentPage.value = page
  emit('current-change', page)
}
</script>

<style scoped lang="less"></style>
