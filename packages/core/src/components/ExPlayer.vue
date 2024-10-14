<template>
  <!-- 直接播放 -->
  <video-player v-if="player" :src="src" :poster="poster" :width="width" :height="height" controls />
  <!-- 弹窗模式 -->
  <span v-else class="shrink">
    <PlayOne class="el-icon" @click.stop="play" />
    <el-image fit="cover" :src="poster" :style="{ width: width + 'px', height: height + 'px' }" />
    <teleport to="body">
      <el-dialog v-model="show" draggable destroy-on-close title="视频播放器" width="800px">
        <div class="player">
          <video-player v-if="show" :src="src" :poster="poster" :width="width" :height="height" controls autoplay />
        </div>
      </el-dialog>
    </teleport>
  </span>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ElImage, ElDialog } from 'element-plus'
import { PlayOne } from '@icon-park/vue-next'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

defineProps({
  src: { type: String, required: true },
  poster: { type: String, default: null },
  width: { type: Number },
  height: { type: Number },
  player: { type: Boolean, default: false }
})

const show = ref(false)
const play = () => {
  show.value = true
}

onMounted(() => {
  console.log('onMounted')
})

onUnmounted(() => {
  console.log('onUnmounted')
})
</script>

<style scoped>
.shrink { position: relative; display: inline-block; }
.shrink .el-icon {
  position: absolute; left: calc(50% - 15px); top: calc(50% - 15px); font-size: 30px;
  background-color: rgb(0 0 0 / 50%); padding: 5px; border-radius: 50%;
  color: #fff; opacity: .75; z-index: 999; cursor: pointer;
}
.player { display: flex; align-items: center; justify-content: center; }
</style>
