<template>
  <hips-view class="waterfall" :header-height="50" :footer-height="48" header-fixed content-frozen>
    <!--导航栏-->
    <hips-nav-bar :back-button="{showLeftArrow: true}" title="瀑布流" @nav-bar-back-click="goBack()"/>
    <hips-scroll ref="scroll" :data="[wrapperList]" :scroll-options="scrollOption" @pulling-down="refreshList"
                 @pulling-up="loadMoreList">
      <div class="waterfall-list">
        <div class="fall-list" ref="fallList1">
          <div class="fall-item" v-for="item in data1">
            <img :src="item">
          </div>
        </div>
        <div class="fall-list" ref="fallList2">
          <div class="fall-item" v-for="item in data2">
            <img :src="item">
          </div>
        </div>
      </div>
    </hips-scroll>
  </hips-view>
</template>

<script>
  import {View, NavBar, Scroll} from '@hips/vue-ui';
  import waterfallService from '../api';

  export default {
    name: "waterfall",
    components: {
      [View.name]: View,
      [NavBar.name]: NavBar,
      [Scroll.name]: Scroll
    },
    data() {
      return {
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
        },
        page: 0,
        data1: [],
        data2: [],
      }
    },
    mounted() {
      this.refreshList();
    },
    methods: {
      // 返回功能
      goBack() {
        this.$router.back();
      },

      // 下拉刷新
      refreshList() {
        this.page = 0;
        this.data1 = [];
        this.data2 = [];
        this.loadMoreList();
      },

      // 获取图片数据
      async loadMoreList() {
        this.throttle(async () => {
          let res = await waterfallService.getImageList();
          this.page++;
          this.doSort(0, res);
          if (this.page >= 5) {
            this.$nextTick(() => {
              this.$refs.scroll.forceUpdate();
            })
          }
        })
      },

      // 图片排序
      doSort(index, list) {
        if (index < list.length) {
          if (this.$refs.fallList1.clientHeight <= this.$refs.fallList2.clientHeight) {
            this.data1.push(list[index]);
          } else {
            this.data2.push(list[index]);
          }
          let that = this;
          this.$nextTick(() => {
            setTimeout(() => {
              that.doSort(index + 1, list);
            }, 400);
          })
        }
      },

      // 函数节流
      throttle(method, context) {
        clearTimeout(method.tId);
        method.tId = setTimeout(function () {
          method.call(context);
        }, 500)
      }
    },
    computed: {
      wrapperList() {
        return [...this.data1, ...this.data2] // 请注意，在computed里面 包裹下list， 只有在特殊情况下，这么使用
      }
    }
  }
</script>

<style scoped lang="stylus">
  .waterfall {
    background #f7f7f7;
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

    .waterfall-list {
      position relative;
      .fall-list {
        width 50%;
        float: left;
        .fall-item {
          width: 96%;
          margin: 5px auto;
          background-color: #fff
          img {
            width 100%;
          }
        }
      }
    }
  }
</style>
