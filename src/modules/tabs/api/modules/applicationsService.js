const applicationsService = {
  getAppList: () => {
    return [{
      name: '日历',
      color: '#2a83fe',
      icon: "icon-calendar1",
      route: 'calendar'
    }, {
      name: '地图',
      color: '#fea917',
      icon: "icon-huititle",
      route: 'FullScreenMap'
    }, {
      name: '附件',
      color: '#fd5f10',
      icon: "icon-text",
      route: 'calendar'
    }, {
      name: '图表',
      color: '#00b478',
      icon: "icon-barchart",
      route: 'calendar'
    }, {
      name: '列表',
      color: '#ed4112',
      icon: "icon-classification",
      route: 'calendar'
    }]
  }
};

export default applicationsService;
