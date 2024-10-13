<template>
  <el-config-provider :locale="locale">
    <el-pagination v-if="total" background :layout="layout" :total="total" :page-size="pageSize" :page-sizes="pageSizes" :current-page="currentPage" @size-change="sizeChange" @current-change="currentChange" />
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElConfigProvider, ElPagination } from 'element-plus'
import locale from 'element-plus/es/locale/lang/zh-cn'

const props = defineProps({
  total: { type: Number, default: 0 },
  currentPage: { type: Number, default: 1 },
  pageSize: { type: Number, default: 15 },
  pageSizes: { type: Array<number>, default: () => { return [] } }
})

const emit = defineEmits<{
  (event: 'size-change', payload: number): void
  (event: 'current-change', payload: number): void
}>()

const layout = computed(() => props.pageSizes.length ? 'total,sizes,prev,pager,next' : 'total,prev,pager,next')
const sizeChange = (size: number) => emit('size-change', size)
const currentChange = (page: number) => emit('current-change', page)
</script>

<style scoped>
.el-pagination { margin: 20px 0; justify-content: center; }
</style>
