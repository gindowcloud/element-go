<template>
  <ex-page-header title="Table 表格" intro="好的内容往往从描述开始"><el-button>新建</el-button></ex-page-header>
  <!-- 演示 -->
  <ex-form-search :model="para" @search="getData">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="para.name" placeholder="姓名" clearable />
    </el-form-item>
    <el-form-item label="电话" prop="phone">
      <el-input v-model="para.phone" placeholder="电话" clearable />
    </el-form-item>
    <el-form-item label="日期" prop="date">
      <el-date-picker v-model="para.date" type="daterange" placeholder="日期" clearable />
    </el-form-item>
  </ex-form-search>
  <ex-table :data="data" :columns="columns" :loaded="loaded" :loading="loading" :total="total" :height="400" @page-change="getData" @selection-change="selectionChange"
    allow-view :viewer="viewer"
    allow-modify @modify="modify"
    allow-remove @remove="remove">
    <template #cell="{ col, row }">        
      <ReduceOne v-if="col.prop == 'state'" :class="{ 'color-light': row.state, 'color-red': !row.state }" />
      <div v-if="col.prop == 'address'" class="address">{{ row.address.province }} / {{ row.address.city }} / {{ row.address.county }}</div>
    </template>
    <template #link>
      <el-button link :icon="LinkOne">链接</el-button>
    </template>
    <template #menu>
      <el-dropdown-item>菜单</el-dropdown-item>
    </template>
    <template #batch>
      <el-button-group>
        <el-button :icon="PreviewCloseOne">下架</el-button>
        <el-button :icon="Delete">删除</el-button>
      </el-button-group>
    </template>
  </ex-table>
  <!-- 属性 -->
  <h3 class="subject">属性说明</h3>
  <ex-table :data="props" :columns="propColumns" />
  <!-- 方法 -->
  <h3 class="subject">方法说明</h3>
  <ex-table :data="methods" :columns="methodColumns" />
  <!-- 插槽 -->
  <h3 class="subject">插槽说明</h3>
  <ex-table :data="slots" :columns="slotColumns" />
</template>

<script setup lang="ts">
import type { User } from '../types'
import { ref, reactive } from 'vue'
import { ElFormItem, ElInput, ElButtonGroup, ElButton, ElDropdownItem, ElDatePicker } from 'element-plus'
import { ReduceOne, PreviewCloseOne, Delete, LinkOne } from '@icon-park/vue-next'
import { ExPageHeader, ExTable } from '../../packages/lib'
import { propColumns, methodColumns, slotColumns } from '../types'
import api from '../api'

const columns = [
  { type: 'selection', width: 40, align: 'center' },
  { label: '状态', prop: 'state', width: 60, align: 'center' },
  { label: '编号', prop: 'id', width: 200 },
  { label: '姓名', prop: 'name', width: 100 },
  { type: 'expand', prop: 'address', width: 30, align: 'center' },
  { label: '城市', prop: 'address.city' },
  { label: '电话', prop: 'phone', align: 'right' },
  { label: '日期', prop: 'date', width: 160, align: 'right' },
]

const viewer = [
  { label: '编号', prop: 'id' },
  { label: '电话', prop: 'phone' },
  { label: '姓名', prop: 'name' },
  { label: '年龄', prop: 'age' },
  { label: '省份', prop: 'address.province' },
  { label: '城市', prop: 'address.city' },
  { label: '地区', prop: 'address.county' },
  { label: '日期', prop: 'date' },
]

const props = [
  { name: 'data', desc: '数据内容（行定义）', type: 'array', default: '[]' },
  { name: 'columns', desc: '数据列表（列定义）', type: 'array', default: '[]' },
  { name: 'loaded', desc: '完成首次加载', type: 'boolean', default: 'true' },
  { name: 'loading', desc: '加载中', type: 'boolean', default: 'false' },
  { name: 'total', desc: '分页数据行数', type: 'number', default: '0' },
  { name: 'page-size', desc: '分页行页数量', type: 'number', default: '15' },
  { name: 'current-page', desc: '分页当前页面', type: 'number', default: '1' },
  { name: 'allow-view', desc: '显示查看按钮', type: 'boolean', default: 'false' },
  { name: 'allow-modify', desc: '显示编辑按钮', type: 'boolean', default: 'false' },
  { name: 'allow-update', desc: '显示更新按钮', type: 'boolean', default: 'false' },
  { name: 'allow-remove', desc: '显示删除按钮', type: 'boolean', default: 'false' },
  { name: 'viewer', desc: '查看弹窗显示的数据内容', type: 'array', default: '[]' },
  { name: 'viewer-column', desc: '查看弹窗显示列数', type: 'number', default: '2' },
  { name: 'link-width', desc: '添加 Link 内容表格宽度', type: 'number', default: '60' },
]

const methods = [
  { name: '@page-change', desc: '用户切换分页', para: 'page: number 页码' },
  { name: '@view', desc: '用户点击了查看按钮', para: 'row: object 数据行' },
  { name: '@modify', desc: '用户点击了编辑按钮', para: 'row: object 数据行' },
  { name: '@update', desc: '使用更新窗完成了数据更新', para: 'row: object 数据行' },
  { name: '@remove', desc: '完成了删除操作', para: 'row: object 数据行, index: number 序号' },
]

const slots = [
{ name: '-', desc: '自定义默认内容', para: '-' },
{ name: 'cell', desc: '数据单元区', para: '{ row 行数据, col 列数据 }' },
{ name: 'link', desc: '数据行的链接', para: '{ row 行数据 }' },
{ name: 'menu', desc: '数据行的菜单', para: '{ row 行数据 }' },
{ name: 'batch', desc: '批量操作区', para: '-' },
]

const loaded = ref(false)
const loading = ref(false)
const total = ref<number>(0)
const data = ref<User[]>([])
const para = reactive<{
  name?: string
  phone?: string
  date?: string
}>({})

const getData = () => {
  loading.value = true
  api.users().then((ret: any) => {
    data.value = ret.data.map((j: any) => {
      j.$removeDisabled = ! j.state
      return j
    })
    total.value = ret.meta.pagination.total
  }).finally(() => {
    loading.value = false
    loaded.value = true
  })
}

// 选中变化
const selectionChange = () => {}

// 修改一行
const modify = () => {}

// 删除一行
const remove = (row: object, index: number) => getData()

// 获取数据
getData()
</script>

<style scoped>
.address { padding: 30px; text-align: center; color: #999; }
.color-light { color: #ccc; }
.color-red { color: #f00; }
</style>
