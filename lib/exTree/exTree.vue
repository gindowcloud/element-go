<template>
  <div class="ex-tree">
    <!-- 控制区 -->
    <el-row v-if="allowCreate" class="row-action">
      <el-col class="text-right">
        <el-button-group>
          <el-button plain v-if="allowCreate" size="small" icon="el-icon-plus" @click="create({})">{{ $t('create') }}</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <!-- 树型区 -->
    <div v-loading="loading">
      <el-tree
        :expand-on-click-node="false" icon-class="el-icon-arrow-right"
        :props="props" :data="data" :lazy="!data" :load="loadNode"
        >
        <div class="node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span class="col-action">
            <el-popconfirm v-if="allowRemove && node.isLeaf" @onConfirm="remove(node)" :title="$t('confirm.delete')">
              <el-button slot="reference" type="text" size="mini"><i class="el-icon-delete" /> {{ $t('delete') }}</el-button>
            </el-popconfirm>
            <el-button v-if="allowAppend && editor" type="text" size="mini" @click="create(node)"><i class="el-icon-plus" /> {{ $t('append') }}</el-button>
            <el-button v-if="editor" type="text" size="mini" @click="edit(node)"><i class="el-icon-edit-outline" /> {{ $t('edit') }}</el-button>
          </span>
          <span v-if="hasSlot" class="col-slot"><slot :row="data" /></span>
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
    allowAppend: Boolean,
    allowRemove: Boolean
  },
  data() {
    return {
      dialogEdit: false,
      parent: null, // 添加时的父节点
      row: {},
    }
  },
  computed: {
    hasSlot() {
      return this.$scopedSlots.default
    }
  },
  methods: {
    // 获取数据
    loadNode(node, resolve) {
      this.$emit("load", node.data, resolve)
    },
    // 新建提交
    create(parent) {
      this.parent = parent
      this.row = {}
      this.dialogEdit = true
    },
    // 编辑资料
    edit(node) {
      this.parent = null
      this.row = node.data
      this.dialogEdit = true
    },
    // 编辑关闭
    editClose() {
      this.dialogEdit = false
    },
    // 编辑保存
    submit() {
      this.$emit("submit", this.row, this.parent)
    },
    // 保存添加
    store(row, parent) {
      if (!parent.data && !this.data) return
      if (!parent.data) return this.data.push(row)
      const data = parent.data
      if (!data.children) this.$set(data, 'children', [])
      data.children.push(row)
    },
    // 删除功能
    remove(node) {
      this.$emit('remove', node)
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
.ex-tree .col-slot { float: right; }
.ex-tree .col-action { float: right; text-align: right; width: 200px; }
</style>