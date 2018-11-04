<template>
  <div id="detail">
  	<div class="goods-img">
      <!--<img :src="goodinfo.image" alt="">-->
      <img src="http://img10.360buyimg.com/n1/jfs/t24925/236/544592727/301788/24c3cbc8/5b73c6b2N46cce4c8.jpg" alt="">
    </div>
  	<div class="name">
			商品名称:{{title}}
    </div>
    <div>

    </div>
    <div class="twoprice">
    	<div class="price">
    		<span>价格:</span>
    		<b>¥ {{price}}</b>
    	</div>
    	<p class="economize">
    		<span>会员价:</span>
    		<b>¥ {{vipprice}} </b>
    	</p>
    </div>
    <div class="stock">
			<span>库存:</span>
    	<b>{{inventory}}</b>
    </div>
    <div class="shop_content">
    	<p>商品简介:</p>
			{{content}}<br/>
			{{content}}<br/>
			{{content}}<br/>
			{{content}}<br/>
			{{content}}<br/>
			<div class="content_img">

			</div>
    </div>
    <div id="cartab">

    	<div class="addcard">
	    	<a>
	    		<span >加入购物车</span>
	    	</a>
	    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  data () {
    return {
      goodinfo: {},//图片 ok
      merchno:'油站编码', // 油站编码
      merchname:'油站名称', // 油站名称
      id:'商品ID',	// 商品ID
      title:'商品名称', //商品名称 ok
      price:'售价', // 售价 ok
      vipprice:'会员价', //会员价 ok
      images:'', // 图片
      inventory:'当前库存', // 当前库存 ok
			intro:'商品简介', // 商品简介 ok
			content:'商品内容', //商品内容 ok
    }
  },
  methods: {

  },
  created () {
    var formData = this.$route.params.id;
    formData = this.$base64.encode(JSON.stringify(formData));
//  this.$axios.post( this.$baseUrl + "/per/goodslist", this.$qs.stringify({
//    data: formData
//  })).then( result => {
//    var res = JSON.parse(this.$base64.decode(result.data))
//    this.goodinfo = res.data[0]
//    console.log(res)
//  })
  }
}
</script>

<style lang="less" scoped>
#detail{
  width: 100%;
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  background: #f5f5f5;
  .goods-img{
    width: 100%;
    img{
      display: block;
      width: 100%;
      border-bottom:1px solid #eee;
    }
  }
  .name {
    padding:0.25rem;
    font-size: 0.3rem;
    color: #333333;
    line-height: 0.5rem;
    background: #FFF;
	}
	.twoprice{
    border-bottom:1px solid #eee;
    .price{
    	font-size: 0.3rem;
	    padding:0 0.25rem;
	    background: #FFF;
	    b{
		    color: #ff3737;
	    }
		}
		.economize {
	    background: #fff;
	    padding:0.12rem 0.25rem;
	    font-size: 0.3rem;
	    b{
	    	color: #ff3737;
	    }
		}
  }
  .stock{
		border-bottom:1px solid #eee;
		font-size: 0.3rem;
    padding:0.25rem 0.25rem;
    background: #FFF;
    b{
	    color: #ff3737;
    }
  }
  .shop_content{
		border-bottom:1px solid #eee;
		margin-bottom: 1rem;
		padding:0.25rem 0.25rem;
		font-size: 0.3rem;
		background-color: #fff;
		p{
			padding-bottom: 0.25rem;
		}
		.content_img{
			margin-top: 0.25rem;
			display: block;
			height: 7.5rem;
    	background-image: url(http://img30.360buyimg.com/sku/jfs/t26089/173/526748692/403827/24d1a078/5b73bf0dN65a82d82.jpg);
    	background-size: 100% auto;
			background-repeat: no-repeat;
		}
  }
  #cartab{
  	height: 1rem;
    position: fixed;
    bottom: 0rem;
    width: 100%;
    box-shadow: 0 -1px 3px #EEEEEE;
    background: #fff;
    display: flex;
    flex-direction: row;
    color: #999;
    font-size: 0.5rem;
    text-align: center;
    z-index: 3333;
    .cancel{
    	flex: 1;
	    background: #A9A9A9;
			height:1rem;
	    color: #fff;
	    font-size: 0.8rem;
    	a{
    		line-height:1rem;
    		display: block;
    		color: #fff;
    		text-decoration: none;
		    cursor: pointer;
		    outline: none;
				font-size: 0.45rem;
    	}
    }
    .addcard{
    	flex: 1;
	    background: #ff3b3c;
	    height:1rem;
	    color: #fff;
	    font-size: 0.8rem;
    	a{
    		line-height:1rem;
    		display: block;
    		color: #fff;
    		text-decoration: none;
		    cursor: pointer;
		    outline: none;
		    font-size: 0.45rem;
    	}
    }
  }

}
</style>
