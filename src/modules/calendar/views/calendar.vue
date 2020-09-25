<template>
  <hips-view class="calendar" header-height="50" content-frozen>
    <hips-nav-bar slot="header" :back-button="{showLeftArrow: true}" title="工作日历" type="primary"
                  @nav-bar-back-click="goBack()"></hips-nav-bar>
    <div class="fixed-calendar-tools" v-show="showFixToolsAndLabel">
      <span style="font-weight: bold;">{{selectedDate}}</span>
    </div>
    <!--固定时的星期标签-->
    <div class="fixed-calendar-label" v-show="showFixToolsAndLabel">
      <div>日</div>
      <div>一</div>
      <div>二</div>
      <div>三</div>
      <div>四</div>
      <div>五</div>
      <div>六</div>
    </div>
    <!--固定时的周视图-->
    <div class="fixed-calendar-content" v-show="showFixContent">
      <div v-for="item in weekDayList" @click="selectWeekDate(item.index)"
           class="hips-calendar__item">
        <div class="hips-calendar__item__wrapper" v-show="item.visible">
          <div :style="{color:item.dateLabel==='今'?'#1f8ceb':'#4a4a4a'}"
               :class="item.selected?'hips-calendar__item-day hips-calendar__item-day-active':'hips-calendar__item-day'">
            {{item.dateLabel}}
          </div>
          <div class="hips-calendar__item-label" style="color: rgb(249, 111, 104);">{{item.label}}</div>
        </div>
      </div>
    </div>
    <!--固定时 TAB 标签栏-->
    <div class="fixed-tabs" v-show="weekDayList.length>0 && showFixTabs">
      <hips-tabs class="tabs-multi" v-model="activeTab" ref="tabsFixed">
        <hips-tab class="tab-item" title="未完结"></hips-tab>
        <hips-tab class="tab-item" title="已完成"></hips-tab>
      </hips-tabs>
    </div>
    <!--滚动组件-->
    <hips-scroll ref="scroll" :scroll-events="['scroll']" :scroll-options="scrollOption" @scroll="scrollHandler">
      <!--日历组件-->
      <div class="calendar-div">
        <hips-calendar v-if="showCalendar"
                       ref="calendar"
                       :select-month="selectedMonth"
                       select-type="single"
                       :append-data="appendData"
                       @monthChanged="monthChanged"
                       @select-single="selectMonthDay">
        </hips-calendar>
      </div>
      <!--tab页-->
      <hips-tabs class="tabs-multi" style="margin: 10px 0 0" v-model="activeTab" swipeable>
        <!--未完结-->
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
        <!--已完成-->
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
  import {dateFormat} from '@/utils'

  import calendarService from '../api';

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
        selectedMonth: null,      // 展示的月份
        selectedDate: null,       // 选中的日期
        showCalendar: false,      // 是否挂载日历组件
        scrollOption: {},         // 滚动组件设置

        // 滚动吸附控制
        showFixToolsAndLabel: false,  // 日历头部
        showFixContent: false,        // 周视图
        showFixTabs: false,           // 任务 tab 标签

        appendData: [],          // 日历附加数据
        weekSerialNumber: null,  // 选中日期为当前月份第几周
        weekDayList: [],         // 选中当周的日期

        activeTab: 0,
        list: [], // 任务数据
      }
    },
    created() {
      this.list = [...calendarService.getTaskList()];
      this.selectedMonth = dateFormat(new Date(), "yyyy-MM");
      this.calendarInit(new Date());
    },
    methods: {

      // 返回功能
      goBack() {
        this.$router.back();
      },

      // 初始化日历组件
      calendarInit(initDate) {
        this.showCalendar = false;  // 移除日历组件
        this.appendData = []; // 日历附加数据
        let firstDay = new Date(new Date(initDate).getFullYear(), new Date(initDate).getMonth(), 1); // 当前月份第一天
        let total = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0).getDate(); // 当前月份总天数
        for (let i = 0; i < total; i++) {
          let date = new Date(firstDay);
          date.setDate(firstDay.getDate() + i);
          let format = dateFormat(date, 'yyyy-MM-dd');
          this.appendData.push({
            date: format,
            label: Math.random() * 100 < 50 ? '·' : '',
            labelColor: '#f96f68'
          });
        }
        setTimeout(() => {
          this.showCalendar = true; // 渲染日历组件
        }, 100);
        this.$nextTick(() => {
          // 如果输入日期是当月
          if (dateFormat(new Date(initDate), 'yyyy-MM') === dateFormat(new Date(), 'yyyy-MM')) {
            // 选中当天
            setTimeout(() => {
              this.$refs.calendar._selectDate(new Date(dateFormat(new Date(), "yyyy-MM-dd")).getDate() + new Date(dateFormat(new Date(), "yyyy-MM-01")).getDay() - 1);
            }, 100);
          }
        });
      },

      // 切换月份
      // 注：目前 hipsUI 日历组件暂不支持该事件触发，可通过修改源码添加该事件或等待海马汇 UI 库的支持
      // this.$emit("monthChanged", this.curSelectMonth);
      monthChanged(month) {
        console.log('当前月份：' + dateFormat(month, "yyyy-MM"));
        this.selectedMonth = dateFormat(month, "yyyy-MM");
        this.weekDayList = [];
        this.calendarInit(month);
      },

      // 选择日期
      selectMonthDay(date) {
        this.selectedDate = dateFormat(date, 'yyyy-MM-dd'); // 更新选中的日期
        console.log("选择日期：" + this.selectedDate);
        // 周视图处理
        // 选择的日期不属于当前固定周视图时，隐藏固定周视图
        if (this.weekSerialNumber !== this.getWeekSerialNumber(date)) {
          this.showFixContent = false;
        }
        this.weekSerialNumber = this.getWeekSerialNumber(date); // 计算选择日期属于本月第几周
        // 计算周视图数组
        let that = this;
        let presentDate = new Date(date);
        let today = presentDate.getDay();
        let weekDays = Array.from(new Array(7), (val, index) => {
          for (let i = 0; i < that.$refs.calendar.calendarData.length; i++) {
            if (dateFormat(new Date(presentDate.getTime() - (today - index) * 24 * 60 * 60 * 1000), 'yyyy-MM-dd') === that.$refs.calendar.calendarData[i].dateFormat) {
              let append = that.$refs.calendar.appendData.find(function (itm) {
                return itm.date === that.$refs.calendar.calendarData[i].dateFormat;
              });
              return {
                index: i,
                label: append ? append.label : null,
                selected: that.$refs.calendar.calendarData[i].selected,
                visible: that.$refs.calendar.calendarData[i].visible,
                date: that.$refs.calendar.calendarData[i].date,
                dateFormat: that.$refs.calendar.calendarData[i].dateFormat,
                dateLabel: that.$refs.calendar.calendarData[i].dateLabel
              }
            }
          }
        });
        this.weekDayList = weekDays;
        console.log(this.weekDayList);
      },

      // 计算选中日期是本月第几周
      getWeekSerialNumber(dataString) {
        let date = new Date(dataString), w = date.getDay(), d = date.getDate();
        return Math.ceil((d + 6 - w) / 7);
      },

      // 选择周视图中的日期
      selectWeekDate(index) {
        console.log(this.$refs.calendar);
        this.$refs.calendar._selectDate(index);
      },

      //===============================

      // 监听滚动事件
      scrollHandler(e) {
        if (-e.y > 0) {
          this.showFixToolsAndLabel = true;
        } else {
          this.showFixToolsAndLabel = false;
        }
        if (-e.y > 0 && -e.y >= ((this.weekSerialNumber - 1) * 56) - 10) {
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
