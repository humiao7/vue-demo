<template>
  <hips-view class="mine" :header-height="50" :footer-height="48" header-fixed content-frozen>
    <!--导航栏-->
    <hips-nav-bar slot="header" title="我的" :right-buttons="[{buttonIcon: '',buttonLabel: '设置'}]"/>
    <!--滚动部分-->
    <hips-scroll ref="scroll" :scroll-options="{}">
      <div class="my-information" @click="$router.push({name:'my-information'})">
        <div class="header-box">
          <img src="../static/user-header.jpg">
          <div class="level-icon">
            <hips-icon name="collection"/>
          </div>
        </div>
        <div class="user-information">
          <div class="user-name">Humiao</div>
          <div class="user-account">humiao618@outlook.com</div>
        </div>
        <hips-icon name="arrow" color="#fff"/>
      </div>
      <div class="list">
        <a class="list-item" href="https://humiao7.github.io/humiao.cv/">
          <i class="iconfont icon-mingpian" style="color: #00b478"></i>
          <div class="menu-name">Personal Home Page</div>
          <hips-icon name="arrow"/>
        </a>
        <a class="list-item" href="https://github.com/humiao7">
          <i class="iconfont icon-github" style="color: #6b2a88"></i>
          <div class="menu-name">Github</div>
          <hips-icon name="arrow"/>
        </a>
        <a class="list-item" href="mailto:humiao618@outlook.com?subject=邮件标题&body=邮件内容">
          <i class="iconfont icon-email" style="color: #0071c5"></i>
          <div class="menu-name">Email</div>
          <hips-icon name="arrow"/>
        </a>
      </div>
    </hips-scroll>
    <div slot="footer" class="footer-placehoder"></div>
  </hips-view>
</template>

<script>
  import {View, NavBar, Scroll, Icon} from '@hips/vue-ui';

  export default {
    name: "mine",
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
  .mine {
    background: #f7f7f7;
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
    .my-information {
      width: calc(100% - 40px);
      height: 80px;
      padding: 0 20px;
      display: inline-flex;
      align-items: center;
      background: #1677ff;
      .header-box {
        position relative;
        height 60px;
        width 60px;
        background #fff;
        border-radius 4px;
        img {
          width: 100%;
        }
        .level-icon {
          height: 15px;
          width: 15px;
          overflow: hidden;
          position: absolute;
          bottom: 0px;
          right: -8px;
          background: #ca981e;
          border: 2px solid #fff;
          border-radius: 10px;
          box-shadow: 0px 1px 1px #aaa;
          .hips-icon {
            color: #f9e397;
            margin-top: -2px;
          }
        }
      }
      .user-information {
        flex: 1;
        padding: 0 15px;
        color #fff;
        .user-name {
          font-size: 16px;
          font-weight: bold;
          line-height: 30px;
        }
        .user-account {
          width: fit-content;
          font-size: 14px;
          padding: 3px 10px;
          border: 1px solid #aaa;
          border-radius: 15px;
          background: #ffffff1f;
        }
      }
    }

    .list-item {
      width: calc(100% - 40px);
      display: inline-flex;
      align-items: center;
      padding: 10px 20px;
      background #fff;
      border-bottom: 1px solid #efefef;
      i {
        font-size 22px;
        color #333;
      }
      .menu-name {
        flex 1;
        padding: 0 10px;
        color #555;
      }
      .hips-icon {
        font-size 18px;
        color #aaa;
      }
    }
  }

  >>> .hips-view__footer {
    display none;
  }
</style>
