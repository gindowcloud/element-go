<template>
  <el-empty>
    <template #image>
      <TopicDiscussion :size="72" :stroke-width="1" />
    </template>
  </el-empty>
</template>

<script setup lang="ts">
import { TopicDiscussion } from '@icon-park/vue-next'
</script>

<style scoped>
.el-empty { --el-empty-image-width: 72px; }
</style>
