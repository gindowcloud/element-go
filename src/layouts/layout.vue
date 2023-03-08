<template>
  <ex-layout title="Element Go" homepage="/components/page-header"
    :channels="channels" :menu="menu">
    <router-view />
  </ex-layout>
</template>

<script setup lang="ts">
import type { Menu } from '../../packages/lib/types'
import { ExLayout } from '../../packages/lib'
import { HamburgerButton, Search, TableFile, Loading, MoreFour, Page } from '@icon-park/vue-next'
import menu from './menu'

const channels: Array<Menu> = [
  { title: '页头', icon: HamburgerButton, path: '/components/page-header' },
  { title: '搜索', icon: Search, path: '/components/form-search' },
  { title: '表格', icon: TableFile, path: '/components/table' },
  { title: '加载', icon: Loading, path: '/components/loading' },
  { title: '分页', icon: MoreFour, path: '/components/pagination' },
  { title: '布局', icon: Page, path: '/components/layout' }
]
</script>
