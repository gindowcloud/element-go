<template>
  <!-- 加载中 -->
  <ex-loading v-if="!loaded" />
  <!-- 数据区 -->
  <el-table v-else :data="data" v-bind="$attrs" v-loading="loading">
    <template v-for="item in columns">
      <el-table-column :label="item.label" :type="item.type" :prop="item.prop" :width="item.width" :align="item.align">
        <template #default="{ row }">
          <slot v-if="!item.type || item.type == 'expand'" name="cell" v-bind="{ col: item, row: row }">
            {{ getValue(row, item.prop as string) }}
          </slot>
        </template>
      </el-table-column>
    </template>
    <slot />
  </el-table>
  <!-- 操作区 -->
  <div class="batch" v-if="!!slots.batch">
    <slot name="batch" />
  </div>
  <!-- 分页区 -->
  <div class="pagination" v-if="total">
    <ex-pagination :total="total" :page-size="pageSize" :current-page="currentPage" @current-change="currentChange" />
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '../types'
import { ref, useSlots } from 'vue'
import { ElTable, ElTableColumn, vLoading } from 'element-plus'
import { getValue } from '../utils'
import ExPagination from '../ExPagination'

const props = defineProps({
  data: { type: Array, default: () => { return [] } },
  columns: { type: Array<TableColumn>, default: () => { return [] } },
  loaded: { type: Boolean, default: true },
  loading: { type: Boolean, default: false },
  total: { type: Number, default: 0 },
  pageSize: { type: Number, default: 15 },
  currentPage: { type: Number, default: 1 },
})

const emit = defineEmits<{
  (event: 'page-change', payload: number): void
}>()

const slots = useSlots()
const pageSize = ref(props.pageSize)
const currentPage = ref(props.currentPage)
const currentChange = (page: number) => emit('page-change', currentPage.value = page)
</script>

<style scoped>
.batch { margin-top: 20px; }
.pagination { margin-top: 40px; }
</style>
