<template>
  <hips-view class="lists" :header-height="50" header-fixed content-frozen>
    <!--导航栏-->
    <hips-nav-bar :back-button="{showLeftArrow: true}" title="动态列表" @nav-bar-back-click="goBack()"/>
    <hips-scroll ref="scroll" :data="[list]" :scroll-options="scrollOption" @pulling-down="refreshList"
                 @pulling-up="loadMoreList">
      <hips-swipeout v-for="item in list" :key="item.page+''+item.pageIndex" :sensitivity="40" left-auto-show>
        <template slot="left-buttons">
          <hips-swipeout-button
            width="80"
            bg-color="#1677ff"
            font-color="#fff">
            标记
          </hips-swipeout-button>
        </template>
        <template slot="right-buttons">
          <hips-swipeout-button
            width="60"
            bg-color="red"
            font-color="#fff">
            删除
          </hips-swipeout-button>
        </template>
        <div slot="content" class="list-item">
          Page{{item.page}}-{{item.pageIndex}}
        </div>
      </hips-swipeout>
    </hips-scroll>
  </hips-view>
</template>

<script>
  import {View, NavBar, Scroll, Swipeout, SwipeoutButton} from '@hips/vue-ui';

  export default {
    name: "lists",
    components: {
      [View.name]: View,
      [NavBar.name]: NavBar,
      [Scroll.name]: Scroll,
      [Swipeout.name]: Swipeout,
      [SwipeoutButton.name]: SwipeoutButton
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
        list: []
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
        setTimeout(() => {
          this.page = 0;
          this.list = [];
          for (let i = 0; i < 20; i++) {
            this.list.push({page: this.page, pageIndex: i});
          }
        }, 1000)
      },
      // 上拉加载
      loadMoreList() {
        setTimeout(() => {
          this.page++;
          for (let i = 0; i < 20; i++) {
            this.list.push({page: this.page, pageIndex: i});
          }
          if (this.page >= 5) {
            this.$nextTick(() => {
              this.$refs.scroll.forceUpdate();
            })
          }
        }, 1000)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .lists {
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

  .list-item {
    padding: 15px 20px;
    text-align: center;
    background: #fff;
    border-bottom: 1px solid #efefef;
  }
</style>
