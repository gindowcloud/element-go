<template>
  <div class="ex-demo">
    <ex-view title="个人资料" :loading="loading" v-model="data" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      loading: false,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      this.$api.users().then(ret => {
        const dt = ret.data[0]
        this.data = {
          '客户姓名': dt.name,
          '客户年龄': dt.age,
          '联系电话': dt.phone,
          '所在地区': dt.county,
          '资产余额': '￥' + dt.money.thousands(),
          '注册日期': dt.date,
        }
        this.loading = false
      }).catch(() => {})
    }
  }
}
</script>
