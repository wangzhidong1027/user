import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import util from "./util/util";
import axios from './axios/index'
import qs from 'qs';
import {Base64} from 'js-base64';
import formatMoney  from './components/filters/filters';

Vue.filter('formatMoney', formatMoney);

import baseUrl from '../buildUrl'

util.getFontSize(750);
import ToastPlugin from 'vux/src/plugins/toast';
import AlertPlugin from 'vux/src/plugins/alert';
import ConfirmPlugin from 'vux/src/plugins/confirm';
import LoadingPlugin from 'vux/src/plugins/loading';

Vue.use(LoadingPlugin);
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(ToastPlugin);

const FastClick = require("fastclick");
FastClick.attach(document.body);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$base64 = Base64;
Vue.prototype.$qs = qs;
Vue.prototype.$methods = util;
Vue.prototype.$merchNo = '85581201A417C0D947765184821A9CE7B4220C35AE914C411396276455EB1F8E';

if (process.env.NODE_ENV == 'production'){
  Vue.prototype.$baseUrl = baseUrl
}else{
  Vue.prototype.$baseUrl =  'http://apitest.ciecinfo.com'  //'http://172.20.129.46:8081' // //http://172.20.129.46:8082
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
