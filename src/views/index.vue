<template>
  <div class="demo">
    <div class="title">Element Go</div>
    <div><ex-loading /></div>
    <div><ex-page-header back title="文章标题" intro1="好的文章往往从描述开始"><el-button>新建</el-button></ex-page-header></div>
    <div>
      <ex-table stripe :data="data" :total="total">
        <el-table-column prop="id" label="日期" width="260" />
        <el-table-column prop="name" label="姓名" width="130" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="date" label="日期" align="right" />
      </ex-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '../types'
import { ref } from 'vue'
import { ElButton, ElTableColumn } from 'element-plus'
import { ExLoading, ExPageHeader, ExTable } from '../../lib'
import api from '../api'

const total = ref<number>(0)
const data = ref<User[]>([])
const getData = () => {
  api.users().then((ret: any) => {
    data.value = ret.data
    total.value = ret.meta.pagination.total
  })
}

getData()
</script>

<style scoped>
.demo { max-width: 1200px; margin: 0 auto; }
.title { display: flex; justify-content: center; align-items: center; height: 100px; }
</style>
