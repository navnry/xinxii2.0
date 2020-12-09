<template>
    <view>
        <x-nav-bar :no-border="true" title="全部海报"></x-nav-bar>
        <scroll-view scroll-x="true" class="tab-list">
            <view class="tab-item" v-for="(item,index) in tabList" :key="index" :class="{act: current == index}" @click="selTab(item,index)">{{item.name}}</view>
        </scroll-view>
        <view class="list">
            <view class="list-item" v-if="imageList.length>0">
                <view class="item" v-for="(item,index) in imageList" :key="index" @click="toDetail(index)">
                    <image lazy-load :src="item" mode="aspectFill" ></image>
                </view>
                <x-load-more :status="pageStatus"></x-load-more>
            </view>
            <x-no-data v-else-if="imageList.length==0&&noData"></x-no-data>
        </view>
    </view>
</template>

<script>
    export default {
        data () {
            return {
                tabList: [],
				imageList:[],
                current: -1,
                pageStatus: 'more',
                noData: false,
                sendData:{
                    typeId: '',
                    pageNo: 1,
                    pageSize: 6
                }
            }
        },
		onLoad() {
			this.posterType()
		},
        methods: {
			posterType(){
				this.$api.get('file/poster/type.do').then( res => {
				    if(res.success && res.data){
						this.tabList = res.data.types
                        this.selTab(this.tabList[0],0)
				    }
				})
			},
            selTab(item,index){
                if(this.current == index) return
                this.current = index
                this.sendData.typeId = item.id
                this.sendData.pageNo = 1
				this.getList()
            },
            getList(){
                this.$api.get('file/poster/findPosterResourceByTypeId.do',{params:this.sendData}).then( res => {
                    this.noData = true
                    if(res.success){
                        if (this.sendData.pageNo <= 1) {
                        	this.imageList = res.data
                        } else {
                        	this.imageList.push(...res.data)
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
            toDetail(index){
                let obj = {
                    urls: this.imageList,
                    index,
                    type: 1,
                    sendData: this.sendData
                }
                uni.navigateTo({
                    url: './poster?obj='+encodeURIComponent(JSON.stringify(obj))
                })
            }
        },
        onReachBottom() {
            if(this.pageStatus != 'more') return
        	this.pageStatus = 'loading'
            this.getList()
        }
    }
</script>

<style lang="scss" scoped>
.tab-list{ white-space: nowrap; background-color: #fff; border-bottom: 1px solid #F6F7F8; position: fixed; left: 0; z-index: 100;
 .tab-item{display: inline-block; vertical-align: middle; line-height: 44rpx; font-size: 32rpx; padding: 32rpx 24rpx 12rpx;
   &.act{color: $xinxii-theme-color; position :relative; font-weight: bold;
    &:after{height: 4rpx; width: 28rpx; position: absolute; left: 50%; transform: translateX(-50%); content:" "; background-color: $xinxii-theme-color; bottom: 0;}
   }
 }
} 
.list{ padding: 112rpx 24rpx 24rpx;
    .list-item{display: flex; justify-content: space-between; flex-wrap: wrap;
        .item{width: 340rpx; height: 542rpx; font-size: 0; margin-bottom: 24rpx; border-radius: 8rpx;
            image{width: 100%; height: 100%; border-radius: 8rpx;}
        }
    }
}
</style>
