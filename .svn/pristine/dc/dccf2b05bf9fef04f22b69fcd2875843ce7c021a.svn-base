<template>
    <view class="content">
		<!-- #ifndef H5 -->
        <x-nav-bar :no-border="true" :title="title">
            <view slot="right" class="top-right"  @click="share">
                <image lazy-load src="../../page_other/static/share_ioc.png" mode=""></image>
            </view>
        </x-nav-bar>
		<!-- #endif -->
        <view class="banner-box">
           <!-- <view v-show="showProgress">
                <progress :percent="percent" active stroke-width="3" />
            </view> -->
           <view :class="detail.isBanner == 0 ? 'isBanner' : 'noBanner'">
				<image lazy-load :src="detail.picture" mode="aspectFill"></image>
				<view class="banner-content" v-if="detail.isBanner == 1">
					<text>{{detail.name}}</text>     
				</view>
			</view>
        </view>
        <view class="info">
            <view class="tit">{{detail.name}}</view>
            <view class="info-del">该产品由{{detail.producerName}}承保</view>
        </view>
        <view class="cont">
            <view class="tab-box">
                <view class="tab-item" :class="{act : current == 1}" @click="selTab(1)">保障范围</view>
                <view class="tab-item" :class="{act : current == 2}" @click="selTab(2)">产品信息</view>
                <view class="tab-item" :class="{act : current == 3}" @click="selTab(3)">产品资料</view>
            </view>
            <view v-show="current == 1">
                <view class="detail">
                    <view class="group">
                        <view class="tit">产品特色</view>
                        <view class="txt-cont">
                            <text class="txt">{{detail.specialInfo}}</text>
                        </view>
                    </view>
                    <view class="group">
                        <view class="tit">
                            <text>保障权益</text>
                            <text class="detail-btn" @click="openUrl('./safedetail?id=' + id)">权益详情</text>
                        </view>
                        <view class="list" v-if="detail.productInsureDetailOutputList">
                            <view class="list-item" v-for="(item,index) in detail.productInsureDetailOutputList" :key="index">
                                <view class="left">{{item.name}}{{item.isOption == 0 ? '' : '(可选)'}}</view>
                                <view class="right">{{item.ensureDetail}}</view>
                            </view>
                        </view>
                    </view>
                </view>
                
            </view>
            <view v-show="current == 2">
                <view class="group">
                    <view class="tit">
                        <text>基本信息</text>
                    </view>
                    <view class="list" v-if="detail.productInsureOutput">
                        <view class="list-item">
                            <view class="left">保障期限</view>
                            <view class="right">{{detail.productInsureOutput.ensureTime}}</view>
                        </view>
                        <view class="list-item">
                            <view class="left">投保年龄</view>
                            <view class="right">{{detail.productInsureOutput.ageStr}}</view>
                        </view>
                        <view class="list-item">
                            <view class="left">职业类别</view>
                            <view class="right">{{detail.productInsureOutput.jobType}}</view>
                        </view>
                        <view class="list-item">
                            <view class="left">缴费方式</view>
                            <view class="right">{{detail.productInsureOutput.payType}}</view>
                        </view>
                        <view class="list-item" v-if="detail.productInsureOutput.hesitPeriod && detail.productInsureOutput.hesitPeriod !==''">
                            <view class="left">犹豫期</view>
                            <view class="right">{{detail.productInsureOutput.hesitPeriod}}</view>
                        </view>
                        <view class="list-item" v-if="detail.productInsureOutput.waitPeriod && detail.productInsureOutput.waitPeriod !==''">
                            <view class="left">等待期</view>
                            <view class="right">{{detail.productInsureOutput.waitPeriod}}</view>
                        </view>
                        <view class="list-item" v-if="detail.productInsureOutput.waitDetail && detail.productInsureOutput.waitDetail !==''">
                            <view class="left">等待期说明</view>
                            <view class="right">{{detail.productInsureOutput.waitDetail}}</view>
                        </view>
                       <!-- <view class="list-item" v-if="detail.productInsureOutput.isDeduct && detail.productInsureOutput.isDeduct!==''">
                            <view class="left">是否免赔</view>
                            <view class="right">{{detail.productInsureOutput.isDeduct}}</view>
                        </view>
                        <view class="list-item" v-if="detail.productInsureOutput.deductDetail && detail.productInsureOutput.deductDetail!==''">
                            <view class="left">免赔额说明</view>
                            <view class="right">{{detail.productInsureOutput.deductDetail}}</view>
                        </view>
                        <view class="list-item" v-if="detail.productInsureOutput.deductScale && detail.productInsureOutput.deductScale!==''">
                            <view class="left">免赔比例</view>
                            <view class="right">{{detail.productInsureOutput.deductScale}}</view>
                        </view>
                        <view class="list-item">
                            <view class="left">生效时间</view>
                            <view class="right">T+{{detail.newEffect}}</view>
                        </view> -->
                    </view>
                </view>
                <view class="group" v-if="detail.productInfomationFileOutputList">
                    <view class="tit">
                        <text>产品条款</text>
                    </view>
                    <view class="list">
                        <view v-for="(item,index) in detail.productInfomationFileOutputList" :key="index">
                            <x-list-item class="x-list-item" @click="openFile(item.path)" :border="(detail.productInfomationFileOutputList.length==(index+1)) ? 0 : 1" :title="getFileName(item.name)"></x-list-item>
                        </view>
                    </view>
                </view>
            </view>
            <view v-show="current == 3">
                <x-rich-text class="rich-text" :html="detail.detail"></x-rich-text>
            </view>
        </view>
		<view class="trial-btn" @click="toReckon" v-if="detail.trialType">
			<image src="../../static/trial-btn.png" mode=""></image>
		</view>
        <view class="footer">
            <view class="price">
                <image lazy-load src="@/static/product/product_money.png" mode=""></image>
				<text>{{detail.inPrice ? Number(detail.inPrice).toFixed(2) : '0.00' }}</text><text class="sec-text">元/起</text>
            </view>
            <!-- <view class="sure" @click="isChecked = !isChecked">
                <radio style="transform:scale(0.7);" color="#FF5000" :checked="isChecked" ></radio>
                <view>我已阅读<text @click.stop="toProductNotify(detail.insuranceLink)">产品告知书</text></view>
            </view> -->
            <button class="btn" @click="toPay(detail.insuranceLink)">立即投保</button>
        </view>
		
        <b-share-wechat :url="url" :title="detail.name" :imageUrl="detail.picture+'?imageMogr2/thumbnail/200x200'" :summary="summary" typeNumber=0 :show="show" @click="show = false"></b-share-wechat>
		<x-modal ref="modal" title="您还未登录" cancelText="继续投保" confirmText="登录" content="加入新禧保险经纪，申请执业资质，认证通过后可享禧小保全平台推广费。" @cancel="insure(detail.insuranceLink)" @sure="sure" ></x-modal>
        <x-modal ref="modal1" title="您还未成为认证经纪人" cancelText="继续投保" confirmText="立即认证" content="加入新禧保险经纪，申请执业资质，认证通过后可享禧小保全平台推广费。" @cancel="insure(detail.insuranceLink)" @sure="certification" ></x-modal>
        <x-modal ref="modal2" title="您还未登录" confirmText="登录" content="是否立即登录" @sure="sure" ></x-modal>
    </view>
