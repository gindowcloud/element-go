<template>
  <div class="demo">
    <ex-page-header back title="文章标题" intro1="好的文章往往从描述开始"><el-button>新建</el-button></ex-page-header>
    <ex-table :data="data" :loaded="loaded" :loading="loading" :total="total" @page-change="getData">
      <el-table-column prop="id" label="日期" width="260" />
      <el-table-column prop="name" label="姓名" width="130" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="date" label="日期" align="right" />
    </ex-table>
  </div>
</template>

<script setup lang="ts">
import type { User } from '../types'
import { ref } from 'vue'
import { ElButton, ElTableColumn } from 'element-plus'
import { ExPageHeader, ExTable } from '../../lib'
import api from '../api'

const loaded = ref(false)
const loading = ref(false)
const total = ref<number>(0)
const data = ref<User[]>([])
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
</style>
