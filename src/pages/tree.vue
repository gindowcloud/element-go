<template>
  <div class="demo">
    <ex-tree ref="tree" title="ExTree"
      :props="props" @load="load" :loading="loading"
      :editor="editor" editTitle="添加/编辑目录"
      allow-create
      allow-append @submit="submit"
      allow-remove @remove="remove"
    >
    <i class="el-icon-success color-green" slot="icon" />
    <span slot="sort">sort</span>
    </ex-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {isLeaf: 'isLeaf', nodeKey: 'id'},
      data: [
        { label: '一级 1', children: [{label: '二级 1-1', children: [{label: '三级 1-1-1'}]}] },
        { label: '一级 2', children: [{label: '二级 2-1', children: [{label: '三级 2-1-1'}]}, {label: '二级 2-2', children: [{label: '三级 2-2-1'}]}] },
        { label: '一级 3', children: [{label: '二级 3-1', children: [{label: '三级 3-1-1'}]}, { label: '二级 3-2', children: [{label: '三级 3-2-1'}]}] }
      ],
      loading: false,
    }
  },
  computed: {
    // 编辑表单参数
    editor() {
      return [
        { name: 'label', label: '目录名称', required: true }
      ]
    }
  },
  methods: {
    load(node, resolve) {
      this.loading = true
      setTimeout(() => {
        resolve([
          { label: '一级 3' },
          { label: '一级 4' },
          { label: '一级 5', isLeaf: true }
        ])
        this.loading = false
      }, 250)      
    },
    // 删除节点
    remove(node) {
      this.$message.success('Remove')
      let $ref = this.$refs['tree']
      $ref.destroy(node)
    },
    submit(data, parent) {
      let $ref = this.$refs['tree']
      parent.id ? $ref.store(data, parent) : $ref.parentAppend(data)
      $ref.editClose()
    }
  }
}
</script>
