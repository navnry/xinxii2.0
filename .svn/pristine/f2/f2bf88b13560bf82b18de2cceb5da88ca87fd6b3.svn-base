<template>
	<view>
        <view class="popup" v-if="visible">
            <view class="tit">绑定手机</view>
            <view class="txt">还差一步就可以{{platform}}快捷登录了</view>
            <button class="btn phone" @click="gotoBinding">已有账号直接绑定</button>
            <button class="btn" @click="gotoReg">没有账号新注册</button>
        </view>
		<view class="mask" @click="closeLogin" v-if="visible"></view>
	</view>
</template>
<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        platform: {
            type: String,
            default: '微信'
        }
    }, 
	data() {
		return {
		}
	},
	methods: {
        closeLogin () {
            this.$emit('closeLogin')
        },
        gotoBinding () {
            uni.navigateTo({
                url: '/pages/user/binding'
            })
        },
        gotoReg () {
            uni.navigateTo({
                url: '/pages/user/register'
            })
        }
    }
}
</script>

<style lang="scss" scoped="">
.popup{width: 70%; position: fixed; left: 50%; top: 50%; background-color: #FFF; border-radius: 10rpx; z-index: 9999; transform: translate(-50%, -50%); text-align: center; padding: 40rpx;
    .tit{font-size: 40rpx; line-height: 80upx;}
    .txt{font-size: 30rpx; line-height: 80upx; color: #999;}
    .btn{width: 400rpx; line-height: 80upx; text-align: center; display: block; margin: 30rpx auto 0;}
    .phone{background-color: #00BE6E; color: #fff;}
}
.mask {background: rgba(0, 0, 0, 0.6); position: fixed; width: 100%; height: 100%; left: 0; top: 0; z-index: 9998;}
</style>
