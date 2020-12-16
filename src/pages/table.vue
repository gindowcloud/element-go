<template>
  <div class="ex-demo">
    <ex-table ref="table" title="ExTable"
      :params="params" :filter="filter" @search="search" @page-change="pageChange"
      :total="total" :loading="loading" v-model="data"
      :shower="shower" show-title="View Data" allow-show @show="show"
      :editor="editor" edit-title="Edit Data" allow-edit @edit="edit" @update="update"
      :creator="editor" allow-create @create="create" @store="store"
      allow-remove @remove="remove"
      allow-import @import="uploaded" import-sample="/upload-sample.xlsx"
      allow-export @export="download"
      @selection-change="selectionChange"
      >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="姓名" width="80" prop="name" />
      <el-table-column label="电话" width="140" prop="phone" />
      <el-table-column label="地区" prop="county" />
      <el-table-column label="日期" width="120" prop="date" align="right" />
      <el-dropdown-item slot="action" @click.native="$router.push('/view')">Detail</el-dropdown-item>
      <el-button slot="button" size="small" type="text" icon="el-icon-star-off">Star</el-button>
      <el-button slot="append" size="small" :disabled="!selected.length" @click="deleteSelected">Delete</el-button>
    </ex-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      states: [
        { label: '禁用', value: 0 },
        { label: '正常', value: 1 }
      ],
      params: {
        size: 24,
        state: '',
        q: '',
        date: []
      },
      data: [],
      selected: [],
      total: 0,
      loading: false,
    }
  },
  computed: {
    // 搜索表单参数
    filter() {
      return [
        { name: 'state', label: '用户状态', type: 'select', options: this.states },
        { name: 'date', label: ['起始日期', '结束日期'], type: 'daterange' },
        { name: 'q', label: '搜索关键词' },
      ]
    },
    // 查看表单参数
    shower() {
      return [
        { name: 'name' , label: '姓名' },
        { name: 'phone', label: '电话' },
        { name: 'county', label: '地区' },
        { name: 'state', label: '状态', type: 'select', options: this.states },
      ]
    },
    // 编辑表单参数
    editor() {
      return [
        { name: 'name', label: '姓名', required: true },
        { name: 'phone', label: '电话' },
        { name: 'age', label: '年龄', readonly: true },
        { name: 'state', label: '状态', type: 'select', options: this.states },
      ]
    }
  },
  methods: {
    getData() {
      this.loading = true
      this.$api.users().then(ret => {
        this.total = ret.meta.total
        this.data = ret.data
        console.log(this.data)
        this.loading = false
      }).catch(() => {})
    },
    search() {
      this.params.page = 1
      this.getData()
    },
    pageChange(page) {
      this.params.page = page
      this.getData()
    },
    show(row) {
      console.log('show', row)
    },
    edit(row) {
      console.log('edit', row)
    },
    update(row) {
      let $ref = this.$refs['table']
      $ref.editClose()
      console.log('update', row)
    },
    store(row) {
      let $ref = this.$refs['table']
      $ref.createClose()
      console.log('store', row)
    },
    remove(index, row) {
      let $ref = this.$refs['table']
      $ref.destroy(index)
      console.log('destroy', row)
    },
    create() {
      console.log('create')
    },
    uploaded() {
      console.log('uploaded')
    },
    download() {
      console.log('download')
    },
    selectionChange(val) {
      console.log('selection-change', val)
      this.selected = val
    },
    deleteSelected() {
      this.$confirm(this.$t('confirm.delete'), this.$t('confirm.title'), { type: 'warning' }).then(() => {
        console.log(this.selected)
      }).catch(() => {})
    }
  }
}
</script>
