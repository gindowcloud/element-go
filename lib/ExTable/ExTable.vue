<template>
  <!-- 加载中 -->
  <ex-loading v-if="!loaded" />
  <!-- 数据区 -->
  <el-table v-else :data="data" v-bind="$attrs" v-loading="loading">
    <!-- Columns -->
    <template v-for="item in columns">
      <el-table-column :label="item.label" :type="item.type" :prop="item.prop" :width="item.width" :align="item.align">
        <template #default="{ row }">
          <slot v-if="!item.type || item.type == 'expand'" name="cell" :row="row" :col="item">{{ getValue(row, item.prop as string) }}</slot>
        </template>
      </el-table-column>      
    </template>
    <!-- Slot -->
    <slot />
    <!-- Action -->
    <el-table-column v-if="!!slots.menu || allowRemove || allowUpdate" :width="menuWidth" align="right">
      <template #default="{ row, $index }">
        <slot name="menu" :row="row" />
        <el-button v-if="allowUpdate" link :icon="Edit" @click="update(row)">编辑</el-button>
        <el-button v-if="allowRemove" link :icon="Delete" @click="remove(row, $index)">删除</el-button>
      </template>
    </el-table-column>
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
import { vLoading, ElMessageBox, ElTable, ElTableColumn, ElButton } from 'element-plus'
import { Edit, Delete } from '@element-plus/icons-vue'
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
  menuWidth: { type: Number, default: 90 },
  allowUpdate: { type: Boolean, default: false },
  allowRemove: { type: Boolean, default: false },
})

const emit = defineEmits<{
  (event: 'page-change', payload: number): void
  (event: 'update', row: object): void
  (event: 'remove', row: object, index: number): void
}>()

const slots = useSlots()
const pageSize = ref(props.pageSize)
const currentPage = ref(props.currentPage)
const currentChange = (page: number) => emit('page-change', currentPage.value = page)

const update = (row: object) => {}

// 删除确认
const remove = (row: object, index: number) => {
  ElMessageBox.confirm('是否确认进行删除?', '操作确认', { type: 'warning' }).then(() => {
    emit('remove', row, index)
  }).catch(() => {})
}
</script>

<style scoped>
.el-table .el-icon { outline: none; }
.el-table .el-button + .el-button { margin-left: 0; }
.batch { margin-top: 20px; }
.pagination { margin-top: 40px; }
</style>
