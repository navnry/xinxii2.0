<template>
    <view class="content">
        <x-nav-bar :no-border="true" title="提现"></x-nav-bar>
        <view class="money-box">
            <view class="tit">提现金额 （元）</view>
            <input type="number" v-model="sendData.payment" placeholder="输入金额" @blur="checkMoney" placeholder-class="pld-input" />
            <view class="tip">当前最高可提现： {{withdrawal||'0.00'}} 元，<text class="withdrawal-all" @click="withdrawalAll">全部提现</text></view>
        </view>
        <view class="way">
            <view class="tit">提现方式</view>
            <view class="list">
                <view class="item" :class="{act: current == 11}" @click="selPay(11)">
                    <image lazy-load src="@/static/assets/assets_wechat.png" mode=""></image>
                    <text>提现到微信余额</text>
                </view>
                <view class="item" :class="{act: current == 10}" @click="selPay(10)">
                    <image lazy-load src="@/static/assets/assets_card.png" mode=""></image>
                    <text>提现到银行卡</text>
                </view>
            </view>
           <view class="card" v-if="current == 10 && isCard" @click="openUrl('./bankcard?isSelCard=1')">
                <view class="left">
                    <image lazy-load :src="obj.url" mode=""></image>
                    <view>
                        <view class="name">{{obj.bankName}}</view>
                        <view class="card-info">
                            <text>储蓄卡</text>
                            <text>尾号{{obj.accountNumber.substring(obj.accountNumber.length-4)}}</text>
                        </view>
                    </view>
                </view>
                <view class="right">
                    <text>收款账户</text>
                    <x-icon size="32" type="arrow-right"></x-icon>
                </view>
            </view>
            <view class="card" v-else-if="current == 10 && !isCard" @click="openUrl('./bankcard?isSelCard=1')">
                <view class="left">
                    <image lazy-load src="@/static/assets/assets_withdrawal_card.png" mode=""></image>
                </view>
                <view class="right">
                    <text class="txt">立即绑定银行卡</text>
                    <x-icon size="32" type="arrow-right"></x-icon>
                </view>
            </view>
        </view>
      <!--  <view class="sure" @click="isChecked = !isChecked">
            <radio style="transform:scale(0.7);" color="#FF5000" :checked="isChecked" ></radio>
            <view>点击确认提现即表示你遵守 <text>《规则》</text></view>
        </view> -->
        <button class="btn" @click="submit">确认提现</button>
    </view>
</template>

