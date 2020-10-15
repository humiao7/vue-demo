<template>
  <hips-view class="login" content-frozen>
    <div class="logo">
      <img src="../static/login.svg">
    </div>
    <div class="login-input">
      <hips-input v-model="phone" show-clear-button label-icon="mine-o" placeholder="请输入手机号" type="number"
                  label-position="left"
                  input-align="left"/>
      <hips-input v-model="verificationCode" show-clear-button label-icon=" iconfont icon-shouji" placeholder="输入验证码"
                  type="text"
                  label-position="left"
                  input-align="left">
        <hips-button slot="right" type="primary" style="margin-top: 8px;" :disabled="timer>0"
                     @click="getVerificationCode">
          {{timer>0?timer+ 's 后重新获取':'获取验证码'}}
        </hips-button>
      </hips-input>
    </div>
    <div class="login-button">
      <hips-button type="primary" block ripple :disabled="!phone || !verificationCode" @click="loginApp">登录
      </hips-button>
    </div>
  </hips-view>
</template>

<script>
  import {View, Input, Button} from '@hips/vue-ui';

  export default {
    name: "login",
    components: {
      [View.name]: View,
      [Input.name]: Input,
      [Button.name]: Button
    },
    data() {
      return {
        phone: 123456789,
        verificationCode: null,
        timer: 0,
        intervalObj: null,
        timeoutObj: null,
        randVerCode: -9999,
      }
    },
    destroyed() {
      console.log("销毁计时器");
      clearInterval(this.intervalObj);
      clearTimeout(this.timeoutObj);
    },
    methods: {
      // 获取验证码
      getVerificationCode() {
        if (this.timer <= 0) {
          if (!this.phone) {
            this.$hips.dialog.alert({
              title: '提示',
              content: '请输入手机号',
              okText: '确定',
              closable: false
            });
          } else {
            this.timer = 60;
            this.verificationCode = null;
            this.intervalObj = setInterval(() => {
              if (this.timer <= 0) {
                clearInterval(this.intervalObj);
              } else {
                this.timer--
              }
            }, 1000);
            this.timeoutObj = setTimeout(() => {
              this.randVerCode = Math.floor(Math.random() * 10000);
              this.$hips.dialog.alert({
                title: '模拟验证码',
                content: '你的验证码为：' + this.randVerCode,
                okText: '确定',
                closable: false,
                onOk: () => {
                  this.verificationCode = this.randVerCode;
                }
              });
            }, 1500);
          }
        }
      },

      // 登录
      loginApp() {
        if (this.verificationCode === this.randVerCode) {
          this.timer = 0;
          this.verificationCode = null;
          this.randVerCode = -9999;
          this.$router.push({name: 'tab-bar'});
        } else {
          this.$hips.dialog.alert({
            title: '提示',
            content: '验证码错误',
            okText: '确定',
            closable: false
          });
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .login {
    background #ffca85;
    .logo {
      height: 40vh;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width 55%;
      }
    }
    .login-input {
      width: 90%;
      margin: 0 5%;
      overflow: hidden;
      border-radius: 5px;
    }
    .login-button {
      width: 90%;
      margin: 0 5%;
      padding: 10% 0 0;
    }
  }
</style>
