<template>
  <el-menu router unique-opened v-bind="$attrs" :default-active="$route.path" :collapse="collapse" :collapse-transition="false"
    :background-color="backgroundColor" :text-color="textColor" :active-text-color="activeTextColor" :style="{ borderRightColor: backgroundColor }">
    <template v-for="(item, key) in menu">
      <!-- 多级菜单 -->
      <el-sub-menu v-if="item.children && item.children.length" :key="key" :index="item.path">
        <template #title>
          <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item v-for="(child, key) in item.children" :key="key" :index="child.external ? '#' : child.path" @click="open(child)">
          <span>{{ child.title }}</span>
          <el-icon class="icon-external" v-if="child.external"><LinkTwo /></el-icon>
        </el-menu-item>
      </el-sub-menu>
      <!-- 一级菜单 -->
      <el-menu-item v-else :key="item.path" :index="item.external ? '#' : item.path" @click="open(item)">
        <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
        <span>{{ item.title }}</span>
        <el-icon class="icon-external" v-if="item.external"><LinkTwo /></el-icon>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import type { Menu } from '../../types'
import { ElIcon, ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import { LinkTwo } from '@icon-park/vue-next'

defineProps({
  menu: { type: Array<Menu>, default: () => { return [] } },
  collapse: { type: Boolean, default: false },
  backgroundColor: { type: String },
  textColor: { type: String },
  activeTextColor: { type: String },
})

const open = (item: Menu) => {
  if (item.external) window.open(item.path)
}
</script>

<style scoped>
.el-menu {
  height: 100%;
  min-height: calc(100vh - 120px);
  padding-top: 20px;
  border-top: 1px solid var(--el-border-color);
  border-right-width: 0;
  --el-menu-bg-color: var(--el-fill-color-light);
  --el-menu-item-font-size: 15px;
  /* --el-menu-base-level-padding: 16px; */
  --el-menu-icon-width: 25px;
  --el-menu-level-padding: 30px;
  overflow: hidden;
}
.el-menu .el-sub-menu :deep(.el-sub-menu__icon-arrow) { right: 20px; color: var(--el-text-color-placeholder); }
.el-menu .icon-external { margin-left: 5px; color: var(--el-text-color-placeholder); }
</style>
