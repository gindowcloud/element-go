<template>
  <div class="ex-table">
    <el-row class="row-title" type="flex" v-if="title || hasButton">
      <el-col :sm="6" v-if="title" class="col-title">{{ title }}</el-col>
      <el-col class="text-right">
        <el-button-group>
          <slot name="button" />
          <el-button type="text" size="small" v-if="allowCreate || creator" icon="el-icon-plus" @click="create">{{ $t('create') }}</el-button>
          <el-button type="text" size="small" v-if="allowImport" icon="el-icon-upload2" @click="importStart">{{ $t('import') }}</el-button>
          <el-button type="text" size="small" v-if="allowExport" icon="el-icon-download" @click="exportStart">{{ $t('export') }}</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <!-- 搜索表单 -->
    <ex-search v-model="params" :filter="filter" @search="search" @reset="reset" v-if="filter" />
    <!-- 数据表格 -->
    <div v-loading="loading">
      <el-table ref="table" :data="value" @selection-change="selectionChange">
        <slot />
        <el-table-column width="150" align="right" v-if="hasAction">
          <template slot-scope="scope">
            <div class="col-action">
              <el-button type="text" v-if="allowShow || shower" @click="show(scope.row)">{{ $t('view') }}</el-button>
              <el-button type="text" v-if="allowEdit || editor" @click="edit(scope.row)">{{ $t('edit') }}</el-button>
              <el-dropdown v-if="hasActionMore">
                <span class="el-dropdown-link"><i class="el-icon-more" /></span>
                <el-dropdown-menu slot="dropdown">
                  <slot name="action" :$index="scope.$index" :row="scope.row" />
                  <el-dropdown-item v-if="allowRemove" @click.native="remove(scope.$index, scope.row)">{{ $t('delete') }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="append" v-if="hasAppend">
        <el-button slot="append" size="small" @click="selectAll">{{ $t('select') }}</el-button>
        <slot name="append" />
      </div>
    </div>
    <!-- 数据分页 -->
    <el-pagination v-if="total" background layout="total,prev,pager,next" :load="true" :page-size="params.size" :current-page="params.page" :total="total" @current-change="pageChange" />
    <!-- 查看表单 -->
    <ex-shower v-if="shower" :items="shower" :show="dialogShow" :title="showTitle" :width="showWidth" @close="showClose" :model="row" />
    <!-- 编辑表单 -->
    <ex-editor v-if="editor" :items="editor" :show="dialogEdit" :title="editTitle" :width="editWidth" :label-width="editLabelWidth" @close="editClose" :model="row" @upload="editUpload" @submit="update" />
    <!-- 添加表单 -->
    <ex-editor v-if="creator" :items="creator" :show="dialogCreate" :title="createTitle" :width="createWidth" @close="createClose" :model="row" @upload="createUpload" @submit="store" />
    <!-- 导入表单 -->
    <ex-import v-if="allowImport"
      :title="importTitle" :width="importWidth" :show="dialogImport" @close="importClose"
      :action="importAction" :headers="importHeaders" @import="imported"
    >
      <el-link class="sample" type="info" v-if="importSample" @click="sampleDownload">{{ $t('importer.sample') }}</el-link>
      <slot name="import" />
    </ex-import>
  </div>
</template>

<script>
import exSearch from './exSearch'
import exShower from './exShower'
import exEditor from './exEditor'
import exImport from './exImport'

export default {
  name: 'exTable',
  components: { exSearch, exShower, exEditor, exImport },
  props: {
    title: String,
    value: Array,
    loading: Boolean,
    params: Object,
    filter: Array,
    shower: Array,
    editor: Array,
    creator: Array,
    total: Number,
    showTitle: String,
    showWidth: String,
    editTitle: String,
    editWidth: String,
    editLabelWidth: String,
    createTitle: String,
    createWidth: String,
    importTitle: String,
    importWidth: String,
    importHeaders: Object,
    importAction: String,
    importSample: String,
    allowShow: Boolean,
    allowEdit: Boolean,
    allowRemove: Boolean,
    allowCreate: Boolean,
    allowImport: Boolean,
    allowExport: Boolean,
  },
  data() {
    return {
      dialogShow: false,
      dialogEdit: false,
      dialogCreate: false,
      dialogImport: false,
      row: {}
    }
  },
  computed: {
    hasButtonMore() {
      return this.$scopedSlots.button
    },
    hasButton() {
      return this.creator || this.allowCreate || this.allowImport || this.allowExport || this.hasButtonMore
    },
    hasActionMore() {
      return this.$scopedSlots.action || this.allowRemove
    },
    hasAction() {
      return this.allowShow || this.allowEdit || this.shower || this.editor || this.hasActionMore
    },
    hasAppend() {
      return this.$scopedSlots.append
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
    // 新建导入
    importStart() {
      this.dialogImport = true
    },
    importClose() {
      this.dialogImport = false
    },
    imported(ret) {
      this.dialogImport = false
      this.$emit("import", ret)
    },
    // 下载上传模板
    sampleDownload() {
      let a = document.createElement('a')
      a.href = this.importSample
      a.click()
    },
    // 新建导出
    exportStart() {
      this.$confirm(this.$t('confirm.export'), { type: 'warning' }).then(() => {
        this.$emit("export")
      }).catch(() => {})
    },
    // 查看资料
    show(row) {
      this.row = row
      this.dialogShow = true
      this.$emit("show", row)
    },
    // 查看关闭
    showClose() {
      this.dialogShow = false
    },
    // 编辑资料
    edit(row) {
      this.row = row
      this.dialogEdit = true
      this.$emit("edit", row)
    },
    // 编辑关闭
    editClose() {
      this.dialogEdit = false
    },
    // 编辑保存
    update() {
      this.$emit("update", this.row)
    },
    // 编辑保存
    editUpload(ret) {
      this.$emit("edit-upload", ret)
    },
    // 新建提交
    create() {
      if (this.creator) {
        let row = {}
        this.creator.forEach(j => {
          switch(j.type) {
            case 'checkbox': row[j.name] = []; break
            case 'select': row[j.name] = j.options[0].value; break
            default: row[j.name] = null
          }
        })
        this.row = Object.assign({}, row)
        this.dialogCreate = true
      }
      this.$emit("create")
    },
    createClose() {
      this.dialogCreate = false
    },
    store() {
      this.$emit("store", this.row)
    },
    createUpload(ret) {
      this.$emit("create-upload", ret)
    },
    // 删除确认
    remove(index, row) {
      this.$confirm(this.$t('confirm.delete'), this.$t('confirm.title'), { type: 'warning' }).then(() => {
        this.$emit('remove', index, row)
      }).catch(() => {})
    },
    // 删除一行
    destroy(index) {
      this.value.splice(index, 1)
    },
    // 选择全部
    selectAll() {
      this.$refs.table.toggleAllSelection()
    },
    selectionChange(val) {
      this.$emit("selection-change", val)
    }
  }
}
</script>

<style scoped>
.ex-table { padding: 20px; }
.ex-table .row-title { margin-bottom: 12px; }
.ex-table .col-title { font-size: 14px; line-height: 36px; }
.ex-table .col-action .el-button,
.ex-table .col-action .el-dropdown { margin-left: 15px; }
.ex-table .col-action .el-button:first-child,
.ex-table .col-action .el-dropdown:first-child { margin-left: 0; }
.ex-table .el-button-group { margin-top: 4px; }
.ex-table .el-button-group .el-button { margin-left: 15px; }
.ex-table .el-dropdown-link { cursor: pointer; color: #409EFF; }
.ex-table .el-pagination { margin: 30px 0; text-align: center; }
.ex-table .append { margin: 15px 0; }
.ex-table .sample { font-weight: 400; }
@media screen and (max-width: 991px) { /* 中型以下屏幕 */
  .ex-table .el-pagination >>> .el-pager .more,
  .ex-table .el-pagination >>> .el-pager .number { display: none; }
  .ex-table .el-pagination >>> .el-pager .active { display: inline-block; }
  .ex-table >>> .el-dialog { width: 95% !important; }
}
</style>
