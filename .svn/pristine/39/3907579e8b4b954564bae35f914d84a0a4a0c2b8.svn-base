<template>
    <view class="content">
		<x-nav-bar :no-border="true" title="保单详情"></x-nav-bar>
        <view class="group" v-if="detail">
            <view class="tit">
                <text>{{detail.productName}}</text>
                <text class="status">{{detail.status}}</text>
            </view>
            <view class="info" @click="openUrl('../product/detail?id='+detail.productId)">
                <view class="left">
                    <view>保单号：{{detail.serialNumber}}</view>
                    <view>由{{detail.producerName}}承保</view>
                </view>
                <!-- <image lazy-load src="./static/arrow_right2.png" mode=""></image> -->
                <x-icon type="arrow-right"></x-icon>
            </view>
        </view>
        <view class="group" v-if="detail">
            <view class="tit">基本信息</view>
            <view class="item">
                <view class="left">保费</view>
                <view class="right">{{detail.initialPrem ? parseFloat(detail.initialPrem).toFixed(2) : '0.00'}}元</view>
            </view>
            <view class="item">
                <view class="left">承保日期</view>
				<view class="right">{{detail.insureTime}}</view>
            </view>
            <view class="item">
                <view class="left">生效日期</view>
                <view class="right">{{detail.effectDate}}</view>
            </view>
            <view class="item">
                <view class="left">到期日期</view>
                <view class="right">{{detail.endDate}}</view>
            </view>
        </view>
        <view class="group" v-if="detail">
            <view class="tit">投保人信息</view>
            <view class="item">
                <view class="left">投保人</view>
                <view class="right">{{detail.insuredName}}</view>
            </view>
            <view class="item">
                <view class="left">手机号码</view>
                <view class="right">{{detail.mobile}}</view>
            </view>
        </view>
    </view>
</template>

<script>
	export default {
		data() {
			return {
				detail:null
			}
		},
		onLoad(option) {
			if(option.detail){
				this.detail = JSON.parse(option.detail)
			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
.content{padding-top: 24rpx;
    .group{width: 702rpx; margin: 0 auto 18rpx; background: #fff; border-radius: 12rpx; padding: 24rpx 24rpx 0;
        .tit{display: flex; align-items: center; justify-content: space-between; font-size: 32rpx; font-weight: bold; line-height: 44rpx;
            .status{color: #ff5000; flex-shrink: 0;}
        }
        .info{display: flex; justify-content: space-between; font-size: 0; padding-bottom: 24rpx;
            image{width: 14rpx; height: 24rpx; margin-top: 12rpx;}
            .left{
                view{font-size: 28rpx; color: #999; line-height: 40rpx; padding-top: 12rpx;}
            }
        }
    }
    .item{display: flex; justify-content: space-between; align-items: center; font-size: 32rpx; line-height: 40rpx; height: 84rpx; border-bottom: 1px solid #F0F0F0;
        &:last-of-type{border: none;}
        .right{color: #999;}
    }
}

</style>
