 <template>
  <div id="map-list">
    <div id="container" ></div>
    <div class="map-title">
      <div class="item" v-for="item in store">
        <div class="name">
          {{item.merchName}}
        </div>
        <p class="addres">{{item.address}}</p>
      </div>
      <divider>没有更多数据了</divider>
    </div>
  </div>
</template>

<script>
  import { Divider  } from "vux"
  export default {
    name: "mapList",
    data () {
      return {
        store: []
      }
    },
    components: {
      Divider
    },
    mounted () {
      var map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 12, // 级别
        //   viewMode:'3D'//使用3D视图
        // center: [116.397428, 39.90923],//中心点坐标
      });
      map.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(100, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: 'RB'
        })
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)
        function onComplete (data) {
          // data是具体的定位信息
          alert(1)
        }
        function onError (data){
          // 定位出错
          console.log(data.message)
        }
      })
      var marker = new AMap.Marker({
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: [116.405467, 39.907761],
      });
      var marker1 = new AMap.Marker({
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: [116.415357, 39.907761]
      });
      map.add(marker);
    },
    created () {
      this.$axios.post(this.$baseUrl + "/per/stationlist", this.$qs.stringify({
        cityName: "新乡市"// this.address.city
      })).then(result => {
        var res = JSON.parse(this.$base64.decode(result.data))
        if (res.code == 10000) {
          this.store = res.data
        } else {
          this.$vux.toast.show({
            type: "cancel",
            text: res.message,
            position: "middle",
            isShowMask: true
          });
        }
      })
    }
  }
</script>

<style scoped lang="less">
#map-list {
  width: 100%;
  height: 100%;
 display: flex;
  flex-direction: column;
  #container{
    width: 100%;
    height: 300px;
  }
  .map-title{
    padding: 0 0.5rem;
    flex: 1;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    font-size: 0.3rem;
    .item{
      padding: 0.2rem 0rem;
      border-bottom: 1px solid #eee;
      .name{
        font-size: 0.35rem;
        line-height: 0.6rem;
        font-weight: 500;
      }
      .addres{
        font-size: 0.3rem;
      }
    }
  }
}
</style>
