<template>
  <el-dialog width="80%" :title="title" :visible.sync="visible">
    <el-row v-for="(item, i) in datas" :key="i">
      <el-col :md="4">{{ item.label || '&nbsp;' }}</el-col>
      <el-col :md="20">
        <el-image lazy class="shrink" :src="item.value" v-if="item.type == 'image'" :style="'width:' + (item.width || this.imageSize) + '; height:' + (item.height || this.imageSize) + ';'" />
        <div v-else>{{ item.value || '-' }}</div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close" type="primary">{{ $t('lang.okay') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: { default: 'View' },
    show: { default: false },
    items: Array,
    model: Object
  },
  data() {
    return {
      visible: false,
      imageSize: '100px', // 默认图片尺寸
    }
  },
  computed: {
    datas() {
      return this.items.map(j => {
        if (j.name) j.value = this.model[j.name]
        if (j.type == 'select') {
          let data = j.options.filter(m => m.value == j.value)
          j.value = data[0] ? data[0].label : null
        }
        return j
      })
    }
  },
  watch: {
    show() {
      this.visible = this.show
    },
    visible (val) {
      if (!val) this.close() // 关闭窗口
    }
  },
  methods: {
    close() {
      this.$emit("close")
    }
  }
}
</script>

<style scoped>
.el-row  { border-bottom: 1px solid #eee; padding: 8px; }
</style>
