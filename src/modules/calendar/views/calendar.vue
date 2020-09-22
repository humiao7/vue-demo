<template>
  <hips-view class="calendar" header-height="50" content-frozen>
    <hips-nav-bar slot="header" :back-button="{showLeftArrow: true}" title="日历"
                  type="primary" @nav-bar-back-click="goBack()"></hips-nav-bar>
    <div class="fixed-calendar-tools" v-show="showFixToolsAndLabel">
      <span @click="selectDate(30)">2020-09-09</span>
    </div>
    <div class="fixed-calendar-label" v-show="showFixToolsAndLabel">
      <div>日</div>
      <div>一</div>
      <div>二</div>
      <div>三</div>
      <div>四</div>
      <div>五</div>
      <div>六</div>
    </div>
    <div class="fixed-calendar-content" v-show="showFixContent">
      <div class="hips-calendar__item">
        <div class="hips-calendar__item__wrapper">
          <div class="hips-calendar__item-day">20</div>
          <div class="hips-calendar__item-label" style="color: rgb(249, 111, 104);">.</div>
        </div>
      </div>
      <div class="hips-calendar__item">
        <div class="hips-calendar__item__wrapper">
          <div class="hips-calendar__item-day" style="color: rgb(31, 140, 235);">今</div>
          <div class="hips-calendar__item-label" style="color: rgb(249, 111, 104);">.</div>
        </div>
      </div>
      <div class="hips-calendar__item">
        <div class="hips-calendar__item__wrapper">
          <div class="hips-calendar__item-day">22</div>
          <div class="hips-calendar__item-label" style="color: rgb(249, 111, 104);">.</div>
        </div>
      </div>
      <div class="hips-calendar__item">
        <div class="hips-calendar__item__wrapper">
          <div class="hips-calendar__item-day">23</div>
          <div class="hips-calendar__item-label" style="color: rgb(249, 111, 104);">.</div>
        </div>
      </div>
      <div class="hips-calendar__item">
        <div class="hips-calendar__item__wrapper">
          <div class="hips-calendar__item-day">24</div>
          <div class="hips-calendar__item-label" style="color: rgb(249, 111, 104);">.</div>
        </div>
      </div>
      <div class="hips-calendar__item">
        <div class="hips-calendar__item__wrapper">
          <div class="hips-calendar__item-day">25</div>
          <div class="hips-calendar__item-label" style="color: rgb(249, 111, 104);">.</div>
        </div>
      </div>
      <div class="hips-calendar__item">
        <div class="hips-calendar__item__wrapper">
          <div class="hips-calendar__item-day">26</div>
          <div class="hips-calendar__item-label" style="color: rgb(249, 111, 104);">.</div>
        </div>
      </div>
    </div>
    <div class="fixed-tabs" v-show="showFixTabs">
      <hips-tabs class="tabs-multi" v-model="activeTab" ref="tabsFixed">
        <hips-tab class="tab-item" title="未完结"></hips-tab>
        <hips-tab class="tab-item" title="已完成"></hips-tab>
      </hips-tabs>
    </div>
    <hips-scroll ref="scroll" :scroll-events="['scroll']" :scroll-options="scrollOption" @scroll="scrollHandler">
      <hips-calendar v-if="showCalendar"
                     ref="calendar"
                     select-type="single"
                     :append-data="appendData">
      </hips-calendar>
      <hips-tabs class="tabs-multi" style="margin: 10px 0 0" v-model="activeTab" swipeable>
        <hips-tab class="tab-item" title="未完结">
          <halm-task-line class="woop-item"
                          v-for="(item,index) in list" :key="index"
                          :icon="item.icon" :iconColor="item.priorityColor" :date="item.lastUpdateDate"
                          :name="item.woName==item.woopShortName||!item.woopShortName?item.woName:item.woName+':'+item.woopShortName"
                          :number="item.woNum+'-'+item.woopNum" :status="item.woopStatusMeaning"
                          :statusClass="item.woopStatus"
                          :account="item.assetName" :location="item.assetLocationName">
          </halm-task-line>
        </hips-tab>
        <hips-tab class="tab-item" title="已完成">
          <halm-task-line class="woop-item"
                          v-for="(item,index) in list" :key="index"
                          :icon="item.icon" :iconColor="item.priorityColor" :date="item.lastUpdateDate"
                          :name="item.woName==item.woopShortName||!item.woopShortName?item.woName:item.woName+':'+item.woopShortName"
                          :number="item.woNum+'-'+item.woopNum" :status="item.woopStatusMeaning"
                          :statusClass="item.woopStatus"
                          :account="item.assetName" :location="item.assetLocationName">
          </halm-task-line>
        </hips-tab>
      </hips-tabs>
    </hips-scroll>
  </hips-view>
</template>

<script>
  import {View, NavBar, Scroll, Calendar, Tabs, Tab} from '@hips/vue-ui';
  import {HalmTaskLine} from '@/components';
  import calendarService from '../api';
  import {dateFormat} from '@/utils'

  export default {
    components: {
      [View.name]: View,
      [NavBar.name]: NavBar,
      [Scroll.name]: Scroll,
      [Calendar.name]: Calendar,
      [Tabs.name]: Tabs,
      [Tab.name]: Tab,
      [HalmTaskLine.name]: HalmTaskLine
    },
    data() {
      return {
        showCalendar: false,
        scrollOption: {}, // 滚动组件参数
        showFixToolsAndLabel: false,
        showFixTabs: false,
        showFixContent: false,
        activeTab: 0,

        appendData: [],

        list: []
      }
    }
    ,
    created() {
      this.calendarInit();
    }
    ,
    methods: {
      // 返回功能
      goBack() {
        this.$router.back();
      },

      // 日历界面初始化
      calendarInit(initDate = new Date()) {
        this.showCalendar = false;  // 移除日历组件
        // 日历附加数据
        let firstDay = new Date(new Date(initDate).getFullYear(), new Date(initDate).getMonth(), 1);  // 当前月份第一天
        let total = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0).getDate();  // 当前月份总天数
        for (let i = 0; i < total; i++) {
          let date = new Date(firstDay);
          date.setDate(firstDay.getDate() + i);
          let format = dateFormat(date, 'yyyy-MM-dd');
          this.appendData.push({
            date: format,
            label: '·',
            labelColor: '#f96f68',
            unCompletedWoops: [],
            completedWoops: []
          });
        }
        this.list = calendarService.getTaskList();
        // 渲染日历组件
        this.$nextTick(() => {
          this.showCalendar = true;
        });
      },

      // 监听滚动事件
      scrollHandler(e) {
        if (-e.y > 0) {
          this.showFixToolsAndLabel = true;
        } else {
          this.showFixToolsAndLabel = false;
        }
        if (-e.y >= 3 * 56) {
          this.showFixContent = true;
        } else {
          this.showFixContent = false;
        }
        if (-e.y >= 4 * 56) {
          this.showFixTabs = true;
        } else {
          this.showFixTabs = false;
        }
      },

      // 选择日历日期
      selectDate(index) {
        console.log(this.$refs.calendar);
        this.$refs.calendar._selectDate(index)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../style/calendar.styl";
</style>
