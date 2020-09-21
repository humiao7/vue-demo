<template>
  <div class="halm-task-line">
    <div class="lists-img" :style="{ background: !!iconColor?iconColor:'#aaa' }">
      <i :class="iconInfo" v-if="iconType == 'Icon'"></i>
      <span v-if="iconType == 'Chinese'" :class="iconWordQty>1?'multiple-word':''">{{iconInfo}}</span>
    </div>
    <div :class="(!number && !status) || (!account && !location)?'info_fields list-item-padding':'info_fields'">
      <div class="first-line">
        <h2>{{name}}</h2>
        <span>{{formatDate}}</span>
      </div>
      <p class="second-line">
        <span class="task-number">{{number}}</span>
        <span class="task-status"
              :class="`color_doc_status_${statusClass} color_asset_status_${assetStatusClass}`">{{status}}</span>
      </p>
      <p class="third-line" v-if="!!account || !!location">
        <i class="hzero-pc-icon  css-icon-border_outer" v-if="!!account"></i>{{account}}
        <i class="hzero-pc-icon css-icon-room" v-if="!!location"></i>{{location}}
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HalmTaskLine",
    props: [
      'icon', // 图标
      'iconColor', // 图标颜色
      'name', // 任务名称
      'date', // 日期
      'number', // 任务编号
      'status', // 状态
      'statusClass', // 状态样式code
      'assetStatusClass', // 状态样式code
      'account', // 组织/资产
      'location' // 位置
    ],
    data() {
      return {
        iconInfo: "", // 显示图标
        iconType: "", // 图标类型
        iconWordQty: 0, // 中文字个数
        formatDate: "" // 格式化日期
      }
    },
    // 组件创建之前
    beforeMount() {
      this.taskFormat();
    },
    methods: {
      taskFormat() {
        // 处理图标
        if (this.icon && this.icon != 'undefined' && this.icon != 'empty' && this.icon != 'null') {
          // 判断是图标还是中文文字
          if (/.*[\u4e00-\u9fa5]+.*$/.test(this.icon)) {
            this.iconInfo = this.icon.substring(0, 2); // 取前两个中文字符
            this.iconType = 'Chinese';
            this.iconWordQty = this.icon.length;
          } else {
            this.iconInfo = "hzero-pc-icon css-icon-" + this.icon;
            this.iconType = 'Icon';
            this.iconWordQty = 0; // 判断包含多少个中文文字
          }
        } else {
          this.iconInfo = 'hzero-pc-icon css-icon-crop_free';
          this.iconType = 'Icon';
          this.iconWordQty = 0; // 判断包含多少个中文文字
        }
        // 处理日期
        if (this.date != '' && this.date != undefined) {
          //将日期转换成毫秒数 eg:09/17/2017 11:13或者2017/09/14 18:02或者2017-09-12 09:12:12
          let publishTime = Date.parse(!!this.date ? this.date.replace(/-/g, '/') : this.date) / 1000,
            d_seconds,
            d_minutes,
            d_hours,
            d_days,
            timeNow = parseInt(new Date().getTime() / 1000),
            d,

            date = new Date(publishTime * 1000),
            Y = date.getFullYear(),
            M = date.getMonth() + 1,
            D = date.getDate(),
            H = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();
          //小于10的在前面补0
          if (M < 10) {
            M = '0' + M;
          }
          if (D < 10) {
            D = '0' + D;
          }
          if (H < 10) {
            H = '0' + H;
          }
          if (m < 10) {
            m = '0' + m;
          }
          if (s < 10) {
            s = '0' + s;
          }

          d = timeNow - publishTime;
          d_days = parseInt(d / 86400);
          d_hours = parseInt(d / 3600);
          d_minutes = parseInt(d / 60);
          d_seconds = parseInt(d);
          if (this.date == '') {
            this.formatDate = '';
          } else {//essentialDate表示几天前这样的格式
            if (d > 0) {
              if (d_hours < 1) {
                this.formatDate = d_minutes + ' 分钟前';
              } else if (d_hours >= 1 && d_hours < 24) {
                this.formatDate = d_hours + ' 小时前'
              } else if (d_hours >= 24 && d_days < 4) {
                this.formatDate = d_days + ' 天前'
              } else if (d_days >= 4 && d_days < 365) {
                this.formatDate = M + '-' + D;
              } else if (d_days >= 365) {
                this.formatDate = Y + '-' + M;
              }
            } else if (d == 0) {
              this.formatDate = '刚刚';
            } else if (d < 0) {
              if (d_minutes > -60) {
                this.formatDate = -d_minutes + ' 分钟后';
              } else if (d_hours <= -1 && d_hours > -24) {
                this.formatDate = -d_hours + ' 小时后';
              } else if (d_hours <= -24 && d_days > -4) {
                this.formatDate = -d_days + ' 天后';
              } else if (d_days <= -4 && d_days > -365) {
                this.formatDate = M + '-' + D;
              } else if (d_days <= -365) {
                this.formatDate = Y + '-' + M;
              }
            }
          }
        }
      }
    },
    computed: {
      changeData() {
        const {icon, date} = this;
        return {
          icon,
          date
        }
      }
    },
    watch: {
      changeData: {
        handler: function (newval, oldval) {
          this.icon = newval.icon;
          this.date = newval.date;
          this.taskFormat();
        },
        deep: true
      }
    }
  }
</script>

<style scoped lang="stylus">

  .halm-task-line {
    width: 100%;
    background: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    position: relative;

    .lists-img {
      height: 42px;
      width: 42px;
      margin: 0 10px 0 0;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #aaa;
      i {
        color: #fff;
        font-size: 32px;
      }
      span {
        font-size: 25px;
        font-weight: 500;
        color: #fff;
        overflow: hidden;
        white-space: nowrap;
      }
      .multiple-word {
        font-size: 18px;
      }
    }
  }

  .info_fields {
    width: calc(100% - 52px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    .first-line {
      width: 100%;
      display: inline-flex;
      align-items: flex-start;
      justify-content: space-between;

      h2 {
        max-width: 75%;
        margin: 0;
        font-size: 15.2px;
        font-weight: normal;
        /* line-height: 0.76rem; */
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      span {
        max-width: 25%;
        font-size: 12px;
        font-weight: normal;
        /* line-height: 0.6rem; */
        color: #333;
        text-align: right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-right: 5px;
      }
    }

    .second-line {
      width: 100%;
      margin: 0;
      display: inline-flex;
      align-items: flex-end;
      justify-content: space-between;

      .task-number {
        width: 72%;
        padding: 2px 0;
        font-size: 12px;
        font-weight: normal;
        /* line-height: .6rem; */
        color: rgba(0, 0, 0, 0.4);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .task-status {
        max-width: 28%;
        width auto;
        padding: 2px 5px;
        font-size: 12px;
        font-weight: normal;
        /* line-height: .6rem; */
        color: #333;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-radius: 5px;
      }
    }

    .third-line {
      max-width: 75%;
      margin: 0;
      font-size: 12px;
      /* line-height: .6rem; */
      font-weight: normal;
      color: rgba(0, 0, 0, 0.4);
      // overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .list-item-padding {
    padding: 3px 0;
  }
</style>
