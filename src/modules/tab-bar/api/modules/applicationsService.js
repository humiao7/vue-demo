const applicationsService = {
  getAppList: () => {
    return [{
      name: '表单',
      color: '#00b478',
      icon: "icon-fillin",
      route: 'forms'
    }, {
      name: '列表',
      color: '#ed4112',
      icon: "icon-classification",
      route: 'lists'
    }, {
      name: '交互',
      color: '#ff69b4',
      icon: "icon-good",
      route: 'notes'
    }, {
      name: '选项卡',
      color: '#cd5c5c',
      icon: "icon-bulletin",
      route: 'tabs'
    }, {
      name: '瀑布流',
      color: '#00b478',
      icon: "icon-barchart",
      route: 'waterfall'
    }, {
      name: '图表',
      color: '#fea917',
      icon: "icon-piechart_2",
      route: 'charts'
    }, {
      name: '日历',
      color: '#2a83fe',
      icon: "icon-calendar1",
      route: 'calendar'
    }, {
      name: '附件',
      color: '#fd5f10',
      icon: "icon-text",
      route: 'files'
    }, {
      name: '地图',
      color: '#2a83fe',
      icon: "icon-huititle",
      route: 'map'
    }]
  }
};

export default applicationsService;
