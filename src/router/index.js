import Vue from 'vue'
import Router from 'vue-router'
import Application from '../applications'

Vue.use(Router);

let routes = [];

const apps = [
  "calendar"
];
const applicationRoute = {
  path: "/applications",
  name: "applications",
  component: require("../applications").default
};
routes.push(applicationRoute);
apps.map(app => {
  routes.push(...require(`@/modules/${app}/router`).default);
});

// 重定向到 applications 页面
routes.push({
  path: "*",
  redirect: routes[ 0 ].path
});

export default new Router({
  routes
})
