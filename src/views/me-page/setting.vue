<template>
  <div class="setting">
     <group :gutter="0">
       <cell-box v-if="isLogin" @click.native="testvip">
         申请体验会员
       </cell-box>
        <cell-box @click.native="clear">
          清除缓存
        </cell-box>
        <cell-box>
          关于我们
        </cell-box>
     </group>
     <div class="btn" v-if="isLogin">
       <x-button :gradients="[ '#FF7500', '#FF9500']"  @click.native="logout">退出登录</x-button>
     </div>
  </div>
</template>

<script>
import { Group, CellBox, XButton } from  "vux";
import { mapMutations  } from "vuex";
export default {
  name: "setting",
  components: {
  	Group,
  	CellBox,
    XButton
  },
  computed: {
    isLogin: () => {
      return localStorage.getItem('Token') ? true : false;
    },
    level_name () {
      return this.$store.state.user.userinfo.level_name
    }
  },
  methods: {
    ...mapMutations([
      "clearCar",
      'loginout'
    ]),
  	clear () {
  	  localStorage.setItem('car', [])
  	  localStorage.setItem('openid', '')
      this.clearCar()
      this.$vux.toast.show({
        text: '缓存已清除',
        position: 'top',
        isShowMask: true
      })
    },
    logout () {
      this.loginout()
      localStorage.clear();
      this.$vux.toast.show({
        text: '已退出',
        position: 'top',
        isShowMask: true
      })
      this.$router.push({
        path: 'me'
      })
    },
    testvip() {
      if(!this.isLogin){
        this.$vux.alert.show({
          title: '提示',
          content: '请先登录',
        })
        return
      }
      this.$axios.post(this.$baseUrl + "/per/applymembertest", this.$qs.stringify({})).then(
        result => {
          var res = JSON.parse(this.$base64.decode(result.data));
          if (res.code == 10000) {
            this.$vux.alert.show({
              title: '恭喜',
              content: '您已成功申请为体验会员，明日生效后可享受会员权益',
            })
          } else if(res.code == 30001){
            if(this.level_name == '中能源超级会员'){
              this.$vux.alert.show({
                title: '提示',
                content: '你已经是会员',
              })
            } else {
              this.$vux.alert.show({
                title: '提示',
                content: '体验会员每个账号只能一次',
              })
            }
          }else{
            this.$vux.alert.show({
              title: '提示',
              content: res.message,
            })
          }
        })
    }
  }
};
</script>

<style scoped>
.btn{
  padding: 0.5rem;
}
</style>
