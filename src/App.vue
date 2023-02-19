<template>
  <div class="title">Element Go</div>
  <div><ex-pagination :total="100" /></div>
  <div><ex-loading /></div>
</template>

<script lang="ts" setup>
import { ExLoading, ExPagination } from '../lib'
</script>

<style scoped>
.title { display: flex; justify-content: center; align-items: center; height: 100px; }
</style>
