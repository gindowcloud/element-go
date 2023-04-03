<template>
  <div class="ex-page-header">
    <el-space size="large" class="space" spacer="|">
      <el-button v-if="back" link :icon="ArrowLeft" @click="goBack">返回</el-button>
      <div class="info">
        <div class="title">{{ title }}</div>
        <div v-if="intro" class="intro" v-html="intro" />
        <div v-else-if="$slots.intro" class="intro"><slot name="intro" /></div>
      </div>
    </el-space>
    <div v-if="$slots.default && alive" class="link"><slot /></div>
  </div>
</template>

<script setup lang="ts">
import { ElSpace, ElButton } from 'element-plus'
import { ArrowLeft } from '@icon-park/vue-next'

defineProps({
    title: { type: String, default: '' },
    intro: { type: String, default: '' },
    back: { type: Boolean, default: () => { return false } },
    alive: { type: Boolean, default: () => { return true } }
})

const goBack = () => history.back()
</script>

<style scoped>
.ex-page-header { display: flex; justify-content: space-between; align-items: center; min-height: 48px; padding-bottom: 12px; margin-bottom: 40px; border-bottom: 1px solid #eee; }
.ex-page-header .back { font-size: 15px; }
.ex-page-header .info { line-height: 1.5; }
.ex-page-header .info .title { font-size: 20px; font-weight: 600; }
.ex-page-header .info .intro { font-size: 14px;  color: #ccc; }
.ex-page-header .link { position: relative; }
</style>
