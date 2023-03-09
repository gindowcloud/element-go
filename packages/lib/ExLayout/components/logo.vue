<template>
  <div class="logo" :class="{ collapse }" :style="{ backgroundColor, color: textColor }">
    <application-menu v-if="channels.length" class="icon" @click="emit('toggle')" />
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
.el-header .logo { padding-left: 20px; }
.logo { display: flex; align-items: center; height: 60px; font-size: 16px; width: 179px; color: #111; opacity: 0.96; }
.logo .icon { display: flex; align-items: center; width: 18px; height: 18px; margin-right: 5px; }
.logo .title { display: flex; align-items: center; justify-content: center; cursor: pointer; text-decoration: none; color: #111; }
.logo .word { width: 15px; } 
.collapse { width: 33px; }
</style>
