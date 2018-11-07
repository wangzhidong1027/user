<template>
  <div class="setting">
     <group :gutter="0">
        <cell-box @click.native="clear">
          清除缓存
        </cell-box>
        <cell-box>
          关于我们
        </cell-box>
     </group>
     <div class="btn" v-if="isLogin">
       <x-button :gradients="[ '#FF7500', '#FF9500']"  @click.native="loginout">退出登录</x-button>
     </div>
  </div>
</template>

<script>
import { Group, CellBox, XButton } from  "vux";
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
    }
  },
  methods: {
  	clear () {
      this.$vux.toast.show({
        text: '缓存已清除',
        position: 'top',
        isShowMask: true
      })
    },
    loginout () {
     localStorage.clear();
      this.$vux.toast.show({
        text: '已退出',
        position: 'top',
        isShowMask: true
      })
      this.$router.push({
        path: 'me'
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
