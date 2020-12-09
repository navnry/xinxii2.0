<template>
    <view class="content">
		<x-nav-bar :no-border="true" title=" " color="#fff" backgroundColor="transparent"></x-nav-bar>
        <view class="box">
            <swiper class="swiper"
            :autoplay="false" 
            @change="handelImg"
            :current=val
            >
                <swiper-item v-for="(item,index) in urls" :key="index">
                    <view class="swiper-item">
                        <view class="bg"></view>
                        <img :src="item" mode=""></img>
                    </view>
                </swiper-item>
                
            </swiper>
			<view class="btn-box">
			    <!-- <image lazy-load @click="shareImg" src="../../static/signbanner_share.png" mode=""></image>
			    <image lazy-load @click="dowload" src="../../static/signbanner_dowload.png" mode=""></image> -->
                <x-icon class="icon" @click="showShare" type="share"></x-icon>
                <x-icon class="icon" @click="dowload" type="download"></x-icon>
			</view>
            <!-- <view class="share-box" v-if="!show">
                <view class="top">
                    <view class="item" @click="shareImg">分享</view>
                    <view class="item" @click="dowload">保存图片</view>
                </view>
                <view class="cancel" @click="back">取消</view>
            </view> -->
            <b-share-wechat :imageUrl="urls[val]" :typeNumber="2" :show="show" @click="show = false"></b-share-wechat>
        </view>
    </view>
</template>

<script>
    export default{
        data () {
            return {
                urls: '',
                show: false,
                val: '',
                sendData: null,
                type: 0
            }
        },
        onShow() {
            this.show = false
        },
        onLoad(option) {
            if(option){
                let obj = JSON.parse(decodeURIComponent(option.obj))
                this.urls = obj.urls
                this.val = obj.index
                if(obj.sendData){
                    this.sendData = obj.sendData
                }
                if(obj.type){
                    this.type = obj.type
                }
            }
        },
        methods:{
            handelImg(event){
                this.val = event.detail.current
                if(this.type == 1){
                    this.getList()
                }
            },
            getList(){
                this.$api.get('file/poster/findPosterResourceByTypeId.do',{params:this.sendData}).then( res => {
                    this.noData = true
                    if(res.success){
                        this.urls.push(...res.data)
                        this.sendData.pageNo++
                    }
                })
            },
            back(){
                this.backPage()
            },
            shareImg(){
               this.show = true 
            },
            dowload(){
                // #ifdef H5
                this.showToast('H5端暂不支持下载')
                // #endif
                // #ifndef H5
                uni.showLoading({title:'下载中'})
                uni.downloadFile({
                    url: this.urls[this.val],
                    success: res => {
                        if (res.statusCode === 200) {
                            uni.saveImageToPhotosAlbum({
                                filePath: res.tempFilePath,
                                success: () => {
                                    uni.hideLoading()
                                    this.showToast('保存成功')
                                    setTimeout(()=>{
                                        this.backPage()
                                    },1500)
                                },
                                fail: () => {
                                    uni.hideLoading()
                                    this.showToast('保存失败，请稍后重试')
                                }
                            })
                        } else {
                            uni.hideLoading()
                            this.showToast('下载失败')
                        }
                    }
                })
                // #endif
            }
        }
    }
</script>

<style lang="scss" scoped>
	uni-page-body,.content{height: 100%;}
    .swiper{width: 100%; height: 100vh;}
    .box{position: absolute; width: 100%; height: 100%; font-size: 0;top: 0;
        .bg{position: absolute; width: 100%; height: 100%; background: #000; opacity: .3; z-index: 1;}
        img{position: absolute; max-width: 100%; left: 50%; top: 50%; transform: translate(-50%,-50%); z-index: 100;}
        .share-box{position: absolute; left: 24rpx; bottom: 0; z-index: 101; font-size: 32rpx; text-align: center; width: 702rpx;
            >view{background: #fff; border-radius: 12rpx; margin-bottom: 18rpx; border: 1px solid #f0f0f0;
                .item{height: 88rpx; line-height: 88rpx;
                    &:first-of-type{border-bottom: 2rpx solid #F0F0F0;}
                }
            }
            .cancel{height: 88rpx; line-height: 88rpx;}
        }
		.btn-box{position: fixed; right: 24rpx; bottom: 176rpx;
		    .icon{width: 72rpx; height: 72rpx; margin-top: 24rpx; display: block;}
		}
    }
</style>
