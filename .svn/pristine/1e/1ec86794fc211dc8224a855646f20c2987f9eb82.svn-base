<template>
    <view class="content">
        <x-nav-bar :no-border="true" title="加入我们"></x-nav-bar>
		<view class="join_bg">
			<text class="text_1">大展宏图 实现美好未来</text>
			<text class="text_2">获客神器 助力签单</text>
			<image src="static/join/home_join_bg.png" mode=""></image>
		</view>
<!--        <view class="top">
            <image lazy-load src="@/static/join/join_top_banner.png" mode=""></image>
        </view> -->
<!--        <view class="tit">
            <view class="line"></view>
            <view class="txt">加入新禧优势</view>
            <view class="line"></view>
        </view> -->
<!--        <view class="list">
            <view class="item" v-for="(item,index) in list" :key="index">
                <image lazy-load :src="item.image" mode=""></image>
                <view class="txt" :class="{act:index==1||index==4}">{{item.name}}</view>
            </view>
        </view> -->
        <view class="bottom">
			<!-- <button class="btn" @click="openUrl('./identity')">马上去赚钱</button> -->
			<button class="btn" @click="toJoin">马上去赚钱</button>
			<label @click="isChecked = !isChecked">
				<radio style="transform:scale(0.7);" color="#FF5000" :checked="isChecked" ></radio>
				<view class="text"><text>我已阅读并签署巴卡巴卡</text></view>
			</label>
		</view>
    </view>
</template>

<script>
    export default{
        data () {
            return {
				isChecked:false,
                list: [
                    {image: require('@/static/join/join_list_01.png'), name: '掌中移动便携展业工具'},
                    {image: require('@/static/join/join_list_02.png'), name: '海量热门产品 收益享不停'},
                    {image: require('@/static/join/join_list_03.png'), name: '获客神器 助力签单'},
                    {image: require('@/static/join/join_list_04.png'), name: '热门朋友圈 一键转发'},
                    {image: require('@/static/join/join_list_05.png'), name: '认证审核通过 即获权威执业证书'},
                    {image: require('@/static/join/join_list_06.png'), name: '资深讲师打造全培训系统'},
                    {image: require('@/static/join/join_list_07.png'), name: '多年金融背景 保险精英团队'}
                ]
            }
        },
		onLoad() {
		},
		onShow() {
			this.isChecked = false
		},
        methods:{
			toJoin(){
				if(!this.isChecked){
					this.showToast('请阅读巴卡巴卡，并勾选已阅读')
					return
				}
				this.openUrl('./identity')
			}
        }
    }
</script>

<style lang="scss" scoped>
	page{background-color: $xinxii-theme-color;}
    .content{padding-bottom: 24rpx;}
    .top{font-size: 0; width: 702rpx; height: 280rpx; margin: 24rpx auto;
        image{width: 100%; height: 100%;}
    }
    .tit{ margin: 24rpx 0; display: flex; align-items: center; justify-content: center; padding-top: 24rpx;
        .line{width: 154rpx; height: 4rpx; background-color: #FF5000;}
        .txt{font-size: 28rpx; color: #FF5000; margin: 0 24rpx;}
    }
    .list{width: 702rpx; border-radius: 12rpx; margin: 0 auto; background: #fff; padding: 24rpx 48rpx;
        .item{display: flex; align-items: center; font-size: 0; padding: 24rpx 0;
            image{width: 48rpx; height: 48rpx; margin-right: 24rpx;}
            .txt{font-size: 32rpx;
                &.act{font-weight: bold;}
            }
        }
    }
	.join_bg{width: 100%;height: 1158rpx;position: relative;
		text{position: absolute;color: #FFFFFF;transform: rotate(-5deg);z-index: 1;}
		.text_1{left: 196rpx;top: 284rpx;font-size: 28rpx;line-height: 40rpx;}
		.text_2{left: 74rpx;top: 360rpx;font-size: 64rpx;line-height: 90rpx;}
		image{width: 100%;height: 100%;}
	}
	.bottom{position: fixed;width: 100%;left: 0;bottom: 40rpx;
		label{display: flex;align-items: center;justify-content: center;height: 32rpx;}
		checkbox{width: 32rpx;height: 32rpx;border: 2rpx solid #FFFFFF;border-radius: 50%;margin-right: 16rpx;font-size: 0;}
		.text{font-size: 24rpx;color: #FFFFFF;}
	}
    .btn{width: 520rpx;height: 100rpx;background: #212121;border-radius: 50rpx;font-size: 32rpx;color: #FFFFFF;line-height: 100rpx;margin: 0 auto 50rpx;}
</style>
