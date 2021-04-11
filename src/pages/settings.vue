<template>
  <div class="container"><el-link @click="system">更多设置</el-link></div>
</template>

<script>
export default {
  methods: {
    system() {
      this.$router.push('/system')
    }
  }
}
</script>