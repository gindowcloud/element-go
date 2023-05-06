<template>
  <div class="logo" :class="{ collapse }" :style="{ backgroundColor, color: textColor }">
    <span v-if="channels.length" class="icon"><application-menu @click="emit('toggle')" /></span>
    <router-link v-else-if="collapse" class="title word" :to="homepage" :style="{ color: textColor }" @click="home">{{ title?.substring(0, 1) }}</router-link><!-- 收缩且无频道 -->
    <router-link v-if="!collapse" class="title" :to="homepage" :style="{ color: textColor }" @click="home">{{ title }}</router-link>
  </div>
</template>

<script setup lang="ts">
import type { Menu } from '../../types'
import { ApplicationMenu } from '@icon-park/vue-next'

const props = defineProps({
  title: { type: String },
  homepage: { type: String, default: '/' },
  channels: { type: Array<Menu>, default: () => { return [] } },
  collapse: { type: Boolean, default: false },
  backgroundColor: { type: String },
  textColor: { type: String },
  activeTextColor: { type: String },
})

const emit = defineEmits(['toggle', 'close'])

const home = () => {
  emit('close')
}
</script>

<style scoped>
.el-header .logo { padding-left: 20px; height: 60px; opacity: 0.9; }
.logo { display: flex; align-items: center; font-size: 16px; width: 180px; color: var(--el-text-color-primary); }
.logo .icon { display: flex; align-items: center; justify-content: center; width: 25px; }
.logo .icon .i-icon { display: flex; align-items: center; }
.logo .title { display: flex; align-items: center; justify-content: center; cursor: pointer; text-decoration: none; color: var(--el-text-color-primary); margin-left: 5px; }
.logo .word { width: 26px; margin-left: 0px; } 
.collapse { width: 45px; }
</style>
