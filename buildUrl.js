let baseUrl = "";   //这里是一个默认的url，可以没有
switch (process.env.NODE_ENV) {
  // case 'development':
  //   baseUrl = "http://localhost:57156/"  //这里是本地的请求url
  //   break
  case 'formal':
    baseUrl = "http://api.ciecinfo.com";  //这里是生产环境中的url
    break
  case 'production':
    baseUrl = "http://api.ciecinfo.com";  //测试环境url
    break
}
export default baseUrl;
