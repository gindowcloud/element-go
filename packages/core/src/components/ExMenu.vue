<template>
  <el-menu class="ex-menu" router unique-opened :default-active="prefix + defaultActive" :collapse="collapse" :collapse-transition="false"
    :background-color="backgroundColor" :text-color="textColor" :active-text-color="activeTextColor" :style="{ borderRightColor: backgroundColor }">
    <template v-for="(item, key) in menu">
      <!-- 多级菜单 -->
      <el-sub-menu v-if="item.children && item.children.length" :key="key" :index="prefix + item.path">
        <template #title>
          <el-icon v-if="item.icon"><component :is="item.icon" :stroke-width="3" /></el-icon>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item v-for="(child, key) in item.children" :key="key" :index="child.external ? '#' : prefix + child.path" @click="open(child)">
          <span>{{ child.label }}</span>
        </el-menu-item>
      </el-sub-menu>
      <!-- 一级菜单 -->
      <el-menu-item v-else :key="item.path" :index="item.external ? '#' : prefix + item.path" @click="open(item)">
        <el-icon v-if="item.icon"><component :is="item.icon" :stroke-width="3" /></el-icon>
        <span>{{ item.label }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import type { Menu } from '../types'
import { ElIcon, ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'

const props = defineProps({
  prefix: { type: String, default: '' },
  menu: { type: Array<Menu>, default: () => { return [] } },
  collapse: { type: Boolean, default: false },
  backgroundColor: { type: String },
  textColor: { type: String },
  activeTextColor: { type: String },
  defaultActive: { type: String }
})

const open = (item: Menu) => {
  if (item.external) window.open(props.prefix + item.path)
}
</script>

<style scoped>
.el-menu { --el-menu-level-padding: 28px; }
.el-menu .el-sub-menu :deep(.el-sub-menu__icon-arrow) { color: var(--el-text-color-placeholder); }
</style>
