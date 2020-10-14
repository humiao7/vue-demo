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
        <hips-search placeholder="招商银行 600036.SH" show-clear-button/>
      </div>
      <div class="nav-button-right">
        <hips-icon name="add-o" color="#fff"/>
      </div>
    </div>
    <div slot="sub-header" class="sub-buttons">
      <div class="top-button" @click="scanQrCode">
        <i class="iconfont icon-scan"></i>
        <span>扫一扫</span>
      </div>
      <div class="top-button" @click="$router.push({name:'payment'})">
        <i class="iconfont icon-pay_collect"></i>
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
    <hips-scroll ref="scroll" :data="apps" :scroll-options="scrollOption" @pulling-down="loadRefresh"
                 @pulling-up="loadMore">
      <div class="sub-apps">
        <div class="app-item" v-for="(item,index) in apps" :key="index"
             @click="$router.push({name:`${item.route}`})">
          <i :class="'iconfont '+item.icon" :style="{color:item.color}"></i>
          <span>{{ item.name }}</span>
        </div>
      </div>
      <div class="card">
        <div class="message-div">
          <div class="message" style="margin-bottom:10px;">你本次支付获得以下奖励<span>1小时前</span></div>
          <div class="message">付款成功 ¥100.00<span>1小时前</span></div>
        </div>
        <div class="more-div">
          <div class="dot"></div>
          <hips-icon name="arrow" color="#aaa"/>
        </div>
      </div>
      <!--轮播图-->
      <hips-slide height="100" loop auto-play>
        <hips-slide-item v-for="(item,index) in slideImages" :key="index">
          <img :src="item.picUrl" style="height: 150px;"/>
        </hips-slide-item>
      </hips-slide>
    </hips-scroll>
    <div slot="footer" class="footer-placehoder"></div>
  </hips-view>
</template>

<script>
  import {View, Scroll, Slide, SlideItem, Search, Icon} from '@hips/vue-ui';
  import {applicationsService} from "../api"

  export default {
    name: "applications",
    components: {
      [View.name]: View,
      [Scroll.name]: Scroll,
      [Slide.name]: Slide,
      [SlideItem.name]: SlideItem,
      [Search.name]: Search,
      [Icon.name]: Icon
    },
    data() {
      return {
        slideImages: [{
          linkUrl: 'http://y.qq.com/w/album.html?albummid=0044K2vN1sT5mE',
          picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000001YCZlY3aBifi.jpg',
        },
          {
            linkUrl: 'https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=2197820&g_f=shoujijiaodian',
            picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000004ckGfg3zaho0.jpg',
          },
        ],
        apps: [{
          name: '全部',
          color: '#aaa',
          icon: "icon-more",
          route: '404'
        }],
        //滚动加载的配置
        scrollOption: {
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
    mounted() {
      this.apps = [...applicationsService.getAppList(), ...this.apps];
    },
    methods: {
      loadRefresh() {
        setTimeout(() => {
          this.$refs.scroll.forceUpdate();
        }, 3000)
      },
      loadMore() {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scroll.forceUpdate()
          }, 3000)
        })
      },
      // 扫码二维码
      scanQrCode() {
        this.$hips.dialog.alert({
          title: '提示',
          content: '相机调用失败，请前往移动端体验完整功能',
          okText: '确定',
          closable: false,
          onOk() {
            // on OK
          },
        });
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
      overflow: hidden;
    }
  }

  .sub-buttons {
    height 80px;
    width 100%;
    display inline-flex;
    align-items center;
    background: #1677ff;
    z-index 999;

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
    width: calc(96% - 20px);
    padding: 10px;
    margin: 10px 2% 0;
    background: #fff;
    border-radius: 5px;
    display: inline-flex;
    align-items: center;

    .message-div {
      flex: 1;

      .message {
        font-size: 12px;
        color: #000;

        span {
          margin 0 0 0 10px;
          color #aaa;
        }
      }
    }

    .more-div {
      flex-basis: 10%;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;

      .dot {
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: red;
      }
    }
  }

  .hips-slide {
    width 96%;
    margin 10px 2% 0;
    background #fff;
    border-radius: 5px;
  }

  >>> .hips-view__footer {
    display none;
  }

</style>