<script>
    export default{
        data () {
            return {
                current: 11,
                withdrawal: '',
                isChecked: true,
                sendData:{
                    payment: '',
                    type: 11
                },
                obj: {},
                isCard: false,
                bankList:[
                    {url: require('@/static/assets/assets_gongshang_bank.png'), name: '工商银行', bgcolor: '#D0021B'},
                    {url: require('@/static/assets/assets_pufa_bank.png'), name: '浦发银行', bgcolor: '#002F82'},
                    {url: require('@/static/assets/assets_guangfa_bank.png'), name: '广发银行', bgcolor: '#E50020'},
                    {url: require('@/static/assets/assets_nongye_bank.png'), name: '农业银行', bgcolor: '#009174'},
                    {url: require('@/static/assets/assets_mingsheng_bank.png'), name: '民生银行', bgcolor: '#3396FF'},
                    {url: require('@/static/assets/assets_huaxia_bank.png'), name: '华夏银行', bgcolor: '#3396FF'},
                    {url: require('@/static/assets/assets_jianshe_bank.png'), name: '建设银行', bgcolor: '#0066B3'},
                    {url: require('@/static/assets/assets_pingan_bank.png'), name: '平安银行', bgcolor: '#DE540F'},
                    {url: require('@/static/assets/assets_ningbo_bank.png'), name: '宁波银行', bgcolor: '#EFA56B'},
                    {url: require('@/static/assets/assets_zhongguo_bank.png'), name: '中国银行', bgcolor: '#A71E32'},
                    {url: require('@/static/assets/assets_zhongxin_bank.png'), name: '中信银行', bgcolor: '#E50113'},
                    {url: require('@/static/assets/assets_beijing_bank.png'), name: '北京银行', bgcolor: '#E50113'},
                    {url: require('@/static/assets/assets_jiaotong_bank.png'), name: '交通银行', bgcolor: '#1D2087'},
                    {url: require('@/static/assets/assets_xingye_bank.png'), name: '兴业银行', bgcolor: '#004286'},
                    {url: require('@/static/assets/assets_shanghai_bank.png'), name: '上海银行', bgcolor: '#293C8F'},
                    {url: require('@/static/assets/assets_zhaoshang_bank.png'), name: '招商银行', bgcolor: '#F98C8C'},
                    {url: require('@/static/assets/assets_guangda_bank.png'), name: '广大银行', bgcolor: '#611381'},
                    {url: require('@/static/assets/assets_nanjing_bank.png'), name: '南京银行', bgcolor: '#E50113'},
                    {url: require('@/static/assets/assets_changsha_bank.png'), name: '长沙银行', bgcolor: '#DC1419'}
                ]
            }
        },
        onShow() {
            this.getAssets()
            this.getList()
        },
        onLoad(option) {
            if(option.item){
                this.obj = JSON.parse(option.item)
            }
        },
        methods:{
			withdrawalAll(){ //全部提现
				this.sendData.payment = parseFloat(this.withdrawal).toFixed(2)
			},
            checkMoney(){
                this.sendData.payment = parseFloat(this.sendData.payment).toFixed(2)
                if(this.sendData.payment > parseFloat(this.withdrawal)){
                    this.showToast('提现金额不能大于可提现金额，请重新输入金额')
                    this.sendData.payment = 0
                }
            },
            selPay(val){
                if(this.current == val) return
                this.current = val
            },
            getList(){
                this.$api.get('system/withdrawal/memberBankInfo.do').then( res => {
                    if(res.success){
                        let arr = res.data
                        for (let val of arr) {
                            for (let v of this.bankList) {
                                if(val.bankName == v.name){
                                    val.url = v.url
                                    val.bgcolor = v.bgcolor
                                }
                            }
                            val.del = 0
                        }
                        if(arr.length>0){
                            this.obj = arr[0]
                        }
                        if(Object.keys(this.obj).length > 0){
                            this.isCard = true
                        }
                    }
                })
            },
            getAssets(){
                this.$api.get('system/withdrawal/userFund.do').then( res => {
                    if(res.success){
                        this.withdrawal = res.data.totalAleAmount.toFixed(2)
                    }
                })
            },
            submit(){
                if(this.sendData.payment <= 0){
                    this.showToast('提现金额不能为0')
                    return
                }
                if(!this.isChecked){
                    this.showToast('请确认相关规则')
                    return
                }
                this.sendData.type = this.current
                if(this.current == 10){
                    this.sendData.memberBankId = this.obj.id
                }
                this.$api.post('system/withdrawal/applyWithdrawal.do',this.sendData).then( res => {
                    if(res.success){
                        this.showToast('提现申请发起成功')
                        setTimeout( () => {
                            this.openUrl('./index')
                        },1500)
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .money-box{width: 702rpx; background-color: #fff; border-radius: 12rpx; margin: 24rpx auto 0; padding: 24rpx;
        .tit{font-size: 32rpx; font-weight: bold; line-height: 44rpx; margin-bottom: 48rpx;}
        input{border-bottom: 1px solid #DDD; padding-bottom: 12rpx; font-size: 48rpx;}
        .pld-input{font-size: 48rpx; color: #999;}
        .tip{font-size: 28rpx; color: #999; line-height: 40rpx; margin-top: 22rpx;}
		.withdrawal-all{color: $xinxii-theme-color;}
    }
    .way{margin-top: 48rpx; padding: 0 24rpx;
        .tit{font-size: 32rpx; font-weight: bold; line-height: 44rpx; margin-bottom: 24rpx;}
        .list{display: flex; align-items: center; justify-content: space-between;
            .item{width: 326rpx; height: 130rpx; border-radius: 12rpx; border: 2rpx solid #999; line-height: 126rpx; display: flex; align-items: center;
                >text{font-size: 32rpx; color: #666; line-height: 44rpx;}
                image{width: 32rpx; height: 32rpx; margin: 0 22rpx 0 24rpx;}
                &.act{border-color: $xinxii-theme-color;
                    >text{color: $xinxii-theme-color;}
                }
            }
        }
        .card{background-color: #fff; width: 702rpx; height: 128rpx; display: flex; justify-content: space-between; align-items: center; margin-top: 18rpx; padding: 0 24rpx;
            .left{display: flex; align-items: center; font-size: 28rpx;
                .name{ line-height: 40rpx; margin-bottom: 6rpx;}
                .card-info{color: #999;
                    >text{margin-right: 10rpx;}
                }
                image{width: 60rpx; height: 60rpx; border-radius: 50%; margin-right: 18rpx;}
            }
            .right{font-size: 32rpx; color: #999;
                image{width: 14rpx; height: 24rpx; margin-left: 12rpx;}
                .txt{color: $xinxii-theme-color;}
            }
        }
    }
    .sure{font-size: 28rpx; margin-top: 72rpx; padding: 0 24rpx; color: #999; display: flex; align-items: center;
        text{color: $xinxii-theme-color;}
    }
    .btn{width: 702rpx; height: 88rpx; line-height: 88rpx; border-radius: 8rpx; color: #fff; background-color: $xinxii-theme-color; margin: 72rpx auto 0; font-size: 32rpx;}
</style>
