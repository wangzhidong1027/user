import axios from "axios";
// import router from "../router/router.js"

const HttpRequest = axios.create({
  timeout: 20000,
});
// 添加请求拦截器
HttpRequest.interceptors.request.use(config => {
  // 请求发送前
  var Token =  sessionStorage.getItem('token')
  if (Token) {
    config.header['Token'] = Token
  }
  return config
});
// 相应拦截器
HttpRequest.interceptors.response.use(
  response=>{
    if(response){
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
export default HttpRequest
