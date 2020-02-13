<template>
  <div class="ex-tree">
    <el-tree
      :data="data"
      icon-class="el-icon-arrow-right"
    >
      <div class="node" slot-scope="{ node, data }">
        <span>{{ data.label }}</span>
      </div>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'exTree',
  data() {
    return {
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }]
    }
  },
  created() {
    console.log(this.data)
  }
}
</script>

<style scoped>
.ex-tree { padding: 20px; }
.ex-tree >>> .el-tree-node__content { height: 40px; line-height: 40px; border-bottom: 1px solid #f6f6f6; }
</style>