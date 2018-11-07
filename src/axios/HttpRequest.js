import axios from "axios";
import Vue from "vue";
import LoadingPlugin from 'vux/src/plugins/loading';
Vue.use(LoadingPlugin)

const HttpRequest = axios.create({
	timeout: 20000,
});
// 添加请求拦截器

HttpRequest.interceptors.request.use(
	config => {
    Vue.$vux.loading.show()
		// 请求发送前
		var token = localStorage.getItem('Token')
		if (token) {
			config.headers["Token"] = localStorage.getItem('Token')
		}
	  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
		return config
	});
// 相应拦截器
HttpRequest.interceptors.response.use(
	response => {
    Vue.$vux.loading.hide()
		if (response) {
			// switch (response.status){
			//   case 401 :  sessionStorage.clear();
			//     // router.replace({
			//     //   // query:{rediect:router.currentRoute.fullPath}//登录成功后跳入浏览器当前页面
			//     // })
			// }
		}
		return response;
	},
	error => {
		if (error.response) {
			// sessionStorage.clear();
			// router.replace({
			//   path: './login'
			// });
		}
		return Promise.reject(error.response.data)
	}
);
export default HttpRequest;
