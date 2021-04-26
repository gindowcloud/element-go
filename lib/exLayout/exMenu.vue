<template>
  <el-aside :width="width">
    <el-row type="flex">
      <el-col :style="{ width: this.widthLeft }">
        <!-- 首级菜单 -->
        <el-menu
          router unique-opened
          :collapse-transition="false" background-color="#222" text-color="#fff"
          :collapse="collapsed" :default-active="$route.path">
          <div class="logo">
            <span v-if="!logo"><i class="el-icon-eleme" /></span>
            <el-image v-else-if="icon && collapsed" :src="icon" fit="contain" />
            <el-image v-else :src="logo" fit="contain" />
          </div>
          <template v-for="(menu, key) in menu">
            <el-menu-item :key="key" :index="menu.path" :hidden="menu.hide" @click.native="closeDrawer()">
              <i :class="menu.icon" /><span>{{ menu.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
      <el-col v-if="current.children && current.children.length" :style="{ width: this.widthMenu }">
        <!-- 次级菜单 -->
        <el-menu background-color="#fcfcfc">
          <div class="box-title">{{ current.title }}</div>
          <template v-for="(menu, key) in current.children">
            <el-menu-item-group v-if="!menu.children" :key="key">
              <el-menu-item :index="menu.path" :hidden="menu.hide" @click.native="closeDrawer()">{{ menu.title }}</el-menu-item>
            </el-menu-item-group>
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
    leftWidth: { type: String, default: '105px' },
    menuWidth: { type: String, default: '135px' },
    logo: String,
    icon: String,
    menu: Array
  },
  computed: {
    widthLeft() {
      return this.collapsed ? '65px' : this.leftWidth
    },
    widthMenu() {
      return this.current.children && this.current.children.length ? this.menuWidth : '0px'
    },
    width() {
      return parseInt(this.widthLeft) + parseInt(this.widthMenu) + 'px'
    },
    current() {
      const menu = this.menu.filter(ret => ret.path == this.$route.path)
      return menu.length ? menu[0] : {}
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
.el-menu .logo .el-image { max-width: 80%; height: 32px; margin: 14px 0; }
.el-menu >>> .el-submenu__title, .el-menu-item { height: 40px; line-height: 40px; }
.el-menu >>> .el-submenu__icon-arrow { margin-top: -5px; color: #555; }
.el-menu >>> .el-menu--inline .el-menu-item { padding-left: 49px !important; min-width: auto !important; }
.box-title { line-height: 60px; margin-bottom: 10px; text-align: center; background: #fff; box-shadow: 0 1px 5px #eee; }
.sub-menu { padding-left: 32px !important; }
</style>
