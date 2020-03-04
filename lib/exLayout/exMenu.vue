<template>
  <el-menu
    router unique-opened 
    :collapse-transition="false" background-color="#222" text-color="#fff"
    :collapse="value"  :default-active="$route.path">
    <div class="logo">          
      <span v-if="!logo"><i  class="el-icon-eleme" /></span>
      <el-image v-else :src="logoSrc" fit="contain" />
    </div>
    <template v-for="(menu, key) in menu">
      <el-menu-item v-if="!menu.children" :key="key" :index="menu.path">
        <i :class="menu.icon" /><span>{{ menu.title }}</span>
      </el-menu-item>
      <el-submenu v-if="menu.children" :key="key" :index="menu.path">
        <template slot="title">
          <i :class="menu.icon" /><span>{{ menu.title }}</span>
        </template>          
        <el-menu-item v-for="(item, i) in menu.children" :key="i" :index="item.path">{{ item.title }}</el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
export default {
  props: {
    value: { type: Boolean, default: false },
    logo: String,
    logoCollapsed: String,
    menu: Array,
  },
  computed: {
    logoSrc () {
      return this.value && this.logoCollapsed ? this.logoCollapsed : this.logo
    }
  }
}
</script>

<style scoped>
.el-menu { min-height: 100vh; border-right: 0 !important; }
.el-menu .logo { height: 60px; text-align: center; font-size: 24px; background-color: #292929; }
.el-menu .logo span { display: inline-block; width: 32px; height: 32px; margin-top: 14px; background-color: #fff; color: #1989fa; border-radius: 50%; }
.el-menu .logo .el-image { height: 32px; margin: 14px 0; }
.el-menu >>> .el-submenu__title, .el-menu-item { height: 40px; line-height: 40px; }
.el-menu >>> .el-submenu__icon-arrow { margin-top: -5px; color: #555; }
.el-menu >>> .el-menu--inline .el-menu-item { padding-left: 49px !important; }
</style>
