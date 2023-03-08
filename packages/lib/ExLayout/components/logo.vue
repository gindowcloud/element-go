<template>
  <div class="logo" :class="{ collapse }">
    <application-menu v-if="channels.length" class="icon" @click="emit('toggle')" />
    <span v-if="!collapse" class="title" @click="home">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
import type { Menu } from '../../types'
import { useRouter } from 'vue-router'
import { ApplicationMenu } from '@icon-park/vue-next'

const props = defineProps({
  title: { type: String },
  homepage: { type: String, default: '/' },
  channels: { type: Array<Menu>, default: () => { return [] } },
  collapse: { type: Boolean, default: false }
})

const emit = defineEmits(['toggle', 'close'])

const router = useRouter()
const home = () => {
  router.push(props.homepage)
  emit('close')
}
</script>

<style scoped>
.logo { display: flex; align-items: center; font-size: 16px; width: 180px; color: #111; }
.logo .icon { display: flex; align-items: center; width: 18px; height: 18px; }
.logo .title { margin-left: 6px; cursor: pointer; }
.collapse { width: 35px; }
</style>
