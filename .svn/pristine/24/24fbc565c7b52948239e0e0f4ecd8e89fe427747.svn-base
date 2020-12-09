<template>
	<view class="">
		<view class="mask"></view>
		<view class="tips">
			<view class="title">个人信息使用授权书和隐私政策</view>
			<view class="cont">
				<view>请你务必审慎阅读、充分理解”个人信息使用授权书“和”隐私政策“各条款，包括但不限于：为了更好的想你提供服务，我们需要收集你的设备标识、操作日志等信息用于分析、优化应用性能</view>
				<view>你可以阅读<text class="user-agreement" @click="openUrl('../ebook/personal')">《个人信息使用授权书》</text>和<text class="user-agreement" @click.stop="openUrl('../ebook/privacypolicy')">《隐私政策》</text>了解详细信息。如果你同意，请点击下面按钮开始接受我们的服务</view>
			</view>
			<view class="btn-box">
				<view class="cancel" @click="cancel">取消</view>
				<view class="sure" @click="sure">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data (){
			return {
				
			}
		},
        methods:{
            cancel(){
                // #ifdef APP-PLUS
                plus.os.name=="Android" ? plus.runtime.quit() : plus.ios.import("UIApplication").sharedApplication().performSelector("exit")
                // #endif
            },
            sure(){
                uni.setStorageSync('showHomeTips', 1)
                this.$emit('close')
                uni.showTabBar()
            }
        }
	}
</script>

<style lang="scss" scoped>
	.mask{position: fixed; top: 0; left: 0; background: rgba(51,51,51,.7); height: 100%; width: 100%; z-index: 1000;}
	.tips{position: absolute; z-index: 1001; left: 50%; top: 50%; transform: translate(-50%,-50%); width: 600rpx; background: #fff; border-radius: 20rpx; color: #333; background: #fff; padding-top: 12rpx;
        .title{font-size: 34rpx; font-weight: bold; padding: 20rpx; text-align: center;}
		.cont{font-size: 28rpx; padding: 0 24rpx;
			view{text-indent: 2em;}
			.first{text-indent: 0;}
			.user-agreement{color: #38f}
		}
		.btn-box{border-top: 1px solid #F7F7F7; height: 80rpx; line-height: 80rpx; font-size: 30rpx; display: flex;
			view{width: 50%; text-align: center;}
			.cancel{border-right: 1px solid #f7f7f7;}
			.sure{ color: #FF5000;}
		}
	}
</style>