</template>

<script>
    import constVal from '../../common/utils/constval.js'
    import {downloadFile} from '../../common/utils'
    import { mapState } from 'vuex'
    export default {
        computed: mapState(['isLogin','userinfo']),
        data () {
            return {
                current: 1,
                detail: {},
                id: '',
                url: '',
                show: false,
                summary: '',
                isChecked: false,
                title: '详情页',
                percent: 0 ,// 进度条数值
                showProgress: false // 进度条显示
            }
        },
        onShow() {
            this.show = false
        },
        watch:{
            percent(newVal,oldVal){
                if(newVal > 0 && newVal < 100){
                    this.showProgress = true
                }else{
                    this.showProgress = false
                }
            }
        },
        onLoad(option) {
			console.log(option)
            if(option.id){
                this.id = option.id
                this.getDetail(option.id)
            }
        },
        methods:{
			getFileName(name){
			 	var str = name.split(".")
			 	return str[0]
			},
			sure(){
				this.openUrl('../my/login')
			},
            share(){
                if(!this.isLogin){
					this.$refs.modal2.open()
                    return
                }
                this.show = true
                this.url = constVal.UPLOAD_IMG_URL + 'broker/pages/product/detail?id='+ this.id
                this.summary = this.detail.specialInfo
            },
            selTab(val){
                if(this.current == val) return
                this.current = val
            },
            getDetail(id){
                this.$api.get('pdc/product/detail.do?id='+id).then( res => {
					console.log(res.data)
                    if(res.success){
                        this.detail = res.data
                        this.title = this.detail.name
                    }
                })
            },
            certification(){
                if(this.userinfo.reviewResultCode.code){
                    this.openUrl('../join/audit?code='+this.userinfo.reviewResultCode.code+'&reason='+this.userinfo.reviewResultCode.reason)
                }else{
                    this.openUrl('../join/identity')
                }
            },
            toPay(url){
                // #ifndef H5
                if(!this.isLogin){
                	this.$refs.modal.open()
                    return
                }else{
                    if(this.userinfo.reviewResultCode&&this.userinfo.reviewResultCode.code==5){
                        this.insure(url)
                    }else{
                        this.$refs.modal1.open()
                    }
                }
                // #endif
                // #ifdef H5
                this.insure(url)
                // #endif
                
            },
            insure(url){
                let data = {
                    url,
                    type: this.detail.insuranceType,
                    linkType: this.detail.linkType,
                    name:this.detail.producerName
                }
                uni.navigateTo({
                    url: '../ebook/productnotify?data=' + encodeURIComponent(JSON.stringify(data))
                })
            },
			toReckon(){
				let trialData = {
					producerCode:this.detail.producerCode,
					serialNumber:this.detail.serialNumber,
					trialType:this.detail.trialType,
					rateType:this.detail.rateType,
					insuranceLink:this.detail.insuranceLink,
					type: this.detail.insuranceType,
					linkType: this.detail.linkType,
					name:this.detail.producerName
				}
				
				uni.navigateTo({
					url:'../reckon/' + this.detail.serialNumber + '?data=' + encodeURIComponent(JSON.stringify(trialData))
					// url:'./test?data=' + encodeURIComponent(JSON.stringify(trialData))
				})
			},
            // toProductNotify(url){
            //     uni.navigateTo({
            //         url: '../ebook/productnotify?url=' + url + '&type=' + this.detail.insuranceType
            //     })
            // },
            openFile(url){ // 打开PDF word doc
                // #ifndef H5
                downloadFile(url)
                // #endif
            }
        }
    }
