<template>
	<view class="content">
		<x-nav-bar leftWidth="24rpx" rightWidth="24rpx" :noBorder="true" leftIcon="none" title=" ">
            <view class="head">
                <view class="search-box">
                    <input type="text" :style="{width:topWidth+'rpx'}" disabled="disabled" @click="openUrl('./search')" placeholder="搜索" placeholder-class="input-pld">
                    <x-icon class="img-search" type="search" size="36" color="#999"></x-icon>
                    <!-- <image lazy-load class="img-search" src="../../static/serach.png" mode=""></image> -->
                </view>
                <!-- <image lazy-load @click="toMessage" class="img-tips" :class="{isMsg:msgStatus==0}" src="../../static/tips.png" mode=""></image> -->
                <x-icon v-if="!isWx" class="service-icon" type="service" color="#999"></x-icon>
                <x-icon v-if="!isWx" type="msg" color="#999"></x-icon>
            </view>
		</x-nav-bar>
        <scroll-view scroll-x="true" class="tab-list" id="tab-list">
            <view class="tab-item tab-item-one">
                <text>资讯</text>
                <x-icon class="icon" type="zixun" size="28"></x-icon>
            </view>
            <view class="tab-item" v-for="(item,index) in tabList" :key="index" :class="{act: current == index}" @click="selTab(item,index)">{{item.name}}</view>
        </scroll-view>
		<view style="height: 96rpx;"></view>
        <x-refresh
         @refresh = 'refresh' 
         :isImg = 'refreshImg'
         :pullHeight = '50' 
         :maxHeight = '50' 
         :isTab = 'false' 
         ref = 'xRefresh'>
            <view class="hot-recommend">
               
			<view class="banner">
			    <view class="text">普通民众怎么和分配自己的财产分配自普通民众怎么和分配自己</view>
			</view>
                <view v-show="current == 0">
					<view class="list">
					    <view v-for="(item,index) in articleList" :key="index">
                            <b-train-item :item="item" @toDetail="toDetail(item)" :key="item.id"></b-train-item>
					    </view>
					</view>
                </view>
                <view v-show="current != 0" >
                    <view  class="group-list">
                        <view class="list" v-if="list.length>0">
                            <b-train-item v-for="(item,index) in list" :key="item.id" :item="item" @toDetail="toDetail(item)"></b-train-item>
                            <x-load-more :status="pageStatus"></x-load-more>
                        </view>
                        <x-no-data v-else-if="list.length == 0 && noData"></x-no-data>
                    </view>
                </view>
            </view>
			<x-modal ref="modal" content="需要登录才能访问喔，赶紧去登录吧！" @sure="sure"></x-modal>
        </x-refresh>
	</view>
</template>

