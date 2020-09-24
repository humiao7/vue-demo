<template>
  <hips-view class="charts" :header-height="50" :footer-height="48" header-fixed content-frozen>
    <!--导航栏-->
    <hips-nav-bar :back-button="{showLeftArrow: true}" title="图表" @nav-bar-back-click="goBack()"/>
  </hips-view>
</template>

<script>
  import {View, NavBar} from '@hips/vue-ui';

  export default {
    name: "charts",
    components: {
      [View.name]: View,
      [NavBar.name]: NavBar
    },
    data() {
      return {
        tabsActive: 0
      }
    },
    methods: {
      // 返回功能
      goBack() {
        this.$router.back();
      },
    }
  }
</script>

<style scoped lang="stylus">
  >>> .hips-nav-bar--default {
    background: #1677ff;
    .hips-nav-bar__buttons {
      color #fff;
      font-size 14px;
    }
    .hips-nav-bar__title {
      color #fff;
    }
  }
</style>
