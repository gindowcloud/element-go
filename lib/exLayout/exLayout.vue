<template>
  <el-container class="ex-layout">
    <!-- 左侧 -->
    <el-aside :class="{ collapsed: isCollapsed }" :width="width">
      <!-- 菜单 -->
      <ex-menu v-model="isCollapsed" :menu="menu" :logo="logo" :logoCollapsed="logoCollapsed" />
    </el-aside>
    <!-- 右侧 -->
    <el-container class="ex-main">
      <!-- 头部 -->
      <el-header>
        <!-- 用户 -->
        <el-dropdown v-if="user" class="float-right" @command="command">
          <span class="username"><i class="el-icon-user" /> {{ user }}</span>
          <el-dropdown-menu v-if="userMenu" slot="dropdown">
            <el-dropdown-item v-for="(item, key) in userMenu" :key="key" :command="item.path || ''">{{ item.title }}</el-dropdown-item>
            <el-dropdown-item command="logout" divided>{{ $t('logout') }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 收缩 -->
        <div class="toggle" @click="collapse">
          <i class="el-icon-s-unfold" v-if="isCollapsed" />
          <i class="el-icon-s-fold" v-else/>
        </div>
      </el-header>
      <!-- 主要 -->
      <el-main>
        <!-- 内容 -->
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
    collapsed: { type: Boolean, default: false },
    width: { type: String, default: '140px' },
    logo: String,
    logoCollapsed: String,
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
      Cookies.set('sidebarCollapsed', this.isCollapsed, { expires: 365 })
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
.collapsed { width: 65px !important; }
@media screen and (max-width: 992px) { /* 中型以下屏幕 */
  .el-header { border-bottom: 1px solid #eee; }
  .el-main { padding: 0; }
}
</style>
