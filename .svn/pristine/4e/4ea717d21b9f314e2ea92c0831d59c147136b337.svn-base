<template>
    <view class="content">
        <x-nav-bar :no-border="true" title="银行卡" :rightText="rightText" @clickRight="delCard"></x-nav-bar>
        <view class="list">
            <view class="group" v-for="(item,index) in list" :key="index">
                <radio v-show="isShow" style="transform:scale(0.7);" color="#FF5000" @click="selItem(index)" :checked="item.del==1" ></radio>
                <view class="item" :style="{'background':item.bgcolor}" @click="selCard(item)">
                    <view class="top">
                        <view class="left">
                            <view class="logo">
                                <image lazy-load :src="item.url" mode=""></image>
                            </view>
                            <view class="info">
                                <view class="name">{{item.bankName}}</view>
                            </view>
                        </view>
                        <view class="btn" :class="{'default':item.isDefault==1}" @click.stop="setDefault(item,index)">{{item.isDefault==1?'默认':'设为默认'}}</view>
                    </view>
                    <view class="card">**** **** **** {{item.accountNumber.substring(item.accountNumber.length-4)}}</view>
                </view>
            </view>
            
        </view>
        <button class="add-btn" @click="openUrl('./addbankcard')">+ 添加银行卡</button>
    </view>
</template>

<script>
    export default{
        data () {
            return {
                list: null,
                isShow: false,
                rightText: '管理',
                delData: null,
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
                ],
                isSelCard: 0
            }
        },
        onShow() {
            this.getList()
        },
        onLoad(option) {
            if(option.isSelCard){
                this.isSelCard = option.isSelCard
            }
        },
        methods:{
            delCard(){
                if(!this.isShow){
                    this.isShow = true
                    this.rightText = '删除'
                }else{
                    if(this.delData){
                        this.$api.post('system/withdrawal/batchDelMemberBank.do',{ids:this.delData}).then( res => {
                            if(res.success){
                                this.showToast('删除成功')
                                this.getList()
                                this.isShow = false
                                this.rightText = '管理'
                            }
                        })
                    }
                }
            },
            selItem(index){
                this.list[index].del = this.list[index].del == 0 ? 1 : 0
                let arr = []
                for (let val of this.list) {
                    if(val.del == 1){
                        arr.push(val.id)
                    }
                }
                this.delData = arr.join(',')
            },
            setDefault(item,index){
                if(item.isDefault == 1) return
                this.$api.post('system/withdrawal/bindBankCard.do',{id:item.id,isDefault:1}).then( res => {
                    if(res.success){
                        for (let item of this.list) {
                            item.isDefault = 0
                        }
                        this.list[index].isDefault = 1
                        this.showToast('设定成功')
                    }
                })
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
                        this.list = arr
                    }
                })
            },
            selCard(item){
                if(this.isSelCard == 1){
                    this.openUrl('./withdrawal?item=' + JSON.stringify(item))
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .list{padding-top: 6rpx;
        .group{display: flex; align-items: center;}
        .item{width: 702rpx; height: 292rpx; margin: 18rpx auto 0; padding: 24rpx; border-radius: 12rpx; color: #fff;
            .top{display: flex; align-items: flex-start; justify-content: space-between;
                .left{flex-grow: 1; display: flex; align-items: center;
                    .logo{font-size: 0; margin-right: 48rpx;
                        image{width: 118rpx; height: 118rpx;}
                    }
                    .info{
                        .name{font-size: 36rpx; line-height: 50rpx; margin-bottom: 6rpx;}
                        .tit{font-size: 24rpx;}
                    }
                }
                .btn{font-size: 28rpx; padding: 0 24rpx; color: #fff; border: 2rpx solid #fff; border-radius: 28rpx;
                    &.default{background-color: #fff; border-color: #fff; color: $xinxii-theme-color;}
                }
            }
            .card{font-size: 36rpx; margin: 52rpx 0 0 176rpx;}
        }
    }
    .add-btn{width: 702rpx; height: 88rpx; line-height: 88rpx; color: #fff; border-radius: 12rpx; background-color: $xinxii-theme-color; margin: 24rpx auto; font-size: 32rpx; font-weight: normal;}
</style>

