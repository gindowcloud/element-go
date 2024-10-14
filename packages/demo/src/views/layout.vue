<template>
  <ex-page-header title="Layout 布局" intro="好的内容往往从描述开始" />
  <!-- 属性 -->
  <h3 class="subject" style="margin-top: 58px">属性说明</h3>
  <ex-table :data="props" :columns="propColumns" />
  <!-- 插槽 -->
  <h3 class="subject">插槽说明</h3>
  <ex-table :data="slots" :columns="slotColumns" />  
</template>

<script setup lang="ts">
import { ExPageHeader, ExTable } from '@core/index'
import { propColumns, slotColumns } from '../types'

const props = [
  { name: 'title', desc: '标题', type: 'string', default: 'LOGO' },
  { name: 'homepage', desc: '链接', type: 'string', default: '/' },
  { name: 'channels', desc: '频道', type: 'array', default: '[]' },
  { name: 'menu', desc: '菜单', type: 'array', default: '[]' },
  { name: 'show-header', desc: '是否显示头部', type: 'boolean', default: 'true' },
  { name: 'show-menu', desc: '是否显示菜单', type: 'boolean', default: 'true' },
  { name: 'background-color', desc: '菜单背景颜色', type: 'string', default: '#f9f9f9' },
  { name: 'text-color', desc: '菜单文字颜色', type: 'string' },
  { name: 'active-text-color', desc: '激活文字颜色', type: 'string' },
]

const slots = [
  { name: '-', desc: '自定义默认内容', para: '-' },
  { name: 'account', desc: '右侧用户菜单区', para: '-' },
]
</script>
