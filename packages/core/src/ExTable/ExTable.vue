<template>
  <!-- 加载中 -->
  <ex-loading v-if="!loaded" />
  <!-- 数据区 -->
  <el-table v-else :data="data" v-bind="$attrs" v-loading="loading" :height="height" @selection-change="selectionChange">
    <!-- Cell -->
    <template v-for="item in columns">
      <el-table-column :label="item.label" :type="item.type" :prop="item.prop" :width="item.width" :align="item.align">
        <template #default="{ row }">
          <slot v-if="!item.type || item.type == 'expand'" name="cell" :row="row" :col="item">{{ $value(row, item.prop as string) }}</slot>
        </template>
      </el-table-column>      
    </template>
    <!-- Slot -->
    <slot />
    <!-- Menu -->
    <el-table-column v-if="slots.link || allowView || hasMore" :width="totalWidth" align="right">
      <template #default="{ row, $index }">
        <slot name="link" :row="row" />        
        <el-button link v-if="allowView" :underline="false" @click="view(row)">查看</el-button>
        <el-dropdown v-if="hasMore">
          <el-button link class="more" :icon="More" />
          <template #dropdown>
            <el-dropdown-menu>
              <slot name="menu" :row="row" />
              <el-dropdown-item v-if="allowUpdate" @click="update(row)">编辑</el-dropdown-item>
              <el-dropdown-item v-else-if="allowModify" @click="modify(row)">编辑</el-dropdown-item>
              <el-dropdown-item v-if="allowRemove" @click="remove(row, $index)" :disabled="!!row.$removeDisabled">删除</el-dropdown-item>
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
  <!-- 查看窗口 -->
  <el-dialog v-model="show.viewer" title="查看详情">
    <el-descriptions :column="viewerColumn">
      <el-descriptions-item v-for="item in viewer" :label="item.label + ':'" :width="columnWidth">{{ $value(current, item.prop) }}</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, useSlots } from 'vue'
import { vLoading, ElMessageBox, ElTable, ElTableColumn, ElButton, ElDropdown, ElDropdownMenu, ElDropdownItem, ElDialog, ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { ExLoading } from '../index'
import { More } from '@icon-park/vue-next'
import { $value } from '../utils'
import ExPagination from '../ExPagination'

const props = defineProps({
  data: { type: Array, default: () => { return [] } },
  columns: { type: Object, default: () => { return [] } },  
  height: { type: Number },
  loaded: { type: Boolean, default: true },
  loading: { type: Boolean, default: false },
  total: { type: Number, default: 0 },
  pageSize: { type: Number, default: 15 },
  currentPage: { type: Number, default: 1 },
  allowView: { type: Boolean, default: false },
  allowModify: { type: Boolean, default: false },
  allowUpdate: { type: Boolean, default: false },
  allowRemove: { type: Boolean, default: false },
  viewer: { type: Object, default: () => { return [] } },
  viewerColumn: { type: Number, default: 2 },
  linkWidth: { type: Number, default: 60 },
})

const emit = defineEmits<{
  (event: 'selection-change', payload: object): void
  (event: 'page-change', payload: number): void
  (event: 'view', row: object): void
  (event: 'modify', row: object): void
  (event: 'update', row: object): void
  (event: 'remove', row: object, index: number): void
}>()

const slots = useSlots()
const pageSize = ref(props.pageSize)
const currentPage = ref(props.currentPage)
const currentChange = (page: number) => emit('page-change', currentPage.value = page)
const selectionChange = (value: object) => emit('selection-change', value)

const hasMore = computed(() => !!slots.menu || props.allowModify || props.allowUpdate || props.allowRemove)
const totalWidth = computed(() => (!!slots.link ? props.linkWidth : 0) + (props.allowView ? 60 : 0) + (hasMore.value ? 50 : 0))
const columnWidth = 100 / props.viewerColumn + '%' // 查看视图列宽
const show = reactive({
  viewer: false
})

const current = ref({})
const view = (row: object) => {
  if (!props.viewer.length) return emit('view', row)
  current.value = row
  show.viewer = true
}

const modify = (row: object) => emit('modify', row)

const update = (row: object) => emit('update', row)

// 删除确认
const remove = (row: object, index: number) => {
  ElMessageBox.confirm('是否确认进行删除?', '操作确认', { type: 'warning' })
    .then(() => emit('remove', row, index))
    .catch(() => {})
}
</script>

<style scoped>
.el-table .el-dropdown { vertical-align: middle; }
.el-table .el-dropdown .more { font-size: 18px; max-height: 20px; outline: none; }
.el-table .el-button + .el-dropdown { margin-left: 12px; }
.batch { margin-top: 20px; }
.pagination { margin-top: 40px; }
</style>
