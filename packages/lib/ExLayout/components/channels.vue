<template>
   <el-menu router :default-active="route.path">
    <el-menu-item v-for="(item, key) in channels" :key="key" :index="item.path" @click="emit('close')">
      <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
      <span>{{ item.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import type { Menu } from '../../types'
import { useRoute } from 'vue-router'
import { ElIcon, ElMenu, ElMenuItem } from 'element-plus'

defineProps({
  channels: { type: Array<Menu>, default: () => { return [] } }
})

const emit = defineEmits(['close'])

const route = useRoute()
</script>

<style scoped>
.el-menu { border-right: none; }
.el-menu .el-menu-item { font-size: 16px; }
</style>
