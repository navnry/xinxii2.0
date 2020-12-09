<template>
    <view class="content">
        
    </view>
</template>

<script>
    import {getUrlParam } from '@/common/utils'
    import {mapMutations} from 'vuex'
    export default {
        data () {
            return{
                openId: '',
                accessToken: '',
                userinfo: {}
            }
        },
        onLoad() {
            const code = getUrlParam('code')
            const local = window.location.href
            if (code == null || code === '') {
                this.$api.get('wechat/wechat/getBaseOathorizeUrl.do',{params:{redirectUri: local}}).then( res => {
                    if(res.success){
                        window.location.href = res.data.url
                    }
                })
            } else {
                // this.getOpenId(code,appid) //把code传给后台获取用户信息
                this.getAccessToken(code)
            }
        },
        methods:{
            ...mapMutations(['LOGIN', 'SET_TEMP_USERINFO']),
            getAccessToken(code){
                this.$api.get('wechat/wechat/getOpenId2.do', {params: {code}}).then( res => {
                    if(res.success){
                        let authinfo = {
                            type: 'wx',
                            openid: res.data.openid
                        }
                        this.$store.commit('WXLOGIN', {authinfo})
                        this.getWxUserInfo(res.data.openid,res.data.access_token)
                    }
                })
            },
            getWxUserInfo (openId, accessToken) {
               this.$api.post('wechat/wechat/userInfo.do', {openId,accessToken}).then( res => {
                   console.log(res);
                   
                   if(res.success){
                        this.tpLogin({
                           openId: res.data.openid,
                           type: 3,
                           logo: res.data.headimgurl,
                           realname: res.data.nickname,
                           unionId: res.data.unionid
                        })
                   }
               })
            },
            tpLogin(userinfo){
                this.$api.post('member/login/tp_login.do',userinfo).then( res => {
                    if(res.success){
                        uni.showToast({title: '微信授权成功'})
                        this.$store.commit('LOGIN', {userinfo: res.data})
                        setTimeout(() => {
                            this.$store.dispatch('afterLogin')
                        }, 1500)
                    }
                })
            }
        }
    }
</script>

<style>
</style>
