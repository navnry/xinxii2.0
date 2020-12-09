<template>
	<view class="content">
		<x-nav-bar :noBorder="true" fixed="false" leftIcon="none" title=" "></x-nav-bar>
        <view class="top-info">
            <view class="top" @click="toUserInfo">
                <view class="left">
                    <view class="head-img">
                        <image lazy-load class="head" :src="userinfo.logo? userinfo.logo:'../../static/defalut_head.png'" mode="aspectFill"></image>
                        <image lazy-load class="head-logo" v-if="userinfo.reviewResultCode" :src="userinfo.reviewResultCode.code==5?'../../static/head_logo_end.png':'../../static/head_logo.png'" mode=""></image>
                    </view>
                    <view class="name-box" v-if="isLogin">
                        <view class="name">{{userinfo.realname}}</view>
                        <view class="down-box">
                            <view class="platform" :class="{isBroker:userinfo.reviewResultCode.code==5}">{{userinfo.reviewResultCode.code==5?userinfo.reviewResultCode.jobLevel:'未认证'}}</view>
                            <view class="info-box">
                                <text>个人主页</text>
                                <x-icon class="icon" type="arrow-right" size="24"></x-icon>
                            </view>
                        </view>
                    </view>
                    <view class="name-box" v-else>
                        <view class="name">登录</view>
                    </view>
                </view>
                <x-icon type="arrow-right" size="32"></x-icon>
            </view>
            <view class="info" @click="toReview()" v-if="!isLogin">
                <view>游客</view>
                <view>认证职业认证获取推广资格</view>
            </view>
           <view class="info" @click="toReview()" v-else-if="isLogin&&userinfo.reviewResultCode.code==5">
                <view><x-icon type="user" size="36"></x-icon>保险经纪人</view>
                <view>已认证，查看详情</view>
            </view>
            <view class="info" @click="toReview()" v-else>
                <view>
                    <x-icon type=""></x-icon>
                    <text>普通用户</text>
                </view>
                <view>认证职业认证获取推广资格</view>
            </view>
            
        </view>
        <view class="wallet" v-if="!isLogin" @click="toWallet">
            <view class="tit">
                <text>资产明细</text>
                <view @click.stop="isShow = !isShow">
                    <x-icon :type="isShow ? 'eye' : 'eye-lash'" size="32" color="#333"></x-icon>
                </view>
            </view>
            <view class="list">
                 <view class="tip">可提现（元）</view>
                 <view class="money-box">
                     <text class="money">****</text>
                     <view class="btn">提现</view>
                 </view>
                 <view class="all-money">总收入(元)<text>****</text></view>
             </view>
         </view>
       <view class="wallet" v-else-if="isLogin && assetsData" @click="openUrl('../assets/index')">
            <view class="tit">
                <text>资产明细</text>
                <view @click.stop="isShow = !isShow">
                    <x-icon :type="isShow ? 'eye' : 'eye-lash'" size="32" color="#333"></x-icon>
                </view>
            </view>
           <view class="list">
                <view class="tip">可提现（元）</view>
                <view class="money-box">
                    <text class="money">{{isShow?(assetsData.totalAleAmount>0?assetsData.totalAleAmount.toFixed(2):'0.00'):'****'}}</text>
                    <view class="btn" @click.stop="openUrl('../assets/withdrawal')">提现</view>
                </view>
                <view class="all-money">总收入(元)<text>{{isShow?(assetsData.totalRevenue>0?assetsData.totalRevenue.toFixed(2):'0.00'):'****'}}</text></view>
            </view>
        </view>
        <view class="group order-box">
            <view class="top-box">
                <view class="tit">我的订单</view>
                <text @click="toOrder(0)">查看全部</text>
            </view>
            <view class="list">
                <view class="item" @click="toOrder(1)">
                    <x-icon type="await-pay" color="#FC6110"></x-icon>
                    <text>待支付</text>
                </view>
                <view class="item" @click="toOrder(2)">
                    <x-icon type="yet-pay" color="#1077FF"></x-icon>
                    <text>已支付</text>
                </view>
                <view class="item" @click="toOrder(3)">
                    <x-icon type="security" color="#EF4034"></x-icon>
                    <text>保障中</text>
                </view>
                <view class="item" @click="toOrder(4)">
                    <x-icon type="await-renewal" color="#1077FF"></x-icon>
                    <text>待续保</text>
                </view>
            </view>
        </view>
        <view class="group servers">
            <view class="top-box">
                <view class="tit">我的服务</view>
                <text></text>
            </view>
            <view class="list">
                <view class="item" @click="openUrl('./platinfo')">
                    <x-icon type="seniority" color="#1077FF"></x-icon>
                    <text>企业资质</text>
                </view>
                <view class="item" @click="toCustomer">
                    <x-icon type="customer" color="#FC6110"></x-icon>
                    <text>客户管理</text>
                </view>
                <view class="item invite" @click="toInvite">
                    <text class="label">有钱赚</text>
                    <x-icon type="redpacket" color="#EF4034"></x-icon>
                    <text>我的邀请</text>
                </view>
                <view class="item" @click="openUrl('./shareapp')">
                    <x-icon type="qrcode" color="#1077FF"></x-icon>
                    <text>分享APP</text>
                </view>
                <view class="item" @click="toAdvice">
                    <x-icon type="kefu" color="#FC6110"></x-icon>
                    <text>客服中心</text>
                </view>
                <view class="item" @click="openUrl('./public')">
                    <x-icon type="public" color="#1077FF"></x-icon>
                    <text>公众号</text>
                </view>
                <view class="item" @click="openUrl('./set')">
                    <x-icon type="set" color="#1077FF"></x-icon>
                    <text>账户设置</text>
                </view>
            </view>
        </view>
		<x-modal ref="modal" :title="modalTitle" :content="modalContent" @sure="sure(toType)"></x-modal>
	</view>
