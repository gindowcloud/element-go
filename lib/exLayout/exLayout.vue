<template>
  <el-container class="ex-layout">
    <el-aside :class="{ collapsed: isCollapsed }" :width="width">
      <el-menu
        router unique-opened 
        :collapse-transition="false" background-color="#222" text-color="#fff"
        :collapse="isCollapsed"  :default-active="$route.path">
        <div class="logo">
          <span>
            <i v-if="!logo" class="el-icon-eleme" />
            <el-image v-else :src="logo" width="32" height="32" fit="contain" />
          </span>
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
    </el-aside>
    <el-container class="ex-main">
      <el-header>
        <el-dropdown v-if="user" class="float-right" @command="command">
          <span class="username"><i class="el-icon-user" /> {{ user }}</span>
          <el-dropdown-menu v-if="userMenu" slot="dropdown">
            <el-dropdown-item v-for="(item, key) in userMenu" :key="key" :command="item.path || ''">{{ item.title }}</el-dropdown-item>
            <el-dropdown-item command="logout" divided>{{ $t('logout') }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="toggle" @click="collapse">
          <i class="el-icon-s-unfold" v-if="isCollapsed" />
          <i class="el-icon-s-fold" v-else/>
        </div>
      </el-header>
      <el-main>
        <!-- 路由内容 -->
        <transition mode="out-in" name="fade-transform">
          <router-view/>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  name: 'exLayout',
  props: {
    collapsed: { type: Boolean, default: true },
    width: { type: String, default: '140px' },
    logo: String,
    menu: Array,
    user: String,
    userMenu: Array    
  },
  data() {
    return {
      isCollapsed: this.collapsed
    }
  },
  created() {
    let collapsed = Cookies.get('sidebarCollapsed')
    if (collapsed) this.isCollapsed = collapsed === 'true'
  },
  methods: {
    collapse() {
      this.isCollapsed = !this.isCollapsed
      Cookies.set('sidebarCollapsed', this.isCollapsed)
      this.$emit('collapse', this.isCollapsed)
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
.el-menu { min-height: 100vh; border-right: 0 !important; }
.el-menu .logo { height: 60px; text-align: center; font-size: 24px; background-color: #292929; }
.el-menu .logo span { display: inline-block; width: 32px; height: 32px; margin-top: 14px; background-color: #fff; color: #1989fa; border-radius: 50%; }
.el-menu >>> .el-submenu__title, .el-menu-item { height: 40px; line-height: 40px; }
.el-menu >>> .el-submenu__icon-arrow { margin-top: -5px; color: #555; }
.el-menu >>> .el-menu--inline .el-menu-item { padding-left: 49px !important; }
.collapsed { width: 65px !important; }
</style>
