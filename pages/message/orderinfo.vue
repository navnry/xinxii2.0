<template>
    <view class="content">
        <x-nav-bar :no-border="true" title="订单信息"></x-nav-bar>
        <view class="list" v-if="orderMsgList.length>0">
            <view class="item" v-for="(item,index) in orderMsgList" :key="index">
                <view class="time-box">{{item.createDate}}</view>
                <view class="box">
                    <view class="name">{{item.title}}</view>
                    <view class="order">订单号:{{item.relId}}</view>
                    <view class="btn-box">
                        <view></view>
                        <view class="btn" @click="toOrderDetail(item.relId)">查看详情</view>
                    </view>
                </view>
            </view>
			<x-load-more :status="bottomTips" ></x-load-more>
        </view>
        <x-no-data num="5" v-else-if="noData"></x-no-data>
    </view>
</template>

<script>
    export default{
        data () {
            return {
                bottomTips: 'more',
                orderMsgList:[],
                sendData: {
                    pageNo: 1,
                    pageSize: 10
                },
				haveReadData:{
					 messageType:'26' 
				},
                noData: false
            }
        },
       onLoad(option) {
       	this.orderList()
		if(option.num!="0"){
			//如果未读消息不为0 则设置该类型消息全部已读
			this.haveRead()
		}
       },
       methods:{
		   haveRead(){
		   	this.$api.get('member/message/setTypeIsReaded.do',{params:this.haveReadData}).then( res => {
		   	    if(res.success && null != res.data){
		   			
		   	    }
		   	})
		   },
		   toOrderDetail(id){
               this.openUrl('../order/orderdetail?id='+id)
		   },
           orderList(){
           	this.$api.get('member/message/listOrderMsg.do',{params:this.sendData}).then( res => {
                this.noData = true
           	    if(res.success && null != res.data){
           			if (this.sendData.pageNo <= 1) {
           				this.orderMsgList = res.data
           			} else {
       					this.orderMsgList.push(...res.data)
           			}
           			 this.sendData.pageNo++
           			if (this.sendData.pageNo > Math.ceil(res.page.totalCount / this.sendData.pageSize)) {
           				this.bottomTips = 'noMore'
           			}else{
           				this.bottomTips = 'more'
           			}
           	    }
           	})
           }
       },
       onReachBottom() {
       	    if(this.bottomTips != 'more') return
       		this.bottomTips = 'loading'
       		this.orderList()
       }
    }
</script>

<style lang="scss" scoped>
.list{
    .item{
        .time-box{width: 336rpx; height: 44rpx; text-align: center; line-height: 44rpx; background-color: #ddd; border-radius: 22rpx; font-size: 24rpx; color: #999; margin: 32rpx auto;}
        .box{width: 702rpx; margin: 0 auto; background: #fff; border-radius: 12rpx; padding: 24rpx;
            .name{font-size: 32rpx; line-height: 44rpx;}
            .order{font-size: 28rpx; color: #999; line-height: 40rpx; padding: 12rpx 0 24rpx; border-bottom: 2rpx solid #F0F0F0;}
            .btn-box{ display: flex; justify-content: space-between;
                .btn{width: 144rpx; height: 46rpx; text-align: center; line-height: 42rpx; border: 2rpx solid #999; color: #999; font-size: 24rpx; border-radius: 30rpx; margin-top: 22rpx;}
            }
        }
    }
}   
</style>
