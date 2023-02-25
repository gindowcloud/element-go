<template>
  <div class="loading" :style="{ padding, fontSize }">
    <Loading class="el-icon is-loading" />
  </div>
</template>

<script setup lang="ts">
import { Loading } from '@icon-park/vue-next'

defineProps({
  fontSize: { type: String, default: '20px' },
  padding: { type: String, default: '20px' }
})
</script>

<style scoped>
.loading { color: #ccc; text-align: center; }
</style>
