<template>
    <view class="content">
        <x-nav-bar :no-border="true" :title="title"></x-nav-bar>
        <view class="list">
            <view class="item">
                <view class="name">{{name}}</view>
                <view class="time">{{time}}</view>
                <view class="txt">{{content}}</view>
                <!-- <view class="time-box">产品上架时间：2020-08-13 12:42:21</view> -->
                <view class="btn-box">
                    <view></view>
                    <view class="btn" @click="openUrl('../product/detail?id='+id)">查看产品</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default{
        data () {
            return {
                title: '产品通知',
				name:'',
				time:'',
				content:'',
				id:''
            }
        },
		onLoad(option) {
			if(option && option.id){
				this.name = option.name
				this.time = option.createDate
				this.content = option.content
				this.id = option.id
			}
		},
        methods:{
            
        }
    }
</script>

<style lang="scss" scoped>
.list{padding-top: 24rpx;
    .item{width: 702rpx; margin: 0 24rpx 18rpx; background-color: #fff; border-radius: 12rpx; padding: 24rpx;
        .name{font-size: 32rpx; font-weight: bold; line-height: 44rpx;}
        .time{margin: 12rpx 0 24rpx; color: #999; font-size: 24rpx; line-height: 34rpx;}
        .txt{ font-size: 28rpx; line-height: 40rpx;}
        .time-box{font-size: 28rpx; line-height: 40rpx; padding: 24rpx 0; border-bottom: 2rpx solid #f0f0f0;}
        .btn-box{ display: flex; justify-content: space-between;
            .btn{width: 144rpx; height: 46rpx; text-align: center; line-height: 42rpx; border: 2rpx solid #999; color: #999; font-size: 24rpx; border-radius: 30rpx; margin-top: 22rpx;}
        }
    }
}
</style>
