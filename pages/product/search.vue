<template>
    <view class="content">
        <b-search v-model="sendData.name" :isSearch="isSearch" :hotelList="hotelList" @input="input" :historyList="historyList" @clear="clear" @hotelitem="hotelItem" @historyitem="historyItem" @search="search"></b-search>
        <view class="search-result" v-if="!isSearch">
            <view class="search-result-tit">搜索结果</view>
            <view v-if="productList.length>0">
                <view class="insurance-item" v-for="item in productList" :key="item.id" @click="openUrl('../product/detail?id='+item.id)">
                    <view class="img">
                        <image lazy-load :src="item.pictures" mode="aspectFill"></image>
                    </view>
                    <view class="detail">
                        <view class="info">
                            <view class="title">{{item.name}}</view>
                            <view class="label">
                                <text v-for="(i,index) in item.tags" :key="index">{{i.name}}</text>
                            </view>
                        </view>
                        <view class="price">{{item.inPrice.toFixed(2)}} <text>元/年</text></view>
                    </view>
                </view>
                <x-load-more :status="pageStatus"></x-load-more>
            </view>
            <x-no-data v-else-if="productList.length==0&&noData"></x-no-data>
        </view>
		<x-modal ref="modal" content="确定清空搜索历史吗？" @sure="clearHistory" ></x-modal>
    </view>
</template>

<script>
    export default{
        data () {
            return {
                hotelList: [],
                historyList: [],
                productList: [],
                isSearch: true,
                sendData:{
                    pageSize: 10,
                    pageNo: 1,
                    name: ''
                },
                noData: false,
                pageStatus: 'more'
            }
        },
        onLoad() {
            this.getHotel()
            let historyList = uni.getStorageSync('productHistory')
            if(historyList){
                this.historyList = historyList
            }
        },
        methods: {
            search (val) {
                this.sendData.name = val.trim()
                if(!val.trim()){
                	this.showToast("搜索内容不能为空哦") 
                	return
                }
                let flag = true
                if(this.historyList){
                	this.historyList.forEach((v,index) => {
                		if(v == val){
                			flag = false
                			this.historyList.splice(index,1)
                			this.historyList.unshift(v)
                		}
                	})
                }
                if(flag){
                	this.historyList.unshift(val)
                }
                uni.setStorage({
                    key: 'productHistory',
                    data: this.historyList
                })
                this.isSearch = false
                this.sendData.pageNo = 1
                this.getProductList()
            },
            getProductList(){
                this.$api.get('pdc/product/search.do',{params:this.sendData}).then( res => {
                    this.noData = true
                    if(res.success){
                        if (this.sendData.pageNo <= 1) {
                        	this.productList = res.data
                        } else {
                        	this.productList.push(...res.data)
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
            getHotel(){
                this.$api.post('system/dict/getDictByType.do?type=hotSearch').then( res => {
                    if(res.success){
                        this.hotelList = res.data
                    }
                })
            },
            clear () {
                // this.showModel('提示','确定清空吗？',()=>{
                // this.historyList = []
					// uni.setStorage({
					// 	key:"productHistory",
					// 	data:[],
					// 	success: () => {
					// 		// console.log("清除产品搜索历史成功")
					// 		this.$router.go(-1);
					// 	}
					// })
					//})
				this.$refs.modal.open()
            },
			clearHistory(){
				this.historyList = []
				 uni.setStorage({
					key: 'productHistory',
				    data: []
				})
				this.$router.go(-1);
			},
            input(val){
                if(!val&&!this.isSearch){
                    this.isSearch = true
                }
            },
            hotelItem (val) {
                this.sendData.name = val
                let flag = true
                if(this.historyList){
                	this.historyList.forEach((v,index) => {
                		if(v == val){
                			flag = false
                			this.historyList.splice(index,1)
                			this.historyList.unshift(v)
                		}
                	})
                }
                if(flag){
                	this.historyList.unshift(val)
                }
                uni.setStorage({
                    key: 'productHistory',
                    data: this.historyList
                })
                this.sendData.pageNo = 1
                this.isSearch = false
                this.getProductList()
            },
            historyItem (val) {
                let flag = true
                if(this.historyList){
                	this.historyList.forEach((v,index) => {
                		if(v == val){
                			flag = false
                			this.historyList.splice(index,1)
                			this.historyList.unshift(v)
                		}
                	})
                }
                if(flag){
                	this.historyList.unshift(val)
                }
                uni.setStorage({
                    key: 'productHistory',
                    data: this.historyList
                })
                this.sendData.name = val
                this.sendData.pageNo = 1
                this.isSearch = false
                this.getProductList()
            }
        },
        onReachBottom() {
            if(this.pageStatus != 'more') return
        	this.pageStatus = 'loading'
            this.getProductList()
        }
    }
</script>

<style lang="scss" scoped>
/* #ifdef MP */
/deep/.head{padding-right: 180rpx;
	.search-box {
		input{width: 400rpx;}
		.img-search{width: auto;height: 100%;display: flex;align-items: center;justify-content: center;}
	} 
}
/* #endif */
.search-result{padding: 0 24rpx;
    .search-result-tit{font-size: 32rpx; line-height: 44rpx; font-weight: bold; padding: 24rpx 0;}
    .insurance-item{display: flex; margin-bottom: 24rpx;
        .img{font-size: 0; flex-shrink: 0; margin-right: 12rpx;
            image{width: 240rpx; height: 148rpx;}
        }
        .detail{flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;
            .info{
            .title{font-size: 32rpx; line-height: 44rpx; font-weight: bold; margin-bottom: 8rpx;@include text-line(1)}
                .label{font-size: 24rpx; color: #666; line-height: 34rpx; @include text-line(1);
                    >text{position: relative; margin-right: 24rpx;
                        &::after{content: ''; width: 1px; height: 26rpx; background-color: #666; position: absolute; top: 50%; right: -12rpx; transform: translateY(-50%);} 
                        &:last-of-type{
                            &::after{display: none;}
                        }
                    }
                }
            }
            .price{color: $xinxii-font-price; font-size: 40rpx; font-weight: bold; line-height: 52rpx;
                  >text{margin-left: 10rpx; font-size: 24rpx; font-weight: normal; line-height: 34rpx;}
            }
        }
    }
}
</style>
