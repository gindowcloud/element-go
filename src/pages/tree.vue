<template>
  <div class="demo">
    <ex-tree      
      ref="table" v-model="data" :loading="loading" @load="load"
      :editor="editor" @edit-submit="editSubmit"
      allow-remove @remove="remove"
      allow-create @create="create"
      allow-drag @drag="drag"
      />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      loading: false,
    }
  },
  computed: {
    // 编辑表单参数
    editor() {
      return [
        { name: 'name', label: '姓名' },
        { name: 'phone', label: '电话', readonly: true },
      ]
    }
  },
  methods: {
    load(node, resolve) {
      this.loading = true
      this.$message('On Load')
      setTimeout(() => {
        resolve([
          { label: '一级 1', children: [{label: '二级 1-1', children: [{label: '三级 1-1-1'}]}] },
          { label: '一级 2', children: [{label: '二级 2-1', children: [{label: '三级 2-1-1'}]}, {label: '二级 2-2', children: [{label: '三级 2-2-1'}]}] },
          { label: '一级 3', children: [{label: '二级 3-1', children: [{label: '三级 3-1-1'}]}, { label: '二级 3-2', children: [{label: '三级 3-2-1'}]}] }
        ])
        this.loading = false
      }, 250)      
    },
    editSubmit() {
      let $ref = this.$refs['table']
      this.$message('On Modify')
      $ref.editClose()
    },
    remove (index) {
      let $ref = this.$refs['table']
      this.$message('On Remove')
      $ref.remove(index)
    },
    create() {
      this.$message('On Create')
    },
    drag() {
      this.$message('On Drag')
    }
  }
}
</script>
