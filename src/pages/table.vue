<template>
  <div class="ex-demo">
    <ex-table      
      ref="table" v-model="data" :total="total" :loading="loading"
      :params="params" :filter="filter" @search="search" @page-change="pageChange"
      :viewer="viewer"
      :editor="editor" @edit-submit="editSubmit"
      allow-remove @remove="remove"
      allow-create @create="create"
      allow-export @export="download"
      >
      <el-table-column label="姓名" width="120" prop="name" />
      <el-table-column label="省份" width="120" prop="province" />
      <el-table-column label="市区" width="120" prop="city" />
      <el-table-column label="地址" width="300" prop="address" />
      <el-table-column label="日期" prop="date" align="right" />
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
      params: {
        state: '',
        q: '',
        date: []
      },
      data: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }],
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
        { name: 'name', label: '姓名', required: true },
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
    search() {
      this.params.page = 1
      this.getData()
    },
    pageChange(page) {
      this.params.page = page
      this.getData()
    },
    editSubmit() {
      this.$message.success('Update');
      let $ref = this.$refs['table']
      $ref.editClose()
    },
    remove (index) {
      this.$message.success('Remove');
      let $ref = this.$refs['table']
      $ref.destroy(index)
    },
    create() {
      this.$message.success('Create');
    },
    download() {
      this.$message.success('Export');
    }
  }
}
</script>
