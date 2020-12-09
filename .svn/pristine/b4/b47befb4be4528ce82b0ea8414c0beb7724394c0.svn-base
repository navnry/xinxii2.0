<template>
	<view class="content">
		<x-nav-bar :noBorder="true" title="推荐详情"></x-nav-bar>
		<view class="list" v-if="inviteList.length>0">
		    <view class="item" v-for="(item,index) in inviteList" :key="index">
		        <view class="left">
		            <view class="phone">{{item.phone|formatPhone}}</view>
		            <view class="name">{{item.fullname||'未实名'}}</view>
		        </view>
		        <view class="right">
		            <view class="status">{{item.isDistributor == 1 ? '签约经纪人' : '普通用户'}}</view>
		        </view>
		    </view>
		    <x-load-more :status="pageStatus"></x-load-more>
		</view>
		 <x-no-data v-else-if="inviteList.length==0&&noData"></x-no-data>
	</view>
</template>

<script>
	import {formatPhone} from '@/common/utils'
	export default {
		data() {
			return {
				inviteList:[],
				sendData:{
				    pageSize: 20,
				    pageNo:1,
					noData: false,
					pageStatus: 'more',
				},
				noData: false,
				pageStatus: 'more',
			}
		},
		filters:{
		    formatPhone
		},
		onLoad() {
			 this.getInviteDetail()
		},
		methods: {
			getInviteDetail(){
			    this.$api.get('distributor/relation/getBrokerDisList.do',{params:this.sendData}).then( res => {
			        this.noData = true
			        if(res.success){
			            if (this.sendData.pageNo <= 1) {
			            	this.inviteList = res.data
			            } else {
			            	this.inviteList.push(...res.data)
			            }
			            this.sendData.pageNo++
			            if (this.sendData.pageNo > Math.ceil(res.page.totalCount / this.sendData.pageSize)) {
			            	this.pageStatus = 'noMore'
			            }else{
			            	this.pageStatus = 'more'
			            }
			        }
			    })
			},
			onReachBottom() {
			    if(this.pageStatus != 'more' && this.current == 2) return
				this.pageStatus = 'loading'
			    this.getInviteDetail()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list{width: 702rpx; margin: 24rpx; background-color: #fff; border-radius: 12rpx; padding: 0 24rpx;
	    .item{display: flex; align-items: center; justify-content: space-between; font-size: 32rpx; height: 88rpx; border-bottom: 2rpx solid #F0F0F0;
	        &:last-of-type{border: none;}
	        .left,.right{display: flex; align-items: center;}
	        .left{
	            .name{color: #999; margin-left: 24rpx;}
	        }
	        .right{
	            .status{
	                &.lv{color: #ff5000;}
	            }
	            image{width: 14rpx; height: 24rpx; margin-left: 12rpx;}
	        }
	    }
	}

</style>
