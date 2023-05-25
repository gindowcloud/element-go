<template>
  <el-container>
    <el-header>
      <view-logo :title="title" :homepage="homepage" :channels="channels" :collapse="show && collapse"
        :background-color="backgroundColor" :text-color="textColor" :activeTextColor="activeTextColor"
        @toggle="open" />
      <div><slot name="account" /></div>
    </el-header>
    <el-container class="content">
      <el-aside v-if="show" width="auto" :class="{ expand: !collapse }">
        <view-menu :menu="menu" :collapse="collapse" :background-color="backgroundColor" :text-color="textColor" :activeTextColor="activeTextColor" :style="{ borderTopColor: backgroundColor }" />        
        <el-affix position="bottom">
          <div class="folder">
            <menu-fold-one class="el-icon" @click="collapse = !collapse" />
          </div>
        </el-affix>
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
import { ElContainer, ElHeader, ElAside, ElMain, ElDrawer, ElAffix } from 'element-plus'
import { MenuFoldOne } from '@icon-park/vue-next'
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
.el-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--el-border-color); margin-bottom: -1px; padding-left: 0; }
.el-aside { overflow: hidden; border-right: 1px solid var(--el-border-color); background-color: var(--el-fill-color-light); }
.el-aside .el-affix { width: 65px !important; }
.el-aside .folder { display: flex; align-items: center; justify-content: center; height: 60px; padding: 0 20px; background-color: var(--el-fill-color-light); }
.el-aside .folder .el-icon { font-size: 18px; cursor: pointer; }
.el-aside.expand { min-width: 200px; }
.el-aside.expand .el-affix { width: 100% !important; }
.el-aside.expand .folder { justify-content: right; }
.el-aside.expand .folder .el-icon { rotate: 180deg; }
.el-main { padding: 40px; }
.el-main.wide { margin: 0 auto; max-width: 1600px; }
</style>
