<template>
  <div class="loading" :style="{ padding, fontSize }">
    <Loading class="el-icon is-loading" />
  </div>
</template>

<script setup lang="ts">
import { Loading } from '@icon-park/vue-next'

defineProps({
  padding: { type: String, default: '20px' },
  fontSize: { type: String, default: '20px' },
})
</script>

<style scoped>
.loading { color: var(--el-text-color-placeholder); text-align: center; }
</style>
