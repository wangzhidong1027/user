<template>
    <div class="idea">
        <group :gutter="0">
            <x-textarea :max="60" placeholder="" :rows='6' v-model="value"></x-textarea>
        </group>
        <group :gutter="20" class="btn-box">
                <x-button  type="primary" class="custom-primary-red"  @click.native="submit">提交</x-button>
        </group>
    </div>
</template>

<script>
import { Group, XTextarea, XButton } from 'vux'
export default {
    name: 'idea',
  data () {
      return {
        value: ''
      }
  },
    components: {
        Group,
        XTextarea,
        XButton
    },
    methods: {
    	submit () {
    	  if(!this.value){
          this.$vux.toast.show({
            type: "cancel",
            text: "不能为空！",
            position: 'middle',
            isShowMask: true
          })
          return false
        }
        this.$vux.toast.show({
          text: "感谢您的建议，我们会努力做到最好",
          position: 'middle',
          isShowMask: true
        })
        setTimeout(()=>{
          this.$router.push({
            path: 'me'
          })
        },2000)
      }
    }
}
</script>

<style lang="less" scoped>
.idea{
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    .btn-box{
        padding: 0 0.4rem;
        background: #f5f5f5;
    }
    .weui-btn:after{
        display: block;
        border-radius:99px;
    }
}
</style>
