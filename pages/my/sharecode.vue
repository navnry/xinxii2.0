<template>
	<view class="content">
		<x-nav-bar :noBorder="true" backgroundColor="transparent" color="#fff"></x-nav-bar>
		<view>
			<image v-if="imgUrl" :src="imgUrl" mode=""></image>
		</view>
		<view class="btn">
			<button @click="saveImg">保存图片</button>
		</view>
	</view>
</template>

<script>
	import {downloadImage} from '@/common/api/index.js'
	export default {
		data() {
			return {
				imgUrl: ''
			}
		},
		onLoad(option) {
			console.log(option.base64)
			this.imgUrl = decodeURIComponent(option.base64)
		},
		methods: {
			saveImg(){
				downloadImage(this.imgUrl,true)
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{background-color: $xinxii-theme-color;}
	.content{position: absolute; width: 100%; min-height: 100%; padding-bottom: 140rpx;background-color: $xinxii-theme-color;}
	image {display: block;width: 100%;height: 1004rpx;}
	.btn{
		button{position: fixed;height: 88rpx;left: 120rpx;right: 120rpx;bottom: 48rpx;background: #FFFFFF;border-radius: 6rpx;color: $xinxii-theme-color;font-size: 32rpx;line-height: 88rpx;}
	}
</style>
