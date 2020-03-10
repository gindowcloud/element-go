<template>
  <el-container class="ex-layout" :class="{ collapsed: collapsed, opened: opened }">
    <div class="ex-drawer" @click="closeDrawer" /><!-- 抽屉遮罩 -->
    <el-aside :width="width">
      <ex-menu :collapsed="collapsed" @close-drawer="closeDrawer" :menu="menu" :logo="logo" />
    </el-aside>
    <el-container class="ex-main">
      <el-header>
        <!-- 用户菜单 -->
        <el-dropdown v-if="user" class="float-right" @command="command">
          <span class="username"><i class="el-icon-user" /> {{ user }}</span>
          <el-dropdown-menu v-if="userMenu" slot="dropdown">
            <el-dropdown-item v-for="(item, key) in userMenu" :key="key" :command="item.path || ''">{{ item.title }}</el-dropdown-item>
            <el-dropdown-item command="logout" divided>{{ $t('logout') }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 菜单收缩 -->
        <div class="toggle" @click="collapse"><i :class="toggleIcon" /></div>
      </el-header>
      <el-main>
        <!-- 三级菜单 -->
        <div class="grand-menu" v-if="currentMenu">
          <span v-for="(menu, key) in currentMenu" :key="key">
            <i v-if="key">/</i><el-link :underline="false" :class="{ on: menu.path == path }" @click="$to(menu.path)">{{ menu.title }}</el-link>
          </span>
        </div>
        <!-- 主要内容 -->
        <transition mode="out-in" name="fade-transform">
          <router-view/>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import exMenu from './exMenu'
import Cookies from 'js-cookie'

export default {
  name: 'exLayout',
  components: { exMenu },
  props: {
    width: { type: String, default: '140px' },
    logo: String,
    menu: Array,
    user: String,
    userMenu: Array
  },
  data() {
    return {
      isCollapsed: false,
      isDrawer: false,
      clientWidth: document.body.clientWidth
    }
  },
  computed: {
    isMobile() {
      return this.clientWidth < 992
    },
    collapsed() {
      return this.isCollapsed && !this.isMobile
    },
    opened() {
      return this.isDrawer && this.isMobile
    },
    toggleIcon() {
      if (this.isMobile) return this.opened ? 'el-icon-s-fold' : 'el-icon-s-unfold'
      else return this.collapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    },
    path() {
      return this.$route.fullPath
    },
    currentMenu() {
      let ret = null
      this.menu.forEach(menu => {
        if (menu.children) menu.children.forEach(m => {
          if (m.path == this.path || (m.children && m.children.filter(n => n.path == this.path).length)) ret = m.children
        })
      })
      return ret
    }
  },
  created() {
    let collapsed = Cookies.get('sidebarCollapsed')
    if (collapsed) this.isCollapsed = collapsed === 'true'
    window.onresize = () => { this.clientWidth = document.body.clientWidth }
  },
  methods: {
    closeDrawer() {
      this.isDrawer = false
    },
    collapse() {
      if (this.isMobile) this.isDrawer = !this.isDrawer
      else {
        this.isCollapsed = !this.isCollapsed
        Cookies.set('sidebarCollapsed', this.isCollapsed, { expires: 365 })
        this.$emit('collapse', this.isCollapsed)
      }
    },
    command(command) {
      switch(command) {
        case '': break;
        case 'logout': this.$emit('logout'); break
        default: this.$router.push(command); break
      }
    }
  }
}
</script>

<style scoped>
.ex-layout { height: 100vh; }
.ex-main { overflow: auto; }
.el-header { background-color: #fff; line-height: 60px; box-shadow: 0 1px 5px #eee; }
.el-header .toggle { float: left; font-size: 16px; }
.el-header .username { float: right; border-left: 1px solid #f6f6f6; line-height: 20px; padding: 20px 15px 20px 25px; color: #666; }
.el-header .username i { margin-right: 10px; }
.el-main { overflow: visible !important; }
.collapsed .el-aside { width: 65px !important; }
.grand-menu { margin-bottom: 10px; }
.grand-menu > span { display: inline-block; }
.grand-menu > span > i { margin: 0 10px; color: #ddd; }
.grand-menu > span > a.on { color: #409EFF; }
@media screen and (max-width: 992px) { /* 中型以下屏幕 */
  .el-aside { left: -100vh; position: fixed; z-index: 9999; }
  .ex-drawer { left: -100vh; position: fixed; z-index: 9998; width: 100vw; height: 100vh; background: #000; opacity: 0.5; }
  .opened .el-aside,
  .opened .ex-drawer { left: 0; }
  .el-header { border-bottom: 1px solid #eee; }
  .el-main { padding: 0; }
}
</style>
