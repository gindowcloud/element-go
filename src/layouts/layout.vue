<template>
  <ex-layout
    :menu="menu"
    :is-collapse="isCollapse" @collapse="collapse" />
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
      menu: [
        { title: '首页', path: '/dashboard', icon: 'el-icon-data-board' },
        { title: '数据', path: '/statistics', icon: 'el-icon-s-data' },
        { title: '订单', path: '/orders/index', icon: 'el-icon-shopping-cart-2', children: [
          { title: '服务订单', path: '/orders/services' },
          { title: '服务评价', path: '/orders/reviews' },
          { title: '卡券订单', path: '/orders/coupons' },
          { title: '油卡订单', path: '/orders/fuelcards' },
          { title: '余额充值', path: '/orders/deposits' },
          { title: '话费充值', path: '/orders/topup' },
        ]},
        { title: '商户', path: '/shops', icon: 'el-icon-house', children: [
          { title: '门店管理', path: '/shops' },
          { title: '企业客户', path: '/shops/clients' },
        ]},
        { title: '用户', path: '/users', icon: 'el-icon-user', children: [
          { title: '用户管理', path: '/users' },
          { title: '用户卡券', path: '/users/coupons' },
        ]},
        { title: '财务', path: '/finance/transitions', icon: 'el-icon-coin', children: [
          { title: '转账记录', path: '/finance/transitions' },
          { title: '提现记录', path: '/finance/withdrawals' },
        ]},
        { title: '设置', path: '/settings', icon: 'el-icon-setting', children: [
          { title: '系统配置', path: '/settings' },
          { title: '服务类型', path: '/settings/categories' },
          { title: '地区管理', path: '/settings/areas' }
        ]}        
      ]
    }
  },
  methods: {
    collapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

