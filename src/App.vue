<template>
  <div>
    <ex-table ref="table"
      :title="title"
      :params="params" :filter="filter" :loading="loading" @search="onSearch" @page-change="onPageChange"
      :total="total" v-model="data" allow-remove allow-create allow-export @remove="onRemove" @create="onCreate" @export="onExport"
      :viewer="viewer" :editor="editor" @edit-submit="onEditSubmit"
      >
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="注册日期" prop="date" />
    </ex-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      states: [
        { label: '禁用', value: 1 },
        { label: '正常', value: 2 }
      ],
      title: '用户列表',
      params: {
        state: '',
        q: '',
        date: []
      },
      data: [
        { state: 1, name: 'Jack Chen', phone: '13366668888', date: '2020-1-1' },
        { state: 2, name: 'Jonson Li', phone: '13800009999', date: '2020-2-1' },
      ],
      total: 0,
      loading: false,
    }
  },
  computed: {
    // 搜索表单参数
    filter() {
      return [
        { name: 'state', label: '状态', type: 'select', options: this.states },
        { name: 'date', label: ['起始日期', '结束日期'], type: 'daterange' },
        { name: 'q', label: '搜索关键词' },
      ]
    },
    // 查看表单参数
    viewer() {
      return [
        { name: 'name' , label: '姓名' },
        { name: 'phone', label: '电话' },
        { name: 'state', label: '状态', type: 'select', options: this.states },
      ]
    },
    // 编辑表单参数
    editor() {
      return [
        { name: 'name', label: '姓名' },
        { name: 'phone', label: '电话', readonly: true },
      ]
    }
  },
  methods: {
    getData() {
      this.loading = true
      setTimeout(() => {
        this.total = 100
        this.loading = false
      }, 250)
    },
    onSearch() {
      this.params.page = 1
      this.$message('On Search');
      this.getData()
    },
    onPageChange(page) {
      this.params.page = page
      this.$message('On Page Changed');
      this.getData()
    },
    onEditSubmit() {
      let $ref = this.$refs['table']
      this.$message('On Modify');
      $ref.onEditClose()
    },
    onRemove (index, row) {
      let $ref = this.$refs['table']
      this.$message('On Remove');
      $ref.onRemove(index)
    },
    onCreate() {
      this.$message('On Create');
    },
    onExport() {
      this.$message('On Export');
    }
  }
}
</script>
