<template>
  <div class="nearby">
    <x-header>选择服务站<a slot="right" @click="getadd">{{address.city}}</a></x-header>
    <div class="states">
        <div class="state" v-for="item in store">
          <a @click="goshop(item)">
            <div class="name">{{item.merchName}}</div>
            <div class="address">{{item.address}}</div>
          </a>
        </div>
        <divider>没有更多数据了</divider>
    </div>
  </div>
</template>

<script>
  import { XHeader, Divider  } from "vux"
  export default {
    name: "nearby",
    components: {
      XHeader,
      Divider
    },
    data() {
      return {
        store: []
      }
    },
    computed: {
      address() {
        return this.$store.state.user.address
      }
    },
    methods: {
      goshop (Obj) {
        localStorage.setItem("station",JSON.stringify(Obj))
        localStorage.setItem("car",'')
        this.$router.push({
          path: 'goodslist'
        })
      },
      getStore () {
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
              width: "3em",
              position: "middle",
              isShowMask: true
            });
          }
        })
      },
      getadd () {

      }
    },
    mounted() {
      this.getStore()
    }
  }
</script>

<style lang="less" scoped>
  .nearby {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #f5f5f5;
    .states{
      flex: 1;
      background: #f5f5f5;
      padding-top: 0.2rem;
      font-size: 0.3rem;
      .state{
        font-size: 0.3rem;
        padding: 0.2rem;
        background: #fff;
        margin-bottom: 0.2rem;
        a{
          color: #333;
          line-height: 0.7rem;
          .address{
            color: #666;
          }
        }
      }
    }
  }
</style>