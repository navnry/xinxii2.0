<template>
    <view class="item" @click="onClick">
        <view class="info">
            <view class="tit">{{item.title}}</view>
            <view class="time"><text>{{item.btnName}}</text> 阅读量·{{item.readNum|million}} 转发量·{{item.shareNum|million}}</view>
        </view>
        <image lazy-load :src="item.pic+'?imageMogr2/crop/216x148'" mode=""></image>
    </view>
</template>

<script>
    export default{
        props:{
            item:{
                type: Object
            },
            showName:{
                type: [String,Number],
                default: 0
            }
        },
        filters:{
            million (value){
                if(!value){
                    value = 0
                }
                let num; 
                if(value > 9999){
                    num = (Math.floor(value/1000)/10) + 'W'
                }else if( value < 9999){ 
                    num = value 
                }
                return num
            }
        },
        methods:{
            onClick(){
                this.$emit('toDetail')
            }
        }
    }
</script>

<style lang="scss">
    .tit{line-height: 48rpx; font-size: 32rpx; @include text-line();}
    .time{color: #999; font-size: 24rpx;
        text{margin-right: 8rpx; color: $xinxii-theme-color; padding: 0 8rpx; border-radius: 4rpx; background: $xinxii-bg-color;}
    }
    .item{display: flex; align-items: center; justify-content: space-between; margin-bottom: 24rpx; font-size: 0;
        .info{flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between; height: 146rpx;}
        image{width: 204rpx; height: 146rpx; border-radius: 6rpx; flex-shrink: 0; margin-left: 24rpx;}
    }
</style>
