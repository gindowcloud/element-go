<template>
  <ex-layout :menu="menu" :user-menu="userMenu" user="周明" @logout="logout" />
</template>

<script>
export default {
  data() {
    return {
      menu: [
        { title: '首页', path: '/dashboard', icon: 'el-icon-data-board' },
        { title: '组件', path: '/table', icon: 'el-icon-cherry', children: [
          { title: 'ExTable', path: '/table', children: [
            { title: 'ExTable1', path: '/table1' },
            { title: 'ExTable2', path: '/table2' },
            { title: 'ExTable3', path: '/table3' },
          ]},
          { title: 'ExView', path: '/view' },
          { title: 'ExTree', path: '/tree' },
        ]},
        { title: '设置', path: '/settings', icon: 'el-icon-setting', children: [
          { title: '设置', path: '/settings', children: [
            { title: '系统监控', path: '/system' },
            { title: '系统日志', path: '/logs' },
          ] },
        ]}        
      ],
      userMenu: [
        { title: '资料'  },
        { title: '设置', path: '/settings' },
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
