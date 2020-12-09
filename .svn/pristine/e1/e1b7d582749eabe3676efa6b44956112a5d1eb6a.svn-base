<template>
    <view class="content">
        <x-nav-bar :no-border="true" title="客户管理">
            <view slot="right" class="right" @click="openUrl('./addcustomer')">
				<x-icon type="yaoqing" size="48"></x-icon>
            </view>
        </x-nav-bar>
        <view class="list">
            <view class="tit">我的客户</view>
            <view v-if="list.length>0">
                <view class="item" v-for="item in list" :key="item.id" @click="openUrl('./customerinfo?id='+ item.id)">
                    <view class="info">
                        <image lazy-load src="@/static/message/msg_order.png" mode=""></image>
                        <view class="del">
                            <view class="name">{{item.name}}</view>
                            <view class="phone">{{item.mobile}}</view>
                        </view>
                    </view>
                    <!-- <button class="btn" @click="openUrl('../order/orderlist')">查看订单</button> -->
                    <!-- <image lazy-load class="right-img" src="../../static/arrow_right2.png" mode=""></image> -->
                    <x-icon type="arrow-right"></x-icon>
                </view>
                <x-load-more :status="pageStatus"></x-load-more>
            </view>
            <x-no-data v-else-if="list.length==0&&noData"></x-no-data>
        </view>
    </view>
</template>

<script>
    import { mapState } from 'vuex'
    export default{
        data () {
            return {
                list: [],
                pageStatus: 'more',
                noData: false,
                pageNo: 1,
                pageSize: 16
            }
        },
        computed: {
            ...mapState(['userinfo']),
        },
        onShow() {
            this.pageNo = 1
            this.getcustomerlist()
        },
        onLoad(option) {
            
        },
        methods:{
            getcustomerlist () {
                this.$api.get('member/customer/getCustomerByUserId.do?pageNo='+this.pageNo + '&pageSize=' +this.pageSize).then( res => {
                    console.log(res)
                    this.noData = true
                    if(res.success){
                        if (this.pageNo <= 1) {
                        	this.list = res.data
                        } else {
                        	this.list.push(...res.data)
                        }
                        this.pageNo++
                        if (this.pageNo > Math.ceil(res.page.totalCount / this.pageSize)) {
                        	this.pageStatus = 'noMore'
                        }else{
                        	this.pageStatus = 'more'
                        }
                    }
                })
            }
        },
        onReachBottom() {
            if(this.pageStatus != 'more') return
            this.pageStatus = 'loading'
            this.getcustomerlist()
        }
    }
</script>

<style lang="scss" scoped>
.list{margin-top: 24rpx; background-color: #fff; padding: 24rpx;
    .tit{font-size: 32rpx; font-weight: bold; line-height: 44rpx; margin-bottom: 24rpx;}
    .item{display: flex; justify-content: space-between; align-items: center; padding: 24rpx 0; border-bottom: 1px solid #F0F0F0;
        .info{flex-wrap: 1; display: flex; align-items: center;
            image{width: 74rpx; height: 74rpx; border-radius: 50%; margin-right: 24rpx;}
            .del{
                .name{font-size: 32rpx; line-height: 32rpx;}
                .phone{font-size: 24rpx; color: #999; line-height: 24rpx; margin-top: 20rpx;}
            }
        }
        // .btn{flex-shrink: 0; background: #fff; width: 160rpx; height: 56rpx; border: 2rpx solid #FF5000; border-radius: 28rpx; color: #FF5000; line-height: 52rpx; font-size: 28rpx;}
        .right-img{width: 14rpx; height: 24rpx;}
    }
}
.right{display: flex; justify-content: flex-end; align-items: center; width: 100%;
	.tianjia-ioc{width: 40rpx; height: 40rpx;}
}
</style>
