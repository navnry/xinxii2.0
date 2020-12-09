<template>
    <view>
        <x-nav-bar :no-border="true" leftIcon=" " title="产品列表"></x-nav-bar>
        <view class="insurance-item" v-for="item in productList" :key="item.orderNum" @click="pay(item)">
          <view class="img">
            <image lazy-load src="" mode="aspectFill"></image>
          </view>
          <view class="detail">
            <view class="info">
              <view class="tit">{{item.name}}</view>
            <view class="label">
                <text v-for="i in item.tags" :key="i.id">{{i.name}}</text>
              </view>
            </view>
            <view class="price">{{item.inPrice.toFixed(2)}} <text>元/起</text></view>
          </view>
        </view>
    </view>
    
</template>

<script>
    import {requestPayment} from '@/common/api'
    // #ifdef H5
    import wx from 'jweixin-module'
    // #endif
    import {mapState} from 'vuex'
    export default {
        data () {
            return {
                productList:[
                    {name: '少儿住院保（2020版）（计划一）', inPrice: 269, orderNum: '59b7b91205f540bab47d11241fd4774b'},
                    {name: '美亚“万国游踪”境外旅行保障计划–全球版（全球完美计划）', inPrice: 85, orderNum: '52842eaba6e04876857e4596c3a16300'},
                    {name: '车类运动体验保险  计划C	', inPrice: 30, orderNum: '506d6697d01241fda99acd2a1408d903'},
                    {name: '户外安心 户外运动保障（计划六）', inPrice: 32, orderNum: 'c6b78083f9c44beea7582f29e0271a8c'},
                    {name: '药无忧-续保版基础版', inPrice: 13, orderNum: '3be5743d662d4ce281b65abef473e5c8'},
                    {name: '华贵大麦2020定期寿险 ', inPrice: 15.5, orderNum: 'abfed4d61e1241159f582855f4793945'},
                    {name: '学平险2020（方案一）', inPrice: 88, orderNum: 'ec82aa732cba42569c6a06ee1bce4545'},
                    {name: '京东安联百万玫瑰意外保障计划', inPrice: 299, orderNum: '5a93d63790cd4dc5b3d8157a772695d1'},
                    {name: '不倒翁(新版)京东安联中老年人意外骨折保障计划', inPrice: 150, orderNum: '87df3bd45c5c437da66b692e1c4297a5'},
                    {name: '小幸孕 - 京东安联母婴保障计划孕妇版', inPrice: 150, orderNum: '13ed1bd5c4af41ff942ef12823fa7dc7'},
                    {name: '京东安联全民综合意外保障计划', inPrice: 180, orderNum: 'a58a57afba1c42f48e9293b02c82ffda'},
                    {name: '熊宝保（2017版）-京东安联个人保障计划	', inPrice: 69, orderNum: '6c1a9154bae34bee81cad64b713c7b24'},
                    {name: '卓越守护百万住院医疗保险高血压患者专款', inPrice: 142, orderNum: '71062bfe37ea41b88fca6af5b9cdb571'},
                    {name: '夕阳红个人意外伤害保险(2020版) 意外险', inPrice: 219, orderNum: 'e5f85fdfb7b240b78d90a9c63d9ddc36'},
                    {name: '京东安联京彩一生防癌医疗保险', inPrice: 47, orderNum: '5b2ec3db52d648dba16e2ca9384f9452'},
                    {name: '环游四海 - 京东安联全球旅行保障计划', inPrice: 45, orderNum: '61674cb827654cb29dbdc2b1847cbcec'},
                ],
                flag: false,
                paySend:{
                    entrustId:'',
                    count:1,
                    price:0.01,
                    paymentWay:1,
                    name:''
                },
                str: '',
                // val: 0 ,//1 H5 2 APP  3 小程序
                isWechat: 0 // 0 不是微信内核  1 是微信内核
            }
        },
        computed: mapState(['authinfo','userinfo']),
        onShow() {
            let arr = this.userinfo.thirdPartyUserList
            if(arr){
                for (let val of arr) {
                    if( val.type == 3){
                        this.flag = true
                    }
                }
            }
        },
        onLoad(option) {
            // if(option.val){
            //     this.val = option.val
            // }
            let ua = navigator.userAgent.toLowerCase()
            if(ua.match(/MicroMessenger/i)=="micromessenger") {
                //ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
                this.isWechat = 1
            }
        },
        methods:{
            pay(item){
                this.paySend.entrustId = item.orderNum
                this.paySend.price = item.inPrice
                this.paySend.name = item.name
                this.payTest()
            },
            payTest(){
                // #ifdef H5
                if(this.isWechat ==1 ){//微信内部浏览器
                    if(!this.flag){
                        this.showToast('请先微信授权')
                        this.openUrl('../my/login')
                        return
                    }
                    //初始化微信参数
                    this.$api.post('wechat/wechat/getJsConfig.do',{url:'https://dev.xinxiichina.com/broker'}).then(res=>{
                        wx.config({
                          debug: false, // 开启调试模式
                          appId: res.data.appId, // 必填，公众号的唯一标识
                          timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                          nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                          signature: res.data.signature, // 必填，签名，见附录1
                          jsApiList: [ // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'onMenuShareQZone',
                            'previewImage',
                            'chooseWXPay',
                            'hideMenuItems',
                            'showMenuItems',
                            'showAllNonBaseMenuItem',
                            'hideAllNonBaseMenuItem',
                            'scanQRCode',
                            'openLocation',
                            'chooseImage',
                            'uploadImage'
                          ]
                        })
                    // his.showToast('laile')
                        this.$api.post('eae/entrustReply/savebuy.do',this.paySend).then( res => {
                            console.log(res)
                            this.str = JSON.stringify(res)
                            if(res.success){
                                this.$api.post('pay/wechat/wwz/getPayData.do',{orderId:res.data.orderId, openId:this.authinfo.openid}).then( res => {
                                    console.log(res)
                                    let config = {
                                        appId: res.data.appId,
                                        timestamp: res.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                        nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
                                        package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                                        signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                        paySign: res.data.paySign // 支付签名
                                    }
                                    console.log(config)
                                    wx.chooseWXPay({
                                        appId: res.data.appId,
                                        timestamp: res.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                        nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
                                        package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                                        signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                        paySign: res.data.paySign // 支付签名
                                    })
                                })
                            }
                        })
                    })
                }else{
                    this.$api.post('eae/entrustReply/savebuy.do',this.paySend).then( res => {
                        console.log(res)
                        this.str = JSON.stringify(res)
                        if(res.success){
                            this.$api.post('pay/wechat/h5/getPayData.do',{
                                OrderFormId:res.data.orderId
                            }).then( res => {
                                this.openUrl(res.description)
                            })
                        }
                    })
                }
                // #endif
                // #ifdef APP-PLUS
                this.showToast('xiamian')
                this.$api.post('eae/entrustReply/savebuy.do',this.paySend).then( res => {
                    console.log(res)
                    this.str = JSON.stringify(res)
                    if(res.success){
                        this.$api.post('pay/wechat/app/getPayData.do',{
                            OrderFormId:res.data.orderId
                        }).then( res => {
                            requestPayment(1,res.data,()=>{
                                this.showToast('支付成功')
                            })
                        })
                    }
                })
                // #endif
            }
        }
    }
</script>

<style scoped lang="scss">
    .insurance-item{display: flex; margin-bottom: 24rpx; border-bottom: 1px solid #e6e6e6;
      .img{font-size: 0; flex-shrink: 0; margin-right: 12rpx;
        image{width: 240rpx; height: 148rpx;border-radius: 8rpx;}
      }
      .detail{flex: 1; display: inline-flex; flex-direction: column; justify-content: space-between;overflow: hidden;
        .info{
          .tit{font-size: 32rpx; line-height: 44rpx; font-weight: bold; margin-bottom: 8rpx; @include text-line(1);}
          .label{font-size: 24rpx; color: #666; line-height: 34rpx;white-space: nowrap;overflow: hidden;text-overflow:ellipsis;
            >text{position: relative; 
              &::after{content: '|'; margin: 0 12rpx;line-height: 34rpx;vertical-align: text-bottom;}
              &:last-of-type{
                &::after{display: none;}
              }
            }
          }
        }
        .price{color: #FF5000; font-size: 40rpx; font-weight: bold; line-height: 52rpx;
          >text{margin-left: 10rpx; font-size: 24rpx; font-weight: normal; line-height: 34rpx;}
        }
      }
    }
</style>
