<template>
	<view class="content">
        <!-- #ifndef H5 -->
        <x-nav-bar :noBorder="true" :title="navBarText"></x-nav-bar>
        <!-- #endif -->
		<x-rich-text :html="html" class="rich-text"></x-rich-text>
		<view class="dashed-border" v-if="startLits.length > 0"></view>
		
        <view class="start-list">
			<view class="topbar" v-if="startLits.length > 0">
				<view class="title"><text>历任之星</text></view>
				<view class="all-btn" @click="openUrl('./startlist')"><text>查看全部</text></view>
			</view>
            <!-- <view class="item" :class="{act: index==1}" > -->
				<swiper class="start-swiper" circular display-multiple-items="1" loop @change="changeTab">
					<swiper-item v-for="(item, index) in startLits" :key="index" @click="getData(item.id)" >
						<view class="swiper-item">
							<image lazy-load :src="item.coverImage" mode="aspectFill"></image>
						</view>
					</swiper-item>
					<swiper-item v-for="(item, index) in startLits" :key="index" @click="getData(item.id)" >
						<view class="swiper-item">
							<image lazy-load :src="item.coverImage" mode="aspectFill"></image>
						</view>
					</swiper-item>
					<swiper-item v-for="(item, index) in startLits" :key="index" @click="getData(item.id)" >
						<view class="swiper-item">
							<image lazy-load :src="item.coverImage" mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
            <!-- </view> -->
        </view>
		<!-- #ifndef H5 -->
		<view class="seat" style="height: 88rpx;"></view>
		<view class="share-btn">
			<!-- #ifdef APP-PLUS -->
			<button @click="share">分享文章</button>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<button open-type="share">分享文章</button>
			<!-- #endif -->
		</view>
		<!-- #endif -->
        <b-share-wechat :url="url" :title="title" :articleId="id" :imageUrl="image" :summary="subTitle" typeNumber=0 :show="show" @click="show = false"></b-share-wechat>
		<!-- <x-modal title="您还未登录" content="立即去登录吗？" @sure="toLogin" ref="modal"></x-modal> -->
	</view>
</template>

<script>
	import constVal from '../../common/utils/constval.js'
    import { mapState } from 'vuex'
	export default {
        computed: mapState(['isLogin']),
		data() {
			return {
				navBarText:'今日之星',
				html:"",
				startLits:[],
                show: false,
                id: '',
                title:'',
				subTitle:'',
				image:'',
				url:''
			};
		},
		onLoad(option) {
			console.log(option)
            if(option){
                this.getData(option.id||"")
                this.id = option.id
            }
		},
		methods:{
			// toLogin(){
			// 	 this.openUrl('../my/login')
			// },
			share(){
    //             if(!this.isLogin){
				// this.$refs.modal.open()
    //                 // this.showModel('您还未登录','是否立即去登录？',()=>{
    //                 //     this.openUrl('./login')
    //                 // })
    //                 return
    //             }
				this.show = true
				this.url = constVal.UPLOAD_IMG_URL + 'broker/pages/home/start?id='+ this.id
				
			},
			onShareAppMessage() {
			    return {
			      title: '今日之星',
			      path: 'pages/home/start?id='+ this.id
			    }
			},
			handleTapShareButton(){
				if (!((typeof wx.canIUse === 'function') && wx.canIUse('button.open-type.share'))) {
					wx.showModal({
						title: '当前版本不支持转发按钮',
						content: '请升级至最新版本微信客户端',
						showCancel: false
					})
				}
			},
			getData(id){
                this.id = id
				this.$api.get('article/article/start.do?articleId='+id).then(res =>{
					if(res.success){
						this.html = res.data.content
						this.startLits = res.data.list
						this.title = res.data.title
						this.subTitle = res.data.subTitle
						this.image = res.data.image
						this.id = res.data.id
						uni.pageScrollTo({
						    scrollTop: 0,
						    duration: 0,
							selector:".content"
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.content{padding: 0;}
    .top-right{font-size: 0; display: flex; align-items: center; justify-content: center; width: 100%;
        image{width: 40rpx; height: 40rpx;}
    }
	.dashed-border{  color: #999;  border-top: 2rpx dashed; text-align: center; margin-top: 46rpx;margin-bottom: 48rpx;
        image{width: 298rpx; height: 68rpx;}
	}
	.start-list{padding-bottom: 48rpx;
		.topbar{
			display: flex;align-items: center;justify-content: space-between;padding: 0 24rpx 24rpx;
			.title{font-size: 36rpx;line-height: 50rpx;color: $xinxii-theme-color;font-weight: 600;}
			.all-btn{font-size: 28rpx;color: #999999;}
		}
        .item{ width: 702rpx; margin: 0 auto; border: 1px solid #333; border-radius: 4rpx; display: flex;
            &.act{flex-direction: row-reverse;}
            .left{ flex-shrink: 0; width: 262rpx; height: 248rpx;
                image{width: 100%; height: 100%;}
            }
            .right{padding: 24rpx; flex-grow: 1;
                .top{ display: flex; align-items: flex-end;
                    .title{ font-size: 32rpx; margin-right: 12rpx; @include text-line(1);}
                    .createDate{ font-size: 28rpx; color: #999; flex-shrink: 0;}
                }
                .introduction{ margin-top: 12rpx; font-size: 28rpx; color: #666; line-height: 34rpx; @include text-line(); }
            }
        }
		/deep/.start-swiper{height: 334rpx;
			.swiper-item{padding-left: 24rpx;height: 100%;
				image{width: 100%;height: 100%;border-radius: 6rpx;}
			}
			.uni-swiper-slide-frame{width: 652rpx !important;height: 334rpx !important;}
			
			/* #ifdef MP */
			swiper-item{width: 652rpx !important;height: 334rpx !important;}
			/* #endif */
		}
		
	}
	.more-box{ margin: 24rpx 0 30rpx; display: flex; align-items: center; justify-content: center; 
        .more{font-size: 28rpx;color: #666;margin-right: 16rpx;}
        .more-ioc{ width: 32rpx; height: 32rpx; }
    }
	.share-btn{position: fixed;width: 100%;left: 0;bottom: 0;
		button{width: 100%;height: 88rpx;background: #FFFFFF;font-size: 32rpx;line-height: 88rpx;color: $xinxii-theme-color;}
	}
</style>
