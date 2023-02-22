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
    <ex-table :data="data" :columns="columns" :loaded="loaded" :loading="loading" :total="total" @page-change="getData">
      <template #cell="{ col, row }">        
        <el-icon v-if="col.prop === 'state'" :size="16" class="icon" :class="{ 'color-light': !row.state, 'color-green': row.state }"><Check /></el-icon>
      </template>
      <template #batch>
        <el-button-group>
          <el-button>下架</el-button>
          <el-button>删除</el-button>
        </el-button-group>
      </template>
    </ex-table>
  </div>
</template>

<script setup lang="ts">
import type { User } from '../types'
import { ref, reactive } from 'vue'
import { ElFormItem, ElInput, ElButtonGroup, ElButton, ElIcon } from 'element-plus'
import { Check } from '@element-plus/icons-vue'
import { ExPageHeader, ExTable } from '../../lib'
import api from '../api'

const columns = ref([
  { type: 'selection', width: 40, align: 'center' },
  { label: '状态', prop: 'state', width: 60, align: 'center' },
  { label: '编号', prop: 'id', width: 250 },
  { label: '姓名', prop: 'name', width: 140 },
  { label: '电话', prop: 'phone' },
  { label: '城市', prop: 'address.city', align: 'right' },
  { label: '日期', prop: 'date', width: 180, align: 'right' }
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
    data.value = ret.data
    total.value = ret.meta.pagination.total
  }).finally(() => {
    loading.value = false
    loaded.value = true
  })
}

getData()
</script>

<style scoped>
.demo { max-width: 1200px; margin: 0 auto; }
.title { display: flex; justify-content: center; align-items: center; height: 100px; }
.color-light { color: #ccc; }
.color-green { color: #093; }
</style>
