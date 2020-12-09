<template>
    <view class="content">
        <x-nav-bar :customClickleft="isMy" @clickLeft="backPage" :no-border="true" :title="title"></x-nav-bar>
        <template v-if="code == '1'">
            <view class="status-box">
                <image lazy-load src="@/static/join/join_audit_ing.png" mode=""></image>
                <view class="status">提交成功</view>
            </view>
            <view class="tip">您的申请已提交<br>我们将在3个工作日内进行初审</view>
            <view class="banner">
                <image lazy-load src="@/static/join/join_audit_banner01.png" mode=""></image>
            </view>
        </template>
        <template v-else-if="code == '3'">
            <view class="status-box">
                <image lazy-load src="@/static/join/join_audit_win.png" mode=""></image>
                <view class="status">初审成功</view>
            </view>
            <view class="tip">恭喜您初审成功恭喜您，已通过初审，我<br>们将在10个工作日内进行终审。</view>
            <view class="banner banner4">
                <image lazy-load src="@/static/join/join_audit_banner04.png" mode=""></image>
            </view>
        </template>
        <template v-else-if="code == '2' || code =='4'">
            <view class="status-box">
                <image lazy-load src="@/static/join/join_audit_lose.png" mode=""></image>
                <view class="status">很抱歉，您未通过审核</view>
            </view>
            <view class="tip">{{reason}}</view>
            <view class="banner banner1">
                <image lazy-load src="@/static/join/join_audit_banner02.png" mode=""></image>
            </view>
            <button class="btn" @click="openUrl('../join/identity')">重新提交</button>
        </template>
        <template v-else>
            <view class="status-box">
                <image lazy-load src="@/static/join/join_audit_win.png" mode=""></image>
                <view class="status">审核成功</view>
            </view>
            <view class="tip">恭喜您成为新禧签约经纪人<br>更多福利等你来拿</view>
            <view class="banner banner2">
                <image lazy-load src="@/static/join/join_audit_banner03.png" mode=""></image>
            </view>
            <button class="btn"  @click="toCertificate">查看执业资质证</button>
            <!-- <button class="btn" @click="openUrl('../join/certificate?qualificationMessage='+ qualificationMessage)">查看执业资质证</button> -->
        </template>
    </view>
</template>

<script>
    export default{
        data () {
            return {
               title: '人工审核',
			   reason:'',
			   code:'',
               isMy: true,
			   qualificationMessage:''
            }
        },
		onLoad(option) {
            if(option){
                this.code = option.code
                this.isMy = option.type == 1 ? true : false
				this.qualificationMessage = option.qualificationMessage
            }
			this.reason = option.reason
			
			
		},
        methods:{
            backPage(){
                if(this.isMy){
                    this.openUrl('../my/index',2)
                }
            },
			toCertificate(){
				this.openUrl('../join/certificate?qualificationMessage='+ encodeURIComponent(this.qualificationMessage))
				try{
					uni.setStorage({
					    key: 'qualificationMessage',
					    data: 'true',
					    success: function () {
					        console.log('success');
					    }
					});
					
				} catch (e){
					
				}
			}
        }
    }
</script>

<style lang="scss" scoped>
    .status-box{font-size: 0; text-align: center; margin-top: 96rpx;
        image{width: 84rpx; height: 84rpx;}
        .status{font-size: 32rpx; font-weight: bold; line-height: 44rpx; margin: 24rpx 0 48rpx;}
    }
    .tip{text-align: center; font-size: 32rpx; line-height: 48rpx; color: #999;
        >text{color: $xinxii-theme-color;}
    }
    .banner{font-size: 0; margin-top: 48rpx; text-align: center;
        image{width: 702rpx; height: 212rpx;}
    }
    .banner1{
        image{width: 216rpx; height: 272rpx;}
    }
    .banner2{
        image{width: 290rpx; height: 272rpx;}
    }
    .banner4{
        image{width: 270rpx; height: 272rpx;}
    }
    .btn{ border-radius: 8rpx; width: 702rpx; height: 88rpx; line-height: 88rpx; font-size: 32rpx; color: #fff; font-weight: bold; background-color: $xinxii-theme-color; margin: 96rpx auto 0;}
</style>
