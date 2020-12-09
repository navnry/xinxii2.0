<template>
    <view class="content">
        <!-- <x-nav-bar :no-border="true" title="具体明细"></x-nav-bar>
        <view class="cont">
            <view class="tit">经纪人佣金</view>
            <view class="money-box">
                <view class="money">
                    <text>￥</text>
                    <text class="number">23876</text>
                </view>
                <view class="status">已出单</view>
            </view>
            <view class="detail">
                <view class="item">投保人：张三</view>
                <view class="item">订单号：4862947080244252</view>
                <view class="item">生效时间：2020-07-24 00:00:00</view>
                <button class="btn">查看订单</button>
            </view>
        </view> -->
		
		<x-nav-bar :no-border="true" title="我的收入"></x-nav-bar>
		<view class="cont">
		    <view class="money">
				<view class="tit">2020年9月收入资金</view>
				<view class="money-box">
					<view class="item">
						<text>税前收入</text>
						<text class="number">{{detail.sumPre ? Number(detail.sumPre).toFixed(2) : '0.00'}}</text>
					</view>
					<view class="item">
						<text>税后收入</text>
						<text class="number">{{detail.sumAfter ? Number(detail.sumAfter).toFixed(2) : '0.00'}}</text>
					 </view>
				</view>
		    </view>
		    <view class="detail">
				<view class="tit">收入明细</view>
				<view class="detail-box">
				  <view class="item">
				  	<view class="left">
				  		<text>当月初年度佣金：</text>
						<text>{{detail.fyc ? Number(detail.fyc).toFixed(2) : '0.00'}}</text>
				  		<text>元</text>
				  	</view>
				  </view>
				  <view class="item">
				  	<view class="left">
				  		<text>当月续年度佣金：</text>
				  		<text>{{detail.ryc ? Number(detail.ryc).toFixed(2) : '0.00'}}</text>
				  		<text>元</text>
				  	</view>
				  </view>
				  <view class="item" v-if="detail.duratBonus && detail.duratBonus!== ''">
				  	<view class="left">
				  		<text>持续率奖金：</text>
				  		<text>{{detail.duratBonus ? Number(detail.duratBonus).toFixed(2) : '0.00'}}</text>
				  		<text>元</text>
				  	</view>
				  </view>
				  <view class="item">
				  	<view class="left">
				  		<text>增员津贴：</text>
				  		<text>{{detail.staffAllowance ? Number(detail.staffAllowance).toFixed(2) : '0.00'}}</text>
				  		<text>元</text>
				  	</view>
				  </view>
				  <view class="item" v-if="detail.highBonus && detail.highBonus !== ''">
				  	<view class="left">
				  		<text>高绩效奖金：</text>
				  		<text>{{detail.highBonus ? Number(detail.highBonus).toFixed(2) : '0.00'}}</text>
				  		<text>元</text>
				  	</view>
				  </view>
				  <view class="item" v-if="detail.exhibitAllowance && detail.exhibitAllowance !== ''">
				  	<view class="left">
				  		<text>展业津贴：</text>
				  		<text>{{detail.exhibitAllowance ? Number(detail.exhibitAllowance).toFixed(2) : '0.00'}}</text>
				  		<text>元</text>
				  	</view>
				  </view>
				  <view class="item" v-if="detail.individualIncomeTax && detail.individualIncomeTax !== ''">
				  	<view class="left">
				  		<text>个人所得税：</text>
				  		<text>{{detail.individualIncomeTax ? Number(detail.individualIncomeTax).toFixed(2) : '0.00'}}</text>
				  		<text>元</text>
				  	</view>
				  </view>
				<!--  <view class="item">
				  	<view class="left">
				  		<text>个人所得税：</text>
				  		<text>21.98</text>
				  		<text>元</text>
				  	</view>
				  </view> -->
			  </view>
		    </view>
		</view>
    </view>
</template>

<script>
    export default{
        data () {
            return {
				detail:{}
            }
        },
		onLoad(options) {
			if(options.id){
				this.getMoneyDetail(options.id)
			}
		},
        methods:{
			getMoneyDetail(id){
				this.$api.get('salary/detail/getSalaryDetail.do?id=' + id).then( res => {
					if(res.success){
						console.log(res.data)
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
//         .btn{margin-top: 42rpx; width: 160rpx; height: 52rpx; line-height: 48rpx; border: 2rpx solid #999; font-size: 28rpx; border-radius: 30rpx;}
//     }
// } 
.cont{
	.tit{font-size: 32rpx;font-weight: 500;line-height: 44rpx;}
	.money{margin: 24rpx 24rpx 18rpx 24rpx; background: #fff; border-radius: 12rpx; padding: 24rpx;
		.money-box{display: flex;
			.item{flex: 1;
				text{display: block;font-size: 32rpx;font-weight: 400;line-height: 44rpx;padding: 24rpx 0 12rpx 0;}
				.number{font-size: 32rpx;font-weight: 500;color: #FF5000;line-height: 44rpx;padding: 0;}
			}
		}
	}
	.detail{margin: 0 24rpx; background: #fff; border-radius: 12rpx; padding:24rpx 24rpx 0 24rpx;
		.detail-box{
			.item{display: flex;padding: 24rpx 0;border-bottom: 2rpx solid #F0F0F0;
				&:last-child{border-bottom: 0;}
				.left{flex: 1;font-size: 32rpx;font-weight: 500;line-height: 44rpx;}
				.right{
					image{width: 13rpx;height: 24rpx;}
				}
			}
		}
	}
}
</style>
