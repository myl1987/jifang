<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <router-view/>
    </transition>
    <el-footer class="footer">技术支持:设备处网络管理中心</el-footer>
  </section>

</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
}

.footer{
   position: absolute; /*相对于父元素contanier定位*/
    width: 100%;
    bottom: 0;
    text-align: center;
    font-size: 14px;
    color: gray
}
</style>
