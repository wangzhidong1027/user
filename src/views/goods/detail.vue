<template>
  <div id="detail">
    <div class="goods-img">
      <img :src="goodinfo.image" alt="">
    </div>
    <div class="name">
      <p></p>
    </div>
    <div class="price">

    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  data () {
    return {
      goodinfo: {}
    }
  },
  methods: {

  },
  created () {
    var formData = this.$route.params.id;
    formData = this.$base64.encode(JSON.stringify(formData));
    this.$axios.post( this.$baseUrl + "/per/goodslist", this.$qs.stringify({
      data: formData
    })).then( result => {
      var res = JSON.parse(this.$base64.decode(result.data))
      this.goodinfo = res.data[0]
      console.log(res)
    })
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
    }
  }
}
</style>