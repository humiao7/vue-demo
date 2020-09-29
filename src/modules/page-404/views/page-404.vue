<template>
  <hips-view class="page-404" :header-height="50" :footer-height="48" header-fixed content-frozen>
    <!--导航栏-->
    <hips-nav-bar :back-button="{showLeftArrow: true}" title="404" @nav-bar-back-click="goBack()"/>
    <div id="clock">
      <p class="date">...404 error page...</p>
      <p class="time">{{ time }}</p>
      <p class="text">{{ date }}</p>
    </div>
  </hips-view>
</template>

<script>
  import {View, NavBar} from '@hips/vue-ui';

  export default {
    name: "page-404",
    components: {
      [View.name]: View,
      [NavBar.name]: NavBar
    },
    data() {
      return {
        time: '',
        date: ''
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

  .page-404 {
    background: #0f3854;
    background: -webkit-radial-gradient(center ellipse, #0a2e38 0%, #000000 70%);
    background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%);
    background-size: 100%;
  }

  p {
    margin: 0;
    padding: 0;
  }

  #clock {
    font-family: 'Share Tech Mono', monospace;
    color: #ffffff;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: #daf6ff;
    text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
  }

  #clock .time {
    letter-spacing: 0.05em;
    font-size: 60px;
    padding: 5px 0;
  }

  #clock .date {
    letter-spacing: 0.1em;
    font-size: 15px;
  }

  #clock .text {
    letter-spacing: 0.1em;
    font-size: 12px;
    padding: 20px 0 0;
  }
</style>
