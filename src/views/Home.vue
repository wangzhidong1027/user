<template>
    <div class="home">
        <tabbar>
            <tabbar-item selected link="home">
                <img slot="icon" src="" >
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item link="me">
                <img slot="icon" src="">
                <span slot="label">我的</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
    import { Tabbar, TabbarItem } from 'vux'
	export default {
		name: "home",
         components: {
            Tabbar,
            TabbarItem
          }
	};
</script>

<style lang="less" scoped>
    .weui-bar__item_on{
        p{
            span{
            color: #ff9900;
            }
        }
    }
</style>
