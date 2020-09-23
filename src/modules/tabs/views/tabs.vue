<template>
  <div class="tabs">
    <applications v-show="activeTab===0"></applications>
    <message v-show="activeTab===1"></message>
    <shopcar v-show="activeTab===2"></shopcar>
    <mine v-show="activeTab===3"></mine>
    <hips-tab-bar v-model="activeTab">
      <hips-tab-bar-item v-for="(tab,index) in tabbars" :key="index" :dot="tab.showDot" :badge-value="tab.badgeValue">
        <span>{{tab.name}}</span>
        <img slot="icon" class="tabbarIcon" :src="activeTab===index ? tab.icon.active : tab.icon.normal"/>
      </hips-tab-bar-item>
    </hips-tab-bar>
  </div>
</template>

<script>
  import {TabBar, TabBarItem} from '@hips/vue-ui';
  import Applications from './applications';
  import Message from './message';
  import Shopcar from './shopcar';
  import Mine from './mine';

  import homeNormal from '../static/home.svg';
  import homeActive from '../static/home-fill.svg';
  import messageNormal from '../static/message.svg';
  import messageActive from '../static/message-fill.svg';
  import shopCarNormal from '../static/shopcar.svg';
  import shopCarActive from '../static/shopcar-fill.svg';
  import mineNormal from '../static/mine.svg';
  import mineActive from '../static/mine-fill.svg';

  export default {
    name: "tabs",
    components: {
      Shopcar,
      [TabBar.name]: TabBar,
      [TabBarItem.name]: TabBarItem,
      [Applications.name]: Applications,
      [Message.name]: Message,
      [Shopcar.name]: Shopcar,
      [Mine.name]: Mine
    },
    data() {
      return {
        activeTab: 0,
        tabbars: [{
          name: "首页",
          showDot: false,
          icon: {
            normal: homeNormal,
            active: homeActive,
          }
        }, {
          name: "消息",
          badgeValue: "110",
          showDot: false,
          icon: {
            normal: messageNormal,
            active: messageActive,
          }
        }, {
          name: "购物车",
          badgeValue: "0",
          showDot: true,
          icon: {
            normal: shopCarNormal,
            active: shopCarActive,
          }
        }, {
          name: "我的",
          badgeValue: "0",
          showDot: true,
          icon: {
            normal: mineNormal,
            active: mineActive,
          }
        }],
        scrollOption: { //滚动加载的配置
          pullDownRefresh: {
            threshold: 60, // 触发 pullingDown 的距离
            stop: 40, // pullingDown 正在刷新 hold 时的距离
            txt: "刷新成功"
          },
          pullUpLoad: {
            txt: {
              more: "加载更多",
              noMore: "-----我是有底线的-----"
            }
          }
        }
      };
    },
    methods: {},
  };

</script>

<style scoped lang="stylus">

  .tabs {
    width 100vw;
    height 100vh;
  }

  .tabbarIcon {
    width: 25px;
    height: 25px;
  }

  .hips-tab-bar {
    background #f9f9f9;
  }

</style>
