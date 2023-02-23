<template>
  <!-- 加载中 -->
  <ex-loading v-if="!loaded" />
  <!-- 数据区 -->
  <el-table v-else :data="data" v-bind="$attrs" v-loading="loading">
    <!-- Columns -->
    <template v-for="item in columns">
      <el-table-column :label="item.label" :type="item.type" :prop="item.prop" :width="item.width" :align="item.align">
        <template #default="{ row }">
          <slot v-if="!item.type || item.type == 'expand'" name="cell" :col="item" :row="row">
            {{ getValue(row, item.prop as string) }}
          </slot>
        </template>
      </el-table-column>      
    </template>
    <!-- Slot -->
    <slot />
    <!-- Action -->
    <el-table-column v-if="allowRemove" width="60" align="right">
      <template #default="{ row, $index }">
        <el-dropdown>
          <el-icon><MoreFilled /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <slot name="action" :row="row" :$index="$index" />
              <el-dropdown-item @click="remove($index, row)">删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
import { vLoading, ElMessageBox, ElIcon, ElTable, ElTableColumn, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { MoreFilled } from '@element-plus/icons-vue'
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
  allowRemove: { type: Boolean, default: false },
})

const emit = defineEmits<{
  (event: 'page-change', payload: number): void
  (event: 'remove', payload: number, item: object): void
}>()

const slots = useSlots()
const pageSize = ref(props.pageSize)
const currentPage = ref(props.currentPage)
const currentChange = (page: number) => emit('page-change', currentPage.value = page)

// 删除确认
const remove = (index: number, item: object) => {
  ElMessageBox.confirm('是否确认进行删除?', '操作确认', { type: 'warning' }).then(() => {
    emit('remove', index, item)
  }).catch(() => {})
}
</script>

<style scoped>
.el-icon { outline: none; }
.el-dropdown { vertical-align: middle; cursor: pointer; }
.batch { margin-top: 20px; }
.pagination { margin-top: 40px; }
</style>
