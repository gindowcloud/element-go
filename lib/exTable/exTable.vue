<template>
  <div>
    <!-- 表单标题 -->
    <div v-if="title" class="margin-bottom">{{ title }}</div>
    <!-- 搜索表单 -->
    <el-row>
      <el-col :md="20" v-if="filter">
        <ex-search v-model="params" :filter="filter" @search="onSearch" @reset="onReset" />
      </el-col>
      <el-col :md="4" class="text-right">
        <el-button-group>
          <el-button plain v-if="allowCreate" size="small" icon="el-icon-plus" @click="onCreate">{{ $t('lang.create') }}</el-button>
          <el-button plain v-if="allowExport" size="small" icon="el-icon-download" @click="onExport">{{ $t('lang.export') }}</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <!-- 数据表格 -->
    <div v-loading="loading">
      <el-table :data="value">
        <slot />
        <el-table-column align="right">
          <template slot-scope="scope">
            <div class="col-action">
              <el-button type="text" v-if="viewer" @click="onView(scope.row)">{{ $t('lang.view') }}</el-button>
              <el-button type="text" v-if="editor" @click="onEdit(scope.row)">{{ $t('lang.edit') }}</el-button>
              <el-dropdown v-if="allowRemove || hasActionSlot">
                <span class="el-dropdown-link"><i class="el-icon-more" /></span>
                <el-dropdown-menu slot="dropdown">
                  <slot name="action" :$index="scope.$index" :row="scope.row" />
                  <el-dropdown-item v-if="allowRemove" @click.native="onConfirm(scope.$index, scope.row)">{{ $t('lang.delete') }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 数据分页 -->
    <el-pagination background layout="total,prev,pager,next" :load="true" :page-size="params.size" :current-page="params.page" :total="total" @current-change="onPageChange" />
    <!-- 查看表单 -->
    <ex-viewer v-if="viewer" :title="viewTitle" :items="viewer" :show="dialogView" @close="onViewClose" :model="row" />
    <!-- 编辑表单 -->
    <ex-editor v-if="editor" :title="editTitle" :items="editor" :show="dialogEdit" @close="onEditClose" :model="row" @upload="onEditUpload" @submit="onEditSubmit" />
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
    title: String,
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
    allowRemove: Boolean,
    loading: Boolean
  },
  data() {
    return {
      dialogView: false,
      dialogEdit: false,
      row: {}
    }
  },
  computed: {
    hasActionSlot() {
      return this.$scopedSlots.action
    }
  },
  mounted() {
    this.onSearch()
  },
  methods: {
    // 搜索提交
    onSearch() {
      this.$emit("search")
    },
    // 搜索重置
    onReset() {
      this.$emit("reset")
    },
    // 改变分页
    onPageChange(page) {
      this.$emit("page-change", page)
    },
    // 新建提交
    onCreate() {
      this.$emit("create")
    },
    // 新建导出
    onExport() {
      this.$emit("export")
    },
    // 查看资料
    onView (row) {
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
    onViewClose() {
        this.dialogView = false
    },
    // 编辑资料
    onEdit(row) {
        this.$emit("edit", row)
        this.row = row
        this.dialogEdit = true
    },
    // 编辑关闭
    onEditClose() {
        this.dialogEdit = false
    },
    // 编辑保存
    onEditSubmit() {
        this.$emit("edit-submit")
    },
    // 编辑保存
    onEditUpload(ret) {
        this.$emit("edit-upload", ret)
    },
    // 删除确认
    onConfirm (index, row) {
      this.$confirm('Are you sure to remove?', 'Confirm', { type: 'warning' }).then(() => {
        this.$emit('remove', index, row)
      }).catch(() => {})
    },
    // 删除一行
    onRemove (index) {
      this.value.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.text-right { text-align: right; }
.margin-bottom { margin-bottom: 16px; }
.col-action .el-button, .col-action .el-dropdown { margin-left: 15px; }
.el-dropdown-link { cursor: pointer; color: #409EFF; }
.el-pagination { margin: 30px 0; text-align: center; }
</style>