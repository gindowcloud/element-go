<template>
  <div class="demo">
    <ex-page-header back title="文章标题" intro="好的文章往往从描述开始"><el-button>新建</el-button></ex-page-header>
    <ex-form-search :model="para" @search="getData">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="para.name" placeholder="姓名" clearable />
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="para.phone" placeholder="电话" clearable />
      </el-form-item>
    </ex-form-search>
    <ex-table :data="data" :columns="columns" :loaded="loaded" :loading="loading" :total="total" @page-change="getData"
      allow-view :viewer="viewer"
      allow-modify @modify="modify"
      allow-remove @remove="remove">
      <template #cell="{ col, row }">        
        <ReduceOne v-if="col.prop == 'state'" :class="{ 'color-light': row.state, 'color-red': !row.state }" />
        <div v-if="col.prop == 'address'" class="address">{{ row.address.province }} / {{ row.address.city }} / {{ row.address.county }}</div>
      </template>
      <template #action>
        <el-button link :icon="Copy">快捷</el-button>
      </template>
      <template #menu>
        <el-dropdown-item>扩展</el-dropdown-item>
      </template>
      <template #batch>
        <el-button-group>
          <el-button :icon="PreviewCloseOne">下架</el-button>
          <el-button :icon="Delete">删除</el-button>
        </el-button-group>
      </template>
    </ex-table>
  </div>
</template>

<script setup lang="ts">
import type { User } from '../types'
import { ref, reactive } from 'vue'
import { ElFormItem, ElInput, ElButtonGroup, ElButton, ElDropdownItem } from 'element-plus'
import { ReduceOne, PreviewCloseOne, Delete, Copy } from '@icon-park/vue-next'
import { ExPageHeader, ExTable } from '../../../packages/lib'
import api from '../api'

const columns = ref([
  { type: 'selection', width: 40, align: 'center' },
  { label: '状态', prop: 'state', width: 60, align: 'center' },
  { label: '编号', prop: 'id', width: 200 },
  { label: '姓名', prop: 'name', width: 100 },
  { type: 'expand', prop: 'address', width: 30, align: 'center' },
  { label: '城市', prop: 'address.city' },
  { label: '电话', prop: 'phone', align: 'right' },
  { label: '日期', prop: 'date', width: 160, align: 'right' },
])

const viewer = ref([
  { label: '编号', prop: 'id' },
  { label: '电话', prop: 'phone' },
  { label: '姓名', prop: 'name' },
  { label: '年龄', prop: 'age' },
  { label: '省份', prop: 'address.province' },
  { label: '城市', prop: 'address.city' },
  { label: '地区', prop: 'address.county' },
  { label: '日期', prop: 'date' },
])

const loaded = ref(false)
const loading = ref(false)
const total = ref<number>(0)
const data = ref<User[]>([])
const para = reactive<{
  name?: string
  phone?: string
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

const modify = () => {}

// 删除一行
const remove = (row: object, index: number) => getData()

// 获取数据
getData()
</script>

<style scoped>
.demo { max-width: 1200px; margin: 0 auto; }
.title { display: flex; justify-content: center; align-items: center; height: 100px; }
.address { padding: 30px; text-align: center; color: #999; }
.color-light { color: #ccc; }
.color-red { color: #f00; }
</style>
