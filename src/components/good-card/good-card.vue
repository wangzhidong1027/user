<template>
  <a class="goods vux-1px-b" :href="'#/detail/'+ info.id">
    <!--<panel header="热卖商品"  :list="list" type="1"  ></panel>-->
      <div class="goodimg">
        <img :src="info.images" alt="">
      </div>
      <div class="goodtitle">
        <div class="name">{{info.name}}</div>
        <div class="price">
          零售价：￥{{info.price | formatMoney}}</br>
          会员价：￥{{info.vipPrice | formatMoney}}
        </div>
      </div>
  </a>
</template>

<script>
  import { Panel } from 'vux'
  export default {
    name: "goodcard",
    components: {
      Panel
    },
    props: {
      info: {
        type: Object
      }
    },
    data () {
      return {
        list: [{
          src: 'http://somedomain.somdomain/x.jpg',
          title: '标题一',
          desc: '会员价：￥12321 </br>会员价：￥12321',
          url: '/component/cell'
        }, {
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题二',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: {
            path: '/component/radio',
            replace: false
          },
          meta: {
            source: '来源信息',
            date: '时间',
            other: '其他信息'
          }
        }]
      }
    },
    method: {
      onImgError (item, $event) {
        console.log(item, $event)
      }
    },
  }
</script>

<style scoped lang="less">
.goods{
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 0.2rem 0;
  width: 100%;
  height: 2rem;
  .goodimg{
    img{
      width: 2rem;
    }
  }
  .goodtitle{
    flex: 1;
    padding-left: 0.2rem;
    display: flex;
    flex-direction: column;
    .name{
      font-size: 0.3rem;
      flex: 1;
    }
    .price{
      color: #f44;
      font-size: 0.25rem;
      padding: 0.1rem;
    }
  }
}
</style>
