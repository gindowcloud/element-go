<template>
  <ex-layout :menu="menu" user="周明" :user-menu="userMenu" @logout="logout" />
</template>

<script>
export default {
  data() {
    return {
      menu: [
        { title: '首页', path: '/dashboard', icon: 'el-icon-data-board' },
        { title: '组件', path: '/table', icon: 'el-icon-cherry', children: [
          { title: 'ExTable', path: '/table' },
          { title: 'ExTree', path: '/tree' },
        ]},
        { title: '设置', path: '/settings', icon: 'el-icon-setting', children: [
          { title: '系统设置', path: '/settings' },
        ]}        
      ],
      userMenu: [
        { title: '资料'  },
        { title: '设置' },
      ]
    }
  },
  methods: {
    logout() {
      this.$message.success('Logout')
    }
  }
}
</script>
