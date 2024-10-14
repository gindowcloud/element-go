<template>
  <ex-page-header title="Pagination 分页" intro="好的内容往往从描述开始" />
  <!-- 演示 -->
  <div class="pagination">
    <ex-pagination :total="100" :current-page="page" @current-change="currentChange" />
  </div>
  <!-- 属性 -->
  <h3 class="subject">属性说明</h3>
  <ex-table :data="props" :columns="propColumns" />
  <!-- 方法 -->
  <h3 class="subject">方法说明</h3>
  <ex-table :data="methods" :columns="methodColumns" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ExPageHeader, ExPagination, ExTable } from '@core/index'
import { propColumns, methodColumns } from '../types'

const props = [
  { name: 'total', desc: '数据总数量', type: 'number', default: '0' },
  { name: 'currentPage', desc: '当前页面', type: 'number', default: '15' },
  { name: 'pageSize', desc: '每页条数', type: 'number', default: '1' },
  { name: 'pageSizes', desc: '每页条数切换可选值', type: 'array<number>', default: '[]' },
]

const methods = [
  { name: '@current-change', desc: '当前页面变更', para: 'page: number 页码' },
  { name: '@size-change', desc: '每页条数变更', para: 'size: number 条数' },
]

const page = ref(1)
const currentChange = (newPage: number) => {
  page.value = newPage
}
</script>

<style scoped>
.pagination { margin-top: 54px; }
</style>
