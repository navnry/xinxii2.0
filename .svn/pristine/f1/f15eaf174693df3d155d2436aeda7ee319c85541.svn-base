<template>
    <view class="content">
        <x-nav-bar :customClickleft="isMy" @clickLeft="backPage" noBorder="true" title=" "></x-nav-bar>
        <view class="main">
            <view class="logo">
                <image lazy-load src="../../static/login_logo.png" mode=""></image>
            </view>
            <view class="cont">
                <view v-show="isMessage">
                    <x-input type="tel" v-model="sendData.username" showNationCode='true' placeholder="请输入手机号"></x-input>
                    <x-input type="captcha" placeholder="手机验证码" captcha-type="1" maxlength="6" v-model="sendData.password" :captchaMobile="sendData.username"></x-input>
                    <view class="switch"><text @click="selLoginType(1)">使用密码登录</text></view>
                    <button class="login-btn" @click="mobileLogin">手机号登录</button>
                    <view class="tip">未注册的手机号验证后自动创建新禧账号</view>
                </view>
                <view v-show="!isMessage">
                    <x-input type="text" v-model="sendData.username" placeholder="请输入手机号"></x-input>
                    <x-input type="password" v-model="sendData.password" placeholder="请输入密码"></x-input>
                    <view class="switch"><text @click="selLoginType(2)">使用验证码登录</text></view>
                    <button class="login-btn" @tap="bindLogin">登录</button>
                    <view class="tip" @click="openUrl('./editpwd?type=1')">忘记密码</view>
                </view>
            </view>
            <view v-if="configinfo.value === 'true'">
                <view class="other-tip"><text></text><view class="other">其他登录方式</view><text></text></view>
                <button class="weixin-btn" @tap="toOauth">
                    <x-icon size="80" color="#00C800" type="weixin"></x-icon>
                </button>
                <view class="platform">微信</view>
            </view>
        </view>
		<view class="tips">登录即代表已同意<text @click.stop="openUrl('../../page_other/ebook/register')">用户注册及使用协议、</text><text @click.stop="openUrl('../../page_other/ebook/privacypolicy')">隐私政策</text>及<text @click.stop="openUrl('../../page_other/ebook/personal')">个人信息使用授权书</text></view>
    </view>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {getUrlParam } from '@/common/utils'
