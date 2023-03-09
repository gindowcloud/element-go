<template>
  <el-container>
    <el-header>
      <view-logo :title="title" :homepage="homepage" :channels="channels" :collapse="show && collapse"
        :background-color="backgroundColor" :text-color="textColor" :activeTextColor="activeTextColor" :style="{ borderBottomColor: backgroundColor }"
        @toggle="open" />
      <div v-if="show" class="fold"><menu-unfold-one class="el-icon" :class="{ collapse }" @click="collapse = !collapse" /></div>
      <div><slot name="account" /></div>
    </el-header>
    <el-container class="content">
      <el-aside v-if="show" width="auto" :class="{ expand: !collapse }">
        <view-menu :menu="menu" :collapse="collapse" :background-color="backgroundColor" :text-color="textColor" :activeTextColor="activeTextColor" />
      </el-aside>
      <el-main><slot /></el-main>
    </el-container>
  </el-container>
  <!-- 频道抽屉 -->
  <el-drawer v-model="drawer" direction="ltr" size="210px" :show-close="false">
    <template #header><view-logo :title="title" :homepage="homepage" :channels="channels" @close="close" @toggle="close" /></template>
    <view-channels :channels="channels" @close="close" />
  </el-drawer>
</template>

<script setup lang="ts">
import type { Menu } from '../types'
import { ref } from 'vue'
import { ElContainer, ElHeader, ElAside, ElMain, ElDrawer } from 'element-plus'
import { MenuUnfoldOne } from '@icon-park/vue-next'
import viewLogo from './components/logo.vue'
import viewMenu from './components/menu.vue'
import viewChannels from './components/channels.vue'

defineProps({
  title: { type: String, default: 'LOGO' },
  homepage: { type: String, default: '/' },
  show: { type: Boolean, default: true },
  menu: { type: Array<Menu>, default: () => { return [] } },
  channels: { type: Array<Menu>, default: () => { return [] } },
  backgroundColor: { type: String },
  textColor: { type: String },
  activeTextColor: { type: String },
})

// 收缩菜单
const collapse = ref(false)

// 频道抽屉
const drawer = ref(false)
const open = () => {
  drawer.value = true
}

const close = () => {
  drawer.value = false
}
</script>

<style scoped>
.el-header { display: flex; justify-content: space-between; align-items: center; padding-left: 0; }
.el-header > div { display: flex; align-items: center; height: 60px; border-bottom: 1px solid #eee; }
.el-header .fold { padding-left: 20px; font-size: 16px; color: #ccc; flex: 1; }
.el-header .fold .el-icon { cursor: pointer; }
.el-header .fold .el-icon:hover { color: #000; }
.el-header .fold .el-icon.collapse { rotate: 180deg; }
.el-aside.expand { width: 200px; }
.el-main { padding: 40px; }
.el-main.wide { margin: 0 auto; max-width: 1600px; }
</style>
