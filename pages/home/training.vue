<template>
    <view class="content">
        <x-nav-bar :no-border="true" title="加入新禧"></x-nav-bar> 
        <view class="img">
            <image lazy-load class="one" src="../../join_page/static/home_training_bg_01.jpg" mode=""></image>
            <view class="banner-box">
                <view class="banner1">
                	<swiper class="home-swiper"  indicator-dots="true" :autoplay="true" indicator-active-color="#2e098a" indicator-color="#fff">
                		<swiper-item v-for="(item,index) in topBannerList" :key="index">
                			<view class="swiper-item"><image lazy-load :src="item.pic" mode="aspectFill"></image></view>
                		</swiper-item>
                	</swiper>
                </view>
            </view>
            <image lazy-load src="../../join_page/static/home_training_bg_02.jpg" mode=""></image>
            <view class="banner2">
            	<swiper class="home-swiper"  indicator-dots="true" :autoplay="true" indicator-active-color="#2e098a" indicator-color="#fff">
            		<swiper-item v-for="(item,index) in bannerList" :key="index">
            			<view class="swiper-item"><image lazy-load :src="item.pic" mode="aspectFill"></image></view>
            		</swiper-item>
            	</swiper>
            </view>
            <image lazy-load src="../../join_page/static/home_training_bg_03.jpg" mode=""></image>
            <view class="btn" @click="join">加入新禧</view>
        </view>
		<x-modal title="您还未登录" content="立即去登录吗？" @sure="toLogin" ref="modal"></x-modal>
    </view>
</template>

<script>
    import { mapState } from 'vuex'
    import {updateUserinfo} from '@/common/api'
    export default {
        computed: mapState(['userinfo','isLogin']),
        data () {
            return {
                topBannerList: [
                    {pic: require('../../join_page/static/home_training_item2_01.png')},
                    {pic: require('../../join_page/static/home_training_item2_02.png')},
                    {pic: require('../../join_page/static/home_training_item2_03.png')}
                ],
                bannerList: [
                    {pic: require('../../join_page/static/home_training_item1_01.jpg')},
                    {pic: require('../../join_page/static/home_training_item1_02.jpg')},
                    {pic: require('../../join_page/static/home_training_item1_03.jpg')},
                    {pic: require('../../join_page/static/home_training_item1_04.jpg')},
                    {pic: require('../../join_page/static/home_training_item1_05.jpg')},
                    {pic: require('../../join_page/static/home_training_item1_06.jpg')}
                ]
            }
        },
        onShow() {
            if(this.isLogin){
                updateUserinfo(this)
            }
        },
		onLoad() {

		},
        methods: {
			toLogin(){
				 this.openUrl('../my/login')
			},
			join(){
               var _this=this
               if(!this.isLogin){
               	this.$refs.modal.open()
                   return
               }
               if(!this.userinfo.reviewResultCode.code){
                   // this.openUrl('../join/audit?code='+this.userinfo.reviewResultCode.code+'&reason='+this.userinfo.reviewResultCode.reason)
               	this.openUrl('../join/index')
               }else{
                   // this.openUrl('../join/identity')
               	this.$api.get('member/qualification/qualificationMessage.do').then( res => {
               		// console.log(res.data)
               		let qualificationMessage = res.data
               	    if(res.success){
               			uni.getStorage({
               			    key: 'qualificationMessage',
               			    success: function (res) {
               			       if(res.data == 'true' && qualificationMessage){
               					   _this.openUrl('../join/certificate?&qualificationMessage=' + encodeURIComponent(JSON.stringify(qualificationMessage)))
               				   }else{
               					   _this.openUrl('../join/audit?code='+_this.userinfo.reviewResultCode.code+'&reason='+_this.userinfo.reviewResultCode.reason + '&qualificationMessage=' + encodeURIComponent(JSON.stringify(qualificationMessage)))
               				   }
               			    },
               				fail(){
               					  _this.openUrl('../join/audit?code='+_this.userinfo.reviewResultCode.code+'&reason='+_this.userinfo.reviewResultCode.reason + '&qualificationMessage=' + encodeURIComponent(JSON.stringify(qualificationMessage)))
               				}
               			});
               			
               	    }
               	})
               }
			}
        }
    }
</script>

<style lang="scss" scoped>
.img{width: 100%; font-size: 0;
    image{width: 100%;}
    .one{height: 834rpx;}
    .two{height: 451rpx;}
    .three{height: 492rpx;}
    .banner-box{ background: #2e098a;
        .banner1{height: 379rpx; width: 590rpx; margin: 0 auto;
            .home-swiper{height: 100%;
                .swiper-item{height: 100%;
                    image{height: 100%;}
                }
            }
        }
    }
    .banner2{height: 1000rpx; width: 100%;
        .home-swiper{height: 100%;
            .swiper-item{height: 100%;
                image{height: 100%;}
            }
        }
    }
    .btn{width: 630rpx; height: 88rpx; line-height: 88rpx; text-align: center; background: #F2CA84; border-radius: 4rpx; left: 60rpx; font-size: 32rpx; color: #fff; position: fixed; bottom: 40rpx;}
}
</style>
