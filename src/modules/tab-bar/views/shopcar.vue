<template>
  <hips-view class="shopcar" :header-height="50" :footer-height="48" header-fixed content-frozen>
    <!--导航栏-->
    <hips-nav-bar slot="header" title="购物车"/>
    <!--滚动部分-->
    <hips-scroll ref="scroll" :scroll-options="{}">
      <div class="card">
        <div class="card-item">
          <hips-icon class="layout-icon" name="not-check"/>
          <div class="layout-content">
            <div class="shop-name">
              <i class="tmail-icon iconfont icon-tianmao"></i>
              <span class="name">华为官方旗舰店</span>
              <hips-icon name="arrow" color="#aaa"/>
            </div>
          </div>
        </div>
        <div class="card-item" style="margin-top:10px;">
          <hips-icon class="layout-icon" name="not-check"/>
          <div class="layout-content">
            <div class="goods-detail">
              <img src="../static/HUAWEI.jpg">
              <div class="buy-detail">
                <h4>华为/HUAWEI MateBook X Pro</h4>
                <select>
                  <option>深空灰 i7+16G+512</option>
                </select>
                <div class="amount-money">
                  <span class="amount">￥9999</span>
                  <div class="quantity">×1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-item">
          <hips-icon class="layout-icon" name="not-check"/>
          <div class="layout-content">
            <div class="shop-name">
              <i class="tmail-icon iconfont icon-tianmao"></i>
              <span class="name">Apple Store 官方</span>
              <hips-icon name="arrow" color="#aaa"/>
            </div>
          </div>
        </div>
        <div class="card-item" style="margin-top:10px;">
          <hips-icon class="layout-icon" name="not-check"/>
          <div class="layout-content">
            <div class="goods-detail">
              <img src="../static/MBP.png">
              <div class="buy-detail">
                <h4>Apple/苹果 16 英寸 MacBook</h4>
                <select>
                  <option>深空灰色</option>
                </select>
                <div class="amount-money">
                  <span class="amount">￥18999</span>
                  <div class="quantity">×1</div>
                </div>
              </div>
            </div>
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
    name: "shopcar",
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
  .shopcar {
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
  }

  .card {
    width: calc(96% - 20px);
    padding: 10px;
    margin: 10px 2% 0;
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
  }

  .card-item {
    width 100%;
    display inline-flex;
    align-items center;
    .layout-icon {
      flex-basis 10%;
      font-size: 18px;
      color: #999;
    }
    .layout-content {
      flex 1;
      .shop-name {
        display: inline-flex;
        align-items: center;
        justify-content: flex-start;
        .tmail-icon {
          color: #bc0000;
          font-size: 20px;
          margin-right: 5px;
        }
        .name {
          font-size 14px;
          font-weight bold;
          margin-right 5px;
        }
      }
      .goods-detail {
        width: 100%;
        display inline-flex;
        align-items center;
        img {
          width: 80px;
          margin-right: 5px;
          border: 1px solid #f9f9f9;
          background: #f9f9f9;
        }
        .buy-detail {
          flex 1;
          h4 {
            width 100%;
            font-size: 14px;
            color: #222;
            overflow hidden;
            white-space nowrap;
            text-overflow ellipsis;
          }
          select {
            width: 100%;
            margin 4px 0;
            padding: 2px 0;
            color: #888;
            font-size: 13px;
            border: none;
            border-radius 2px;
            background: #efefef;
          }
          .amount-money {
            width 100%;
            display inline-flex;
            align-items center;
            justify-content space-between;
            .amount {
              font-weight bold;
              color #ff5722;
            }
            .quantity {
              margin: 2px 0;
              padding: 3px;
              color: #333;
              font-size: 12px;
              border: 1px solid #aaa;
              border-radius: 2px;
            }
          }
        }
      }
    }

  }

  >>> .hips-view__footer {
    display none;
  }
</style>
