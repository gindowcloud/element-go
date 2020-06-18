<template>
  <el-form ref="formSearch" :model="value" :inline="true" size="small" @submit.native.prevent>
    <el-form-item v-for="(item, index) in filter" :key="index" :prop="item.name">
      <!-- 下拉输入 -->      
      <el-select v-if="item.type == 'select'" v-model="value[item.name]" :placeholder="item.label">
        <el-option v-for="(j, i) in item.options" :key="i" :label="j.label" :value="j.value" />
      </el-select>
      <!-- 日期输入 -->
      <el-date-picker v-else-if="item.type == 'date'" type="date" v-model="value[item.name]" :placeholder="item.label" :editable="false" />
      <!-- 日期区间 -->
      <el-date-picker v-else-if="item.type == 'daterange'" type="daterange" v-model="value[item.name]" :start-placeholder="item.label[0]" :end-placeholder="item.label[1]" :editable="false" range-separator="-" value-format="yyyy-MM-dd" />
      <!-- 普通输入 -->
      <el-input v-else v-model="value[item.name]" :placeholder="item.label" @keyup.enter.native="search" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">{{ $t("search") }}</el-button>
      <el-button @click="reset">{{ $t("reset") }}</el-button>
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
    search() {
      this.$emit("search")
    },
    reset() {
      this.$refs['formSearch'].resetFields()
      this.$emit("reset")
    }
  }
}
</script>

<style scoped>
.el-select, .el-input { width: 140px; }
.el-range-editor { width: 240px; }
@media screen and (max-width: 991px) { /* 中型以下屏幕 */
  .el-select, .el-input { width: 120px; }
}
</style>
