<template>
  <hips-view class="message" :header-height="50" :footer-height="48" header-fixed content-frozen>
    <!--导航栏-->
    <hips-nav-bar slot="header" title="消息" :right-buttons="[{buttonIcon: 'add-o',buttonLabel: ''}]"/>
    <!--滚动部分-->
    <hips-scroll ref="scroll" :scroll-options="{}">
      <div class="list">
        <div class="message-item">
          <div class="head">
            <img src="../static/xiaoji.jpg"/>
          </div>
          <div class="content">
            <div class="first-line">蚂蚁庄园<span class="time-dis">10:49</span></div>
            <div class="second-line">你的庄园多了一个神奇小屋</div>
          </div>
        </div>
        <div class="message-item">
          <div class="head">
            <img src="../static/luffy.jpg"/>
          </div>
          <div class="content">
            <div class="first-line">王路飞<span class="time-dis">2020-09-27</span></div>
            <div class="second-line">我是要成为海贼王的男人！</div>
          </div>
        </div>
      </div>
    </hips-scroll>
    <div slot="footer" class="footer-placehoder"></div>
  </hips-view>
</template>

<script>
  import {View, NavBar, Scroll, Icon} from '@hips/vue-ui';

  export default {
    name: "message",
    components: {
      [View.name]: View,
      [NavBar.name]: NavBar,
      [Scroll.name]: Scroll,
      [Icon.name]: Icon
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="stylus">
  .message {
    background: #f7f7f7;
    >>> .hips-nav-bar--default {
      background: #1677ff;
      .hips-nav-bar__buttons {
        color #fff;
        font-size 14px;
      }
      .hips-nav-bar__button--have-icon {
        font-size 20px;
      }
      .hips-nav-bar__title {
        color #fff;
      }
    }
  }

  .message-item {
    width: calc(100% - 5px);
    padding: 5px 0 0 5px;
    display: inline-flex;
    align-items: flex-start;
    background: #fff;
    .head {
      width: 50px;
      height: 50px;
      padding: 2px;
      background: #efefef;
      img {
        width 50px;
      }
    }
    .content {
      height: 50px;
      padding: 6px 10px 4px 0;
      flex: 1;
      margin: 0 0 0 10px;
      border-bottom: 1px solid #efefef;

      .first-line {
        width: 100%;
        display: inline-flex;
        align-items: flex-end;
        justify-content: space-between;
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 8px;
        .time-dis {
          font-size: 12px;
          color: #aaa;
        }
      }

      .second-line {
        font-size: 13px;
        color: #555;
      }
    }
  }

  >>> .hips-view__footer {
    display none;
  }
</style>
