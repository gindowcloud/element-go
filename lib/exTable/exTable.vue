<template>
  <div class="ex-table">
    <!-- 搜索表单 -->
    <el-row>
      <el-col :md="20" v-if="filter">
        <ex-search v-model="params" :filter="filter" @search="search" @reset="reset" />
      </el-col>
      <el-col :md="4" class="text-right">
        <el-button-group>
          <el-button plain v-if="allowCreate" size="small" icon="el-icon-plus" @click="create">{{ $t('create') }}</el-button>
          <el-button plain v-if="allowExport" size="small" icon="el-icon-download" @click="download">{{ $t('export') }}</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <!-- 数据表格 -->
    <div v-loading="loading">
      <el-table :data="value">
        <slot />
        <el-table-column width="150" align="right" v-if="hasAction">
          <template slot-scope="scope">
            <div class="col-action">
              <el-button type="text" v-if="viewer" @click="view(scope.row)">{{ $t('view') }}</el-button>
              <el-button type="text" v-if="editor" @click="edit(scope.row)">{{ $t('edit') }}</el-button>
              <el-dropdown v-if="hasActionMore">
                <span class="el-dropdown-link"><i class="el-icon-more" /></span>
                <el-dropdown-menu slot="dropdown">
                  <slot name="action" :$index="scope.$index" :row="scope.row" />
                  <el-dropdown-item v-if="allowRemove" @click.native="confirm(scope.$index, scope.row)">{{ $t('delete') }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 数据分页 -->
    <el-pagination v-if="total" background layout="total,prev,pager,next" :load="true" :page-size="params.size" :current-page="params.page" :total="total" @current-change="pageChange" />
    <!-- 查看表单 -->
    <ex-viewer v-if="viewer" :title="viewTitle" :items="viewer" :show="dialogView" @close="viewClose" :model="row" />
    <!-- 编辑表单 -->
    <ex-editor v-if="editor" :title="editTitle" :items="editor" :show="dialogEdit" @close="editClose" :model="row" @upload="editUpload" @submit="editSubmit" />
  </div>
</template>

<script>
import exSearch from './exSearch'
import exViewer from './exViewer'
import exEditor from './exEditor'

export default {
  name: 'exTable',
  components: { exSearch, exViewer, exEditor },
  props: {
    loading: Boolean,
    params: Object,
    filter: Array,
    viewer: Array,
    editor: Array,
    value: Array,
    total: Number,
    viewUrl: String,
    editUrl: String,
    viewTitle: String,
    editTitle: String,
    allowExport: Boolean,
    allowCreate: Boolean,
    allowRemove: Boolean
  },
  data() {
    return {
      dialogView: false,
      dialogEdit: false,
      row: {}
    }
  },
  computed: {
    hasActionMore() {
      return this.$scopedSlots.action || this.allowRemove
    },
    hasAction() {
      return this.viewer || this.editor || this.hasActionMore
    }
  },
  mounted() {
    this.search()
  },
  methods: {
    // 搜索提交
    search() {
      this.$emit("search")
    },
    // 搜索重置
    reset() {
      this.$emit("reset")
    },
    // 改变分页
    pageChange(page) {
      this.$emit("page-change", page)
    },
    // 新建提交
    create() {
      this.$emit("create")
    },
    // 新建导出
    download() {
      this.$emit("export")
    },
    // 查看资料
    view(row) {
      if (this.viewUrl) {
        let url = this.viewUrl
        url.match(/{([^}]+)}/gi).forEach(j => {
            let name = j.substring(1, j.length - 1)
            url = url.replace(j, row[name])
        })
        return this.$router.push(url)
      }
      this.$emit("view", row)
      this.row = row
      this.dialogView = true
    },
    // 查看关闭
    viewClose() {
        this.dialogView = false
    },
    // 编辑资料
    edit(row) {
        this.$emit("edit", row)
        this.row = row
        this.dialogEdit = true
    },
    // 编辑关闭
    editClose() {
        this.dialogEdit = false
    },
    // 编辑保存
    editSubmit() {
        this.$emit("edit-submit")
    },
    // 编辑保存
    editUpload(ret) {
        this.$emit("edit-upload", ret)
    },
    // 删除确认
    confirm(index, row) {
      this.$confirm(this.$t('confirm.delete'), { type: 'warning' }).then(() => {
        this.$emit('remove', index, row)
      }).catch(() => {})
    },
    // 删除一行
    remove(index) {
      this.value.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.ex-table { padding: 20px; }
.ex-table .col-action .el-button,
.ex-table .col-action .el-dropdown { margin-left: 15px; }
.ex-table .col-action .el-button:first-child,
.ex-table .col-action .el-dropdown:first-child { margin-left: 0; }
.ex-table .el-dropdown-link { cursor: pointer; color: #409EFF; }
.ex-table .el-pagination { margin: 30px 0; text-align: center; }
</style>