<template>
    <view class="content">
        <x-nav-bar :no-border="true" title="选择收款账户"></x-nav-bar>
        <view class="list">
            <view class="item" v-for="n in 3" :key="n">
                <image lazy-load src="@/static/assets/assets_car_logo1.png" mode=""></image>
                <view class="info">
                    <view class="name">建设银行</view>
                    <view class="detail">储蓄卡 尾号1232</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default{
        data () {
            return {
                
            }
        },
        methods:{
            
        }
    }
</script>

<style lang="scss" scoped>
    .list{padding-top: 24rpx;
        .item{background-color: #fff; width: 702rpx; height: 132rpx; border-radius: 12rpx; padding: 0 24rpx; margin: 0 auto 18rpx; font-size: 0; display: flex; align-items: center;
            image{width: 60rpx; height: 60rpx; margin-right: 18rpx;}
            .info{
                .name{font-size: 32rpx; line-height: 44rpx; margin-bottom: 6rpx;}
                .detail{font-size: 24rpx; color: #999;}
            }
        }
    }
</style>
