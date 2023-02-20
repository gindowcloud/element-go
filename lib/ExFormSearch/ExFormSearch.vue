<template>
  <el-form v-bind="$attrs" ref="form" inline :model="model" @submit.prevent="search">
    <slot />
    <el-form-item>
      <el-button type="primary" native-type="submit">搜索</el-button>
      <el-button @click="reset(form)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { ref } from 'vue'
import { ElForm, ElFormItem, ElButton } from 'element-plus'

const props = defineProps({
  model: { type: Object, default: () => { return {} } }
})

const emit = defineEmits<{
  (event: 'search'): void
  (event: 'reset'): void
}>()

const form = ref<FormInstance>()
const search = () => {
  console.log(props.model)
  emit('search')
}
const reset = (form: FormInstance | undefined) => {
  if (!form) return
  console.log(props.model)
  form.resetFields()
  emit('reset')
}
</script>

<style scoped>
.el-form :deep(.el-form-item) { margin-right: 12px; }
.el-form :deep(.el-form-item__label) { color: #999; }
.el-form :deep(.el-input),
.el-form :deep(.el-cascader .el-input) { width: 160px; }
</style>
