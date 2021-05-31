<template>
  <el-aside width="auto">
    <el-row type="flex">
      <el-col>
        <!-- 首级菜单 -->
        <el-menu
          router unique-opened
          :collapse-transition="false" background-color="#222" text-color="#fff"
          :collapse="collapsed" :default-active="$route.path">
          <div class="logo">
            <span v-if="!logo"><i class="el-icon-eleme" /></span>
            <el-image v-else :src="logo" fit="contain" />
          </div>
          <template v-for="(menu, key) in menu">
            <el-menu-item :key="key" :index="menu.path" :hidden="menu.hide" @click.native="closeDrawer()">
              <i :class="menu.icon" /><span>{{ menu.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
      <el-col v-if="current.children && current.children.length">
        <!-- 次级菜单 -->
        <el-menu router>
          <div class="box-title">{{ current.title }}</div>
          <template v-for="(menu, key) in current.children">
            <el-menu-item v-if="!menu.children" :key="key" :index="menu.path" :hidden="menu.hide" @click.native="closeDrawer()">{{ menu.title }}</el-menu-item>
            <el-menu-item-group v-if="menu.children" :key="key">
              <span slot="title">{{ menu.title }}</span>
              <el-menu-item class="sub-menu" v-for="(item, i) in menu.children" :key="i" :index="item.path" :hidden="item.hide" @click.native="closeDrawer()">{{ item.title }}</el-menu-item>
            </el-menu-item-group>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
export default {
  props: {
    collapsed: { type: Boolean, default: false },
    logo: String,
    menu: Array
  },
  computed: {
    current() {
      const path = this.$route.path
      let ret = this.menu[0]
      this.menu.forEach(menu => { // 一级
        if (path == menu.path) ret = menu
        else if (menu.children) menu.children.forEach(m => { // 二级
          if (m.path == path || (m.children && m.children.filter(n => path == n.path).length)) ret = menu
        })
      })
      return ret
    }
  },
  methods: {
    closeDrawer() {
      this.$emit('close-drawer')
    }
  }
}
</script>

<style scoped>
.el-menu { min-height: 100vh; border-right: 0 !important; }
.el-menu .logo { height: 60px; text-align: center; font-size: 24px; background-color: #292929; }
.el-menu .logo span { display: inline-block; width: 32px; height: 32px; margin-top: 14px; background-color: #fff; color: #1989fa; border-radius: 50%; }
.el-menu .logo .el-image { max-width: 64px; height: 32px; margin: 14px auto; }
.el-menu >>> .el-submenu__title, .el-menu-item { height: 40px; line-height: 40px; }
.el-menu >>> .el-submenu__icon-arrow { margin-top: -5px; color: #555; }
.el-menu >>> .el-menu--inline .el-menu-item { padding-left: 49px !important; min-width: auto !important; }
.box-title { line-height: 60px; margin-bottom: 10px; text-align: center; background: #fff; box-shadow: 0 1px 5px #eee; }
.sub-menu { padding: 0 32px !important; }
</style>
