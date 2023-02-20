<template>
  <div class="loading" :style="{ padding, fontSize }">
    <el-icon class="is-loading"><Loading /></el-icon>
  </div>
</template>

<script setup lang="ts">
import { ElIcon } from 'element-plus'
import { Loading } from '@element-plus/icons'

defineProps({
  fontSize: { type: String, default: '20px' },
  padding: { type: String, default: '20px' }
})
</script>

<style scoped>
.loading { color: #ccc; text-align: center; }
</style>
