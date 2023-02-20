<template>
  <div class="demo">
    <div class="title">Element Go</div>
    <div><ex-pagination :total="100" /></div>
    <div><ex-loading /></div>
    <div><ex-page-header back title="文章标题" intro="好的文章往往从描述开始" /></div>
  </div>
</template>

<style scoped>
.demo { max-width: 1200px; margin: 0 auto; }
.title { display: flex; justify-content: center; align-items: center; height: 100px; }
</style>