</script>

<style lang="scss" scoped>
.top-right{font-size: 0; display: flex; align-items: center; justify-content: center; width: 100%;
    image{width: 40rpx; height: 40rpx;}
}
.content{padding-bottom: 116rpx;}
.rich-text{padding: 0;}
.banner-box{font-size: 0;position: relative;
    image{width: 100%; height: 346rpx;}
	.banner-content{position: absolute;left:0;bottom:0;width: 100%;background: rgba(7, 7, 7,.29);padding: 24rpx;
		text{display: block;font-size: 40rpx;font-weight: 500;color: #FFFFFF;line-height: 60rpx;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
	}
}
.info{background: #fff; padding: 0 24rpx;
    .tit{font-size: 32rpx; font-weight: bold; line-height: 44rpx; padding: 12rpx 0; border-bottom: 1px solid #F0F0F0;}
    .info-del{ padding: 12rpx 0; font-size: 28rpx; color: #999;}
}
.cont{padding: 0 24rpx;
    .tab-box{width: 702rpx; height: 88rpx; background: #fff; display: flex; align-items: center; justify-content: space-between; padding: 0 24rpx; margin: 24rpx 0 18rpx;
        .tab-item{text-align: center; font-size: 32rpx; position: relative; height: 88rpx; line-height: 88rpx;
            &.act{color: $xinxii-theme-color;
                &::after{content: ''; position: absolute; left: 50%; bottom: 0; transform: translateX(-50%); width: 96rpx; height: 4rpx; background: $xinxii-theme-color;}
            }
        }
    }
    .group{width: 702rpx; border-radius: 12rpx; background: #fff; margin-bottom: 18rpx; padding: 0 24rpx;
        .tit{display: flex; justify-content: space-between; align-items: center; font-size: 32rpx; font-weight: bold; line-height: 44rpx; padding-top: 22rpx;
            .detail-btn{font-weight: bold; font-size: 28rpx; color: $xinxii-theme-color;}
        }
        .txt-cont{padding-bottom: 24rpx;
            text{font-size: 28rpx; line-height: 44rpx;}
        }
        .list{
            .list-item{display: flex; align-items: center; justify-content: space-between; line-height: 40rpx; padding: 24rpx 0; border-bottom: 1px solid #F0F0F0; font-size: 32rpx;
                &:last-of-type{border: none;}
                .left{width: 30%; flex-shrink: 0;}
                .right{flex-grow: 1; text-align: right;}
            }
            .x-list-item{padding: 0;}
        }
    }
}
.sure{font-size: 28rpx; padding: 24rpx; color: #999; display: flex; align-items: center; position: fixed; left: 0; bottom: 100rpx; width: 100%; background: #fff;
    text{color: $xinxii-theme-color;}
}
.trial-btn{position: fixed;width: 96rpx;height: 96rpx;right: 48rpx;bottom: 200rpx;padding: 0;border-radius: 50%;background-color: $xinxii-theme-color;box-shadow: 0 4rpx 8rpx 0 rgba(0, 0, 0, 0.21);font-size: 24rpx;font-weight: 400;color: #ffffff;text-align: center;line-height: 30rpx;z-index: 2;display: flex;align-items: center;justify-content: center;
	image{width: 96rpx;height: 96rpx;}
}
.footer{position: fixed; left: 0; bottom: 0; height: 100rpx; background: #fff; display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 0 24rpx;
    .price{display: flex; align-items: center; font-size: 0; color: $xinxii-font-price;
        image{width: 32rpx; height: 32rpx; margin-right: 12rpx;}
        text{font-size: 32rpx; font-weight: bold; line-height: 40rpx;
			&.sec-text{font-size: 24rpx;font-weight: normal;margin-left: 8rpx;}
		}
		
    }
    .btn{width: 144rpx; height: 60rpx; line-height: 60rpx; border-radius: 30rpx; background-color: $xinxii-theme-color; font-size: 28rpx; color: #fff;}
}
</style>
