<template>
	<view class="content">
		<swiper class="swiper" 
		:autoplay="autoplay" 
		:duration="duration">
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img swiper-item-img1"><image lazy-load src="../../page_join/static/guide/icon_01.png" mode="aspectFit"></image></view>
					<view class="swiper-item-img swiper-item-img2"><image lazy-load src="../../page_join/static/guide/title_01.png" mode="aspectFit"></image></view>
				</view>
				<view class="jump-over" @click="launchFlag()">{{jumpover}}</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img swiper-item-img1"><image lazy-load src="../../page_join/static/guide/icon_02.png" mode="aspectFit"></image></view>
					<view class="swiper-item-img swiper-item-img2"><image lazy-load src="../../page_join/static/guide/title_02.png" mode="aspectFit"></image></view>
				</view>
				<view class="jump-over" @click="launchFlag()">{{jumpover}}</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img swiper-item-img1"><image lazy-load src="../../page_join/static/guide/icon_03.png" mode="aspectFit"></image></view>
					<view class="swiper-item-img swiper-item-img2"><image lazy-load src="../../page_join/static/guide/title_03.png" mode="aspectFit"></image></view>
				</view>
				<view class="experience" @click="launchFlag()">{{experience}}</view>
			</swiper-item>
		</swiper>
		<view class="uniapp-img"><image lazy-load src="../../page_join/static/guide/welcome-logo.png" mode="aspectFit"></image></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				autoplay: false,
				duration: 500,
				jumpover: '跳过',
				experience: '立即体验'
			}
		},
		methods: {
			launchFlag  (){
				/**
				 * 向本地存储中设置launchFlag的值，即启动标识；
				 */
				uni.setStorage({
                    key: 'launchFlag',
                    data: true,
				})
				uni.switchTab({
					url: '../../pages/home/index'
				})
			}
		}
	}
</script>
<style>
	page,.content{width: 100%; height: 100%; background-size: 100% auto ; padding: 0;  background: #fff;}
	.swiper{ width: 100%; height: 84%; background: #FFFFFF; }
	.swiper-item { width: 100%; height: 100%; text-align: center; position: relative; display: flex; /* justify-content: center; */ align-items:flex-end; flex-direction:column-reverse; }
	.swiper-item-img{ width: 100%; height: auto; margin: 0 auto; }
	.swiper-item-img1 image{ width: 300rpx; }
	.swiper-item-img2 image{ width: 400rpx; }
	.uniapp-img{ height: 16%; background: #FFFFFF; display: flex; justify-content: center; align-items:center; overflow: hidden; }
	.uniapp-img image{ width: 160rpx; }
	.jump-over,.experience{ position: absolute; height: 60upx; line-height: 58upx; padding: 0 40upx; border-radius: 30upx; font-size: 32upx; color: #333; border: 1px solid #333; z-index: 999; }
	.jump-over{ right: 45upx; top: 76upx; }
	.experience{ right: 50%; margin-right: -105upx; bottom: 0;}
</style>
