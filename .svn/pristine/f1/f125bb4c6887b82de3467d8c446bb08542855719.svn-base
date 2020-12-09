<template>
    <view class="content">
        <x-nav-bar :no-border="true" title="添加银行卡"></x-nav-bar>
        <view class="group">
            <x-input minWidthNum="146rpx" leftText="持卡人:" :value="userinfo.fullname" disabled="true"></x-input>
            <x-input minWidthNum="146rpx" type="tel" leftText="卡号:" v-model="sendData.accountNumber" placeholder="请输入银行卡卡号"></x-input>
            <view class="item" @click="selBankName">
                <view class="left">开户行:</view>
                <view class="txt" :class="{act:sendData.bankName}">{{sendData.bankName||'请输入开户行'}}</view>
            </view>
        </view>
        <button class="btn" @click="addCard">添加</button>
        <view class="tip">持卡人姓名必须与本人姓名一致</view>
        <x-level-picker ref="selBankName"
            v-model="bankNameVlaue"
            mode="selector"
            cancel-text="取消"
            confirm-text="确定"
            cancel-color="#999"
            confirm-color="$xinxii-theme-color"
            :list="bankNameList"
            @confirm="handleConfirmBankName"
        ></x-level-picker>
    </view>
</template>

<script>
    import { mapState } from 'vuex'
    export default{
        computed: mapState(['userinfo']),
        data () {
            return {
                sendData:{
                    name: '',
                    accountNumber: '',
                    bankName: '',
                    isDefault: 1,
                    openedPlace: ''
                },
                bankNameVlaue: '',
                bankNameList:[]
            }
        },
        onShow() {
            this.getBankList()
        },
        methods:{
            getBankList(){
                this.$api.get('system/dict/getDictByType.do?type=BankType').then( res => {
                    if(res.success){
                        this.bankNameList = res.data
                    }
                })
            },
            addCard(){
                if(!this.sendData.accountNumber){
                    this.showToast('请输入银行卡号')
                    return
                }
                if(!this.sendData.bankName){
                    this.showToast('请输入开户行')
                    return
                }
                this.$api.post('system/withdrawal/bindBankCard.do',this.sendData).then( res => {
                    if(res.success){
                        this.showToast('绑定成功！')
                        setTimeout( ()=>{
                            this.backPage()
                        },1500)
                    }
                })
            },
            selBankName(){
                this.$refs.selBankName.show()
            },
            handleConfirmBankName(item){
                this.sendData.bankName = item.item.label
                this.sendData.openedPlace = item.item.value
            }
        }
    }
</script>

<style lang="scss" scoped>
.group{width: 702rpx; margin: 24rpx auto; background: #fff; border-radius: 12rpx; padding: 0 24rpx;
    .last-item{border: none;}
} 
.item{display: flex; align-items: center; height: 104rpx; font-size: 32rpx;
    .left{width: 146rpx; margin-right: 30rpx;}
    .txt{color: #999;
        &.act{color: #333;}
    }
}
.btn{width: 702rpx; margin: 0 auto; height: 88rpx; line-height: 88rpx; color: #fff; border-radius: 8rpx; font-size: 32rpx; background-color: $xinxii-theme-color;}
.tip{font-size: 24rpx; color: #999; text-align: center; margin-top: 24rpx;}
</style>