</template>

<script>
    import {updateUserinfo,callPhone} from '@/common/api'
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                isShow: true,
				code:'',
                assetsData: null,
				modalTitle:"您还未登录",//模态框标题
				modalContent:"是否立即去登录？",//模态框内容
				toType:1 ,//模态框跳转 1登录、2成为经纪人
				// qualificationMessage:{} //认证成功后的资料信息
            }
        },
        computed: {
            ...mapState(['isLogin', 'userinfo']),
        },
        onShow() {
    //         if(Object.keys(this.userinfo).length > 0){
				// updateUserinfo(this)
    //         }
            uni.showTabBar()
            if(this.isLogin){
                updateUserinfo(this)
                this.getAssets()
            }
        },
        onLoad(options) {
            
        },
        methods: {
            call(){
                callPhone('400-996-1929')
            },
            toAdvice(){
                if(!this.isLogin){
					 this.$refs.modal.open()
                    return
                }
                this.openUrl('./advice')
            },
            sure(val){
                if(val==1){
					this.openUrl('./login')
				}
				if(val==2){
					if(!this.userinfo.reviewResultCode.code){
						this.openUrl('../join/index')
					}else{
						this.openUrl('../join/audit?code='+this.userinfo.reviewResultCode.code+'&reason='+this.userinfo.reviewResultCode.reason)
					}
				}
            },
            toWallet(){
				console.log(1)
                if(!this.isLogin){
                    this.$refs.modal.open()
                    return
                }
            },
            toCustomer(){
                if(!this.isLogin){
					this.$refs.modal.open()
                    return
                }
				if(this.userinfo.reviewResultCode.code != 5){
					this.$refs.modal.open()
					this.modalTitle="您还不是经纪人"
					this.modalContent="是否立即成为保险经纪人？"
					this.toType = 2
				    return
				}
                this.openUrl('../home/customer')
            },
			toReview(){
				let _this = this
                if(!this.isLogin){
					this.$refs.modal.open()
                    return
                }
				if(!this.userinfo.reviewResultCode.code){
					this.openUrl('../join/index')
				}else{
					this.$api.get('member/qualification/qualificationMessage.do').then( res => {
						// console.log(res.data)
						let qualificationMessage = res.data
					    if(res.success){
							uni.getStorage({
							    key: 'qualificationMessage',
							    success: function (res) {
									console.log(qualificationMessage)
							       if(res.data == 'true' && qualificationMessage){
									   _this.openUrl('../join/certificate?&qualificationMessage=' + encodeURIComponent(JSON.stringify(qualificationMessage)))
								   }else{
									   _this.openUrl('../join/audit?code='+_this.userinfo.reviewResultCode.code+'&reason='+_this.userinfo.reviewResultCode.reason + '&qualificationMessage=' + encodeURIComponent(JSON.stringify(qualificationMessage)))
								   }
							    },
								fail(){
									  _this.openUrl('../join/audit?code='+_this.userinfo.reviewResultCode.code+'&reason='+_this.userinfo.reviewResultCode.reason + '&qualificationMessage=' + encodeURIComponent(JSON.stringify(qualificationMessage)))
								}
							});
							
					    }
					})
				}
			},
            toUserInfo(){
                if(!this.isLogin){
                    this.openUrl('./login')
                }else{
                    this.openUrl('./userinfo')
                }
            },
            getAssets(){
                this.$api.get('system/withdrawal/userFund.do').then( res => {
                    if(res.success){
                        this.assetsData = res.data
                    }
                })
            },
            toOrder(current){
                if(!this.isLogin){
					this.$refs.modal.open()
                    return
                }
                if(this.userinfo.reviewResultCode.code != 5){
					this.$refs.modal.open()
					this.modalTitle="您还不是经纪人"
					this.modalContent="是否立即成为保险经纪人？"
					this.toType = 2
                    return
                }
                this.openUrl('../order/orderlist?current=' + current)
            },
            toInvite(){
                if(!this.isLogin){
					this.$refs.modal.open()
                    return
                }
                if(this.userinfo.reviewResultCode.code != 5){
					this.$refs.modal.open()
					this.modalTitle="您还不是经纪人"
					this.modalContent="是否立即成为保险经纪人？"
					this.toType = 2
                    return
                }
                this.openUrl('./invite')
            }
        }
    }
