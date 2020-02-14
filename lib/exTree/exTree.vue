<template>
  <div class="ex-tree">
    <!-- 控制区 -->
    <el-row class="row-action">
      <el-col class="text-right">
        <el-button-group>
          <el-button plain v-if="allowCreate" size="small" icon="el-icon-plus" @click="create(null)">{{ $t('create') }}</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <!-- 树型区 -->
    <div v-loading="loading">
      <el-tree
        :expand-on-click-node="false" icon-class="el-icon-arrow-right"
        :props="props" :data="data" :lazy="!data" :load="loadNode"
        >
        <div class="node" slot-scope="{ node }">
          <span>{{ node.label }}</span>
          <span class="col-action">
            <el-button v-if="allowRemove && node.isLeaf" type="text" size="mini" @click="remove(node)"><i class="el-icon-delete" /> {{ $t('delete') }}</el-button>
            <el-button v-if="allowCreate && editor" type="text" size="mini" @click="create(node)"><i class="el-icon-plus" /> {{ $t('append') }}</el-button>
            <el-button v-if="editor" type="text" size="mini" @click="edit(node)"><i class="el-icon-edit-outline" /> {{ $t('edit') }}</el-button>
          </span>
        </div>
      </el-tree>
    </div>
    <!-- 编辑表单 -->
    <ex-editor v-if="editor" :title="editTitle" :items="editor" :show="dialogEdit" @close="editClose" :model="row" @submit="submit" />
  </div>
</template>

<script>
import exEditor from '../exTable/exEditor'

export default {
  name: 'exTree',
  components: { exEditor },
  props: {
    loading: Boolean,
    props: Object,
    data: Array,
    editor: Array,
    editTitle: String,
    allowCreate: Boolean,
    allowRemove: Boolean
  },
  data() {
    return {
      dialogEdit: false,
      isCreate: false,
      row: {},
      current: {},
    }
  },
  created() {
  },
  methods: {
    // 获取数据
    loadNode(node, resolve) {
      this.$emit("load", node.data, resolve)
    },
    // 新建提交
    create(node) {
      this.row = {}
      this.current = node
      this.isCreate = true
      this.dialogEdit = true
    },
    // 编辑资料
    edit(node) {
      this.row = node.data
      this.isCreate = false
      this.dialogEdit = true
    },
    // 编辑关闭
    editClose() {
      this.dialogEdit = false
    },
    // 编辑保存
    submit() {
      this.$emit("submit", this.row, this.isCreate)
    },
    // 保存添加
    store(row) {
      if (!this.current && !this.data) return
      if (!this.current) return this.data.push(row)
      const data = this.current.data
      if (!data.children) this.$set(data, 'children', [])
      data.children.push(row)
    },
    // 删除功能
    remove(node) {
      this.$confirm(this.$t('confirm.delete'), { type: 'warning' }).then(() => {
        this.$emit('remove', node)
      }).catch(() => {})
    },
    // 删除节点
    destroy(node) {
      const parent = node.parent
      const children = parent.childNodes
      const index = children.findIndex(j => j.id === node.id)
      children.splice(index, 1)
    },
  }
}
</script>

<style scoped>
.ex-tree { padding: 20px; }
.ex-tree .row-action { margin-bottom: 20px; }
.ex-tree >>> .el-tree-node__content { height: 40px; line-height: 40px; border-bottom: 1px solid #f6f6f6; }
.ex-tree .node { width: 100%; }
.ex-tree .col-action { float: right; }
</style>