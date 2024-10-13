<template>
  <ex-page-header title="Loading 加载" intro="好的内容往往从描述开始" />
  <!-- 演示 -->
  <ex-loading />
  <!-- 属性 -->
  <h3 class="subject" style="margin-top: 58px">属性说明</h3>
  <ex-table :data="props" :columns="propColumns" />
</template>

<script setup lang="ts">
// import { ExPageHeader, ExLoading, ExTable } from '@core/index'
import { propColumns } from '../types'

const props = [
  { name: 'padding', desc: '边距距离', type: 'string', default: '20px' },
  { name: 'font-size', desc: '图标大小', type: 'string', default: '20px' },
]
</script>
