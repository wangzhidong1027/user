<template>
    <div id="edit">
        <x-header>设置昵称<a slot="right" style="color: #ff9900">完成</a></x-header>
        <group :gutter="1">
             <x-input  v-model="value" placeholder="请输入昵称"></x-input>
        </group>
        <div class="idcard">
            <upload-img accept="image/*" :post="upload">aaa</upload-img>
        </div>
    </div>
</template>

<script>
import { XButton, XHeader, XInput, Group } from "vux"
import UploadImg from "../../../components/upload/upload-img"
export  default {
  name: "edit",
  components: {
    XButton,
    XHeader,
    XInput,
    Group,
    UploadImg
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
  	upload (file) {
      let config = {
      	headers:{'Content-Type':'multipart/form-data'}
      };
      this.$axios.post( this.$baseUrl + '/per/login', file, config).then(response=>{
        console.log(response.data);
      })
    }
  }
}
</script>

<style lang="less" scoped>
#edit{
  height: 100%;
  width: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  .btn-box{
      padding: 1rem 0.6rem;
  }
}
</style>
