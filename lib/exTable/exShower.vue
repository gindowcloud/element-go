<template>
  <el-dialog :fullscreen="!width" :width="width" :title="showTitle" :visible.sync="visible">
    <div class="dialog-content">
      <el-form size="small" :label-position="labelPosition">
        <el-row :gutter="20">
          <el-col :md="span" v-for="(item, key) in datas" :key="key">
            <el-form-item :label="item.label + ':'" :label-width="labelWidth">
              <el-image lazy class="shrink" :src="item.value" v-if="item.type == 'image'" :style="'width:' + (item.width || this.imageSize) + '; height:' + (item.height || this.imageSize) + ';'" />
              <div v-else>{{ item.value || '-'  }}</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer">
      <el-button @click="close" type="primary">{{ $t('okay') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    title: String,
    width: String,
    items: Array,
    model: Object,
    columns: { type: Number, default: 2 },
    labelPosition: String,
    labelWidth: String,
  },
  data() {
    return {
      visible: false,
      showTitle: this.title || this.$t('view'),
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
    },
    span() {
      return 24 / this.columns
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
.is-fullscreen .dialog-content { margin: 0 -10px; padding: 0 10px; height: calc(100vh - 185px); overflow: scroll; }
</style>
