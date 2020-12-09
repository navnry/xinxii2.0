<template>
    <view class="content">
        <x-nav-bar :no-border="true" title="精英训练营"></x-nav-bar>
        <view class="img-box">
            <image lazy-load src="@/static/join/home_join_bg.jpg" mode=""></image>
            <view class="btn"  @click="join">加入新禧</view>
        </view>
        <x-modal title="您还未登录" content="立即去登录吗？" @sure="toLogin" ref="modal"></x-modal>
    </view>
</template>

<script>
    import {updateUserinfo} from '@/common/api'
    import { mapState } from 'vuex'
    export default {
        computed: mapState(['userinfo','isLogin']),
        data(){
            return{
                
            }
        },
        onShow() {
            if(this.isLogin){
                updateUserinfo(this)
            }
        },
        methods:{
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
							       if(res.data == 'true'){
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
    .img-box{font-size: 0; margin-top: -70rpx;
        image{width: 750rpx; height: 4358rpx;}
        .btn{width: 630rpx; height: 88rpx; line-height: 88rpx; text-align: center; background: #fff; border-radius: 4rpx; left: 60rpx; font-size: 32rpx; color: $xinxii-theme-color; position: fixed; bottom: 40rpx;}
    }
</style>
