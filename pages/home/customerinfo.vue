<template>
    <view class="content">
        <x-nav-bar :no-border="true" title="客户信息" @clickRight="showModal" rightText="删除" ></x-nav-bar>
        <view class="top">
            <view class="left">
                <image lazy-load src="@/static/message/msg_order.png" mode=""></image>
                <view class="info">
                    <view class="name">{{detail.name}}</view>
                    <view class="phone">{{detail.mobile}}</view>
                </view>
            </view>
            <!-- <button class="btn">查看订单</button> -->
        </view>
        <view class="group">
            <view class="tit">基本信息</view>
            <view class="list">
                <view class="item">
                    <view class="left">性别</view>
                    <view class="txt">{{detail.sex==0?'男':'女'}}</view>
                </view>
                <view class="item">
                    <view class="left">年龄</view>
                    <view class="txt">{{detail.age||'未知'}}</view>
                </view>
                <view class="item">
                    <view class="left">出生日期</view>
                    <view class="txt">{{detail.birthDate||'未知'}}</view>
                </view>
                <view class="item">
                    <view class="left">备注</view>
                    <view class="txt">{{detail.remake||'无'}}</view>
                </view>
            </view>
        </view>
		
		<button class="btn" type="default" @click="openUrl('./editcustomer?id=' + id)">编辑信息</button>
	
		<x-modal ref="modal" title="提示" content="确定要删除该信息吗" @sure="deleteInfo"></x-modal>
	</view>
</template>

<script>
    export default{
        data () {
            return {
				id:'',
                detail: {}
            }
        },
        onLoad(option) {
            if(option.id){
				this.id = option.id
                this.getDetail(this.id)
            }
        },
		onShow() {
			 this.getDetail(this.id)
		},
        methods:{
		
            getDetail(id){
                this.$api.get('member/customer/getCustomerByCustomerId.do?customerId='+id).then( res => {
                    if(res.success){
                        this.detail = res.data
                    }
                })
            },
			showModal(){
				this.$refs.modal.open()
			},
			deleteInfo(){
				this.$api.get('member/customer/delete.do?customerId=' + this.id).then( res => {
				    if(res.success){
				       this.showToast('删除成功！')
				       setTimeout(()=>{
				           this.backPage()
				       },1500)
				    }
				})
			},
			// editInfo(){
			// 	this.openUrl('./customeredit')
			// }
        }
    }
</script>

<style lang="scss" scoped>
.content{padding-top: 24rpx;
    .top{width: 702rpx; height: 176rpx; background: linear-gradient(314deg, #71B6F9 0%, #3874F6 100%); border-radius: 12rpx; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 0 24rpx;
        .left{display: flex; align-items: center; font-size: 0;
            image{width: 88rpx; height: 88rpx; border-radius: 50%; margin-right: 24rpx;}
            .info{color: #fff;
                .name{font-size: 32rpx; line-height: 44rpx; font-weight: bold;}
                .phone{font-size: 24rpx; line-height: 34rpx; margin-top: 10rpx;}
            }
        }
        .btn{width: 160rpx; height: 56rpx; line-height: 56rpx; background: #fff; color: $xinxii-theme-color; font-size: 28rpx; border-radius: 28rpx;}
    }
    .group{width: 702rpx; margin: 18rpx auto 0; background: #fff; border-radius: 12rpx; padding: 0 24rpx;
        .tit{font-size: 32rpx; line-height: 44rpx; font-weight: bold; padding-top: 24rpx;}
        .list{
            .item{height: 86rpx; border-bottom: 1px solid #F0F0F0; display: flex; align-items: center; font-size: 28rpx;
                &:last-of-type{border: none;}
                .left{min-width: 112rpx; margin-right: 40rpx;}
            }
        }
    }
	.btn{margin:48rpx 24rpx 0;width: 702rpx;line-height: 88rpx;background: $xinxii-theme-color;border-radius: 8rpx;font-size: 32rpx;color: #FFFFFF;}
}
</style>
