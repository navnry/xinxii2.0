<template>
    <view class="content">
        <x-nav-bar :noBorder="true" title="个人信息"></x-nav-bar>
        <view class="list one">
            <view class="head-img" @click="chooseImage">
                <view class="left">
                    <view>头像</view>
                    <view class="tip">请上传证件照或职业照</view>
                </view>
                <view class="right">
                    <image lazy-load :src="avatar" mode="aspectFill"></image>
                </view>
            </view>
            <x-list-item title="昵称" :msg="userinfo.realname" @click="openUrl('./editusername')"></x-list-item>
            <x-list-item title="性别" :msg="userinfo.sex == 1 ? '男' : '女'" @click="editSex"></x-list-item>
            <x-list-item border="0" title="所属公司" :msg="!userinfo.company ? '无' : userinfo.company" :arrow="0"></x-list-item>
        </view>
        <view class="list">
            <x-list-item title="手机号" :msg="userinfo.mobile|formatPhone" :fontColor="!userinfo.mobile ? '#1077FF' : ''" @click="openUrl('./editphone')"></x-list-item>
            <x-list-item border="0" title="推广资格证" :msg="reviewValue" fontColor="#1077FF" @click="toReview()"></x-list-item>
        </view>
        <view class="list">
            <!-- <x-list-item title="支付密码" msg="设置" fontColor="#FF5000" @click="openUrl('./editdealpwd')"></x-list-item> -->
            <x-list-item title="登录密码" msg="重置" fontColor="#1077FF" @click="openUrl('./editpwd?type=2')"></x-list-item>
            <x-list-item title="微信" border="0" :msg="isBind==1?'解绑':'绑定'" fontColor="#1077FF" @click="wechat"></x-list-item>
           <!-- <x-list-item title="邮箱" :msg="!userinfo.email ? '未绑定' : userinfo.email" :fontColor="!userinfo.email ? '#FF5000' : ''" @click="openUrl('./bindmail')"></x-list-item> -->
        </view>
        <x-level-picker ref="picker"
            v-model="value"
            mode="selector"
            cancel-text="取消"
            confirm-text="确定"
            cancel-color="#999"
            confirm-color="#1077FF"
            :list="list"
            @confirm="handleConfirm"
        ></x-level-picker>
		<x-modal ref="modal" content="确定要解绑微信吗?" @sure="sure"></x-modal>
    </view>
</template>

<script>
    import {updateUserinfo} from '@/common/api'
    import {formatPhone, uploadImage} from '@/common/utils'
    import constVal from '../../common/utils/constval.js'
    import {mapState} from 'vuex'
    export default{
        data () {
            return {
                loadBusy: false,
                list:['女','男'],
                value:'',
                avatar: '',
				phoneMsg: '',
				reviewValue:'未认证',
				reviewCode:'',
				reason:'',
                isBind: 0 // 是否微信绑定
            }
        },
        filters:{formatPhone},
        computed: mapState(['userinfo']),
        onLoad() {
            this.avatar = this.userinfo.logo
            let arr = this.userinfo.thirdPartyUserList
            for (let val of arr) {
                if(val.type == 0 || val.type == 3){
                    this.isBind = 1
                }
            }
			this.reviewResult()
        },
        methods:{
            chooseImage(){
                let url = constVal.UPLOAD_IMG_URL+'mobile/file/img/upload2.do',
					count = 1
                uploadImage(url,'LOGO',count,this.userinfo.token,(res)=>{
                    this.avatar = res.data.path
                    this.updateAvatar(res.data.path)
                })
            },
            updateAvatar(url){
                this.$api.post('member/member/resetAvata.do',{logo:url}).then( res => {
                    if(res.success){
                        updateUserinfo(this)
                    }
                })
            },
			sure(){
				this.$api.post('member/member/unbindThirdPartyInfo.do',{type:3}).then( res => {
				    if(res.success){
				        this.showToast('解绑成功')
				        updateUserinfo(this)
                        this.isBind = 0
				    }
				})
			},
            wechat(){
                if(this.isBind == 1){ // 解绑
					this.$refs.modal.open()
                }else{ // 绑定
                    this.bindWechat()
                }
            },
            bindWechat(){
                uni.getProvider({
                    service: 'oauth',
                    success: (res) => {
                        console.log(res.provider);
                        //支持微信、qq和微博等
                        if (~res.provider.indexOf('weixin')) {
                            uni.login({
                                provider: 'weixin',
                                success: (loginRes) => {
                                    console.log('-------获取openid(unionid)-----');
                                    console.log(JSON.stringify(loginRes));
                                    // 获取用户信息
                                    uni.getUserInfo({
                                        provider: 'weixin',
                                        success: (infoRes) => {
                                        console.log('-------获取微信用户所有-----');
                                        console.log(JSON.stringify(infoRes.userInfo));
                                            let data = {
                                                openId : infoRes.userInfo.openId,
                                                unionId : infoRes.userInfo.unionId,
                                                logo : infoRes.userInfo.avatarUrl,
                                                realname : infoRes.userInfo.nickName,
                                                type: 0
                                            }
                                            this.$api.post('member/login/bindThird.do', data).then((resUser) => {
                                                console.log(resUser);
                                                if(resUser.success == 1){
                                                    this.showToast('绑定成功')
                                                    updateUserinfo(this)
                                                    this.isBind = 1
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            },
            editSex(){
                this.$refs.picker.show()
            },
            handleConfirm(item){
                let sex = 0
                if(item.index == 1) sex = 1
                this.$api.post('member/member/fillInfo.do',{sex}).then( res => {
                    if(res.success){
                        this.showToast('修改成功')
                        updateUserinfo(this)
                    }
                })
            },
			reviewResult(){
				this.$api.post('member/qualification/reviewResult.do').then( res => {
					console.log(res.data)
				    if(res.success && res.data!=null){
						// this.reviewValue = res.data.description
						this.reviewCode = res.data.code
						this.reason = res.data.reason
						switch (res.data.code) {
						    case '1':
								this.reviewValue = '初审中'
						        break;
						    case '2' || '4':
						        this.reviewValue = '审核失败'
						        break;
						    case '3':
								this.reviewValue = '终审中'
						        break;
						    case '5':
								this.reviewValue = '已认证'
						        break;
						} 
				    }
				})
			},
			toReview(){
				let _this = this
				if(!this.userinfo.reviewResultCode.code){
					this.openUrl('../join/index')
				}else{
					this.$api.get('member/qualification/qualificationMessage.do').then( res => {
						// console.log(res.data)
						let qualificationMessage = res.data
					    if(res.success){
							uni.getStorage({
							    key: 'qualificationMessage',
							    success: function (res) {
									console.log(qualificationMessage)
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
					// this.openUrl('../join/audit?code='+this.userinfo.reviewResultCode.code+'&reason='+this.userinfo.reviewResultCode.reason)
				}
			},
        }
    }
</script>

<style lang="scss" scoped>
    .list{margin-top: 18rpx; background-color: #fff;
        &.one{margin-top: 24rpx;}
        .head-img{height: 132rpx; margin: 0 24rpx; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid $xinxii-border-color; font-size: 32rpx;
            .tip{color: #999; font-size: 24rpx; margin-top: 12rpx;}
            .right{width: 84rpx; height: 84rpx; border-radius: 50%; background-color: #D8D8D8;
                image{width: 100%; height: 100%; border-radius: 50%; margin: 0;}
            }
        }
    }
    
</style>
