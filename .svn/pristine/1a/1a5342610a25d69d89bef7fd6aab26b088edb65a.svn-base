<template>
    <view v-show="show">
        <view class="mask"></view>
        <view class="share-box">
            <view class="share">
                <view class="item" @click="share('weixin','WXSceneSession')">
                    <!-- <image lazy-load src="../../static/share_weixin.png" mode=""></image> -->
                    <x-icon type="weixin"></x-icon>
                    <view>微信</view>
                </view>
                <view class="item" @click="share('weixin','WXSenceTimeline')">
                    <!-- <image lazy-load src="../../static/share_pyquan.png" mode=""></image> -->
                    <x-icon type="pengyouquan"></x-icon>
                    <view>朋友圈</view>
                </view>
                <!-- <view class="item" @click="share('qq','WXSenceTimeline')">
                    <image lazy-load src="../../static/share_qq.png" mode=""></image>
                    <view>QQ</view>
                </view>
                <view class="item">
                    <image lazy-load src="../../static/share_weibo.png" mode=""></image>
                    <view>微博</view>
                </view> -->
            </view>
            <view class="btn" @click="onClick">取消</view>
        </view>
    </view>
    
</template>

<script>
    export default{
        props:{
            url:{
                type: String // 地址
            },
            imageUrl:{
                type: String
            },
            show: {
                type: [Boolean,String],
                default: false
            },
            typeNumber:{
                type:[Number,String]  // 0  图文 1 纯文字  2  纯图片
            },
            summary:{
                type: String // 文字内容
            },
            title:{
                type: String 
            },
            articleId:{
                type: [Number,String]
            }
        },
        data () {
            return {
                
            }
        },
        methods:{
            share(provider,scene,type){
                uni.share({
                    provider,
                    scene,
                    type: this.typeNumber,
                    title: this.title,
                    href: this.url,
                    summary: this.summary,
                    imageUrl: this.imageUrl,
                    success: (res) => {
                        console.log("success:" + JSON.stringify(res));
                        if(this.id){
							if(this.typeNumber==0){
							    this.$api.get('article/article/shareArticle.do?id='+this.articleId).then( res => {
							        if(res.success){
							            
							        }
							    })
							}
						}
                        this.showToast('分享成功')
                    },
                    fail: (err) => {
                        console.log("fail:" + JSON.stringify(err));
                        this.showToast('分享失败')
                    }
                })
            },
            onClick(){
                this.$emit('click')
            }
        }
    }
</script>

<style scoped lang="scss">
    .share-box{position: fixed; width: 702rpx; bottom: 40rpx; left: 24rpx; z-index: 1002;
        .mask{z-index: 1000;}
        .share{background: #fff; border-radius: 12rpx; display: flex; font-size: 0; padding: 48rpx 0;
            .item{width: 25%; font-size: 28rpx; line-height: 40rpx; color: #999; text-align: center;
                image{width: 80rpx; height: 80rpx;}
            }
        }
        .btn{ background: #fff; border-radius: 12rpx; height: 88rpx; line-height: 88rpx; text-align: center; font-size: 32rpx; margin-top: 18rpx;}
    }
</style>
