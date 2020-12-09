<template>
    <view class="content">
        <x-nav-bar :no-border="true" title=" " color="#fff" backgroundColor="transparent"></x-nav-bar>
        <image lazy-load class="bg" :src="url" mode="aspectFill"></image>
        <view class="btn-box">
           <!-- <image lazy-load @click="showShare" src="../../static/signbanner_share.png" mode=""></image>
            <image lazy-load @click="dowload" src="../../static/signbanner_dowload.png" mode=""></image> -->
            <x-icon class="icon" @click="showShare" type="share"></x-icon>
            <x-icon class="icon" @click="dowload" type="download"></x-icon>
        </view>
        <!-- <view class="share-box" v-show="show">
            <view class="share">
                <view class="item" @click="share('weixin','WXSceneSession')">
                    <image lazy-load src="../../static/share_weixin.png" mode=""></image>
                    <view>微信</view>
                </view>
                <view class="item" @click="share('weixin','WXSenceTimeline')">
                    <image lazy-load src="../../static/share_pyquan.png" mode=""></image>
                    <view>朋友圈</view>
                </view>
                <view class="item" @click="share('qq','WXSenceTimeline')">
                    <image lazy-load src="../../static/share_qq.png" mode=""></image>
                    <view>QQ</view>
                </view>
                <view class="item">
                    <image lazy-load src="../../static/share_weibo.png" mode=""></image>
                    <view>微博</view>
                </view>
            </view>
            <view class="btn" @click="show = false">取消</view>
        </view> -->
        <b-share-wechat :imageUrl="url" :typeNumber="2" :show="show" @click="show = false"></b-share-wechat>
    </view>
</template>

<script>
    export default{
        data () {
            return {
                url: '',
                show: false
            }
        },
        onLoad(option) {
            console.log(option.url);
            this.url  = option.url
        },
        methods:{
            dowload(){
                // #ifdef H5
                this.showToast('H5端暂不支持下载')
                // #endif
                // #ifndef H5
                uni.showLoading({title:'下载中'})
                uni.downloadFile({
                    url: this.url,
                    success: res => {
                        if (res.statusCode === 200) {
                            uni.saveImageToPhotosAlbum({
                                filePath: res.tempFilePath,
                                success: () => {
                                    uni.hideLoading()
                                    this.showToast('保存成功')
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
            },
            showShare(){
                this.show = true
            }
        }
    }
</script>

<style lang="scss" scoped>
.content{position: absolute; left: 0; top: 0; width: 100%; min-height: 100%; font-size: 0;
    .bg{position: fixed; left: 0; top: 0; width: 100%; height: 100%;}
    .btn-box{position: fixed; right: 24rpx; bottom: 176rpx;
        .icon{width: 72rpx; height: 72rpx; margin-top: 24rpx; display: block;}
    }
}
// .share-box{position: fixed; width: 702rpx; bottom: 40rpx; left: 24rpx;
//     .share{background: #fff; border-radius: 12rpx; display: flex; font-size: 0; padding: 48rpx 0;
//         .item{width: 50%; font-size: 28rpx; line-height: 40rpx; color: #999; text-align: center;
//             image{width: 80rpx; height: 80rpx;}
//         }
//     }
//     .btn{ background: #fff; border-radius: 12rpx; height: 88rpx; line-height: 88rpx; text-align: center; font-size: 32rpx; margin-top: 18rpx;}
// }
</style>
