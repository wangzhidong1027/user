let baseUrl = "";   //这里是一个默认的url，可以没有

if (process.env.NODE_ENV === 'development'){
  baseUrl = "http://apitest.ciecinfo.com";
}

if (process.env.NODE_ENV === 'production'){
  baseUrl = "http://apitest.ciecinfo.com"; //测试地址
}

if (process.env.VUE_APP_CURRENTMOD === 'formal') {
  baseUrl = "http://api.ciecinfo.com"; // 正式地址
}
export default baseUrl;
