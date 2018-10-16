<template>
    <div id="me">
        <header>
            <div class="header-left">
                <div class="user-img">
                    <img src="https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png" alt="">
                </div>
            </div>
            <a class="header-right" href="#/home">
                <div class='name'><span>昵称</span></div>
                <div class="vip">
                    <a href="#me">会员</a>
                </div>
            </a>
        </header>
        <div class="nav">
            <grid>
                <grid-item label="订单">
                    <!--<img slot="icon" src="">-->
                </grid-item>
                <grid-item label="已购">
                    <!--<img slot="icon" src="">-->
                </grid-item>
                <grid-item label="优惠券">
                    <!--<img slot="icon" src="">-->
                </grid-item>
            </grid>
        </div>
        <div class="center">
        </div>
        <tabbar>
            <tabbar-item link="home">
                <img slot="icon" src="">
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item link="me" selected>
                <img slot="icon" src="">
                <span slot="label">我的</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
	import {Tabbar, TabbarItem, Grid, GridItem} from 'vux'

	export default {
		name: "me",
		components: {
			Tabbar,
			TabbarItem,
			Grid,
			GridItem
		}
	}
</script>

<style scoped lang="less">
    #me {
        height: 100%;
        width: 100%;
        background: #f5f5f5;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        header {
            height: 2rem;
            background: #fff;
            margin-bottom: 0.2rem;
            display: flex;
            justify-content: flex-start;
            .header-left {
                width: 25%;
                height: 100%;
                box-sizing: border-box;
                .user-img {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                img {
                    display: block;
                    width: 60%;
                    border-radius: 50%;
                }
            }
            .header-right {
                flex: 1;
                display: flex;
                flex-direction: column;
                div {
                    flex: 1;
                    font-size: 20px;
                }
                .name {
                    position: relative;
                    span {
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        font-size: 0.4rem;
                    }
                }
                .vip {
                    position: relative;
                    a {
                        position: absolute;
                        top: 0;
                        left: 0;
                        background: #eee;
                        padding: 0 0.2rem;
                        border-radius: 0.2rem;
                        font-size: 0.3rem;
                        color: #fff;
                    }
                }
            }
        }
        .nav{
            background: #fff;
            margin-bottom: 0.2rem;
        }
        .center {
            background: #fff;
        }
    }
</style>