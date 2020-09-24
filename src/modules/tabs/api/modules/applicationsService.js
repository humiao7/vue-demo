const applicationsService = {
  getAppList: () => {
    return [{
      name: '表单',
      color: '#00b478',
      icon: "icon-fillin",
      route: '/'
    }, {
      name: '列表',
      color: '#ed4112',
      icon: "icon-classification",
      route: '/'
    }, {
      name: '交互',
      color: '#ff69b4',
      icon: "icon-good",
      route: '/'
    }, {
      name: '选项卡',
      color: '#cd5c5c',
      icon: "icon-bulletin",
      route: '/'
    }, {
      name: '瀑布流',
      color: '#00b478',
      icon: "icon-barchart",
      route: '/'
    }, {
      name: '图表',
      color: '#fea917',
      icon: "icon-piechart_2",
      route: '/'
    }, {
      name: '日历',
      color: '#2a83fe',
      icon: "icon-calendar1",
      route: 'calendar'
    }, {
      name: '附件',
      color: '#fd5f10',
      icon: "icon-text",
      route: '/'
    }, {
      name: '地图',
      color: '#2a83fe',
      icon: "icon-huititle",
      route: 'FullScreenMap'
    }]
  }
};

export default applicationsService;
