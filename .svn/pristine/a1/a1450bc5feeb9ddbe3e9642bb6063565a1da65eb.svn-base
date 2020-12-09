<template>
    <view class="content">
        <b-search v-model="sendData.name" :isSearch="isSearch" :historyList="historyList" @clear="clear" @input="input" @historyitem="historyItem" @search="search"></b-search>
        <view class="search-result" v-if="!isSearch">
            <view class="search-result-tit">搜索结果</view>
            <view v-if="trainList.length>0">
                <view class="train-item" v-for="item in trainList" :key="item.id" @click="openUrl('./detail?id='+item.id)">
                    <image lazy-load :src="item.pic+'?imageMogr2/crop/216x148'" mode=""></image>
                    <view class="info">
                        <view class="train-tit">{{item.title}}</view>
                        <view class="time">{{item.subTitle}} {{creadTime(item.createDate)}}</view>
                    </view>
                </view>
                <x-load-more :status="pageStatus"></x-load-more>
            </view>
            <x-no-data v-else-if="trainList.length==0&&noData"></x-no-data>
        </view>
		<x-modal ref="modal" content="确定清空搜索历史吗？" @sure="clearHistory" ></x-modal>
    </view>
</template>

<script>
    import { lastDateTime } from '@/common/utils'
    export default{
        data () {
            return {
                historyList: [],
                trainList: [],
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
            let historyList = uni.getStorageSync('trainHistory')
            console.log(this.historyList);
            if(historyList){
                this.historyList = historyList
            }
        },
        computed:{
            creadTime(){
                return (time) => {
                    let t = time.replace(/-/g, '/')
                    return lastDateTime(new Date(t).getTime())
                }
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
                    key: 'trainHistory',
                    data: this.historyList
                })
                this.isSearch = false
                this.sendData.pageNo = 1
                this.getTrainList()
            },
            getTrainList(){
                this.$api.get('article/article/search.do',{params:this.sendData}).then( res => {
                    this.noData = true
                    if(res.success){
                        if (this.sendData.pageNo <= 1) {
                        	this.trainList = res.data
                        } else {
                        	this.trainList.push(...res.data)
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
            clear () {
                // this.showModel('提示','确定清空吗？',()=>{
                //     this.historyList = []
                // })
				
				this.$refs.modal.open()
            },
			clearHistory(){
				this.historyList = []
				 uni.setStorage({
					key: 'trainHistory',
				    data: []
				})
			},
            input(val){
                if(!val&&!this.isSearch){
                    this.isSearch = true
                }
            },
            historyItem (val) {
                this.sendData.name = val
                this.sendData.pageNo = 1
                this.isSearch = false
                this.getTrainList()
            }
        },
        onReachBottom() {
            if(this.pageStatus != 'more') return
        	this.pageStatus = 'loading'
            this.getTrainList()
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
.content{background: #fff;}
.search-result{padding: 0 24rpx;
    .search-result-tit{font-size: 32rpx; line-height: 44rpx; font-weight: bold; padding: 24rpx 0;}
    .train-item{display: flex; align-items: center; justify-content: space-between; margin-bottom: 24rpx; font-size: 0;
        .info{flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between; height: 148rpx;
            .train-tit{line-height: 48rpx; font-size: 32rpx; @include text-line();}
            .time{color: #999; font-size: 24rpx;}
        }
        image{width: 216rpx; height: 148rpx; border-radius: 4rpx; flex-shrink: 0; margin-right: 48rpx;}
    }
}
</style>
