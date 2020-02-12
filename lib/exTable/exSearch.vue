<template>
  <el-form ref="formSearch" :model="value" :inline="true" size="small">
    <el-form-item v-for="(item, index) in filter" :key="index" :prop="item.name">
      <el-select v-if="item.type == 'select'" v-model="value[item.name]">
        <el-option v-for="(j, i) in item.options" :key="i" :label="j.label" :value="j.value" />
      </el-select>
      <el-date-picker v-else-if="item.type == 'date'" type="date" v-model="value[item.key]" :placeholder="item.label" :editable="false" />
      <el-date-picker v-else-if="item.type == 'daterange'" type="daterange" v-model="value[item.key]" :start-placeholder="item.label[0]" :end-placeholder="item.label[1]" :editable="false" range-separator="-" value-format="yyyy-MM-dd" />
      <el-input v-else v-model="value[item.name]" :placeholder="item.label" @keyup.enter.native="onSearch" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSearch">{{ $t("lang.search") }}</el-button>
      <el-button @click="onReset">{{ $t("lang.reset") }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    value: Object,
    filter: Array,
  },
  methods: {
    onSearch() {
      this.$emit("search")
    },
    onReset() {
      this.$refs['formSearch'].resetFields()
      this.$emit("reset")
    }
  }
}
</script>

<style scoped>
.el-select { width: 159px; }
.el-range-editor { width: 240px; }
</style>
