<template>
  <div class="ex-view" v-loading="loading">
    <el-form size="mini">
      <h4 v-if="title">{{ title }}</h4>
      <el-row>
        <el-col :md="span" v-for="(item, key) in value" :key="key">
          <el-form-item :label="key+':'">{{ item }}</el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'exView',
  props: {
    title: String,
    value: Object,
    loading: Boolean,
    columns: { type: Number, default: 2 }
  },
  computed: {
    span() {
      return 24 / this.columns
    }
  }
}
</script>


<style scoped>
.ex-view .el-form { padding: 20px; padding-bottom: 0px; background-color: #fff; }
.ex-view h4 { margin-top: 0; }
</style>
