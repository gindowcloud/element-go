<template>
  <el-container>
    <el-aside width="200px">
      <div class="logo">Element Extensions</div>
      <el-menu router :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-menu" />业务组件</template>
            <el-menu-item index="/exTable">ExTable</el-menu-item>
            <el-menu-item index="/exTree">ExTree</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<style scoped>
.el-aside .logo { padding: 25px 0 24px; background: #fff; border-right: 1px solid #e6e6e6; border-bottom: 1px solid #f6f6f6; text-align: center; }
.el-menu { min-height: calc(100vh - 72px); }
</style>