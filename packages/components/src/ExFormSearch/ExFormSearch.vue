<template>
  <el-form ref="form" v-bind="$attrs" inline :model="model" label-suffix=":" @submit.prevent="search(form)">
    <slot />
    <el-form-item v-if="showButton">
      <el-button type="primary" native-type="submit">搜索</el-button>
      <el-button @click="reset(form)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { ref, onMounted } from 'vue'
import { ElForm, ElFormItem, ElButton } from 'element-plus'

const props = defineProps({
  model: { type: Object, default: () => { return {} } },
  showButton: { type: Boolean, default: true },
})

const emit = defineEmits<{
  (event: 'search'): void
  (event: 'reset'): void
}>()

const form = ref<FormInstance>()

const search = (form: FormInstance | undefined) => {
  if (!form) return
  console.log('SEARCH', props.model)
  emit('search')
}

const reset = (form: FormInstance | undefined) => {
  if (!form) return
  console.log('RESET', props.model)
  form.resetFields()
  emit('reset')
}
</script>

<style scoped>
.el-form { margin-bottom: 22px; }
.el-form :deep(.el-form-item) { display: inline-block; margin-right: 12px; vertical-align: bottom; }
.el-form :deep(.el-form-item__label) { color: #000; }
.el-form :deep(.el-input),
.el-form :deep(.el-cascader .el-input) { width: 160px; }
.el-form :deep(.el-range-editor) { width: 240px; }
</style>
