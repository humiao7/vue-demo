<template>
  <hips-view class="seting" :header-height="50" header-fixed :footer-height="48" content-frozen>
    <!--导航栏-->
    <hips-nav-bar slot="header" :back-button="{showLeftArrow: true}" title="设置" @nav-bar-back-click="goBack()"/>
    <hips-scroll ref="scroll" :scroll-options="{}">
      <hips-switch-cell class="forms-line" v-model="pushModel" @change="pushModelChange" title="消息通知"/>
      <hips-switch-cell class="forms-line" v-model="easyLogin" @change="easyLoginChange" title="指纹登陆"/>
    </hips-scroll>
    <div slot="footer">
      <div class="footer" @click="logoutApp">
        <hips-icon name="logout" color="#f97a74" :size="25"/>
        <div class="logout-title">退出登录</div>
      </div>
    </div>
  </hips-view>
</template>

<script>
  import {View, NavBar, Scroll, Icon, SwitchCell} from '@hips/vue-ui';

  export default {
    name: "seting",
    components: {
      [View.name]: View,
      [NavBar.name]: NavBar,
      [Scroll.name]: Scroll,
      [Icon.name]: Icon,
      [SwitchCell.name]: SwitchCell
    },
    data() {
      return {
        pushModel: false,
        easyLogin: false
      }
    },
    mounted() {
      if (window.localStorage.pushModel) {
        this.pushModel = window.localStorage.pushModel === 'true';
      } else {
        window.localStorage.pushModel = false;
        this.pushModel = window.localStorage.pushModel === 'true';
      }

      if (window.localStorage.easyLogin) {
        this.easyLogin = window.localStorage.easyLogin === 'true';
      } else {
        window.localStorage.easyLogin = false;
        this.easyLogin = window.localStorage.easyLogin === 'true';
      }
    },
    methods: {
      // 返回功能
      goBack() {
        this.$router.back();
      },

      // 退出登录
      logoutApp() {
        this.$router.push({name: 'login'});
      },

      pushModelChange() {
        window.localStorage.pushModel = this.pushModel;
      },

      easyLoginChange() {
        window.localStorage.easyLogin = this.easyLogin;
      }
    }
  }
</script>

<style scoped lang="stylus">
  .seting {
    background #f7f7f7;
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

  .footer {
    width: 100%;
    height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    .logout-title {
      color: #f97a74;
      font-size: 16px;
      margin-left: 10px;
    }
  }
</style>
