<template>
    <view class="content">
        <x-nav-bar :noBorder="true" title="修改用户名"></x-nav-bar>
        <input type="text" placeholder="请输入2-8个汉字、数字、或英文字母" @input="input" confirm-type="done" maxlength="8" placeholder-class="pld-class" v-model="send.realname" />
        <button class="btn" :class="{sure: isSure}" @click="submit">保存</button>
    </view>
</template>

<script>
    import {mapState} from 'vuex'
    import {updateUserinfo} from '@/common/api'
    export default {
        data () {
            return{
                send:{
                    realname: ''
                },
                isSure: false
            }
        },
        onLoad() {
            this.send.realname = this.userinfo.realname
        },
        computed: mapState(['userinfo']),
        methods:{
            input(e){
                this.send.realname = e.detail.value
                if(this.send.realname.length >= 2){
                    this.isSure = true
                }else{
                    this.isSure = false
                }
            },
            submit(){
                if(!this.isSure) return
                if(this.send.realname == this.userinfo.realname) return
                this.$api.post('member/member/fillInfo.do',this.send).then( res => {
                    if(res.success){
                        this.showToast('修改成功')
                        updateUserinfo(this)
                        setTimeout(() => {
                          this.backPage()
                        }, 1500)
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
input{width: 100%; height: 88rpx; padding: 22rpx 28rpx 24rpx; background-color: #fff; margin: 24rpx 0 48rpx; font-size: 32rpx;}
.pld-class{font-size: 32rpx; color: #999; line-height: 44rpx;}
.btn{width: 702rpx; height: 88rpx; line-height: 88rpx; border-radius: 8rpx; background-color: #ddd; margin: 0 auto; font-size: 32rpx; color: #fff;
    &.sure{background-color: $xinxii-theme-color;}
}
</style>
