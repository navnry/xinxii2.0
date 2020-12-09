<template>
	<view class="content">
        <x-nav-bar :no-border="true" title="产品告知书"></x-nav-bar>
        <view class="img-box">
            <image lazy-load src="@/static/product/product_notify_bg_01.jpeg" mode="widthFix"></image>
            <image lazy-load src="@/static/product/product_notify_bg_02.jpeg" mode="widthFix"></image>
        </view>
        <view class="footer">
            <view class="sure" @click="isChecked = !isChecked">
                <radio style="transform:scale(0.7);" color="#FF5000" :checked="isChecked" ></radio>
                <view>我已阅读产品告知书</view>
            </view>
            <view class="btn" @click="topay">立即投保</view>
        </view>
		<x-modal :closeBtn="true" title="您即将进入投保流程页面" content="请仔细阅读并确认保险条款及产品描述。为了保障您的合法权益，按照合规要求，您的投保过程将会被记录，请知悉。" :cancelShow="cancelShow" @sure = "insure" ref="modal"><view class="tip">本产品由{{name}}承保</view></x-modal>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
	    computed: mapState(['isLogin','userinfo']),
		data(){
			return {
                isChecked: false,
                url: '',
                type: '',
                name: '',
                linkType: '',
                cancelShow: false
			}
		},
        onLoad(option) {
           console.log(option);
           if(option){
               let data = JSON.parse(decodeURIComponent(option.data))
               this.url = data.url
               this.type = data.type
               this.linkType = data.linkType
               this.name = data.name
           }
        },
		methods:{
			insure(){
                if(this.type==1 && this.isLogin && this.userinfo.reviewResultCode.code == 5){ // H5
                    if(this.linkType == 2){
                        this.url = this.url.replace('123', this.userinfo.jobNumber)
                    }
                }
                this.openUrl(this.url, ' ',1)
                // uni.redirectTo({
                //     url: '/pages/my/webview?url=' + this.url
                // })
			},
            topay(){
                if(!this.isChecked){
                    this.showToast('请阅读产品告知书，并点击已阅读')
                    return
                }
                this.$refs.modal.open()
            }
		}
	}
</script>

<style lang="scss" scoped>
    .content{padding-bottom: 232rpx;}
    .img-box{font-size: 0;
        image{width: 100%; heihgt: auto;}
    }
    .footer{background: #fff; position: fixed; left: 0; bottom: 0; width: 100%; height: 232rpx;}
    .sure{font-size: 28rpx; padding: 0 24rpx; color: #999; display: flex; align-items: center; margin: 24rpx 0; position: fixed; bottom: 136rpx;}
    .btn{width: 702rpx; height: 88rpx; line-height: 88rpx; border-radius: 8rpx; color: #fff; background-color: $xinxii-theme-color; font-size: 32rpx; text-align: center; position: fixed; bottom: 48rpx; left: 24rpx;}
</style>
