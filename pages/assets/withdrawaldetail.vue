<template>
    <view class="content">
      <!--  <x-nav-bar :no-border="true" title="具体明细"></x-nav-bar>
        <view class="cont" v-if="detail">
            <view class="tit">提现到{{detail.type == 10 ? '银行卡' : '微信'}}</view>
            <view class="money-box">
                <view class="money">
                    <text>￥</text>
                    <text class="number">{{detail.payment}}</text>
                </view>
                <view class="status">{{detail.statusName}}</view>
            </view>
            <view class="detail">
                <view class="item">提现时间：{{detail.createDate}}</view>
                <view class="item">到账时间：{{detail.payDate||'--'}}</view>
                <view class="item" v-if="detail.type == 10">交易账户：尾号{{detail.accountNumber.substring(detail.accountNumber.length - 4)}}</view>
            </view>
        </view> -->
		
		<x-nav-bar :no-border="true" title="初年度佣金明细"></x-nav-bar>
		<view class="cont">
			<view class="top">
				<view class="left">2020年9月</view>
				<view class="right">初年度佣金金额：<text>4628.00</text>元</view>
			</view>
			<view class="list">
				<view class="item">
					<view class="left">
						<view class="order">
							<text>订单号：</text>
							<text>32949234920101</text>
						</view>
						<view class="name">
							<text>投保人：</text>
							<text>kiki</text>
						</view>
						<view class="time">
							<text>2020.09.21 23:44</text>
						</view>
					</view>
					<view class="right">
						<view class="price">
							<text>¥</text>
							<text>40.53</text>
						</view>
						<view class="btn">
							<button type="default">查看订单</button>
						</view>
					</view>
				</view>
				<view class="item">
					<view class="left">
						<view class="order">
							<text>订单号：</text>
							<text>32949234920101</text>
						</view>
						<view class="name">
							<text>投保人：</text>
							<text>kiki</text>
						</view>
						<view class="time">
							<text>2020.09.21 23:44</text>
						</view>
					</view>
					<view class="right">
						<view class="price">
							<text>¥</text>
							<text>40.53</text>
						</view>
						<view class="btn">
							<button type="default">查看订单</button>
						</view>
					</view>
				</view>
				<view class="item">
					<view class="left">
						<view class="order">
							<text>订单号：</text>
							<text>32949234920101</text>
						</view>
						<view class="name">
							<text>投保人：</text>
							<text>kiki</text>
						</view>
						<view class="time">
							<text>2020.09.21 23:44</text>
						</view>
					</view>
					<view class="right">
						<view class="price">
							<text>¥</text>
							<text>40.53</text>
						</view>
						<view class="btn">
							<button type="default">查看订单</button>
						</view>
					</view>
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
            getDetail(id){
                this.$api.get('system/withdrawal/withdrawalDetail.do?id='+ id).then( res => {
                    if(res.success){
                        this.detail = res.data
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
// .cont{margin: 24rpx; background: #fff; border-radius: 12rpx; padding: 24rpx;
//     .tit{font-size: 32rpx; line-height: 44rpx; text-align: center; padding: 24rpx 0 70rpx; border-bottom: 1px solid #F0F0F0;}
//     .money-box{padding: 26rpx 0 46rpx; border-bottom: 1px solid #F0F0F0; text-align: center;
//         .money{font-size: 32rpx; line-height: 44rpx;
//             .number{font-size: 72rpx; font-weight: bold; line-height: 100rpx;}
//         }
//         .status{margin-top: 6rpx; font-size: 28rpx; color: #999;}
//     }
//     .detail{padding-left: 22rpx; padding-top: 42rpx;
//         .item{padding: 6rpx 0; font-size: 28rpx; line-height: 40rpx;}
//     }
// } 
.cont{margin: 24rpx; background: #fff; border-radius: 12rpx; 
	.top{display: flex;justify-content: space-between;height: 88rpx;padding: 22rpx 24rpx;background: #F0F0F0;border-radius: 12rpx 12rpx 0px 0px;font-size: 32rpx;font-weight: 500;line-height: 44rpx;}
	.list{padding:0 24rpx;
		.item{display: flex;border-bottom: 2rpx solid #ddd;padding: 24rpx 0;
		&:last-child{border-bottom: 0;}
			.left{
				flex: 1;
				.order{font-size: 32rpx;font-weight: 400;line-height: 44rpx;}
				.name{font-size: 28rpx;font-weight: 400;line-height: 40rpx;margin: 12rpx 0;}
				.time{font-size: 24rpx;font-weight: 400;line-height: 34rpx;}
			}
			.right{text-align: right;
				.price{font-size: 36rpx;font-weight: 500;color: #FF5000;line-height: 50rpx;margin-bottom: 40rpx;}
				.btn{
					button{width: 160rpx;background-color: #fff;height: 52rpx;border-radius: 30rpx;border: 2rpx solid #999999;font-size: 28rpx;color: #333;line-height: 48rpx;}
				}
			}
		}
	}
} 

</style>
