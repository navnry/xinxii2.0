<template>
    <view class="content">
        <x-nav-bar :no-border="true" title="营销活动"></x-nav-bar>
        <!-- <view class="list" v-if="marketingMsgList.length>0">
            <view class="item"  v-for="(item,index) in marketingMsgList" :key="index" @click="toMarketingDetail(item.relId)">
                <view class="time-box">{{item.createDate}}</view>
                <view class="detail">
                    <view class="top">
                        <view class="name">{{item.title}}</view>
                        <view class="time">{{item.createDate}}</view>
                    </view>
                    <image lazy-load :src="item.picUrl" mode=""></image>
                    <view class="info">{{item.content}}</view>
                </view>
            </view>
			<x-load-more :status="bottomTips"></x-load-more>
        </view> -->
        <!-- <x-no-data num="5" v-else-if="noData"></x-no-data> -->
        <x-no-data num="5"></x-no-data>
    </view>
</template>

<script>
    export default{
        data () {
            return {
                bottomTips: 'more',
                marketingMsgList:[],
                sendData: {
                    pageNo: 1,
                    pageSize: 10
                },
				haveReadData:{
					 messageType:'24' 
				},
                noData: false
            }
        },
        onLoad(option) {
   //      	this.getMarketingMsgList()
			// if(option.num!="0"){
			// 	//如果未读消息不为0 则设置该类型消息全部已读
			// 	this.haveRead()
			// }
        },
        methods:{
			haveRead(){
				this.$api.get('member/message/setTypeIsReaded.do',{params:this.haveReadData}).then( res => {
				    if(res.success && null != res.data){
						
				    }
				})
			},
            getMarketingMsgList(){
            	this.$api.get('member/message/listMarketingMsg.do',{params:this.sendData}).then( res => {
                    this.noData = true
            	    if(res.success && null != res.data){
            			
            			if (this.sendData.pageNo <= 1) {
            				this.marketingMsgList = res.data
            			} else {
        					this.marketingMsgList.push(...res.data)
            			}
            			 this.sendData.pageNo++
            			if (this.sendData.pageNo > Math.ceil(res.page.totalCount / this.sendData.pageSize)) {
            				this.bottomTips = 'noMore'
            			}else{
            				this.bottomTips = 'more'
            			}
            	    }
            	})
            },
			toMarketingDetail(marketingId){
				uni.showToast({
					title:"活动id"+marketingId
				})
			}
        },
        	onReachBottom() {
        	    if(this.bottomTips != 'more') return
        		this.bottomTips = 'loading'
        		this.getMarketingMsgList()
        	}
    }
</script>

<style lang="scss" scoped>
.list{padding-bottom: 32rpx;
    .item{
        .time-box{width: 336rpx; height: 44rpx; text-align: center; line-height: 44rpx; background-color: #ddd; border-radius: 22rpx; font-size: 24rpx; color: #999; margin: 32rpx auto;}
        .detail{width: 702rpx; margin: 0 auto; border-radius: 12rpx; background-color: #fff; padding: 24rpx; font-size: 0;
            .top{display: flex; align-items: center; justify-content: space-between;
                .name{font-size: 32rpx; font-weight: bold; line-height: 44rpx;}
                .time{font-size: 24rpx; color: #999;}
            }
            image{margin: 24rpx 0 12rpx; width: 654rpx; height: 380rpx;}
            .info{font-size: 24rpx; color: #999;}
        }
    }
}   
</style>
