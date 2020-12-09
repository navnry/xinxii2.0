<template>
    <view class="content">
        <x-nav-bar :no-border="true" title="保单详情"></x-nav-bar>
        <view class="group one" v-if="detail">
            <view class="tit">
                <view>{{detail.productName}}</view>
                <text class="status">{{detail.status}}</text>
            </view>
            <view class="info" @click="openUrl('../product/detail?id='+detail.productId)">
                <view>保单号：{{detail.serialNumber}}</view>
                <view>由{{detail.producerName}}承保</view>
                <view class="price">baofeislkdfj</view>
                <view class="btn">查看产品</view>
                <image src="@/static/order/await-pay.png" mode=""></image>
            </view>
        </view>
        <view class="group">
            <view class="tit">保障详情</view>
            <view class="item">
                <view class="left">保险计划</view>
                <view class="right">尊享版</view>
            </view>
            <view class="item">
                <view class="left">起保时间</view>
                <view class="right">(⊙_⊙)?2424234234234</view>
            </view>
            <view class="item">
                <view class="left">终止时间</view>
                <view class="right">345345</view>
            </view>
            <view class="item">
                <view class="left">保障期间</view>
                <view class="right">234</view>
            </view> 
            <view class="item">
                <view class="left">份数</view>
                <view class="right">234</view>
            </view>
        </view>
        <view class="group">
            <view class="tit">保障权益</view>
            <view class="item">
                <view class="left">重大疾病医疗费用</view>
                <view class="right">尊享版</view>
            </view>
            <view class="item">
                <view class="left">恶性肿瘤特定药品费用</view>
                <view class="right">(⊙_⊙)?2424234234234</view>
            </view>
            <view class="item">
                <view class="left">恶性肿瘤特定药品费用</view>
                <view class="right">345345</view>
            </view>
            <view class="item">
                <view class="left">保障期间</view>
                <view class="right">234</view>
            </view> 
            <view class="item">
                <view class="left">份数</view>
                <view class="right">234</view>
            </view>
        </view>
        <view class="group">
            <view class="tit zt">投保人信息</view>
            <view class="item">
                <view class="left">重大疾病医疗费用</view>
                <view class="right">尊享版</view>
            </view>
            <view class="item">
                <view class="left">恶性肿瘤特定药品费用</view>
                <view class="right">(⊙_⊙)?2424234234234</view>
            </view>
            <view class="item">
                <view class="left">恶性肿瘤特定药品费用</view>
                <view class="right">345345</view>
            </view>
            <view class="item">
                <view class="left">保障期间</view>
                <view class="right">234</view>
            </view> 
            <view class="item">
                <view class="left">份数</view>
                <view class="right">234</view>
            </view>
        </view>
        <view class="group">
            <view class="tit zt">被保人信息</view>
            <view class="item">
                <view class="left">重大疾病医疗费用</view>
                <view class="right">尊享版</view>
            </view>
            <view class="item">
                <view class="left">恶性肿瘤特定药品费用</view>
                <view class="right">(⊙_⊙)?2424234234234</view>
            </view>
            <view class="item">
                <view class="left">恶性肿瘤特定药品费用</view>
                <view class="right">345345</view>
            </view>
            <view class="item">
                <view class="left">保障期间</view>
                <view class="right">234</view>
            </view> 
            <view class="item">
                <view class="left">份数</view>
                <view class="right">234</view>
            </view>
        </view>
        <view class="group">
            <view class="tit">紧急联系人</view>
            <view class="item">
                <view class="left">重大疾病医疗费用</view>
                <view class="right">尊享版</view>
            </view>
            <view class="item">
                <view class="left">恶性肿瘤特定药品费用</view>
                <view class="right">(⊙_⊙)?2424234234234</view>
            </view>
        </view>
        <view class="group">
            <view class="tit">续期缴费信息</view>
            <view class="item">
                <view class="left">重大疾病医疗费用</view>
                <view class="right">尊享版</view>
            </view>
            <view class="item">
                <view class="left">恶性肿瘤特定药品费用</view>
                <view class="right">(⊙_⊙)?2424234234234</view>
            </view>
        </view>
        <view class="group">
            <view class="tit">续期信息</view>
            <view class="group-item">
                <view class="left">
                    <view>20947239040203942</view>
                    <view class="time">续期时间：2020-10-22 00:00:00</view>
                </view>
                <view class="right">
                    <view>已支付</view>
                    <view class="price">¥2019.00</view>
                </view>
            </view>
            <view class="group-item">
                <view class="left">
                    <view>20947239040203942</view>
                    <view class="time">续期时间：2020-10-22 00:00:00</view>
                </view>
                <view class="right">
                    <view>已支付</view>
                    <view class="price xufei">¥2019.00</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default{
        data () {
            return {
                detail: null
            }
        },
        onLoad(option) {
            if(option.id){
                this.getDetail(option.id)
            }
        },
        methods:{
			add0(m){
				return m < 10 ? '0' + m : m
			},
			formatTime(timestamp) {
				if(!timestamp) return
				var date = new Date(timestamp);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = date.getDate() + ' ';
				var H = date.getHours();
				var MM = date.getMinutes();
				return Y + M + D + this.add0(H) +':' + this.add0(MM);
			},
            getDetail(id){
                this.$api.get('insure/order/getBySerialNumber.do?serialNumber='+id).then( res => {
					console.log( res.data)
                    if(res.success){
                        this.detail = res.data
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.content{padding-top: 24rpx;
    .group{width: 702rpx; margin: 0 auto 18rpx; background: #fff; border-radius: 12rpx; padding: 0 24rpx;
        &.one{padding-bottom: 24rpx;}
        .tit{display: flex; align-items: center; font-size: 32rpx; font-weight: bold; line-height: 44rpx; padding-top: 24rpx;
            &.zt{color: $xinxii-theme-color;}
            view{flex-grow: 1; @include text-line(1);}
            .status{flex-shrink: 0; width: 88rpx; height: 40rpx; line-height: 40rpx; text-align: center; color: $xinxii-theme-color; background-color: $xinxii-bg-color; margin-left: 16rpx;}
        }
        .info{position: relative;
            view{font-size: 28rpx; color: #999; line-height: 40rpx; padding-top: 12rpx;}
            .price{font-size: 32rpx; color: #333;}
            .btn{width: 144rpx; height: 56rpx; text-align: center; line-height: 52rpx; border: 2rpx solid $xinxii-theme-color; border-radius: 6rpx; color: $xinxii-theme-color; font-size: 28rpx; padding: 0; margin-top: 24rpx;}
            image{position: absolute; right: -24rpx; bottom: -24rpx; width: 168rpx; height: 168rpx;}
        }
    }
    .item{display: flex; justify-content: space-between; align-items: center; font-size: 32rpx; line-height: 40rpx; padding: 22rpx 0; border-bottom: 1px solid #F0F0F0;
        &:last-of-type{border: none;}
        .left{}
        .right{color: #999; flex-shrink: 0; width: 280rpx; text-align: right;}
    }
    .group-item{display: flex; justify-content: space-between; padding: 22rpx 0 38rpx; font-size: 34rpx;
        .left{
            .time{font-size: 24rpx; color: #999; margin-top: 8rpx;}
        }
        .right{
            .price{margin-top: 8rpx; color: #FC6110;
                &.xufei{color: #EF4034;}
            }
        }
    }
}

</style>
