<template>
	<view class="x-modal" :class="{'show':show}" @touchmove.stop.prevent="" @mousewheel.stop.prevent="">
		<!-- <view class="mask"></view> -->
		<view class="x-modal-content">
			<view class="title" v-if="title">
				{{title}}
			</view>
			<view class="content" v-if="content">
				{{content}}
			</view>
			<view class="slot-content">
				<slot>
				
				</slot>
			</view>
			<view class="sub-list">
				<button class="btn cancel" type="default" @click="cancel()" v-if="cancelShow">{{cancelText}}</button>
				<button class="btn sure" type="default" @click="sure()" v-if="confirmShow">{{confirmText}}</button>
			</view>
			<view class="close-btn" v-if="closeBtn" @click="close()">
				<!-- <image class="img" lazy-load src="../../static/modal-close.png" mode=""></image> -->
                <x-icon type="close"></x-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
            cancelShow:{
                type: Boolean,
                default: true
            },
            confirmShow:{
                type: Boolean,
                default: true
            },
			title:{
				type:String,
				default:'提示'
			},
			content:{
				type:String,
				default:''
			},
            disable: {
                type: Boolean,
                default: false
            },
			//是否显示下方的关闭按钮
			closeBtn:{
				type: Boolean,
				default: false
			},
			// showCancel:{
			// 	type:Boolean,
			// 	default:true
			// },
			cancelText:{
				type:String,
				default:'取消'
			},
			confirmText:{
				type:String,
				default:'确定'
			}
		},
		data() {
			return {
				show:false
			}
		},
		
		methods: {
			cancel(){
				this.show = false
				this.$emit('cancel')
                uni.showTabBar()
			},
			open(){
				this.show = true
			},
			sure(){
				this.show = false
				this.$emit('sure')
			},
			close(){
				this.show = false
			}
            // close () {
            //     if (!this.disable) {
            //         this.show = false
            //     }
            // }
		}
	}
</script>

<style lang="less" scoped>
.x-modal{position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 1110;opacity: 0;outline: 0;text-align: center;-ms-transform: scale(1.1);transform: scale(1.1);backface-visibility: hidden;perspective: 2000upx;background: rgba(0, 0, 0, 0.4);transition: all 0.2s ease-in-out 0s;pointer-events: none;&::before {content: "\200B";display: inline-block;height: 100%;vertical-align: middle;}
	&.show {opacity: 1;transition-duration: 0.2s;-ms-transform: scale(1);transform: scale(1);overflow-x: hidden;overflow-y: auto;pointer-events: auto;}
}
.x-modal-content{width: 560rpx; min-height: 250rpx; max-height: 900rpx; background-color: #fff; border-radius: 8rpx; position: fixed; z-index: 1000000; top: 50%; left: 50%; transform: translate(-50%,-50%); text-align: center; color: #535353;
	.title{font-size: 32rpx;color: #191F25;font-weight: 500;line-height: 44rpx;padding: 48rpx 48rpx 0 48rpx;}
	.content{font-size: 26rpx;line-height: 36rpx;color: rgba(25, 31, 37, 0.56);padding: 16rpx 36rpx 48rpx 36rpx;word-break: break-all;}
	.close-btn{position: absolute;bottom: -72rpx;left: 50%;transform: translateX(-50%);font-size: 0;
		.img{width: 32rpx;height: 32rpx;}
	}
	.slot-content{max-height: 500rpx;overflow-y: auto;font-size: 26rpx; padding: 0 36rpx 48rpx;color: rgba(25, 31, 37, 0.56); margin-top: -32rpx;position: relative;
		&::before{position: absolute;content: '';width: 100%;height: 2rpx;background-color:rgba(25, 31, 37, 0.08);bottom: 0;left: 0;}
	}
		
	.sub-list{display: flex;justify-content: center;position: relative;
		.btn{flex:1;height: 86rpx;line-height: 86rpx;position: relative;text-align: center;font-size: 32rpx;border-radius: 0;border:none;background-color: #fff;
			&.sure{color: #FF5000;border-radius: 0 0 8rpx 8rpx;}
			&.cancel{color: #3296FA;background-color: #FFFFFF;border-radius: 0 0 8rpx 8rpx;overflow: visible;
				&::before{position: absolute;content: '';width: 2rpx;height: 100%;background-color:rgba(25, 31, 37, 0.08);top: 0;right: 0;}
			}
		}
	}
	.progress-msg{font-size: 22rpx;color: #505050;margin-top: 4rpx;}
}
</style>
