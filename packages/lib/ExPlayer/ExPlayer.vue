<template>
  <!-- 直接播放 -->
  <video-play v-if="player" :poster="poster" v-bind="options" :style="{ width, height }" />
  <!-- 弹窗模式 -->
  <span v-else class="shrink">
    <PlayOne class="el-icon" @click.stop="play" />
    <el-image fit="cover" :src="poster" :style="{ width, height }" />
    <teleport to="body">
      <el-dialog v-model="dialogShow" draggable destroy-on-close title="视频播放器" width="800px">
        <video-play v-if="dialogShow" :poster="poster" v-bind="options" />
      </el-dialog>
    </teleport>
  </span>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ElImage, ElDialog } from 'element-plus'
import { PlayOne } from '@icon-park/vue-next'
import VideoPlay from 'vue3-video-play'
import 'vue3-video-play/dist/style.css'

const props = defineProps({
  src: { type: String, required: true },
  poster: { type: String, default: null },
  width: { type: String, default: null },
  height: { type: String, default: null },
  player: { type: Boolean, default: false }
})

const dialogShow = ref(false)
const options = computed(() => {
  return {
    src: props.src,
    width: props.player ? props.width : null,
    height: props.player ? props.height : null,
    autoPlay: props.player ? false : true
  }
})

const play = () => {
  dialogShow.value = true
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
</style>
