<template>
  <hips-view class="Applications" header-height="50">
    <!--导航栏-->
    <hips-nav-bar slot="header" title="应用" type="primary" />
    <!--轮播图-->
    <hips-slide>
      <hips-slide-item v-for="(item,index) in slideImages" :key="index">
        <img :src="item.picUrl" style="height: 150px;" />
      </hips-slide-item>
    </hips-slide>
    <!--模块列表-->
    <hips-row>
      <hips-col class="module" v-for="(item,index) in modules" :key="index" span="8"
        @click.native="$router.push({name:`${item.route}`})">
        <i :class="'iconfont '+item.icon" :style="{color:item.color}"></i>
        {{ item.name }}
      </hips-col>
    </hips-row>
    <!--底部菜单栏-->
    <hips-tab-bar slot="footer" v-model="activeTab">
      <hips-tab-bar-item v-for="(tab,index) in tabbars" :key="index" :dot="tab.showDot" :badge-value="tab.badgeValue">
        <span>{{tab.name}}</span>
        <img slot="icon" class="tabbarIcon" slot-scope="props"
          :src="activeTab===index ? tab.icon.active : tab.icon.normal" />
      </hips-tab-bar-item>
    </hips-tab-bar>
  </hips-view>
</template>

<script>
  import {
    View,
    NavBar,
    TabBar,
    TabBarItem,
    Slide,
    SlideItem,
    Col,
    Row
  } from '@hips/vue-ui';
  import appsNormal from '../static/dropbox.svg';
  import appsActive from '../static/dropbox-active.svg';
  import messageNormal from '../static/comment.svg';
  import messageActive from '../static/comment-active.svg';
  import userNormal from '../static/user.svg';
  import userActive from '../static/user-active.svg';

  export default {
    name: "Applications",
    components: {
      [View.name]: View,
      [NavBar.name]: NavBar,
      [TabBar.name]: TabBar,
      [TabBarItem.name]: TabBarItem,
      [Slide.name]: Slide,
      [SlideItem.name]: SlideItem,
      [Col.name]: Col,
      [Row.name]: Row
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
          color: '#ff7f50',
          icon: "icon-carryout",
          route: 'calendar'
        }, {
          name: '地图',
          color: '#6495ed',
          icon: "icon-location",
          route: 'FullScreenMap'
        }, {
          name: '图片&文件',
          color: '#40e0d0',
          icon: "icon-image-fill",
          route: 'calendar'
        }],
        tabbars: [{
          name: "应用",
          showDot: false,
          icon: {
            normal: appsNormal,
            active: appsActive,
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
          name: "我的",
          badgeValue: "0",
          showDot: true,
          icon: {
            normal: userNormal,
            active: userActive,
          }
        }]
      };
    },
    methods: {},
  };

</script>

<style scoped lang="stylus">
  .module {
    height 120px display flex flex-direction column;
    align-items center justify-content center border 1px dashed #ccc;
    font-size 12px;

    i {
      font-size 35px;
      margin-bottom 10px;
    }
  }

  .tabbarIcon {
    width: 25px;
    height: 25px;
  }

  .hips-tab-bar {
    background #f9f9f9;
  }

</style>
