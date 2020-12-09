<template>
	<view class="content">
        <x-nav-bar leftWidth="24rpx" rightWidth="24rpx" :noBorder="true" leftIcon="none" title=" ">
            <view class="head" :class="{wx:isWx}">
                <view class="left" @click="showFirm = true">
                    <text class="firm">{{producerName}}</text>
					<x-icon :type="showFirm ? 'arrow-up': 'arrow-down'" size="24"></x-icon>
                </view>
                <view class="search-box">
                    <input type="text" :style="{width:topWidth+'rpx'}" disabled v-model="sendData.name" @click="openUrl('./search')" placeholder="搜索" placeholder-class="input-pld">
                    <x-icon class="img-search" type="search" size="32" color="#999"></x-icon>
                </view>
                <!-- <image @click="toMessage" class="img-tips" :class="{isMsg:msgStatus==0}" src="../../static/tips.png" mode=""></image> -->
                <x-icon v-if="!isWx" class="service-icon" type="service" color="#999"></x-icon>
                <x-icon v-if="!isWx" type="msg" color="#999"></x-icon>
            </view>
        </x-nav-bar>
        <view class="mask" @click="showFirm = false" v-if="showFirm"></view>
        
        <view class="cont">
            <view class="firm-box" v-if="showFirm">
                <view class="firm-item" v-for="item in producerList" :key="item.id" :class="{act : sendData.producerId == item.id}" @click="selFirm(item)">{{item.name}}</view>
            </view>
           <scroll-view scroll-y="true" show-scrollbar="false" class="tab-list">
                <view v-for="(item,index) in tagList" :key="index" @click="selTab(index,item.id)">
                    <view v-if="item.name!='甄选'" class="tab-item" :class="{act : current == index}">{{item.name}}</view>
                    <view v-else class="tab-item" :class="{act : current == index}" @click="selTab(index,item.id)"><image src="../../static/font_img.png" mode=""></image></view>
                </view>
            </scroll-view>
            <x-refresh
             @refresh = 'refresh' 
             :isImg = 'refreshImg'
             :pullHeight = '50' 
             :maxHeight = '50' 
             :isTab = 'false' 
             ref = 'xRefresh'>
                <scroll-view scroll-y="true" show-scrollbar="false" class="cont-list" @scrolltolower="getMore" @scroll="scroll" :scroll-top="scrollTop">
					<view class="top-pic">
						<image src="" mode=""></image>
					</view>
                    <view class="top-tab">
                        <view class="top-tab-wrap">
							<view class="top-tab-item" v-for="(item,index) in tagChildren" :class="{act: item.isSel==1}" :key="item.id" @click="selCovered(item,index)">{{item.name}}</view>
						</view>
                    </view>
                    <view class="detail-list" v-if="productList.length>0">
                        <view class="detail-item" v-for="(item,index) in productList" :key="index" @click="toDetail(item.id)">
                            <view class="box">
                                <view class="title">{{item.name}}</view>
                                <view class="info" v-html="item.specialInfo"></view>
                                <view class="price">{{item.inPrice.toFixed(2)}}<text>元/起</text></view>
                            </view>
                        </view>
                        <x-load-more :status="pageStatus"></x-load-more>
                    </view>
                    <x-no-data v-else-if="productList.length==0&&noData"></x-no-data>
                </scroll-view>
            </x-refresh>    
        </view>
		<x-modal ref="modal" content="需要登录才能访问喔，赶紧去登录吧！" @sure="sure"></x-modal>
	</view>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() {
		return {
            refreshImg: false,
            showFirm: false,
            producerName: '全部公司',
            current: 0,
			tagChildren:[],
            tagList: [],
            coveredList: [],
            producerList: [],
            productList: [],
            sendData: {
                pageNo: 1,
                pageSize: 5,
				producerId: '',
				coveredIds: '',
				tagIds: '',
				name: ''
            },
			selectedTags: [],
			selectedCovereds: [],
            pageStatus: 'more',
            noData: false,
            val: '',
			scrollTop: 0,
			oldScrollTop:0,
            isWx: false,
            topWidth: '374',
			url:''
        }
	},
    computed: {
        ...mapState(['isLogin', 'userinfo','msgStatus']),
    },
    onShow() {
        uni.showTabBar()
        // this.selectedCovereds = []
        // this.selectedTags = []
        // this.sendData.pageNo = 1
        // this.sendData.pageSize = 5
        // this.sendData.producerId = ''
        // this.getProductList()
    },
	onLoad(option) {
        // #ifdef MP-WEIXIN
        this.isWx = true
        this.topWidth = 318
        // #endif
        console.log(option);
		//优先读取缓存数据
        try {
            let tagList = uni.getStorageSync('tagList')
            let tagChildren = uni.getStorageSync('tagChildren')
            let producerList = uni.getStorageSync('producerList')
            let productList = uni.getStorageSync('productList')
            if (tagList) {
                this.tagList = tagList
                this.tagList.unshift({id:-1, name: '全部'})
            }
            if (tagChildren) {
                this.tagChildren = tagChildren
            }
            if (producerList) {
                this.producerList = producerList
                this.producerList.unshift({id:-1, name: '全部公司'})
            }
            if (productList) {
                this.productList = productList
            }
        } catch (e) {
            // error
        }
        this.getTagList({setStorage:true,name:'tagList'})
        this.getCoveredList({setStorage:true,name:'tagChildren'})
		this.getProducerList({setStorage:true,name:'producerList'})
		this.getProductList({setStorage:true,name:'productList'})
	},
	methods: {
		scroll (e) {
		    this.oldScrollTop = e.detail.scrollTop
		},
		
        //自定义下拉刷新
        refresh(){
            // for (let val of this.tagChildren){
            //     val.isSel = 0
            // }
            this.sendData.pageNo = 1
            // this.selectedCovereds = []
            this.getProductList()
            setTimeout(()=>{
            	this.$refs.xRefresh.reSet()
            },300)
        },
		sure(){
			 this.openUrl('../my/login')
		},
        toMessage(){
            if(!this.isLogin){
                // this.showModel('','需要登录才能访问喔，赶紧去登录吧！',()=>{this.openUrl('../my/login')})
				this.$refs.modal.open()
                // #ifdef APP-PLUS
                	uni.hideTabBar()
                // #endif
                return
            }
            this.openUrl('../message/index')
            this.$store.commit('SET_MSG_STATUS',1)
        },
        selFirm(item){
            console.log(item.id);
            console.log(this.sendData.producerId);
			//选择公司
            this.showFirm = false
            if(this.sendData.producerId == item.id) return
            this.sendData.producerId = item.id
            this.producerName = item.name
            this.sendData.pageNo = 1
			this.getProductList()
        },
        selTab(val,id){//选择TAB标签
			this.scrollTop = this.oldScrollTop
			this.$nextTick(() =>{
			    this.scrollTop = 0
			});
            if(this.current == val) return
            this.current = val
			this.selectedTags = []
			this.selectedCovereds = []
			if(id == ''){
                this.getCoveredList()
			}else{
				this.getTagChildren(id)
				this.selectedTags.push(id)
			}
            this.sendData.pageNo = 1
			this.getProductList()
        },
        selCovered(item,index){
            this.selectedCovereds = []
            let val = item.isSel == 1 ? 0 : 1
            this.$set(this.tagChildren[index],'isSel',val)
            for (let val of this.tagChildren){
                if(val.isSel == 1){
                    this.selectedCovereds.push(val.id)
                }
            }
            this.sendData.pageNo = 1
            this.getProductList()
        },
        getTagList(setStorage){
			//获取标签列表
            this.$api.get('pdc/product/tagList.do',{setStorage}).then( res => {
                if(res.success){
                    this.tagList = res.data
                    this.tagList.unshift({id: '',name: '全部'})
                }
            })
        },
        getCoveredList(setStorage){
			//获取覆盖人群列表
            this.$api.get('pdc/product/coveredList.do',{setStorage}).then( res => {
                if(res.success){
					this.tagChildren = res.data
                }
            })
        },
		getProducerList(setStorage){
			//获取供应商列表
            this.$api.get('ptr/producer/list.do',{setStorage}).then( res => {
                if(res.success){
                    this.producerList = res.data
                    this.producerList.unshift({id: '', name: '全部公司'})
                }
            })
		},
		getProductList(setStorage){
			//获取产品列表
			this.sendData.tagIds = this.selectedTags.join(',')
			this.sendData.coveredIds = this.selectedCovereds.join(',')
            this.$api.get('pdc/product/list.do',{params:this.sendData,setStorage}).then( res => {
                this.noData = true
                if(res.success){
                    console.log(this.productList);
                    console.log(this.sendData.pageNo);
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
		getTagChildren(parentId){
			//获取二级标签
			this.$api.get('pdc/product/tagList.do',{params:{parentId}}).then( res => {
				if(res.success){
					this.tagChildren = res.data
				}
			})
		},
        getMore(){
            if(this.pageStatus != 'more') return
            this.pageStatus = 'loading'
            this.getProductList()
        },
		toDetail(id){
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			this.$api.get('pdc/product/detail.do?id='+id).then( res => {
			    if(res.success){
					uni.hideLoading()
					// console.log(res.data)
					this.url = res.data.insuranceLink
					console.log(this.url)
					
					// #ifndef H5
					this.openUrl(this.url)
					// #endif
					
					// #ifdef H5
					this.openUrl(this.url)
					// #endif
			    }else{
					uni.hideLoading()
					uni.showToast({
						title: '网络错误'
					});
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.content{position: absolute; width: 100%; min-height: 100%;}
.head{display: flex; align-items: center; justify-content: space-between; width: 100%; height: 100%;
    &.wx{justify-content: flex-start;}
    .firm{@include text-line(1);}
    .left{flex-shrink: 0; display: flex; align-items: center; font-size: 0; width: 152rpx;
        >text{font-size: 28rpx; margin-right: 16rpx; flex-grow: 1;}
        image{width: 24rpx; height: 14rpx; flex-shrink: 0;}
    }
    .search-box{position: relative; margin-left: 36rpx;
        input{height: 60rpx; background-color: #F6F7F8; border-radius: 32rpx; padding-left: 80rpx; color: #999;}
        .input-pld{font-size: 28rpx; color: #999;}
        .img-search{position: absolute; left: 24rpx; top: 50%; transform: translateY(-50%);}
    }
    .service-icon{font-weight: bold;}
}

.cont{ display: flex; padding-right: 24rpx; position: relative;top: 24rpx;height: calc(100vh - var(--window-bottom) - var(--status-bar-height) - 44px - 24rpx);
    .firm-box{position: absolute; left: 0; top: -24rpx; z-index: 1000; background: #fff; width: 100%; padding: 20rpx 24rpx 4rpx; display: flex; flex-wrap: wrap;
        .firm-item{width: 208rpx; text-align: center; font-size: 28rpx; color: #999; height: 72rpx; border: 2rpx solid #999; border-radius: 37rpx; line-height: 68rpx; margin: 0 34rpx 18rpx 0;
            &.act{border-color: $xinxii-theme-color; color: $xinxii-theme-color;}
            &:nth-of-type(3n){margin-right: 0;}
        }
    }
    .tab-list{flex-shrink: 0; width: 150rpx; height: 100%;background-color: #F6F7F8; text-align: center;
        .tab-item{line-height: 40rpx; font-size: 32rpx; color: #666; padding: 32rpx 0;
            image{width: 96rpx; height: 38rpx; vertical-align: middle;}
            &.act{background-color: #FFFFFF; color: $xinxii-theme-color; position: relative;
                &::before{content: ''; width: 8rpx; height: 40rpx; background-color: $xinxii-theme-color; border-radius: 2rpx; position: absolute; left: 0; top: 50%; transform: translateY(-50%);}
            }
        }
    }
    .cont-list{flex-grow: 1; height: calc(100vh - var(--window-bottom) - var(--status-bar-height) - 44px - 24rpx); background-color: #fff; padding: 24rpx;
		.top-pic{
			image{display: block;width: 552rpx;height: 192rpx;background: #D8D8D8;border-radius: 6rpx;}
		}
        .top-tab{border-bottom: 2rpx dashed #EBEDF0;padding: 6rpx 0 24rpx;
			.top-tab-wrap{display: flex; flex-wrap: wrap;margin-right: -24rpx;
				.top-tab-item{border-radius: 6rpx; border: 2rpx solid #999; padding: 8rpx 16rpx; color: #999; font-size: 28rpx; line-height: 38rpx; margin: 18rpx 24rpx 0 0;
				    &.act{color: $xinxii-theme-color; border-color: $xinxii-theme-color;}
				}
			}
        }
        .detail-list{
            .detail-item{border-bottom: 2rpx solid #EBEDF0; padding-top: 24rpx;
                .box{padding-right: 28rpx;
                    .title{font-size: 32rpx; font-weight: bold; line-height: 44rpx;}
                    .info{margin: 8rpx 0 16rpx; font-size: 28rpx; line-height: 42rpx;;color: #666;}
                    .price{color: $xinxii-font-price; font-size: 40rpx; font-weight: bold; line-height: 52rpx; margin-bottom: 24rpx;
                        >text{margin-left: 10rpx; font-size: 24rpx; font-weight: normal; line-height: 34rpx;}
                    }
                }
            }
        }
    }
}
</style>
