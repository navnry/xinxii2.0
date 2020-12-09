<template>
    <view class="content">
        <x-nav-bar :no-border="true" title="邀请有礼"></x-nav-bar> 
        <view class="img">
            <image lazy-load class="one" src="../../static/home_invitation_bg.jpg" mode=""></image>
			<div class="rule" @click="openUrl('../ebook/invitationrule')">规则说明</div>
            <view class="btn-box">
                <view class="btn" @click="invitation">我的邀请</view>
            </view>
        </view>
		<x-modal title="您还未登录" content="立即去登录吗？" @sure="toLogin" ref="modal1"></x-modal>
		<x-modal title="您还不是经纪人" content="是否立即成为保险经纪人？" @sure="toInvitation" ref="modal2"></x-modal>
    </view>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        computed: mapState(['userinfo','isLogin']),
        data () {
            return {

            }
        },
        onShow() {
        },
		onLoad() {

		},
        methods: {
			toLogin(){
				 this.openUrl('../my/login')
			},
			toInvitation(){
				console.log(this.userinfo.reviewResultCode.code)
				if(!this.userinfo.reviewResultCode.code){
					this.openUrl('../join/index')
				}else{
					this.openUrl('../join/audit?code='+this.userinfo.reviewResultCode.code+'&reason='+this.userinfo.reviewResultCode.reason)
				}
			},
			invitation(){
				if(!this.isLogin){
					this.$refs.modal1.open()
				    return
				}
				if(this.userinfo.reviewResultCode.code != 5){
					this.$refs.modal2.open()
				    return
				}
				  this.openUrl('../my/invite')
			}
        }
    }
</script>

<style lang="scss" scoped>
.img{width: 100%; font-size: 0;position: relative;
    image{width: 100%;height: 3316rpx;}
	.rule{position: fixed; top: 136rpx;right: 0;width: 172rpx;height: 64rpx;background: rgba(255,255,255,.74);border-radius: 200rpx 0 0 200rpx;padding: 12rpx 0;box-sizing: border-box;text-align: center;font-size: 28rpx;color: #FF5000;line-height: 40rpx;}
    .btn-box{ position: fixed; bottom: 48rpx; padding: 0 24rpx; width: 100%;
        .btn{width: 100%; height: 88rpx; line-height: 88rpx; text-align: center; background: #FE582D; border-radius: 8rpx; font-size: 32rpx; color: #fff;}
    }
}
</style>
