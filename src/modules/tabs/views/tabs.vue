<template>
  <hips-view class="mine" :header-height="50" :footer-height="48" header-fixed content-frozen>
    <!--导航栏-->
    <hips-nav-bar :back-button="{showLeftArrow: true}" @nav-bar-back-click="goBack()">
      <div slot="center" class="tabs">
        <hips-tabs v-model="tabsActive">
          <hips-tab title="tab1"/>
          <hips-tab title="tab2"/>
          <hips-tab title="tab3"/>
          <hips-tab title="tab4"/>
        </hips-tabs>
      </div>
    </hips-nav-bar>
  </hips-view>
</template>

<script>
  import {View, NavBar, Tabs, Tab} from '@hips/vue-ui';

  export default {
    name: "tab-page",
    components: {
      [View.name]: View,
      [NavBar.name]: NavBar,
      [Tabs.name]: Tabs,
      [Tab.name]: Tab
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
