<template>
    <view class="content">
        <b-search v-model="sendData.content" :isSearch="isSearch" :hotelList="hotelList" @input="input" :historyList="historyList" @clear="clear" @hotelitem="hotelItem" @historyitem="historyItem" @search="search"></b-search>
        <view class="search-result" v-if="!isSearch">
            <view class="search-result-tit">搜索结果</view>
            <view class="friends" v-if="friendsList.length>0">
					<view class="item" v-for="(item,index) in friendsList" :key="index">
					    <view class="top">
					        <image lazy-load :src="item.logo" mode=""></image>
					        <view class="info">
					            <view class="name">{{item.realName}}</view>
					            <view class="time">{{item.createDate}}</view>
					        </view>
					    </view>
					    <view class="detail">
					        <view class="txt" v-html="item.content">{{item.content}}</view>
					        <view class="img-box img-box1" v-if="item.picList.length == 1">
					            <image lazy-load v-for="(i,index) in item.picList" :key="index" :src="i" @click="openImg(item.picList,index)" mode="aspectFill"></image>
					        </view>
					        <view class="img-box img-box2" v-else-if="item.picList.length > 1 && item.picList.length < 5">
					           <image lazy-load v-for="(i,index) in item.picList" :key="index" :src="i" @click="openImg(item.picList,index)" mode="aspectFill"></image>
					        </view>
					        <view class="img-box img-box3" v-else>
                                <image lazy-load v-for="(i,index) in item.picList" :key="index" :src="i" @click="openImg(item.picList,index)" mode="aspectFill"></image>
					        </view>
					    </view>
					    <view class="bottom">
					        <view class="left">
					            <!-- <view>
					                <image lazy-load src="../../static/share.png" mode=""></image>
					                <text>{{item.shareNum}}</text>
					            </view>
					            <view @click="like(item,index)">
					                <image lazy-load src="../../static/like.png" mode=""></image>
					                <text>{{item.loveNum}}</text>
					            </view> -->
					        </view>
					        <button class="btn" @click="forwarding(item)">一键转发</button>
					    </view>
					</view>
                <x-load-more :status="pageStatus"></x-load-more>
            </view>
            <x-no-data v-else-if="friendsList.length==0&&noData"></x-no-data>
        </view>
		<x-modal ref="modal" content="确定清空吗？" @sure="sure"></x-modal>
    </view>
</template>

