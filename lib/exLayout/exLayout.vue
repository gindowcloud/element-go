<template>
  <el-container>
    <el-aside class="ex-menu" :class="{ collapse: isCollapse }" :width="sideWidth">
      <el-menu
        :collapse="isCollapse" router :default-active="active1"
        :collapse-transition="false" background-color="#222" text-color="#fff">
        <div class="logo"><span><i class="el-icon-eleme" /></span></div>
        <el-menu-item v-for="(menu, key) in menu" :key="key" :index="menu.path">
            <i :class="menu.icon" /><span>{{ menu.title }}</span>
        </el-menu-item>
      </el-menu>      
    </el-aside>
    <el-container>
      <el-header>
        <div class="toggle" @click="collapse">
          <i class="el-icon-s-unfold" v-if="isCollapse" />
          <i class="el-icon-s-fold" v-else/>
        </div>
      </el-header>
      <el-main>
        <!-- <el-container> -->
          <!-- <el-slider>
            <el-menu
              background-color="#222" text-color="#fff"
              style="width: 100px" router :default-active="active2">
              <el-menu-item v-for="(menu, key) in submenu" :key="key" :index="menu.path">
                {{ menu.title }}
              </el-menu-item>
            </el-menu>
          </el-slider> -->
          <!-- <el-main> -->
            <router-view class="ex-demo" />
          <!-- </el-main> -->
        <!-- </el-container> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'exLayout',
  props: {
    menu: Array,
    width: { type: String, default: '108px' },
    isCollapse: Boolean
  },
  data() {
    return {
      active1: '',
      active2: '',
    }
  },
  computed: {
    sideWidth() {
      return this.isCollapse ? '65px' : this.width
    },
    path() {
      return this.$route.path
    },
    submenu() {
      const actives = this.menu.filter(j => j.actived)
      return actives.length && actives[0].children ? actives[0].children : [] 
    }
  },
  watch: {
    path() {
      this.active(this.menu)
      console.log(1)
      this.submenu.forEach(j => {
        console.log([j.title, j.actived])
      })
    }
  },
  created() {
    this.active(this.menu)
    this.submenu.forEach(j => {
        console.log([j.title, j.actived])
      })
  },
  methods: {
    collapse () {
      this.$emit('collapse')
    },
    // 活跃检测
    active(menus) {
      return menus.map(j => {
        j.actived = j.path == this.path
        if (j.children) {
          j.children = this.active(j.children)
          if (j.children.filter(m => m.actived).length) j.actived = true
        }
        return j
      })
    }
  }
}
</script>

<style scoped>
.el-header { background-color: #fff; line-height: 60px; }
.el-header .toggle { font-size: 16px; }
.el-menu { min-height: 100vh; border-right: 0 !important; }
.el-menu .logo { height: 60px; text-align: center; font-size: 24px; }
.el-menu .logo span { display: inline-block; width: 32px; height: 32px; margin-top: 14px; background-color: #fff; color: #1989fa; border-radius: 50%; }
.el-menu .el-menu-item { height: 44px; line-height: 44px; }
.el-menu .el-submenu .el-menu-item { height: 44px; line-height: 44px; }
.ex-demo { min-height: calc(100vh - 100px); background-color: #fff; }
</style>