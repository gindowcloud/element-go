<template>
  <ex-page-header title="FormSearch 搜索" intro="好的内容往往从描述开始" />
  <!-- 演示 -->
  <ex-form-search :model="para" @search="getData">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="para.name" placeholder="姓名" clearable />
    </el-form-item>
    <el-form-item label="电话" prop="phone">
      <el-input v-model="para.phone" placeholder="电话" clearable />
    </el-form-item>
  </ex-form-search>
  <!-- 属性 -->
  <h3 class="subject" style="margin-top: 58px">属性说明</h3>
  <ex-table :data="props" :columns="propColumns" />
  <!-- 方法 -->
  <h3 class="subject">方法说明</h3>
  <ex-table :data="methods" :columns="methodColumns" />
  <!-- 插槽 -->
  <h3 class="subject">插槽说明</h3>
  <ex-table :data="slots" :columns="slotColumns" />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ElFormItem, ElInput } from 'element-plus'
// import { ExPageHeader, ExFormSearch, ExTable } from '@core/index'
import { propColumns, methodColumns, slotColumns } from '../types'

const props = [
  { name: 'model', desc: '数据内容', type: 'object', default: '-' },
]

const methods = [
  { name: '@search', desc: '点击搜索按钮', para: 'model: object 数据内容' },
  { name: '@reset', desc: '点击重置按钮', para: 'model: object 数据内容' },
]

const slots = [
  { name: '-', desc: '自定义表单内容', para: '-' },
]

const para = reactive<{
  name?: string
  phone?: string
}>({})

const getData = () => {
}
</script>
