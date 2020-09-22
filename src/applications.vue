<template>
  <hips-view class="applications" :header-height="50" :sub-header-height="80" :footer-height="48" header-fixed
    sub-header-fixed content-frozen>
    <!--导航栏-->
    <div slot="header" class="nav-bar">
      <div class="nav-button-left">
        <span>上海</span>
        <span>晴 25℃</span>
      </div>
      <div class="search-div">
        <hips-search placeholder="招商银行 600036.SH" show-clear-button />
      </div>
      <div class="nav-button-right">
        <hips-icon name="add-o" color="#fff" />
      </div>
    </div>
    <div slot="sub-header" class="sub-buttons">
      <div class="top-button">
        <i class="iconfont icon-scan"></i>
        <span>扫一扫</span>
      </div>
      <div class="top-button">
        <i class="iconfont icon-pay"></i>
        <span>付钱/收钱</span>
      </div>
      <div class="top-button">
        <i class="iconfont icon-travel"></i>
        <span>出行</span>
      </div>
      <div class="top-button">
        <i class="iconfont icon-card"></i>
        <span>卡包</span>
      </div>
    </div>
    <!--滚动部分-->
    <hips-scroll ref="scroll" :data="modules" :scroll-options="scrollOption" @pulling-down="loadRefresh"
      @pulling-up="loadMore">
      <div class="sub-apps">
        <div class="app-item" v-for="(item,index) in modules" :key="index"
          @click="$router.push({name:`${item.route}`})">
          <i :class="'iconfont '+item.icon" :style="{color:item.color}"></i>
          <span>{{ item.name }}</span>
        </div>
      </div>
      <!--轮播图-->
      <div class="card">

      </div>
      <hips-slide>
        <hips-slide-item v-for="(item,index) in slideImages" :key="index">
          <img :src="item.picUrl" style="height: 150px;" />
        </hips-slide-item>
      </hips-slide>
    </hips-scroll>
    <!--底部菜单栏-->
    <hips-tab-bar slot="footer" v-model="activeTab">
      <hips-tab-bar-item v-for="(tab,index) in tabbars" :key="index" :dot="tab.showDot" :badge-value="tab.badgeValue">
        <span>{{tab.name}}</span>
        <img slot="icon" class="tabbarIcon" :src="activeTab===index ? tab.icon.active : tab.icon.normal" />
      </hips-tab-bar-item>
    </hips-tab-bar>
  </hips-view>
</template>

<script>
  import {
    View,
    Scroll,
    TabBar,
    TabBarItem,
    Slide,
    SlideItem,
    Search,
    Icon
  } from '@hips/vue-ui';
  import homeNormal from '../static/home.svg';
  import homeActive from '../static/home-fill.svg';
  import messageNormal from '../static/message.svg';
  import messageActive from '../static/message-fill.svg';
  import shopCarNormal from '../static/shopcar.svg';
  import shopCarActive from '../static/shopcar-fill.svg';
  import mineNormal from '../static/mine.svg';
  import mineActive from '../static/mine-fill.svg';

  export default {
    name: "Applications",
    components: {
      [View.name]: View,
      [Scroll.name]: Scroll,
      [TabBar.name]: TabBar,
      [TabBarItem.name]: TabBarItem,
      [Slide.name]: Slide,
      [SlideItem.name]: SlideItem,
      [Search.name]: Search,
      [Icon.name]: Icon
    },
    data() {
      return {
        activeTab: 0,
        slideImages: [{
            linkUrl: 'http://y.qq.com/w/album.html?albummid=0044K2vN1sT5mE',
            picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000001YCZlY3aBifi.jpg',
          },
          {
            linkUrl: 'https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=2197820&g_f=shoujijiaodian',
            picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000004ckGfg3zaho0.jpg',
          },
        ],
        modules: [{
          name: '日历',
          color: '#2a83fe',
          icon: "icon-calendar1",
          route: 'calendar'
        }, {
          name: '地图',
          color: '#fea917',
          icon: "icon-huititle",
          route: 'FullScreenMap'
        }, {
          name: '附件',
          color: '#fd5f10',
          icon: "icon-text",
          route: 'calendar'
        }, {
          name: '图表',
          color: '#00b478',
          icon: "icon-barchart",
          route: 'calendar'
        }, {
          name: '列表',
          color: '#ed4112',
          icon: "icon-classification",
          route: 'calendar'
        }, {
          name: '全部',
          color: '#aaa',
          icon: "icon-more",
          route: 'calendar'
        }],
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
    methods: {
      loadRefresh() {
        setTimeout(() => {

        }, 3000)
      },
      loadMore() {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scroll.forceUpdate()
          }, 3000)
        })
      }
    },
  };

</script>

<style scoped lang="stylus">
  .applications {
    background: #f7f7f7;
  }

  .nav-bar {
    height 50px;
    width 100%;
    display inline-flex;
    align-items center;
    color #fff;
    background: #1677ff;

    .nav-button-left {
      flex-basis 16%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }

    .nav-button-right {
      flex-basis 10%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .search-div {
      flex: 1;
    }
  }

  .sub-buttons {
    height 80px;
    width 100%;
    display inline-flex;
    align-items center;
    background: #1677ff;

    .top-button {
      flex: 1;
      display flex;
      flex-direction: column;
      align-items center;
      color #fff;
      font-size: 12px;

      i {
        font-size: 30px;
        font-font-weight: bold;
        margin-bottom 10px;
      }
    }
  }

  .sub-apps {
    width 100%;
    display inline-flex;
    align-items center;
    justify-content flex-start;
    flex-wrap: wrap;

    .app-item {
      flex-basis: 20%;
      height: 20vw;
      display flex;
      flex-direction column;
      align-items center;
      justify-content center;
      font-size: 12px;
      color #555;

      i {
        font-size: 25px;
        margin-bottom 5px;
      }
    }
  }

  .card {
    height 100px;
    width 94%;
    margin 10px 3% 0;
    background #fff;
    border-radius: 5px;
  }

  .tabbarIcon {
    width: 25px;
    height: 25px;
  }

  .hips-tab-bar {
    background #f9f9f9;
  }

</style>
