// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./style/theme.styl"
import "./style/common.styl"
import "./style/fsm-hzero-icons/css/fsm-hzero-icons.css";
import "./style/Iconfont/iconfont.css";

import 'x-photoswipe/dist/photoswipe.css'
import 'x-photoswipe/dist/default-skin/default-skin.css'
import {Previewer, Actionsheet, Toast, Notify, Indicator, Dialog} from "@hips/vue-ui";

Vue.use(Previewer);
Vue.use(Actionsheet);
Vue.use(Toast);
Vue.use(Notify);
Vue.use(Indicator);
Vue.use(Dialog);

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
