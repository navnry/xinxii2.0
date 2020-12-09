<template>
    <view class="content">
        <x-nav-bar :noBorder="true" title="我的邀请" backgroundColor="transparent" color="#fff"></x-nav-bar>
            <view class="center">
                <view>
					<view class="top"><x-icon type="qrcode" size="50"></x-icon>邀请好友获得佣金</view>
                    <view class="code-box">
                        <view class="code-img">
                            <view class="img-box">
								<image lazy-load :src="code?code:'../../static/code.png'" mode=""></image>
							</view>
							<image lazy-load class="center-bg" src="../../static/invite_code_bg.png" mode=""></image>
                        </view>
						<view class="code-btn">
							<button class="make" @click="shareFc" :disabled="disabled">制作精美海报</button>
							<button class="forward" @click="shareLink" :disabled="disabled">转发给微信好友</button>
						</view>
                    </view>
                </view>
            </view>
           <view class="bottom-bar">
			   <x-list-item title="推荐详情" @tap="openUrl('./invitelist')"></x-list-item>
			   <x-list-item title="活动规则" border="0" @tap="openUrl('./inviterule')"></x-list-item>
		   </view>
        <view class="hideCanvasView">
        	<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
        </view>
    </view>
</template>

<script>
    import {getSharePoster} from '@/common/lib/QS-SharePoster/QS-SharePoster.js';
    import { mapState } from 'vuex'
    import {formatPhone} from '@/common/utils'
    export default{
        data () {
            return {
                inviteList: [],
                code: '',
                id: '',
                poster: {
                    finalPath: ''
                },
                canvasId: 'default_PosterCanvasId',
                backgroundImage: 'https://xinxii-1302479696.cos.ap-guangzhou.myqcloud.com/qrcode_local/invite_code.png',
                promoteUrlImg: '',
				userLogo:'',
				disabled:false
            }
        },
        computed:mapState(['userinfo']),
        onLoad() {
			this.userLogo = this.userinfo.logo + '?imageMogr2/crop/300x300/gravity/center'
        },
        filters:{
            formatPhone
        },
        methods:{
            getCode(branchId){
                this.$api.get('distributor/relation/getBranchQRCode.do',{params:{branchId}}).then( res => {
                    if(res.success){
                        this.code = res.data.qrCodePath
                        this.promoteUrlImg = res.data.qrCodePath
                        // this.backgroundImage = ''
                        
                        this.id = res.data.disWithBranchId
                    }
                })
            },
            shareLink(){
                let url = `https://www.xinxiichina.com/broker/pages/my/register?disWithBranchId=${this.id}`
                this.copy(url)
                this.showToast('复制成功，立马分享给好友吧')
            },
            async shareFc() {
				this.disabled = true
            	try {
            		const d = await getSharePoster({
            			_this: this, //若在组件中使用 必传
            			type: 'testShareType',
            			backgroundImage: '/static/invite_share_bg.png',
            			posterCanvasId: this.canvasId,	//canvasId
            			delayTimeScale: 20, //延时系数
            			drawArray: ({
            				bgObj,
            				type,
            				bgScale
            			}) => {
            				const dx = bgObj.width * 0.3;
            				const fontSize = bgObj.width * 0.045;
            				const lineHeight = bgObj.height * 0.04;
            				return new Promise((rs, rj) => {
            					rs([{
            							type: 'image',
            							url: '/static/logo.png',
            							dx,
            							dy: bgObj.height - bgObj.width * 0.25,
            							infoCallBack(imageInfo) {
            								let scale = bgObj.width * 0.2 / imageInfo.height;
            								return {
            									dWidth: bgObj.width * 0.31,
            									dHeight: bgObj.width * 0.31,
            									dx: (bgObj.width - bgObj.width * 0.31) / 2 ,
            									dy: bgObj.height - bgObj.width + 54
            								}
            							}
            						}
            					]);
            				})
            			},
            			setCanvasWH: ({
            				bgObj,
            				type,
            				bgScale
            			}) => { // 为动态设置画布宽高的方法，
            				this.poster = bgObj;
            			}
            		});
            		this.poster.finalPath = d.poster.tempFilePath;
            		uni.navigateTo({
            			url: './sharecode?base64=' + encodeURIComponent(d.poster.tempFilePath)
            		});
					this.disabled = false
            	} catch (e) {
            		console.log(JSON.stringify(e));
					this.disabled = false
            	}
            },
        },
       
    }
