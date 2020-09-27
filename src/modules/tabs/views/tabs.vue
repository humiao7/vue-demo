<template>
  <hips-view class="tabs" :header-height="50" :footer-height="48" header-fixed content-frozen>
    <!--导航栏-->
    <hips-nav-bar :back-button="{showLeftArrow: true}" title="选项卡" @nav-bar-back-click="goBack()"/>
    <hips-tabs v-model="tabsActive1" class="tabs-item" swipeable animated>
      <hips-tab title="标签1"> Tab1 Content</hips-tab>
      <hips-tab title="标签2"> Tab2 Content</hips-tab>
      <hips-tab title="标签3" disabled> Tab3 Content</hips-tab>
      <hips-tab title="标签4"> Tab4 Content</hips-tab>
    </hips-tabs>

    <hips-tabs v-model="tabsActive2" class="tabs-item">
      <hips-tab v-for="index in 8" :title="`标签${index}`" :key="index">
        Tab{{ index }} Content
      </hips-tab>
    </hips-tabs>

    <hips-tabs v-model="tabsActive3" type="card" color="orange" class="tabs-item" swipeable animated>
      <hips-tab v-for="index in 4" :title="`标签${index}`" :key="index">
        Tab {{ index }}
      </hips-tab>
    </hips-tabs>

    <hips-tabs v-model="tabsActive4" swipeable animated>
      <hips-tab v-for="index in 2" :key="index">
        <div slot="title">
          <hips-icon name="collection-o"/>
          标签 {{ index }}
        </div>
        Tab1 {{ index }}
      </hips-tab>
    </hips-tabs>
  </hips-view>
</template>

<script>
  import {View, NavBar, Tabs, Tab, Icon} from '@hips/vue-ui';

  export default {
    name: "tab-page",
    components: {
      [View.name]: View,
      [NavBar.name]: NavBar,
      [Tabs.name]: Tabs,
      [Tab.name]: Tab,
      [Icon.name]: Icon
    },
    data() {
      return {
        tabsActive1: 0,
        tabsActive2: 0,
        tabsActive3: 0,
        tabsActive4: 0,
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
  .tabs {
    background #f7f7f7;
    .tabs-item {
      margin-bottom: 10px;
    }
  }

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
