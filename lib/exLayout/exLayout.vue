<template>
  <el-container class="ex-menu">
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
    <el-container>
      <el-header>
        <div class="toggle" @click="collapse">
          <i class="el-icon-s-unfold" v-if="isCollapsed" />
          <i class="el-icon-s-fold" v-else/>
        </div>
      </el-header>
      <el-main>
        <router-view class="page" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'exLayout',
  props: {
    collapsed: { type: Boolean, default: true },
    width: { type: String, default: '140px' },
    logo: String,
    menu: Array
  },
  data() {
    return {
      isCollapsed: this.collapsed
    }
  },
  methods: {
    collapse () {
      this.isCollapsed = !this.isCollapsed
      this.$emit('collapse')
    }
  }
}
</script>

<style scoped>
.el-header { background-color: #fff; line-height: 60px; }
.el-header .toggle { font-size: 16px; }
.el-menu { min-height: 100vh; border-right: 0 !important; }
.el-menu .logo { height: 60px; text-align: center; font-size: 24px; background-color: #292929; }
.el-menu .logo span { display: inline-block; width: 32px; height: 32px; margin-top: 14px; background-color: #fff; color: #1989fa; border-radius: 50%; }
.el-menu >>> .el-submenu__title, .el-menu-item { height: 40px; line-height: 40px; }
.el-menu >>> .el-submenu__icon-arrow { margin-top: -5px; color: #555; }
.el-menu >>> .el-menu--inline .el-menu-item { padding-left: 49px !important; }
.ex-menu .collapsed { width: 65px !important; }
.ex-menu .page { min-height: calc(100vh - 100px); background-color: #fff; }
</style>