</script>

<style lang="scss" scoped>
.hideCanvasView {position: relative;
    .hideCanvas { position: fixed; top: -99999upx; left: -99999upx; z-index: -99999; }
}
.content{position: absolute; width: 100%; min-height: 100%; padding-bottom: 140rpx;background-color: $xinxii-theme-color;
    .tab-list{display: flex; align-items: center;
        .tab-item{width: 50%; text-align: center; height: 88rpx; background-color: #fff; line-height: 88rpx; font-size: 32rpx;
            &.act{color: #FF5000; position: relative;
                &::after{content: ''; width: 162rpx; height: 4rpx; background-color: #ff5000; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);}
            }
        }
    }
    .center{width: 702rpx; margin: 24rpx auto 0; position: relative;background-color: #FFFFFF;border-radius: 12rpx;padding: 24rpx;
        // .center-bg{width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: 1;}
        >view{position: relative; z-index: 2; 
		.top{border-bottom: 2rpx solid #EBEDF0;padding-bottom: 24rpx;font-size: 36rpx;line-height: 50rpx;font-weight: 500;display: flex;align-items: center;
			image{width: 40rpx;height: 40rpx;margin-right: 16rpx;}
			.icon{margin-right: 16rpx;}
		}
            .btn-firm{width: 368rpx; height: 80rpx; line-height: 80rpx; text-align: center; background: #FF5000; color: #fff; font-size: 32rpx; border-radius: 44rpx; position: absolute; left: 50%; top: 356rpx;transform: translateX(-50%); z-index: 1000;}
            .tit{text-align: center; color: #fff; font-size: 28rpx; line-height: 34rpx; padding-top: 10rpx;}
            .code-box{text-align: center; margin-top: 46rpx;
                .head-box{ font-size: 0;
                    image{width: 80rpx; height: 80rpx; border-radius: 50%;}
                    .name{font-size: 32rpx; line-height: 44rpx; margin: 12rpx 0 24rpx;}
                }
                .code-img{font-size: 0; position: relative;margin: 0 auto 48rpx;width: 416rpx; height: 416rpx;padding: 8rpx;
                    .img-box{width: 400rpx; height: 400rpx;margin: 0 auto;position: relative;
						image{width: 100%;height: 100%;padding: 32rpx;background-color: #FFFFFF;z-index: 3;}
						
					}
					.center-bg{width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: 1;}
                }
                .tip{display: flex; align-items: center; justify-content: center; margin-top: 24rpx;
                    >view{display: flex; align-items: center; font-size: 28rpx; line-height: 34rpx;
                        image{width: 14rpx; height: 22rpx; margin-left: 6rpx;}
                        .name{color: #FF5000; margin-left: 8rpx;}
                    }
                }
            }
			.code-btn{
				button{width: 510rpx;height: 88rpx;border-radius: 44rpx;font-size: 32rpx;color: #FFFFFF;margin: 0 auto 24rpx;
					&.make{background: #EF4034;}
					&.forward{background: #3296FA;}
				}
			}
		}
    }
	.bottom-bar{background-color: rgba($color: #ffffff, $alpha: 0.39);margin: 24rpx;border-radius: 12rpx;
		/deep/.x-cont {
			.list-item{background-color: transparent;
				&.border{border-bottom: 2rpx solid rgba(235, 237, 240,0.39);}
				.title{color: #FFFFFF;}
				.icon{color: #FFFFFF !important;}
			}
		}
	}
}


</style>
