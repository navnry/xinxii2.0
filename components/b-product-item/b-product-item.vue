<template>
    <view class="insurance-item" @click="openUrl('../product/detail?id='+item.id)">
        <view class="img-box">
            <image class="img" lazy-load :src="item.pictures+'?imageView2/1/w/150/h/150'" mode="aspectFill"></image>
        </view>
        <view class="detail">
            <view class="info">
                <view class="tit">{{item.name}}</view>
                <view class="label">
                    <text class="txt" v-for="i in item.tags" :key="i.id">{{i.name}}</text>
                </view>
            </view>
            <view class="price">{{item.inPrice.toFixed(2)}} <text class="txt">元/起</text></view>
        </view>
    </view>
</template>

<script>
  export default{
    props:{
        item: {
            type: Object
        }
    }
  }
</script>

<style lang="scss" scoped>
.insurance-item{display: flex; border-top: 2rpx solid $xinxii-border-color; padding: 24rpx 0;
    .img-box{font-size: 0; flex-shrink: 0; margin-right: 24rpx;
        .img{width: 150rpx; height: 150rpx;border-radius: 8rpx;}
    }
    .detail{flex: 1; display: inline-flex; flex-direction: column; justify-content: space-between;overflow: hidden;
        .info{
			.tit{font-size: 32rpx; line-height: 44rpx; font-weight: bold; margin-bottom: 8rpx; @include text-line(1);}
			.label{font-size: 24rpx; color: $xinxii-theme-color; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
			    .txt{padding: 0 8rpx; line-height: 40rpx; border-radius: 2rpx; background: $xinxii-bg-color; margin-right: 8rpx;
					&:last-of-type{margin-right: 0;}
			    }
			}
        }
        .price{color: $xinxii-font-price; font-size: 40rpx; font-weight: bold; line-height: 52rpx;
			.txt{margin-left: 10rpx; font-size: 24rpx; font-weight: normal; line-height: 34rpx;}
        }
    }
}
</style>
