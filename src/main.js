import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import util from "./util/util";
// import axios from './axios/index'
import Axios from 'axios'
import qs from 'qs'
import { Base64 } from 'js-base64'
util.getFontSize(750);
import ToastPlugin from 'vux/src/plugins/toast';
import   ConfirmPlugin   from 'vux/src/plugins/confirm';
import  LoadingPlugin  from 'vux/src/plugins/loading';

Vue.use(LoadingPlugin);
Vue.use(ConfirmPlugin);
Vue.use(ToastPlugin);

const HTTP_request = Axios.create({
    timeout:20000,  //request timeout
})
 // HTTP_request.defaults.withCredentials = true

//添加请求拦截器
HTTP_request.interceptors.request.use(
  config => {
  //请求发送前
  //   config.headers['withCredentials'] = true
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'/**/
    config.headers['Token'] = localStorage.getItem('Token')
        return config

    })
//HTTP request响应拦截器
HTTP_request.interceptors.response.use(
  response=>{
    if(response){
      // switch (response.status){
      //   case 401 :  sessionStorage.clear();
      //               router.replace({
      //                 path:'./login',
      //                 // query:{rediect:router.currentRoute.fullPath}//登录成功后跳入浏览器当前页面
      //               })
      // }
    }
   return response;
  },
  error => {
    // if(error.response){
    //   sessionStorage.clear();
    //   router.replace({
    //     path:'./login'
    //   });
    // }
     return Promise.reject(error.response.data)
  })


// const FastClick = require("fastclick");
// FastClick.attach(document.body);

Vue.use(ToastPlugin, {position: 'middle'})
Vue.config.productionTip = false;
Vue.prototype.$axios = HTTP_request
Vue.prototype.$base64= Base64
Vue.prototype.$qs = qs
Vue.prototype.$methods =  util
Vue.prototype.$baseUrl = '' //'http://10.10.18.12:8082' http://api.zhenxiangfuwu.com

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
