import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

let routes = [];

const apps = [
  "tabs",
  "calendar",
  "full-screen-map"
];
apps.map(app => {
  routes.push(...require(`@/modules/${app}/router`).default);
});

// 重定向到 applications 页面
routes.push({
  path: "*",
  redirect: routes[0].path
});

export default new Router({
  routes: routes
})
