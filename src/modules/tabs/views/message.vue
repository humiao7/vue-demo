<template>
  <hips-view class="message" :header-height="50" :footer-height="48" header-fixed content-frozen>
    <!--导航栏-->
    <hips-nav-bar slot="header" title="消息" :right-buttons="[{buttonIcon: 'add-o',buttonLabel: ''}]"/>
    <!--滚动部分-->
    <hips-scroll ref="scroll" :scroll-options="{}">
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

  >>> .hips-view__footer {
    display none;
  }
</style>
