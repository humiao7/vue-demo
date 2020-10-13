<template>
  <hips-view class="payment" :header-height="50" :footer-height="48" header-fixed content-frozen>
    <!--导航栏-->
    <hips-nav-bar :back-button="{showLeftArrow: true}" title="付钱 / 收钱" @nav-bar-back-click="goBack()"/>
    <hips-scroll ref="scroll" :scroll-options="{}">
      <div class="payment-card">
        <div class="member-level">
          <div class="level-name">黄金会员</div>
        </div>
        <div class="pay-type">
          <i class="iconfont icon-pay"></i>
          <div>向商家付钱</div>
          <hips-icon name="more-1" color="#aaa" :size="26"/>
        </div>
        <div class="bar-code">
          <barcode :value="paymentIdCode" font-options="bold" :display-value="false">
            Can't generate the barcode
          </barcode>
        </div>
        <div class="payment-id-dis">2549 ****** 查看数字</div>
        <div class="qrcode">
          <vue-qr :text="paymentIdCode" :margin="0" colorDark="#000" colorLight="#fff" :logoSrc="logoIcon"
                  :size="200"></vue-qr>
        </div>
        <div class="pay-ways">
          <i class="iconfont icon-yuebao"></i>
          <div class="pay-warmimg">
            <label>余额宝</label>
            <div>优先使用此付款方式</div>
          </div>
          <hips-icon name="arrow" color="#aaa"/>
        </div>
      </div>
      <div class="other-card">
        <div class="other-item" style="border: none;">
          <i class="iconfont icon-collect"></i>
          <div class="other-name">收款</div>
          <hips-icon name="arrow" color="#fff"/>
        </div>
        <div class="other-item">
          <i class="iconfont icon-buscode"></i>
          <div class="other-name">乘车码</div>
          <hips-icon name="arrow" color="#fff"/>
        </div>
        <div class="other-item">
          <i class="iconfont icon-scan"></i>
          <div class="other-name">扫码付</div>
          <hips-icon name="arrow" color="#fff"/>
        </div>
      </div>
    </hips-scroll>
  </hips-view>
</template>

<script>
  import {View, NavBar, Scroll, Icon} from '@hips/vue-ui';
  import VueBarcode from 'vue-barcode'
  import VueQr from 'vue-qr'
  import logoIcon from '../static/zhifubao.svg'

  export default {
    name: "charts",
    components: {
      [View.name]: View,
      [NavBar.name]: NavBar,
      [Scroll.name]: Scroll,
      [Icon.name]: Icon,
      "barcode": VueBarcode,
      "vue-qr": VueQr
    },
    data() {
      return {
        paymentIdCode: "Hello Vue!",
        logoIcon: logoIcon,
        timeInterval: null
      }
    },
    mounted() {
      this.timeInterval = setInterval(() => {
        console.log("刷新");
        this.refreshPaymentId();
      }, 5000)
    },
    destroyed() {
      console.log("清除定时器");
      clearInterval(this.timeInterval)
    },
    methods: {
      // 返回功能
      goBack() {
        this.$router.back();
      },
      // 刷新支付码
      refreshPaymentId() {
        this.paymentIdCode = "Hello Vue" + Math.floor(Math.random() * 100)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .payment {
    background: #1677ff;
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

  .payment-card {
    margin: 10px 10px 0;
    padding: 0 0 5px;
    overflow: hidden;
    border-radius: 5px;
    background: #fff;
    .member-level {
      width: 100%;
      height: 20px;
      margin-bottom: 10px;
      text-align: center;
      background: #d79a6e;
      .level-name {
        position: absolute;
        left: 32%;
        top: 11px;
        display: inline-block;
        padding: 8px 40px 5px;
        font-size: 14px;
        color: #fff;
        background: #d79a6e;
        border-bottom-left-radius: 150px;
        border-bottom-right-radius: 150px;
      }
    }
    .pay-type {
      width: calc(100% - 20px);
      margin: 0 10px;
      padding: 0 0 5px;
      display inline-flex;
      align-items center;
      justify-content space-between;
      border-bottom: 1px solid #efefef;
      .icon-pay {
        font-size 20px;
        font-weight bold;
      }
      div {
        flex 1;
        padding: 0 0 0 10px;
        font-size: 15px;
        font-weight: bold;
      }
    }
    .bar-code {
      text-align center;
      img {
        width 80%;
      }
    }
    .payment-id-dis {
      width: 100%;
      padding: 0 0 10px;
      font-size: 12px;
      text-align: center;
      color: #888;
    }
    .qrcode {
      text-align center;
      img {
        width 45%;
      }
    }
    .pay-ways {
      width: calc(100% - 20px);
      margin: 15px 10px 0;
      padding: 5px 0;
      border-top: 1px solid #efefef;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      .iconfont {
        font-size: 22px;
        color: #f55302;
      }
      .pay-warmimg {
        flex: 1;
        padding: 0 0 0 10px;
        label {
          font-size 14px;
        }
        div {
          padding: 8px 0 0;
          font-size 12px;
          color #aaa;
        }
      }
    }
  }

  .other-card {
    margin: 10px 10px 0;
    padding: 0;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.3);

    .other-item {
      width: calc(100% - 20px);
      margin: 0 10px;
      padding: 10px 0;
      border-top: 1px solid #f9f9f9;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      .iconfont {
        font-size: 22px;
        color: #fff;
      }
      .other-name {
        flex: 1;
        padding: 0 0 0 10px;
        font-size 14px;
        text-align left;
        color #fff;
      }
    }
  }
</style>
