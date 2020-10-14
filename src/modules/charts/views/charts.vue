<template>
  <hips-view class="charts" :header-height="50" :footer-height="48" header-fixed content-frozen>
    <!--导航栏-->
    <hips-nav-bar :back-button="{showLeftArrow: true}" title="图表" @nav-bar-back-click="goBack()"/>
    <hips-scroll ref="scroll" :scroll-options="{}">
      <h1 class="charts-title" :style="{color:chartList[activeChart].themeColor}">{{chartList[activeChart].title}}</h1>
      <div class="charts-panel" ref="chartsContent"></div>
      <div class="charts-menu">
        <div class="menu-item" v-for="(item,index) in chartList" @click="changeChartsType(index)">
          <i :class="'iconfont '+item.icon" :style="{color:item.themeColor}"></i>
          <div>{{item.title}}</div>
        </div>
      </div>
    </hips-scroll>
  </hips-view>
</template>

<script>
  import {View, NavBar, Scroll} from '@hips/vue-ui'
  import Echarts from 'echarts'
  import chartService from '../api'

  export default {
    name: "charts",
    components: {
      [View.name]: View,
      [NavBar.name]: NavBar,
      [Scroll.name]: Scroll
    },
    data() {
      return {
        activeChart: 0,
        timeInterval: null,
        chartObj: null,
        chartList: []
      }
    },
    created() {
      this.activeChart = 0;
      this.chartList = this.chartList.concat(chartService.getChartsList());
    },
    mounted() {
      this.drawChart(this.activeChart);
      this.timeInterval = setInterval(() => {
        this.drawChart((this.activeChart + 1) % 5);
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

      // 手动切换图表类型
      changeChartsType(index) {
        clearInterval(this.timeInterval);
        this.drawChart(index);
        this.timeInterval = setInterval(() => {
          this.drawChart((this.activeChart + 1) % 5);
        }, 5000)
      },

      // 绘制图表
      drawChart(index) {
        this.activeChart = index;
        if (this.chartObj) {
          this.chartObj.clear();
        }
        this.chartObj = Echarts.init(this.$refs.chartsContent);
        this.chartObj.setOption(this.chartList[index].options);
      }
    }
  }
</script>

<style scoped lang="stylus">
  .charts {
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

  .charts-title {
    width: calc(100% - 20px);
    padding: 9px 10px;
    font-size: 14px;
    font-weight: bold;
    color: #fea917;
  }

  .charts-panel {
    width 100%;
    height 300px;
    background #fff;
  }

  .charts-menu {
    width 100%;
    display inline-flex;
    flex-wrap wrap;
    .menu-item {
      flex-basis: 19.7%;
      height: 19.7vw;
      background: #fff;
      font-size 12px;
      border-top: 1px solid #efefef;
      border-right: 1px solid #efefef;
      display flex;
      flex-direction column;
      align-items center;
      justify-content center;
      .iconfont {
        font-size 25px;
        margin-bottom: 10px;
      }
      div {
        color: #555;
      }
    }
  }
</style>
