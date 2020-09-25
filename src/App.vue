<template>
  <div id="app">
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }

</script>

<style lang="stylus">
  // @import 'http://at.alicdn.com/t/font_2083173_08l76ay4tspq.css'; // 阿里图标库在线图标

  /* 为对应的路由跳转时设置动画效果 */
  .fade-enter-active, .fade-leave-avtive {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
