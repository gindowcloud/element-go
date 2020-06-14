<template>
  <el-dialog :width="width" :title="showTitle" :visible.sync="visible">
    <el-form ref="formEditor" :model="model" @submit.native.prevent label-position="left">
      <el-form-item v-for="(item, i) in datas" :key="i" :label="item.label" :prop="item.name" :required="item.required" label-width="200px">
        <!-- 开关组件 -->
        <el-switch v-model="model[item.name]" :readonly="item.readonly" v-if="item.type == 'switch'" />
        <!-- 下拉组件 -->
        <el-select v-model="model[item.name]" :placeholder="item.placeholder" :disabled="item.readonly" v-else-if="item.type == 'select'" :filterable="item.filterable">
            <el-option v-for="(j, i) in item.options" :key="i" :label="j.label" :value="j.value" :disabled="j.disabled" />
        </el-select>
        <!-- 级联选择 -->
        <el-cascader v-model="model[item.name]" :placeholder="item.placeholder" :disabled="item.readonly" v-else-if="item.type == 'cascader'" collapse-tags filterable :clearable="item.clearable" :options="item.options" :props="item.props" />
        <!-- 单选组件 -->
        <el-radio-group v-model="model[item.name]" :disabled="item.readonly" v-else-if="item.type == 'radio'">
            <el-radio v-for="(j, i) in item.options" :key="i" :label="j.value">{{ j.label }}</el-radio>
        </el-radio-group>
        <!-- 多选组件 -->
        <el-checkbox-group v-model="model[item.name]" :disabled="item.readonly" v-else-if="item.type == 'checkbox'">
            <el-checkbox v-for="(j, i) in item.options" :key="i" :label="j.value">{{ j.label }}</el-checkbox>
        </el-checkbox-group>
        <!-- 上传组件 -->
        <el-upload class="uploader" :show-file-list="false" :before-upload="beforeUpload" :on-success="upload"
            :action="item.action" :headers="{ Authorization: 'Bearer ' + item.token }" v-else-if="item.type == 'upload'">
            <el-image lazy v-if="model[item.name]" :src="model[item.name]" fit="cover" />                    
            <i class="el-icon-plus" v-else/>
        </el-upload>
        <!-- 日期组件 -->
        <el-date-picker v-model="model[item.name]" :readonly="item.readonly" type="date" v-else-if="item.type == 'date'" />
        <!-- 多行文本 -->
        <el-input type="textarea" v-model="model[item.name]" :placeholder="item.placeholder" :readonly="item.readonly" v-else-if="item.type == 'textarea'" />
        <!-- 文本组件 -->
        <el-input v-model="model[item.name]" :placeholder="item.placeholder" :readonly="item.readonly" @keyup.enter.native="submit('form')" v-else/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">{{ $t('cancel') }}</el-button>
      <el-button @click="submit" type="primary">{{ $t('save') }}</el-button>
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
  },
  data() {
    return {
      showTitle: this.title || this.$t('edit'),
      visible: false,
    }
  },
  computed: {
    datas() {
      return this.items.map(j => {
        if (j.type == 'switch') {
          this.model[j.name] = this.model[j.name] == 0 ? false : true
        } else if (j.type == 'upload') { // 上传组件, 网址替换模板变量
          let matched = j.url.match(/\{([^}]+)\}/)
          j.action = matched ? j.url.replace(matched[0], this.model[matched[1]]) : j.url
        }
        return j
      })
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
    // 重置表单
    cancel() {
      this.$refs['formEditor'].resetFields()      
      this.$emit("cancel")
      this.close()
    },
    // 提交表单
    submit() {
      this.$refs['formEditor'].validate((valid) => {
        if (!valid) return false
        this.$emit("submit")
      })
    },
    // 上传图片
    upload(ret) {
      this.$emit("upload", ret)
    },
    // 校验上传
    beforeUpload(file) {
      const isType = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isType) this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      if (!isLt2M) this.$message.error('上传头像图片大小不能超过 2MB!')
      return isType && isLt2M;
    }
  }
}
</script>

<style scoped>
.el-select, .el-cascader, .el-date-editor { width: 100%; }
.uploader { height: 120px; }
.uploader >>> .el-upload { position: relative; overflow: hidden; cursor: pointer; }
.uploader >>> .el-upload:hover { border-color: #409EFF; }
.uploader .el-icon-plus { width: 118px; height: 118px; line-height: 118px; text-align: center; font-size: 16px; color: #999; border: 1px dashed #eee; }
.uploader .el-image { width: 120px; height: 120px; }
</style>
