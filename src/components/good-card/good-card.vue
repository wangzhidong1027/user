<template>
  <a class="goods vux-1px-b" :href="'#/detail/'+ info.id">
    <!--<panel header="热卖商品"  :list="list" type="1"  ></panel>-->
      <div class="goodimg">
        <img :src="info.images" alt="">
      </div>
      <div class="goodtitle">
        <div class="name">{{info.name}}</div>
        <div class="price">
          <p>零售价：¥{{info.price | formatMoney}}</p>
          <p class="vip"><span>超级会员价</span>¥{{info.vipPrice | formatMoney}}</p>
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
    box-sizing: border-box;
    width: 2rem;
    img{
      width:100%;
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
      color: #504b4e;
    }
    .price{
      font-size: 0.22rem;
      padding: 0.1rem;
      color: #8c8c8c;
      .vip{
        color: #ff3b30;
        font-weight: bold;
        font-size: 0.3rem;
        span{
          font-weight: normal;
          display: inline-block;
          color: #ae8d4c;
          background: linear-gradient(90deg, rgb(254, 252, 249), rgb(245, 235, 216));
          line-height: 0.4rem;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>
