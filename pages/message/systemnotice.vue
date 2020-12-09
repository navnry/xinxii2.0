<template>
    <view class="content">
        <x-nav-bar :no-border="true" title="系统通知"></x-nav-bar>
        <view class="list" v-if="sysMsgList.length>0">
            <view class="item" v-for="(item,index) in sysMsgList" :key="index">
                <view class="time-box">{{item.createDate}}</view>
                <view class="box">
                    <view class="name">{{item.title}}</view>
                    <view class="txt">{{item.content}}</view>
                </view>
            </view>
			 <x-load-more :status="bottomTips"></x-load-more>
        </view>
        <x-no-data num="5" v-else-if="noData"></x-no-data>
    </view>
</template>

<script>
    export default{
        data () {
            return {
                bottomTips: 'more',
			    sysMsgList:[],
                sendData: {
                    pageNo: 1,
                    pageSize: 10
                },
			    haveReadData:{
				   messageType:'4' 
			    },
                noData: false
            }
        },
		onLoad(option) {
			this.getSysMsgList()
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
            getSysMsgList(){
            	this.$api.get('member/message/listSysMsg.do',{params:this.sendData}).then( res => {
                    this.noData = true
            	    if(res.success && null != res.data){
            			
            			if (this.sendData.pageNo <= 1) {
            				this.sysMsgList = res.data
            			} else {
							this.sysMsgList.push(...res.data)
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
				this.getSysMsgList()
		}
    }
</script>

<style lang="scss" scoped>
.list{
    .item{
        .time-box{width: 336rpx; height: 44rpx; text-align: center; line-height: 44rpx; background-color: #ddd; border-radius: 22rpx; font-size: 24rpx; color: #999; margin: 32rpx auto;}
        .box{background: #fff; width: 702rpx; margin: 0 auto; padding: 24rpx; border-radius: 12rpx;
            .name{font-size: 32rpx; font-weight: bold; line-height: 44rpx;}
            .txt{font-size: 24rpx; color: #999; line-height: 34rpx; margin-top: 24rpx;}
        }
    }
}
</style>
