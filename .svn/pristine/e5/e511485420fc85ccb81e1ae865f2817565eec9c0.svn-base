<template>
    <view class="content">
        <x-nav-bar :no-border="true" title="消息中心"></x-nav-bar>
        <view class="list">
            <view class="item" @click="openUrl('./systemnotice?num='+sysMsgNum)">
                <view class="left">
                    <view class="img-box">
                        <image lazy-load src="./static/message/msg_system.png" mode=""></image>
                        <text v-show="sysMsgNum > 0"></text>
                    </view>
                    <view class="info">
                        <view class="ty">系统通知</view>
                        <view class="del">{{sysMsg}}</view>
                    </view>
                </view>
                <x-icon size="32" color="#999" type="arrow-right"></x-icon>
            </view>
            <view class="item" @click="openUrl('./marketing?num='+marketingNum)">
                <view class="left">
                    <view class="img-box">
                        <image lazy-load src="./static/message/msg_active.png" mode=""></image>
                        <text v-show="marketingNum > 0"></text>
                    </view>
                    <view class="info">
                        <view class="ty">营销活动</view>
                        <view class="del">{{marketingMsg}}</view>
                    </view>
                </view>
                <x-icon size="32" color="#999" type="arrow-right"></x-icon>
            </view>
            <view class="item" @click="openUrl('./productstatus?num='+productNum)">
                <view class="left">
                    <view class="img-box">
                        <image lazy-load src="./static/message/msg_product.png" mode=""></image>
                        <text v-show="productNum > 0"></text>
                    </view>
                    <view class="info">
                        <view class="ty">产品动态</view>
                        <view class="del">{{productMsg}}</view>
                    </view>
                </view>
                <x-icon size="32" color="#999" type="arrow-right"></x-icon>
            </view>
            <view class="item" @click="openUrl('./orderinfo?num='+orderNum)">
                <view class="left">
                    <view class="img-box">
                        <image lazy-load src="./static/message/msg_order.png" mode=""></image>
                        <text v-show="orderNum > 0"></text>
                    </view>
                    <view class="info">
                        <view class="ty">订单通知</view>
                        <view class="del">{{orderMsg}}</view>
                    </view>
                </view>
                <x-icon size="32" color="#999" type="arrow-right"></x-icon>
            </view>
        </view>
    </view>
</template>

<script>
    export default{
        data () {
            return {
                sysMsg:'',
				sysMsgNum:0,
				marketingMsg:'',
				marketingNum:0,
				productMsg:'',
				productNum:0,
				orderMsg:'',
				orderNum:0
            }
        },
		onShow() {
			this.getMessageList()
		},
        methods:{
            getMessageList(){
				this.$api.post('member/message/getAllNewMsg.do').then( res => {
				    if(res.success && null!= res.data){
				       this.sysMsg = res.data.sysMsg.title
					   this.sysMsgNum = res.data.sysMsgNum
					   
					   this.marketingMsg = res.data.marketingMsg.title
					   this.marketingNum = res.data.marketingMsgNum
					   
					   this.productMsg = res.data.productMsg.title
					   this.productNum = res.data.productMsgNum
					   
					   this.orderMsg = res.data.orderMsg.title
					   this.orderNum = res.data.orderMsgNum
				    }
				})
			}
        }
    }
</script>

<style lang="scss" scoped>
.list{padding-top: 24rpx;
    .item{background: #fff; margin-bottom: 18rpx; display: flex; align-items: center; justify-content: space-between; padding: 24rpx;
        .left{flex-grow: 1; display: flex; align-items: center;
            .img-box{width: 96rpx; height: 96rpx; margin-right: 24rpx; position: relative; flex-shrink: 0;
                >image{width: 100%; height: 100%;}
                text{content: ''; width: 20rpx; height: 20rpx; background-color: #FE3B30; position: absolute; right: 0; top: 0; border-radius: 50%;}
            }
            
            .info{ flex-grow: 1;
                .ty{font-size: 32rpx; font-weight: bold; line-height: 44rpx;}
                .del{font-size: 28rpx; color: #999; line-height: 40rpx;}
            }
        }
        >image{width: 14rpx; height: 24rpx;}
    }
}
</style>
