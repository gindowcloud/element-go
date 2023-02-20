<template>
  <!-- 数据区 -->
  <el-table v-bind="$attrs">
    <slot />
  </el-table>
  <!-- 分页区 -->
  <ex-pagination v-if="total" :total="total" />
</template>

<script setup lang="ts">
import { ElTable } from 'element-plus'
import ExPagination from '../ExPagination'

defineProps({
  total: { type: Number, default: 0 }
})
</script>

<style scoped>
</style>
