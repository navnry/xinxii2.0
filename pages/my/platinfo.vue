<template>
    <view class="content">
        <x-nav-bar :no-border="true" title=""  noBlank="true" :color="topColor" :backgroundColor="toBgColor"></x-nav-bar>
		<view class="top-bg">
			<image src="@/static/platinfo/platinfo_bg.png" mode=""></image>
		</view>
        <view class="tip">禧小保是新禧保险经纪有限公司在互联网保险业务活动中为保险经纪人和保险机构提供网络技术支持辅助服务的自营网络平台。互联网保险业务的销售、承保、理赔、退保、投诉处理及客户服务等保险经营行为，由合作保险机构及新禧保险经纪有限公司共同管理和负责。</view>
		<view class="group">
		    <view class="tit">
		        <view class="txt">授权合作</view>
		    </view>
		    <view class="list">
		        <image lazy-load src="@/static/platinfo/platinfo_zgpa.png" mode=""></image>
		        <image lazy-load src="@/static/platinfo/platinfo_zgrs.png" mode=""></image>
		        <image lazy-load src="@/static/platinfo/platinfo_jdal.png" mode=""></image>
		        <image lazy-load src="@/static/platinfo/platinfo_habx.png" mode=""></image>
		        <image lazy-load src="@/static/platinfo/platinfo_asbx.png" mode=""></image>
		        <image lazy-load src="@/static/platinfo/platinfo_ygbx.png" mode=""></image>
		    </view>
		</view>
       <view class="group">
           <view class="tit">
               <view class="txt">营业执照</view>
           </view>
           <image lazy-load class="yyzz-img" @click="seeImg('../../static/platinfo/platinfo_yyzz.png')" src="@/static/platinfo/platinfo_yyzz.png" mode=""></image>
       </view>
       <view class="group">
           <view class="tit">
               <view class="txt">经营保险经纪业务许可证</view>
           </view>
           <image lazy-load class="ywxkz-img" @click="seeImg('../../static/platinfo/platinfo_ywxkz.png')" src="@/static/platinfo/platinfo_ywxkz.png" mode=""></image>
       </view>
      
       <view class="text">ICP备案信息：赣ICP备20009964号</view>
    </view>
</template>

<script>
    import { bigImg } from '../../common/api'
    export default{
        data () {
            return {
                toBgColor:'transparent',
				topColor: '#fff',
            }
        },
        methods:{
            seeImg(url){
                bigImg([url])
            },
			onPageScroll(res) {
			    if(res.scrollTop > 150){
			        this.toBgColor = 'rgba(255, 255, 255, 1)'
			        this.topColor = '#333333'
			    } else {
			        let alpha = res.scrollTop / 150
			        this.topColor = 'rgba(255, 255, 255, 1)'
			        this.toBgColor = 'rgba(255, 255, 255, ' + alpha + ')'
			    }
			},
        }
    }
</script>

<style lang="scss" scoped>
.content{ background: #fff;
	.top-bg{
		image{display: block;width: 100%;height: 560rpx;}
	}
    .tip{font-size: 24rpx; line-height: 36rpx; border-bottom: 2rpx dashed #EBEDF0; margin:  24rpx 24rpx 0;padding-bottom: 24rpx;}
    .group{padding-top: 48rpx; font-size: 0;
        .tit{display: flex; align-items: center; margin-bottom: 24rpx;padding: 0 24rpx;
            .yyzz-tit-img{width: 36rpx; height: 32rpx;}
            .ywxkz-tit-img{width: 34rpx; height: 32rpx;}
            .yyzz-tit-img{width: 34rpx; height: 30rpx;}
            .txt{font-size: 36rpx;font-weight: 600;line-height: 50rpx;color: $xinxii-theme-color;}
        }
        .yyzz-img,.ywxkz-img{width: 100%; height: 510rpx;padding:0 24rpx;}
        .list{display: flex; flex-wrap: wrap; margin: 0 24rpx;
            image{width: 144rpx; height: 102rpx; margin: 24rpx 42rpx 0 0;
                &:nth-of-type(4n){margin-right: 0;}
				&:nth-of-type(-n + 4){margin-top: 0;}
            }
        }
    }
    .text{font-size: 24rpx; line-height: 34rpx; padding: 24rpx 0 48rpx; text-align: center;margin: 46rpx 24rpx 0 24rpx;border-top: 2rpx dashed #EBEDF0;}
}
</style>
