<template>
  <ex-page-header title="PageHeader 页头" intro="好的内容往往从描述开始" />
  <!-- 属性 -->
  <h3 class="subject" style="margin-top: 0">属性说明</h3>
  <ex-table :data="props" :columns="propColumns" />
  <!-- 插槽 -->
  <h3 class="subject">插槽说明</h3>
  <ex-table :data="slots" :columns="slotColumns" />
</template>

<script setup lang="ts">
import { ExPageHeader, ExTable } from '@core/index'
import { propColumns, slotColumns } from '../types'

const props = [
  { name: 'title', desc: '标题内容', type: 'string', default: '' },
  { name: 'intro', desc: '描述内容', type: 'string', default: '' },
  { name: 'back', desc: '是否后退', type: 'boolean', default: 'false' },
  { name: 'alive', desc: '是否保持链接内容（否则会重载）', type: 'boolean', default: 'true' },
]

const slots = [
  { name: '-', desc: '自定义链接区内容', para: '-' },
  { name: 'intro', desc: '自定义描述区内容', para: '-' },
]
</script>
