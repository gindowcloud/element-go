<template>
  <div class="ex-tree">
    <!-- 控制区 -->
    <el-row class="row-action">
      <el-col class="text-right">
        <el-button-group>
          <el-button plain v-if="allowCreate" size="small" icon="el-icon-plus" @click="create">{{ $t('create') }}</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <!-- 树型区 -->
    <div v-loading="loading">
      <el-tree
        lazy :load="loadNode"
        :expand-on-click-node="false" icon-class="el-icon-arrow-right"
        :data="value" :props="props"
        :draggable="allowDrag" @node-drop="drag"
        >
        <div class="node" slot-scope="{ node, data }">
          <span>{{ data.label }}</span>
          <span class="col-action">
              <el-button v-if="allowCreate" type="text" size="mini" @click="create(data)"><i class="el-icon-plus" /> {{ $t('append') }}</el-button>
              <el-button type="text" size="mini" @click="edit(data)"><i class="el-icon-edit-outline" /> {{ $t('edit') }}</el-button>
              <el-button v-if="allowRemove" type="text" size="mini" @click="confirm(data, node)"><i class="el-icon-delete" /> {{ $t('delete') }}</el-button>
          </span>
        </div>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: 'exTree',
  props: {
    loading: Boolean,
    value: Array,
    props: Object,

    editor: Array,
    editUrl: String,
    editTitle: String,

    allowCreate: Boolean,
    allowRemove: Boolean,
    allowDrag: Boolean
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    // 获取数据
    loadNode(node, resolve) {
      this.$emit("load", node, resolve)
    },
    // 新建提交
    create() {
      this.$emit("create")
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
    },
    drag() {
      this.$emit("drag")
    }
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