<script>
import { mapState } from 'vuex'
import { lastDateTime } from '@/common/utils'
export default {
	data() {
		return {
            refreshImg: false,
            current: 0,
            tabList: [],    // tab栏
            sendData: {
                pageNo: 1,
                pageSize: 10,
                articleType: '',
                channelid: '',
                order: '',
                isHot: 1,
            },
            articleList: [] ,//热门推荐
            list: [],
            pageStatus: 'more',
            noData: false,
            id: '',
            // top: '' ,// TAB距离顶部距离
            // isFixed: false,
			// focusList:[],
            isWx: false,
            topWidth: '558',
        }
	},
    computed: {
        ...mapState(['isLogin', 'userinfo','msgStatus']),
        creadTime(){
            return (time) => {
                let t = time.replace(/-/g, '/')
                return lastDateTime(new Date(t).getTime())
            }
        }
    },
    onShow() {
        uni.showTabBar()
    },
	onLoad(options) {
        // #ifdef MP-WEIXIN
        this.isWx = true
        this.topWidth = 510
        // let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
        // console.log(menuButtonInfo);
        // #endif
        try {
            let tabList = uni.getStorageSync('trainTabList')
            let articleList = uni.getStorageSync('trainArticleList')
            // let focusList = uni.getStorageSync('focusList')
            if (tabList) {
                this.tabList = tabList
                this.tabList.unshift({id:-1, name: '推荐'})
            }
            if (articleList) {
                this.articleList = articleList
            }
			// if(focusList){
			// 	console.log(focusList)
			// 	 this.focusList = focusList.articleList
			// }
        } catch (e) {
            // error
        }
        this.getTabList({setStorage:true,name:'trainTabList'})
        this.getArticleList({setStorage:true,name:'trainArticleList'})
        // this.getFocusList({setStorage:true,name:'focusList'})
	},
    mounted() {
        // const query = uni.createSelectorQuery().in(this);
        // query.select('#tab-list').boundingClientRect(data => {
        //     console.log("得到布局位置信息" + JSON.stringify(data));
        //     console.log("节点离页面顶部的距离为" + data.top);
        //     this.top = parseFloat(data.top) - parseFloat(data.height)
        // }).exec()
    },
	methods: {
		sure(){
			 this.openUrl('../my/login')
		},
        toMessage(){
            if(!this.isLogin){
				this.$refs.modal.open()
                // #ifdef APP-PLUS
                	uni.hideTabBar()
                // #endif
                return
            }
            this.openUrl('../message/index')
            this.$store.commit('SET_MSG_STATUS',1)
        },
		// getFocusList(setStorage){
		// 	this.$api.get('/daily/focus/getFocusLately.do',{setStorage}).then( res => {
		// 		if(res.success){
		// 			this.focusList=res.data.articleList
		// 		}
		// 	})
		// },
        toDetail(item){
            if(item.type == 'out'){
                this.openUrl('../my/webview?url=' + encodeURIComponent(item.url))
            }else if(item.type == 'local'){
                this.openUrl('./detail?id='+item.id)
            }
        },
        getTabList(setStorage){ // 获取tab列表
            this.$api.get('channel/channel/listAll.do',{params:{type: 'knowledge'},setStorage}).then( res => {
                if(res.success){
                    this.tabList = res.data
                    this.tabList.unshift({id:-1, name: '推荐'})
                }
            })
        },
        selTab(item,val){
            if(this.current == val) return
            this.current = val
            if(this.current == 0){
                this.sendData.channelid = ''
                this.sendData.isHot = 1
                this.sendData.pageNo = 1
                this.getArticleList()
            }else{
                this.noData = false
                this.pageStatus = 'more'
                this.sendData.channelid = item.id
                this.id = item.id
                this.sendData.pageNo = 1
                this.sendData.isHot = ''
                this.list = []
                try {
                    let list = uni.getStorageSync(item.id)
                    this.list = list
                    this.getList({setStorage:true,name:item.id})
     //            	if(list){
					// 	 if(list.length == 0){
					// 		this.noData = true
					// 	 }else{
					// 		this.list = list 
					// 		this.sendData.pageNo++
					// 	 }
     //                     return
     //            	}else{
						
					// }
                } catch (e) {
                    // error
                }
            }
        },
        getList(setStorage){
            this.$api.get('article/article/list.do',{params:this.sendData,setStorage}).then( res => {
                this.noData = true
                if(res.success){
                    if (this.sendData.pageNo <= 1) {
                    	this.list = res.data
                    } else {
                    	this.list.push(...res.data)
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
		getArticleList(setStorage){
            this.$api.get('article/article/list.do',{params:this.sendData,setStorage}).then( res => {
                if(res.success){
                    this.articleList = res.data
                    this.pageStatus = 'noMore'
                }
            })
        },
        //自定义下拉刷新
        refresh(){
            this.sendData.pageNo = 1
            this.getTabList()
            this.getArticleList()
            // this.getFocusList()
            setTimeout(()=>{
            	this.$refs.xRefresh.reSet()
            },300)
        },
        // onPageScroll(res){
        //     if(res.scrollTop - 12>=this.top){
        //         this.isFixed = true
        //     }else{
        //         this.isFixed = false
        //     }
        // }
	},
    onReachBottom() {
        if(this.pageStatus != 'more') return
    	this.pageStatus = 'loading'
        this.getList()
    }
}
</script>

<style lang="scss" scoped>
.head{display: flex; align-items: center; justify-content: space-between; height: 100%;
    .search-box{position: relative;
        input{width: 634rpx; height: 60rpx; background-color: #F6F7F8; border-radius: 32rpx; padding-left: 80rpx; color: #999;}
        .input-pld{font-size: 28rpx; color: #999;}
        .img-search{position: absolute; left: 24rpx; top: 50%; transform: translateY(-50%);}
    }
    .service-icon{font-weight: bold;}
  }
.tab-list{ white-space: nowrap; background-color: #fff; border-radius: 12rpx 12rpx 0 0; position: fixed; z-index: 100; height: 96rpx;
    .tab-item{display: inline-block; vertical-align: middle; line-height: 44rpx; font-size: 32rpx; padding: 32rpx 24rpx 12rpx; font-weight: bold;
        &.act{color: $xinxii-theme-color; position :relative; font-size: 36rpx;
            &:after{height: 4rpx; width: 28rpx; position: absolute; left: 50%; transform: translateX(-50%); content:" "; background-color: $xinxii-theme-color; bottom: 0;}
        }
    }
    .tab-item-one{
        .icon{margin: -4rpx 0 0 8rpx;}
    }
}
.hot-recommend{padding: 0 24rpx 0;
    .banner{width: 702rpx; height: 320rpx; margin: 24rpx auto; border-radius: 6rpx; background-color: #999999; position: relative;
        .text{position: absolute; left: 0; bottom: 24rpx; width: 100%; padding: 0 24rpx; font-size: 32rpx; font-weight: 600; line-height: 48rpx; color: #fff; @include text-line();}
    }
    .group-list{background: #fff;
		.list{
			.item{
				&:first-of-type{padding-top: 0;}
				&:last-of-type{padding-bottom: 0;border-bottom: 0;}
			}
		}
	}
    .list{padding: 24rpx; background-color: #fff; margin-bottom: 24rpx; border-radius: 6rpx;
		.item{padding: 24rpx 0; border-bottom: 2rpx solid $xinxii-border-color; margin-bottom: 0;}
		&>view{
			&:first-of-type{
				.item{padding-top: 0;}
			}
			&:last-of-type{
				.item{padding-bottom: 0;border-bottom: 0;}
			}
		}
		
        .tit{line-height: 48rpx; font-size: 32rpx; @include text-line(1);}
        .time{color: #999; font-size: 24rpx;
            text{margin-right: 8rpx; color: $xinxii-theme-color;}
        }
        .item-y{padding: 16rpx 0;border-bottom: 2rpx solid #F6F7F8;
            image{width: 100%; height: 318rpx; border-radius: 4rpx;}
            .tit{margin: 12rpx 0 18rpx;}
        }
        >view{
            &:last-of-type{
                .item{margin-bottom: 0;}
            }
        }
    }
}
</style>
