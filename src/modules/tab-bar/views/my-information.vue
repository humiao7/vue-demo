<template>
  <hips-view class="my-information" :header-height="50" :footer-height="48" header-fixed content-frozen>
    <!--导航栏-->
    <hips-nav-bar :back-button="{showLeftArrow: true}" title="自我评价" @nav-bar-back-click="goBack()"/>
    <hips-scroll ref="scroll" :scroll-options="{}">
      <h2 class="skill-title">前端技能</h2>
      <div class="my-web-skill" ref="myWebSkill"></div>
      <h2 class="skill-title">工作技能</h2>
      <div class="my-work-sikll" ref="myWorkSkill"></div>
    </hips-scroll>
  </hips-view>
</template>

<script>
  import {View, NavBar, Scroll} from '@hips/vue-ui';
  import Echarts from 'echarts'

  export default {
    name: "my-information",
    components: {
      [View.name]: View,
      [NavBar.name]: NavBar,
      [Scroll.name]: Scroll
    },
    data() {
      return {
        // 前端技能掌握情况
        webSkillOptions: {
          tooltip: {},
          color: ['#fe2929'],
          center: ['50%', '50%'],
          radius: 100,
          radar: {
            name: {
              textStyle: {
                color: '#fff',
                backgroundColor: '#00b478',
                borderRadius: 3,
                padding: [3, 5]
              }
            },
            indicator: [
              {name: 'Html', max: 100},
              {name: 'CSS', max: 100},
              {name: 'JavaScript', max: 100},
              {name: 'Vue', max: 100},
              {name: 'React', max: 100},
              {name: 'Angular', max: 100},
              {name: 'Webpack', max: 100},
              {name: 'Gulp', max: 100},
              {name: 'TypeScript', max: 100},
              {name: 'Nodejs', max: 100}
            ],
            center: ['50%', '50%'],
            radius: 100
          },
          series: [{
            name: '技能掌握情况',
            type: 'radar',
            data: [
              {
                value: [95, 90, 93, 95, 80, 60, 77, 85, 85, 70],
                name: '前端开发技能',
              }
            ],
          }]
        },
        // 工作能力
        workSkillOptions: {
          tooltip: {},
          color: '#ff69b4',
          center: ['50%', '50%'],
          radius: 100,
          radar: {
            name: {
              textStyle: {
                color: '#fff',
                backgroundColor: '#37a2da',
                borderRadius: 3,
                padding: [3, 5]
              }
            },
            indicator: [
              {name: '学习', max: 10},
              {name: '沟通', max: 10},
              {name: '环境搭建', max: 10},
              {name: '难题解决', max: 10},
              {name: '领导', max: 10},
              {name: '团队配合', max: 10},
              {name: '新人培养', max: 10}
            ],
            center: ['50%', '50%'],
            radius: 100
          },
          series: [{
            name: '工作能力',
            type: 'radar',
            data: [
              {
                value: [9.5, 8, 8.5, 9, 8, 8, 8.5],
                name: '工作能力',
                label: {
                  show: true
                }
              }
            ]
          }]
        },
        webSkillObj: null,
        workSkillObj: null
      }
    },
    mounted() {
      this.webSkillObj = Echarts.init(this.$refs.myWebSkill);
      this.webSkillObj.setOption(this.webSkillOptions);

      this.workSkillObj = Echarts.init(this.$refs.myWorkSkill);
      this.workSkillObj.setOption(this.workSkillOptions);
    },
    methods: {
      // 返回功能
      goBack() {
        this.$router.back();
      }
    }
  }
</script>

<style scoped lang="stylus">
  .my-information {
    background #f7f7f7;
    .skill-title {
      margin 0;
      padding: 10px 10px 8px;
      font-size 14px;
      font-weight bold;
      color: #fd5f10;
    }
    .my-web-skill {
      width: 100%;
      height: 280px;
      background #fff;
    }
    .my-work-sikll {
      width: 100%;
      height: 280px;
      background #fff;
    }
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
</style>
