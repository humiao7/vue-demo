const chartService = {
  getChartsList: () => {
    return [{
      title: "柱状图",
      icon: "icon-tubiao-",
      themeColor: "#fea917",
      options: {
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          color: '#fea917',
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      }
    }, {
      title: "折线图",
      icon: "icon-tubiaotongji",
      themeColor: "#00b478",
      options: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['C', 'C++', 'JavaScript', 'Python', 'Java']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2014', '2015', '2016', '2017', '2018', '2019', '2020']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'C',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'C++',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'JavaScript',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Python',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Java',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    }, {
      title: "饼状图",
      icon: "icon-tubiao-bingtu",
      themeColor: "#37a2da",
      options: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['Firefox', 'Safari', 'Microsoft Edge', 'IE Explorer', 'Google Chrome']
        },
        color: ['#37a2da', '#67e0e3', '#ffdb5c', '#ff9f7f', '#e062ae'],
        series: [
          {
            name: '浏览器市场占比',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 335, name: 'Firefox'},
              {value: 310, name: 'Safari'},
              {value: 234, name: 'Microsoft Edge'},
              {value: 135, name: 'IE Explorer'},
              {value: 1548, name: 'Google Chrome'}
            ]
          }
        ]
      }
    }, {
      title: "散点图",
      icon: "icon-sandiantu",
      themeColor: "#ff69b4",
      options: {
        xAxis: {},
        yAxis: {},
        color: "#ff69b4",
        series: [{
          symbolSize: 20,
          data: [
            [10.0, 8.04],
            [8.0, 6.95],
            [13.0, 7.58],
            [9.0, 8.81],
            [11.0, 8.33],
            [14.0, 9.96],
            [6.0, 7.24],
            [4.0, 4.26],
            [12.0, 10.84],
            [7.0, 4.82],
            [5.0, 5.68]
          ],
          type: 'scatter'
        }]
      }
    }, {
      title: "雷达图",
      icon: "icon-leidatu",
      themeColor: "#2a83fe",
      options: {
        tooltip: {},
        legend: {
          top: 20,
          left: 10,
          data: ['一叶之秋', '君莫笑']
        },
        color: ['#37a2da', '#ffd85c'],
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            {name: '力量', max: 6500},
            {name: '敏捷', max: 16000},
            {name: '防御', max: 30000},
            {name: '魔法', max: 38000},
            {name: '智力', max: 52000},
            {name: '生命值', max: 25000}
          ]
        },
        series: [{
          name: '一叶之秋 vs 君莫笑',
          type: 'radar',
          // areaStyle: {normal: {}},
          data: [
            {
              value: [4300, 10000, 28000, 35000, 50000, 19000],
              name: '一叶之秋'
            },
            {
              value: [5000, 14000, 28000, 31000, 42000, 21000],
              name: '君莫笑'
            }
          ]
        }]
      }
    }]
  }
};

export default chartService;
