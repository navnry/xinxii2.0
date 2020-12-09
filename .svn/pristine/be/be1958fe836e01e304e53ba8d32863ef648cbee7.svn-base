<template>
    <view class="content">
        <x-nav-bar :no-border="true" title="绑定邮箱"></x-nav-bar>
        <view class="main">
            <view>
                <x-input type="text" placeholder="输入邮箱账号" v-model="setData.mail"></x-input>
            </view>
            <view class="tip">注意邮箱账号格式</view>
            <button class="btn">确认</button>
        </view>
    </view>
</template>

<script>
    export default{
        data () {
            return {
                setData: {
                    mail: ''
                }
            }
        },
        methods:{
            
        }
    }
</script>

<style lang="scss" scoped>
    .content{position: absolute; width: 100%; min-height: 100%; background-color: #fff;}
    .main{padding: 0 72rpx; margin-top: 180rpx;
        .item{margin-top: 18rpx;}
        .tip{font-size: 24rpx; line-height: 36rpx; margin: 22rpx 0 48rpx;}
        .btn{height: 88rpx; line-height: 88rpx; border-radius: 8rpx; color: #fff; font-size: 32rpx; background-color: $xinxii-theme-color;}
    }
</style>
