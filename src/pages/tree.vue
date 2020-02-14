<template>
  <div class="demo">
    <ex-tree      
      ref="tree"
      :props="props" @load="load" :loading="loading"
      :editor="editor" editTitle="添加/编辑目录"
      allow-create @submit="submit"
      allow-remove @remove="remove"      
      />
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: { isLeaf: 'isLeaf' },
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
      this.$message('On Load')
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
      this.$message('On Remove')
      let $ref = this.$refs['tree']
      $ref.destroy(node)
    },
    submit(data, isCreate) {
      let $ref = this.$refs['tree']
      if (isCreate) $ref.store(data)
      $ref.editClose()
    }
  }
}
</script>
