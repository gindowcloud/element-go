<template>
  <el-menu router unique-opened v-bind="$attrs" :default-active="$route.path" :collapse="collapse" :collapse-transition="false">
    <template v-for="(item, key) in menu">
      <!-- 多级菜单 -->
      <el-sub-menu v-if="item.children && item.children.length" :key="key" :index="item.path">
        <template #title>
          <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item v-for="(child, key) in item.children" :key="key" :index="child.path">{{ child.title }}</el-menu-item>
      </el-sub-menu>
      <!-- 一级菜单 -->
      <el-menu-item v-else :key="item.path" :index="item.path">
        <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import type { Menu } from '../../types'
import { ElIcon, ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'

defineProps({
  menu: { type: Array<Menu>, default: () => { return [] } },
  collapse: { type: Boolean, default: false },
})
</script>

<style scoped>
.el-menu {
  height: 100%;
  min-height: calc(100vh - 60px);
  padding-top: 20px;
  border-right-color: #eee;
  --el-menu-bg-color: #f9f9f9;
  --el-menu-item-font-size: 15px;
  /* --el-menu-base-level-padding: 16px; */
  --el-menu-icon-width: 25px;
  --el-menu-level-padding: 30px;
}
.el-sub-menu :deep(.el-sub-menu__icon-arrow) { right: 20px; color: #aaa; }
</style>
