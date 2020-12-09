<template>
	<view class="starProduct">
		<x-nav-bar :no-border="true" title="明星产品专区"></x-nav-bar>
		<view class="proInfobox">
			<image lazy-load class="image_top" src="@/static/starProject/start_pro_bj.png" alt="">
			<view class="pro-box">
				<!-- 明星产品 -->
				<view class="starPro" v-if="starProductList.length>0">
                    <view class="tit-box">
                        <view class="top">
                            <view class="line"></view>
                            <view class="tit" @click="goNewAgent">明星产品</view>
                            <view class="line"></view>
                        </view>
                        
                        <view class="tip">集合全网热门产品 网红医疗险</view>
                    </view>
					<view class="item" v-for="item in starProductList" :key="item.id" @click="toDetail(item.id)">
						<image lazy-load class="imgbox" :src="item.picture" mode="aspectFill">
						<view class="rightbox">
							<view class="title">{{item.name}}</view>
							<view class="recommend">
								<view class="text">推荐指数：</view>
								<image lazy-load class="image_index" src="@/static/starProject/exponent.png" alt="">
							</view>
							<ul>
								<li v-for="(i,v) in item.starTags.split(',')" :key="v">{{i}}</li>
							</ul>
							<view class="textContent">{{item.starDetail}}</view>
						</view>
					</view>
					
					
				</view>
				<!-- 高佣专区 -->
				<view class="highCommission">
                    <view class="tit-box">
                        <view class="top">
                            <view class="line"></view>
                            <view class="tit">推广专区</view>
                            <view class="line"></view>
                        </view>
                        <view class="tip">认证即享最高28%推广费</view>
                    </view>
					<view class="item" v-for="item in promotionList" :key="item.id" @click="toDetail(item.id)">
						<image lazy-load class="imgbox" :src="item.picture" mode="aspectFill">
						<view class="rightbox">
							<view class="title">{{item.name}}</view>
							<view class="recommend">
								<view class="text2">推广费比例：</view>
								<view class="text2">{{item.promotionFee}}</view>
							</view>
							<view class="textContent">{{item.starDetail}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
                promotionList: [],
                starProductList: []
            }
		},
        onLoad() {
           this.getList() 
        },
		methods:{
			goNewAgent () {
				this.openUrl('/pages/thenewagent/index')
			},
            getList(){
                this.$api.get('pdc/product/getStarProductByArea.do').then( res => {
                    if(res.success){
                        this.starProductList = res.data.starProductList
                        this.promotionList = res.data.promotionList
                    }
                })
            },
            toDetail(id){
                this.openUrl('../product/detail?id='+id)
            }
		}
	}
</script>

<style lang="scss" scoped>
	.starProduct{font-size: 0;
		.proInfobox{ display: flex; flex-direction: column;background-color: #DC1716;
			.image_top{width: 100%;height: 1042rpx;}
			.pro-box{width: 100%; background-color: #DC1716; padding: 0 24rpx;
                .starPro{margin-top: -360rpx;}
				.starPro,.highCommission{padding-top: 72rpx; position: relative;
                    .tit-box{color: #FFFFFF; text-align: center;
                        .top{display: flex; justify-content: center; align-items: center; margin-bottom: 18rpx;
                            .line{width: 100rpx; height: 4rpx; border-radius: 2rpx; background: #fff;}
                            .tit{margin: 0 24rpx; font-size: 32rpx; font-weight: bold; letter-spacing: 1px;}
                        }
                        .tip{ font-size: 28rpx; margin-bottom: 24rpx;}
                    }
					.item{width: 100%;height: 264rpx;background-repeat: no-repeat;background-size: 100% 100%;background-image: url('@/static/starProject/proInfo_bj.png'); display: flex; align-items: center; padding: 24rpx 34rpx 24rpx 48rpx; margin-bottom: 18rpx;
						.imgbox{width: 216rpx; height: 216rpx; flex-shrink: 0;}
						.rightbox{margin-left: 24rpx; flex-grow: 1;
							.title{font-size: 32rpx; font-weight: bold; @include text-line(1);}
							.recommend{display: flex;align-items: center;margin-top: 6rpx;margin-bottom: 12rpx;
								.image_index{width: 114rpx;height: 18rpx;}
								.text{font-size: 20rpx; font-weight: bold;color: #FF5000;}
								.text2{font-size: 24rpx; font-weight: bold;color: #FF5000;}
							}
							ul{list-style: none; padding-left: 0; overflow: hidden;word-break: break-all;-webkit-line-clamp: 1;display: -webkit-box;
								li{padding: 0 12rpx;font-size: 20rpx;background-color: #FCBE5A;color: #FFFFFF; font-weight: bold; margin-right: 12rpx;}
							}
							.textContent{margin-top: 18rpx;font-size: 28rpx; color: #999999; @include text-line();}
						}
					}
				}
				.highCommission{padding-bottom: 78rpx;
					.item{
                        .rightbox{
                            .title{@include text-line();}
                        }
                    }
                    
				}
			}
		}
	}
</style>
