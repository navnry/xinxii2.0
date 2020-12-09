<template>
    <view class="content">
        <x-nav-bar :no-border="true" title="产品动态"></x-nav-bar>
        <view class="list" v-if="productMsgList.length>0">
            <view class="item" @click="toDetail(item.relId,item.productName,item.content,item.createDate)" v-for="(item,index) in productMsgList" :key="index" >
                <view class="time-box">{{item.createDate}}</view>
                <view class="box">
                    <view class="detail">
                        <view class="img">
                            <image lazy-load src="../../static/logo.png" mode=""></image>
                        </view>
                        <view class="info">
                            <view class="name">{{item.title}}</view>
                            <view class="txt">{{item.content}}</view>
                        </view>
                    </view>
                    <view class="product" v-if="item.relId!=''">
                        <view class="info">
                            <view class="name">{{item.productName}}</view>
                            <view class="price">{{item.inPrice}} <text>元/起</text></view>
                        </view>
                        <view class="btn" @click.stop="openUrl('../product/detail?id='+item.relId)">查看产品</view>
                    </view>
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
                productMsgList:[],
                sendData: {
                    pageNo: 1,
                    pageSize: 10
                },
				haveReadData:{
					 messageType:'25' 
				},
                noData: false
            }
        },
        onLoad(option) {
        	this.getProductMsgList()
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
			toDetail(id,name,content,createDate){
				if(id){
					this.openUrl('./productnotice?id='+id+'&name='+name+'&content='+content+'&createDate='+createDate)
				}
			},
            getProductMsgList(){
            	this.$api.get('member/message/listProductMsg.do',{params:this.sendData}).then( res => {
                    this.noData = true
            	    if(res.success && null != res.data){
            			if (this.sendData.pageNo <= 1) {
            				this.productMsgList = res.data
            			} else {
        					this.productMsgList.push(...res.data)
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
        		this.getProductMsgList()
        	}
    }
</script>

<style lang="scss" scoped>
.list{
    .item{
        .time-box{width: 336rpx; height: 44rpx; text-align: center; line-height: 44rpx; background-color: #ddd; border-radius: 22rpx; font-size: 24rpx; color: #999; margin: 32rpx auto;}
        .box{ background: #fff; margin: 0 auto; width: 702rpx; padding: 24rpx;
            .detail{ display: flex;
                .img{font-size: 0; flex-shrink: 0;
                    image{width: 100rpx; height: 100rpx; border-radius: 50%; margin-right: 24rpx;}
                }
                .info{flex-grow: 1; border-bottom: 1px solid #F0F0F0;
                    &.noborder{border: none;}
                    .name{font-size: 32rpx; line-height: 44rpx; @include text-line(1);}
                    .txt{font-size: 28rpx; color: #999; line-height: 40rpx; margin: 12rpx 0 24rpx; @include text-line(1);}
                }
            }
            .product{background: #fff; padding-left: 124rpx; display: flex; justify-content: space-between; align-items: flex-end;
                .info{flex-grow: 1;
                    .name{font-size: 32rpx; font-weight: bold; line-height: 44rpx; @include text-line(1); margin: 22rpx 0 12rpx;}
                    .price{color: #FF5000; font-size: 40rpx; font-weight: bold;
                        >text{font-size: 24rpx; font-weight: normal; margin-left: 10rpx;}
                    }
                }
                .btn{flex-shrink: 0; width: 144rpx; height: 46rpx; text-align: center; line-height: 42rpx; border-radius: 30rpx; border: 2rpx solid #999; font-size: 24rpx; color: #999;}
                
            }
        }
    }
}
</style>
