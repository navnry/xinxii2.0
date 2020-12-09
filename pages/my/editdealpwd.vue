<template>
    <view class="content">
        <x-nav-bar :no-border="true" :title="title"></x-nav-bar>
        <view class="main">
            <x-input type="tel" v-model="sendData.phone" @input="input" disabled="true" showNationCode='true' placeholder="请输入手机号"></x-input>
            <x-input type="captcha" maxlength="6" v-model="sendData.verifyCode" placeholder="手机验证码" :captchaMobile="sendData.phone"></x-input>
            <x-input class="item" type="password" placeholder="输入提现密码(密码为6位数字)" v-model="sendData.password"></x-input>
            <x-input class="item" type="password" placeholder="确认提现密码" v-model="sendData.passwordConfirm"></x-input>
            <button class="btn" @click="submit">确认</button>
        </view>
    </view>
</template>

<script>
    import {checkPhone} from '@/common/utils'
    import {mapState} from 'vuex'
    export default{
        data () {
            return {
                title: '设置提现密码',
                sendData: {
					phone: '',
                    verifyCode: '',
                    password: '',
					passwordConfirm: ''
                }
            }
        },
        computed: mapState(['userinfo']),
        onLoad(option) {
			this.sendData.phone = this.userinfo.mobile
            if(option.type==1){
                this.title = '修改提现密码'
            }
        },
        methods:{
            submit(){
                let reg = /^\d{6}$/
    //             this.sendData.verifyCode = this.sendData.verifyCode.trim()
    //             if(!this.sendData.verifyCode){
    //                 this.showToast('请输入验证码')
    //                 return
    //             }
    //             this.sendData.password = this.sendData.password.trim()
    //             if(!reg.test(this.sendData.password)){
    //                 this.showToast('请输入正确的密码格式')
    //                 return
    //             }
    //             this.sendData.passwordConfirm = this.sendData.passwordConfirm.trim()
    //             if(!this.sendData.passwordConfirm){
    //                 this.showToast('确认密码不能为空')
    //                 return
    //             }
    //             if(this.sendData.password !== this.sendData.passwordConfirm){
    //                 this.showToast('两次密码输入不一致')
    //                 return
    //             }
				// let url = this.type == 1 ? 'member/member/resetPwd.do' : 'member/member/resetUserPwd.do'
    //             this.$api.post(url,this.sendData).then( res => {
    //                 if(res.success){
    //                     this.showToast('密码修改成功')
    //                     setTimeout( ()=> {
    //                         this.backPage()
    //                     },1500)
    //                 }
    //             })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .content{position: absolute; width: 100%; min-height: 100%; background-color: #fff;}
    .main{padding: 0 72rpx; margin-top: 180rpx;
        .item{margin-top: 18rpx;}
        .btn{height: 88rpx; line-height: 88rpx; border-radius: 8rpx; color: #fff; font-size: 32rpx; background-color: $xinxii-theme-color; margin-top: 104rpx;}
    }
</style>
