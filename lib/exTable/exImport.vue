<template>
  <el-dialog :width="width" :title="showTitle" :visible.sync="visible">
    <el-upload
      drag multiple class="text-center"
      :action="action" :headers="headers"
      :show-file-list="false" :on-success="success">
      <i class="el-icon-upload" />
      <div class="el-upload__text" v-html="$t('importer.text')" />
      <div class="el-upload__tip" slot="tip"><slot /></div>
    </el-upload>
  </el-dialog>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    width: { type: String, default: '480px' },
    action: { type: String, default: '/' },
    headers: Object,
    title: String
  },
  data() {
    return {
      showTitle: this.title || this.$t('import'),
      visible: false,
    }
  },
  watch: {
    show() {
      this.visible = this.show
    },
    visible(val) {
      if (!val) this.close()
    }
  },
  methods: {
    // 关闭窗口
    close() {
      this.$emit("close")
    },
    success(ret) {
      this.$emit("import", ret)
    }
  }
}
</script>

<style scoped>
.el-upload__text,
.el-upload__tip { margin-top: 15px; }
</style>
