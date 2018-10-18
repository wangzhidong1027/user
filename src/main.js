import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import util from "./util/util";
import axios from './axios/index'
import qs from 'qs'
import { Base64 } from 'js-base64'
util.getFontSize(750);
import ToastPlugin from 'vux/src/plugins/toast';

Vue.use(ToastPlugin);

const FastClick = require("fastclick");
FastClick.attach(document.body);

Vue.use(ToastPlugin, {position: 'middle'})
Vue.config.productionTip = false;
Vue.prototype.$axios = axios
Vue.prototype.$base64= Base64
Vue.prototype.$qs = qs
Vue.prototype.$methods =  util
Vue.prototype.$baseUrl = '' //'http://10.10.18.12:8082'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
