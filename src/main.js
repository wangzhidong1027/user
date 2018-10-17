import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import util from "./util/util";
import axios from './axios/index'
import qs from 'qs'
import base64 from 'js-base64'

util.getFontSize(750);

const FastClick = require("fastclick");
FastClick.attach(document.body);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios
Vue.prototype.$base64= base64
Vue.prototype.$qs = qs

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
