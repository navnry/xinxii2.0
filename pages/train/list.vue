<template>
  <view class="content">
  	<x-nav-bar :no-border="true" title="近期回顾"></x-nav-bar>
    <view class="list" v-if="previousList.length>0">
		<view class="item" v-for="(item,index) in previousList" :key="index">
			<view v-if="item.articleList && item.articleList.length > 0">
				<view class="time">{{item.dailyFocus.createDate}}</view>
				<view class="one-day">
					<view v-for="(article,index) in item.articleList" :key="article.id" @click="toDetail(article)">
						<view :class="index == 0 ? '':'group'">
							<view class="img-box" v-if="index==0">
								<image lazy-load :src="article.pic" mode="aspectFill"></image>
								<view class="img-mask"></view>
								<view class="txt-box">
									<view class="tit">{{article.title}}</view>
								</view>
							</view>
							<view v-if="index > 0" :class="index%2 == 1 ? 'one' : 'two'">
								<view class="left">焦点</view>
								<view class="txt">{{article.title}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
    </view>
    <view class="tip">
        <view>
            <view class="line"></view>
            <text>仅展示近七期内容</text>
            <view class="line"></view>
        </view>
    </view>
  </view>
</template>

<script>
export default {
    data() {
        return {
            previousList:[]
        }
    },
    onLoad(options) {
		try{
			 let previousList = uni.getStorageSync('previousList')
			 if(previousList){
			 	 this.previousList = previousList
			 }
		} catch{
			
		}
        this.getPreviousList({setStorage:true,name:'previousList'})
    },
    methods: {
       getPreviousList(setStorage){
		   this.$api.get('/daily/focus/getFocusSeven.do',{setStorage}).then( res => {
			console.log(res.data)
		   	if(res.success){
		   		this.previousList=res.data
		   	}
		   })
		},
		toDetail(item){
		    if(item.type == 'out'){
		        this.openUrl('../my/webview?url=' + encodeURIComponent(item.url))
		    }else if(item.type == 'local'){
		        this.openUrl('./detail?id='+item.id)
		    }
		},
    }
}
</script>

<style lang="scss" scoped>
    .content{padding: 0 24rpx;}
    .list{
        .item{
            .time{margin: 24rpx auto; width: 264rpx; height: 44rpx; line-height: 44rpx; text-align: center; background-color: #ddd; font-size: 24rpx; color: #999; border-radius: 22rpx;}
            .one-day{background: #fff; border-radius: 12rpx; padding: 24rpx;
                .img-box{width: 654rpx; height: 320rpx; border-radius: 8rpx; position: relative; margin: 24rpx 0 18rpx;
                    image{width: 100%; height: 100%; border-radius: 8rpx;}
                    .img-mask{width: 100%; height: 100%; position: absolute; left: 0; top: 0; border-radius: 12rpx; background: #000; opacity: .3; z-index: 10;}
                    .txt-box{position: absolute; width: 100%; left: 0; bottom: 24rpx; z-index: 12; padding: 0 24rpx; color: #fff;
                        .tit{@include text-line(); font-size: 32rpx; font-weight: bold; line-height: 44rpx;}
                        .txt{font-size: 24rpx; padding: 12rpx 0 20rpx;}
						
                    }
                }
                .group{
                    >view{display: flex; align-items: center; height: 78rpx; padding: 0 24rpx 0 30rpx; font-size: 28rpx;
                        .left{width: 60rpx; height: 38rpx; border: 2rpx solid #FF5000; color: #FF5000; font-size: 24rpx; text-align: center; line-height: 34rpx; margin-right: 18rpx; flex-shrink: 0; border-radius: 4rpx;}
                        .txt{@include text-line(1);}
                    }
                    .one{background: #F6F7FF; color: #247CF0; font-weight: bold; border-radius: 8rpx 8rpx 0 0;}
                    .two{background: #FEF8F2; color: #FF5500; font-weight: bold; border-radius: 0 0 8rpx 8rpx;}
                }
            }
        }
    }
	.tip{display: flex; justify-content: center; color: #ff5000; font-size: 32rpx; padding: 88rpx 0 48rpx;
        >view{display: flex; align-items: center;
            text{margin: 0 18rpx;}
            .line{height: 4rpx; width: 92rpx; border-radius: 2rpx; background: #ff5000;}
        }
    }
</style>
