export default {
  state: {
    userinfo: {},
    address: {}
  },
  mutations: {
    // 定位
    getAddress (state) {
      AMap.plugin('AMap.CitySearch', function () {
        var citySearch = new AMap.CitySearch()
        citySearch.getLocalCity(function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            state.address = result
          }else{
            this.$vux.toast.show({
              type: "cancel",
              text: "城市定位失败",
              width: "3em",
              position: "middle",
              isShowMask: true
            });
          }
        })
      })
    },
    getOpenid (state, myurl) {
      if(!localStorage.getItem("openid") && !location.href.split("?openid=")[1]){
        var url = 'http://api.zhenxiangfuwu.com/weixin/userUnionId?responseurl='+ myurl
        var all =  encodeURIComponent(url)
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9b41df99e3460b72&redirect_uri='+ all + '&response_type=code&scope=snsapi_base&state=base#wechat_redirect'
      }else{
        localStorage.setItem("openid",location.href.split("?openid=")[1])
      }
    }
  },
  action: {

  }
}