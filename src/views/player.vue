<template>
  <ex-page-header title="Player 视频" intro="好的内容往往从描述开始" />
  <!-- 演示 -->
  <div class="demo">
    <div class="player">
      <ex-player :player="!dialog" :height="400" :src="src" :poster="poster" />
    </div>
    <div class="title">弹窗模式</div>
    <div><el-switch v-model="dialog" /></div>
  </div>
  <!-- 属性 -->
  <h3 class="subject">属性说明</h3>
  <ex-table :data="props" :columns="propColumns" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElSwitch } from 'element-plus'
import { ExPageHeader, ExPlayer } from '../../packages/lib'
import { propColumns } from '../types'

const props = [
  { name: 'src', desc: '视频地址', type: 'number', default: '-' },
  { name: 'poster', desc: '视频封面', type: 'number', default: '-' },
  { name: 'width', desc: '宽度', type: 'string', default: '-' },
  { name: 'height', desc: '高度', type: 'string', default: '-'  },
  { name: 'player', desc: '播放器模式', type: 'boolean', default: 'False'  },
]

const src = '//d2zihajmogu5jn.cloudfront.net/sintel/master.m3u8'
const poster = '//d2zihajmogu5jn.cloudfront.net/sintel/poster.png'
const dialog = ref(true)
</script>

<style scoped>
.demo { display: flex; align-items: start; justify-content: center; flex-wrap: wrap; }
.demo > div { width: 100%; display: flex; align-items: start; justify-content: center; }
.demo .player { width: 100%; height: 420px; }
.demo .title { color: var(--el-text-color-disabled); margin: 5px; }
</style>