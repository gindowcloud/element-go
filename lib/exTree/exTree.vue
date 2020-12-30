<template>
  <div class="ex-tree">
    <!-- 控制区 -->
    <el-row class="row-title" type="flex" v-if="title || allowCreate">
      <el-col :sm="6" v-if="title" class="col-title">
        <span>{{ title }}</span>
      </el-col>
      <el-col class="text-right">
        <el-button-group>
          <el-button  type="text" size="small" v-if="allowCreate" icon="el-icon-plus" @click="create({})">{{ $t('create') }}</el-button>
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
          <span v-if="hasIcon" class="col-icon"><slot name="icon" :row="data" /></span>
          <span>{{ node.label }}</span>
          <span v-if="hasSlot" class="col-slot"><slot :row="data" /></span>
          <span class="col-action">
            <el-button v-if="allowRemove && node.isLeaf" @click="remove(node)" type="text" size="mini"><i class="el-icon-delete" /> {{ $t('delete') }}</el-button>
            <el-button v-if="allowAppend && editor" type="text" size="mini" @click="create(node)"><i class="el-icon-plus" /> {{ $t('append') }}</el-button>
            <el-button v-if="editor" type="text" size="mini" @click="edit(node)"><i class="el-icon-edit-outline" /> {{ $t('edit') }}</el-button>
          </span>
          <span v-if="hasSort" class="col-sort"><slot name="sort" :row="data" /></span>
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
    title: String,
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
    },
    hasIcon() {
      return this.$scopedSlots.icon
    },
    hasSort() {
      return this.$scopedSlots.sort
    }
  },
  methods: {
    // 获取数据
    loadNode(node, resolve) {
      this.$emit("load", node.data, resolve)
    },
    // 设置默认值
    setDefaultRow(row = {}) {
      let rowData = Object.assign({}, row)
      this.editor.forEach(j => {
        switch(j.type) {
          case 'checkbox': rowData[j.name] = []; break
          case 'select': rowData[j.name] = j.options[0].value; break
          default: rowData[j.name] = null
        }
      })
      return rowData
    },
    // 新建提交
    create(parent) {
      this.parent = parent
      this.row = this.setDefaultRow()
      this.dialogEdit = true
    },
    // 编辑资料
    edit(node) {
      this.parent = null
      this.row = this.setDefaultRow(node.data)
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
      this.$confirm(this.$t('confirm.delete'), this.$t('confirm.title'), { type: 'warning' }).then(() => {
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
.ex-tree .row-title { margin-bottom: 12px; }
.ex-tree .col-title { font-size: 14px; line-height: 36px; }
.ex-tree >>> .el-tree-node__content { height: 40px; line-height: 40px; border-bottom: 1px solid #f6f6f6; }
.ex-tree .node { width: 100%; }
.ex-tree .node span { display: inline-block; padding: 0 10px; }
.ex-tree .node .col-sort { float: right; }
.ex-tree .node .col-action { float: right; text-align: right; width: 200px; }
</style>
