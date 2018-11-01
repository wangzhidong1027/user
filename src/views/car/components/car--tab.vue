<template>
  <div class="car-tab">
    <checklist  :options="[{key: true, value: '全选'}]"   v-model="selectall" @click.native="change" class="all"></checklist>
    <div class="allmoney">
      <div>总计 <span>￥{{allmoney}}</span></div>
      <div class="vip">会员价 <span>￥{{vipmoney}}</span></div>
    </div>
    <div class="submit" @click="submit">
     <b>去结算</b><span>({{allcount}})件</span>
    </div>
  </div>
</template>

<script>
  import { Checklist } from 'vux'
  export default {
    name: 'carTab',
    components: {
      Checklist
    },
    data () {
      return {
        selectall: []
      }
    },
    props :{
      allmoney: '',
      vipmoney: '',
      allcount: "",
      isALL: ""
    },
    methods: {
      change () {
        this.$emit('selectallChange',this.selectall[0])
      },
      submit () {
        this.$emit('submitFrom')
      }
    },
    watch: {
      isALL () {
        if(this.isALL){
          this.selectall = [true]
        }else{
          this.selectall = []
        }
      }
    }
  }
</script>

<style lang="less" >
.car-tab{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .all{
    .weui-cells:before{
      display: none;
    }
    .weui-cells:after{
      display: none;
    }
  }
  .allmoney{
    flex: 1;
    text-align: right;
    padding-right: 0.2rem;
    font-size: 0.3rem;
    font-weight: 600;
    span{
      color: #e4393c;
    }

    .vip{
      font-weight: normal;
    }
  }
  .submit{
    width: 2.4rem;
    height: 100%;
    background: #e4393c;
    color: #fff;
    font-size: 0.3rem;
    line-height: 1rem;
    text-align: center;
    font-weight: normal;
    b{
      font-weight: 600;
    }
    span{
      font-size: 0.2rem;
    }
  }

}
</style>