</script>

<style lang="scss" scoped>
.content{padding-bottom: 24rpx;}
.head{position: relative; height: 100%;
    image{width: 44rpx; height: 44rpx; position: absolute; top: 50%; transform: translateY(-50%); right: 0;}
}
.top-info{height: 256rpx; background: linear-gradient(#ffffff, #f6f7f8); padding: 0 24rpx; position: relative;
    .top{display: flex; align-items: center;
        .left{flex-grow: 1; display: flex; align-items: center;
            .head-img{width: 120rpx; height: 120rpx; border-radius: 50%; position: relative;
               .head{border-radius: 50%; width: 120rpx; height: 120rpx; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);} 
               .head-logo{ width: 30rpx; height: 28rpx; position: absolute; right: 10rpx; bottom: 4rpx;}
            }
            .name-box{padding-left: 32rpx;
                .name{font-size: 40rpx; font-weight: bold;}
                .down-box{display: flex; align-items: center;
                    .platform{display: inline-block; height: 40rpx; line-height: 36rpx; border: 2rpx solid #333; font-size: 24rpx; color: #333; padding: 0 16rpx; border-radius: 22rpx;
                        &.isBroker{color: $xinxii-theme-color; border-color: $xinxii-theme-color;}
                    }
                    .info-box{width: 168rpx; height: 44rpx; border: 2rpx solid #333; color: #333; border-radius: 22rpx; margin-left: 24rpx; padding: 0 16rpx; display: flex; align-items: center; justify-content: space-between;
                        text{font-size: 24rpx;}
                        text,.icon{display: inline-block; vertical-align: middle; line-height: 0;}
                    }
                }
                
            }
        }
        .arrow-img{width: 36rpx; height: 36rpx;}
    }
    .info{position: absolute; bottom: 0; width: 702rpx; height: 88rpx; background-color: #333; border-radius: 12rpx 12rpx 0 0; color: #fff; font-size: 28rpx; display: flex; align-items: center; justify-content: space-between; padding: 0 24rpx;
		&>view{display: inline-flex;align-items: center;}
		.icon{margin-right: 8rpx;}
	}
}
.wallet{margin: 0 auto; width: 702rpx; border-radius: 0 0 12rpx 12rpx; background-color: #fff; padding: 0 24rpx;
    .tit{font-size: 32rpx; font-weight: bold; font-size: 0; display: flex; align-items: center; height: 96rpx; border-bottom: 2rpx solid $xinxii-border-color;
        text{font-size: 32rpx; margin-right: 12rpx;}
		.icon{width: 64rpx;text-align: center;margin-left: -8rpx;}
    }
    .list{
        .tip{font-size: 28rpx; margin: 24rpx 0;}
        .money-box{display: flex; justify-content: space-between; align-items: center;
            .money{font-size: 64rpx; font-weight: bold; line-height: 64rpx;}
            .btn{width: 160rpx; height: 64rpx; text-align: center; line-height: 64rpx; background-color: $xinxii-theme-color; color: #fff; font-size: 32rpx; border-radius: 32rpx;}
        }
        .all-money{padding: 24rpx 0; font-size: 28rpx; color: #999;
            >text{margin-left: 12rpx; font-size: 36rpx; font-weight: bold;}
        }
    }
}
.group{width: 702rpx; margin: 24rpx auto 0; background-color: #fff; border-radius: 12rpx; padding: 0 24rpx;
    .top-box{height: 96rpx; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid $xinxii-border-color;
        .tit{font-size: 36rpx; font-weight: bold;}
        >text{font-size: 28rpx; color: #999;}
    }
    .list{display: flex; flex-wrap: wrap; padding-top: 24rpx;
        .item{width: 25%; display: flex; flex-direction: column; text-align: center; padding-bottom: 24rpx; position: relative;
            >text{font-size: 24rpx; line-height: 34rpx; margin-top: 16rpx;}
            &.invite{
                .label{position: absolute; background-color: #EF4034; width: 92rpx; height: 36rpx; line-height: 36rpx; text-align: center; border-radius: 18rpx 18rpx 18rpx 0; color: #fff; font-size: 20rpx; right: -30rpx; top: -30rpx; margin: 0;}
            }
        }
    }
}

.servers{
    .top-box{border: none;}
    .list{padding: 0;}
}
</style>