<script>
	  import { bigImg } from '../../common/api'
    export default{
        data () {
            return {
                hotelList: [],
                historyList: [],
                friendsList: [],
                isSearch: true,
                sendData:{
                    pageSize: 10,
                    pageNo: 1,
                    content: ''
                },
                noData: false,
                pageStatus: 'more',
				message:[]
            }
        },
        onLoad() {
            this.getHotel()
            let historyList = uni.getStorageSync('friendsHistory')
            if(historyList){
                this.historyList = historyList
            }
        },
        methods: {
			openImg(urls,i){
			    bigImg(urls,i)
			},
            search (val) {
                this.sendData.content = val.trim()
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
                    key: 'friendsHistory',
                    data: this.historyList
                })
                this.isSearch = false
                this.sendData.pageNo = 1
                this.getFriendsList()
            },
            getFriendsList(){
				console.log(this.sendData)
                this.$api.get('dynamic/dynamic/list.do',{params:this.sendData}).then( res => {
                    this.noData = true
                    if(res.success){
                        if (this.sendData.pageNo <= 1) {
                        	this.friendsList = res.data.list
                        } else {
                        	this.friendsList.push(...res.data.list)
                        }
                        for (let val of this.message) {
                            val.content = val.content.replace(/<\/br>|<br\s*\/?>/gi,"\r\n")
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
			sure(){
				this.historyList = []
				 uni.setStorage({
					key: 'friendsHistory',
				    data: []
				})
			},
            clear () {
     //            this.showModel('提示','确定清空吗？',()=>{
     //                this.historyList = []
					//  uni.setStorage({
					// 	key: 'friendsHistory',
					//     data: []
					// })
     //            })
				this.$refs.modal.open()
            },
            input(val){
                if(!val&&!this.isSearch){
                    this.isSearch = true
                }
            },
            hotelItem (val) {
                this.sendData.content = val
                this.sendData.pageNo = 1
                this.isSearch = false
                this.getFriendsList()
            },
            historyItem (val) {
                this.sendData.content = val
                this.sendData.pageNo = 1
                this.isSearch = false
                this.getFriendsList()
            },
			forwarding(item){
				// this.updateShareNum(id)
			    // #ifdef APP-PLUS
			    if(item.picList.length == 1){
			        this.copy(item.content,false)
			        uni.share({
			            provider: "weixin",
			            scene: "WXSenceTimeline",
			            type: 2,
			            imageUrl: item.picList[0],
			            success: function (res) {
			                console.log("success:" + JSON.stringify(res));
			            },
			            fail: function (err) {
			                console.log("fail:" + JSON.stringify(err));
			            }
			        })
			    }else{
			        for (let url of item.picList) {
			            this.downloadImage(url)
			        }
			        this.copy(item.content,false)
			        this.showModel('文字，图片复制保存成功！','打开微信朋友圈，可直接粘贴文字并从手机相册选取图片',()=>{
			            if (plus.os.name == 'Android') {  
			              plus.runtime.launchApplication(  
			                { pname: 'com.tencent.mm' },  
			                (e) => {  
			                  this.showToast(e.message)
			                }  
			              )
			            } else if (plus.os.name == 'iOS') {  
			              plus.runtime.launchApplication(
			                { action: 'weixin://' }, 
			                (e) => {  
			                  this.showToast(e.message)
			                } 
			              )  
			            }
			        })
			    }
			    // #endif
			},
			// updateShareNum(item,index){//这里是转发之后往数据库累加 建议前端先累加一次 展示 不需要立即刷新列表
			// 	this.$api.get('dynamic/dynamic/updateShareNum.do',{params:{id: item.id}}).then( res => {
			// 	    if(res.success){
			// 	       console.log(res);
			// 	    }
			// 	})
			// }
        },
        onReachBottom() {
            if(this.pageStatus != 'more') return
        	this.pageStatus = 'loading'
            this.getFriendsList()
        }
    }
</script>

<style lang="scss" scoped>
/* #ifdef MP */
/deep/.content {
		.head{padding-right: 180rpx;
			.search-box {
				input{width: 400rpx;}
				.img-search{width: auto;height: 100%;display: flex;align-items: center;justify-content: center;}
			} 
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
            .title{font-size: 32rpx; line-height: 44rpx; font-weight: bold; margin-bottom: 8rpx;}
                .label{font-size: 24rpx; color: #666; line-height: 34rpx; @include text-line(1);
                    >text{position: relative; margin-right: 24rpx;
                        &::after{content: ''; width: 1px; height: 26rpx; background-color: #666; position: absolute; top: 50%; right: -12rpx; transform: translateY(-50%);} 
                        &:last-of-type{
                            &::after{display: none;}
                        }
                    }
                }
            }
            .price{color: #FF5000; font-size: 40rpx; font-weight: bold; line-height: 52rpx;
                  >text{margin-left: 10rpx; font-size: 24rpx; font-weight: normal; line-height: 34rpx;}
            }
        }
    }
}

.friends{background: #fff; padding: 24rpx;
    .tit{font-size: 32rpx; font-weight: bold; line-height: 44rpx;}
        .item{ padding-bottom: 24rpx; border-bottom: 1px solid #f0f0f0;
            &:last-of-type{border: none;}
            .top{font-size: 0; display: flex; align-items: center; font-weight: bold; margin: 24rpx 0;
                image{width: 76rpx; height: 76rpx; margin-right: 12rpx; border-radius: 50%;}
                .info{
                    .name{font-size: 32rpx; font-weight: bold; color: #ff5000; line-height: 40rpx;}
                    .time{font-size: 24rpx; color: #999; margin-top: 2rpx;}
                }
            }
            .detail{
                .txt{font-size: 32rpx; line-height: 42rpx;}
                .img-box{font-size: 0; margin: 24rpx 0; border-radius: 16rpx;
                    image{ border-radius: 4rpx; width: 206rpx; height: 206rpx; margin: 0 18rpx 18rpx 0;}
                    &.img-box1{
                        image{width: 372rpx; height: 494rpx;}
                    }
                    &.img-box3{
                        image{
                            &:nth-of-type(3n){margin-right: 0;}
                        }
                    }
                }
                
            }
            .bottom{display: flex; align-items: center; justify-content: space-between;
                .left{display: flex; align-items: center;
                    >view{display: flex; align-items: center; font-size: 0; margin-right: 24rpx;
                        image{width: 32rpx; height: 32rpx;}
                        text{font-size: 24rpx; color: #999; margin-left: 12rpx;}
                    }
                }
                .btn{width: 160rpx; height: 56rpx; line-height: 56rpx; background: #ff5000; border-radius: 32rpx; color: #fff; font-size: 28rpx;}
            }
        }
}
</style>