export default {
    data() {
        return {
            isMessage: true,
            appId: '',
            sendData:{
                username: '',
                password: ''
            },
            userinfo: {
                openId: '',
                unionId: '',
                logo: '',
                realname: '',
                type: 3
            },
            type: '',
            isMy: false
        }
    },
    computed: mapState(['isLogin', 'configinfo']),
    onLoad(option) {
        if(option){
            if(option.type == 1){
                this.isMy = true
            }
        }
    },
    methods: {
        selLoginType(val){
            if(val == 1){
                this.isMessage = false
            }else{
                this.isMessage = true
            }
            this.sendData.username = ''
            this.sendData.password = ''
        },
        backPage(){
            if(this.isMy){
                this.openUrl('../home/index',2)
            }
            // else{
            //     console.log(111);
            //     this.backPage()
            // }
        },
        ...mapMutations(['LOGIN', 'SET_TEMP_USERINFO']),
        bindLogin() {
            this.sendData.username = this.sendData.username.trim()
            if (!this.sendData.username) {
                this.showToast('请输入用户名')
                return
            }
            if (!this.sendData.password) {
                this.showToast('请输入密码')
                return
            }
            this.$api.post('member/login/login.do', this.sendData).then(res => {
                if (res.success) {
                    console.log(res);
                    this.$store.commit('LOGIN', {userinfo: res.data})
                    console.log(111);
                    this.showToast('登录成功','success')
                    setTimeout(() => {
                        this.$store.dispatch('afterLogin')
                    }, 1500)
                }
            })
        },
		mobileLogin() {
			this.sendData.username = this.sendData.username.trim()
            if (!this.sendData.username) {
                this.showToast('请输入手机号码')
                return
            }
            if (!this.sendData.password) {
                this.showToast('请输入手机验证码')
                return
            }
			let loginInfo = {
				phone: this.sendData.username,
				verifyCode: this.sendData.password
			}
            this.$api.post('member/login/mobileLogin.do', loginInfo).then(res => {
                if (res.success) {
                    console.log(res);
                    this.$store.commit('LOGIN', {userinfo: res.data})
                    uni.showToast({
                        title: '登录成功'
                    })
                    setTimeout(() => {
                        this.$store.dispatch('afterLogin')
                    }, 1500)
                }
            })
		},
        toOauth(){
            // #ifdef H5
            this.openUrl('./wxlogin')
            // #endif
            // #ifndef H5
            this.oauth()
            // #endif
        },
        // getAppId(){
        //     const local = window.location.href
        //     this.$api.get()
        // },
        // getCode () { // 非静默授权，第一次有弹框
        //     const code = getUrlParam('code') // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
        //     const local = window.location.href
        //     console.log(code);
        //     this.$api.get('wechat/wechat/getBaseOathorizeUrl.do',{params:{redirectUri: local}}).then( res => {
        //         if(res.success){
        //             if (code == null || code === '') {
        //                 window.location.href = res.data.url
        //             } else {
        //                 this.getOpenId(code,appid) //把code传给后台获取用户信息
        //             }
        //         }
        //     })
            
        // },
        // getOpenId (code,appid) {
        //     this.$api.get('wechat/wechat/code2session.do/wechat/code2session', {params:{code,appid}}).then( res => {
        //         console.log(res);
        //     }).catch((error) => {
        //         console.log(error)
        //     })
        // },
        oauth() {
            uni.login({
                provider: 'weixin',
                success: (res) => {
                    uni.showLoading({
                        title: '授权登录中'
                    })
                    uni.getUserInfo({
                        provider: 'weixin',
                        success: (infoRes) => {
                            this.userinfo.openId = infoRes.userInfo.openId
                            this.userinfo.unionId = infoRes.userInfo.unionId
                            this.userinfo.logo = infoRes.userInfo.avatarUrl
                            this.userinfo.realname = infoRes.userInfo.nickName
                            this.userinfo.type = 0
                            this.$api.post('member/login/tp_login2.do', this.userinfo).then((resUser) => {
                                console.log(resUser);
                                if (resUser.success) {
                                    this.showToast('微信授权成功')
                                    this.LOGIN({userinfo: resUser.data})
                                    setTimeout(() => {
                                        this.$store.dispatch('afterLogin')
                                    }, 1500)
                                } 
                                // else if (resUser.code === 409) {
                                //     this.SET_TEMP_USERINFO(this.userinfo)
                                //     this.visibleRegOrBinding = true
                                // }
                            })
                        }
                    })
                },
                fail: (err) => {
                    console.error('授权登录失败：' + JSON.stringify(err))
                }
            })
        },
        // onBackPage() {
        //     if (this.sourceCenter) {
        //         uni.switchTab({
        //             url: '/pages/home/index'
        //         })
        //     } else {
        //         this.backPage()
        //     }
        // }
    }
}
</script>

<style lang="scss" scoped>
.content{position: absolute; width: 100%; min-height: 100vh; background-color: #FFF; padding-bottom: 40rpx;
    .main{ position: relative; z-index: 1; background-color: #fff; padding: 48rpx 72rpx 0;
        .logo{width: 222rpx; height: 72rpx; font-size: 0; margin: 0 auto 108rpx;
            image{width: 100%; height: 100%;}
        }
        .cont{
            .switch{font-size: 24rpx; color: #666; line-height: 34rpx; margin-top: 22rpx; display: flex; justify-content: flex-end;}
            .login-btn{ height: 88rpx; line-height: 88rpx; background-color: $xinxii-theme-color; border-radius: 4rpx; color: #fff; font-size: 32rpx; margin: 48rpx 0 24rpx;}
            .tip{text-align: left; color: #999; font-size: 28rpx; line-height: 40rpx; display: inline-block;}
        }
        .other-tip{text-align: center; font-size: 24rpx; padding-top: 120rpx; display: flex; align-items: center;
            >text{color: #ddd; display: inline-block; width: 218rpx; height: 2rpx; background-color: #ddd;}
            .other{color: #999; margin: 0 12rpx;}
        }
        .weixin-btn{ height: 108rpx; width: 108rpx; border-radius: 50%; margin: 48rpx auto 0; font-size: 0; background-color: #fff; border: 1px solid $xinxii-border-color; line-height: 108rpx;}
        .platform{text-align: center; font-size: 24rpx; color: #999; line-height: 34rpx;}
    }
    .tips{padding: 0 24rpx; font-size: 28rpx; color: #999; line-height: 34rpx; margin-top: 72rpx;
        >text{color: $xinxii-theme-color;}
    }
}
</style>
