<template>
  <!-- 加载中 -->
  <ex-loading v-if="!loaded" />
  <!-- 数据区 -->
  <el-table v-else :data="data" v-bind="$attrs" v-loading="loading">
    <slot />
  </el-table>
  <!-- 分页区 -->
  <div class="pagination" v-if="total">
    <ex-pagination :total="total" :page-size="pageSize" :current-page="currentPage" @current-change="currentChange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElTable, vLoading } from 'element-plus'
import ExPagination from '../ExPagination'

const props = defineProps({
  data: { type: Array, default: () => { return [] } },
  loaded: { type: Boolean, default: true },
  loading: { type: Boolean, default: false },
  total: { type: Number, default: 0 },
  pageSize: { type: Number, default: 15 },
  currentPage: { type: Number, default: 1 },
})

const emit = defineEmits<{
  (event: 'page-change', payload: number): void
}>()

const pageSize = ref(props.pageSize)
const currentPage = ref(props.currentPage)
const currentChange = (page: number) => emit('page-change', currentPage.value = page)
</script>

<style scoped>
.pagination { margin-top: 40px; }
</style>
