<template>
    <view class="content">
        <x-nav-bar :no-border="true" title="保障详情"></x-nav-bar>
        <!-- <view class="group group-top">
            <view class="group-item">
                <view class="left">投保年龄</view>
                <view class="right">28天-50周岁</view>
            </view>
            <view class="group-item">
                <view class="left">保障期限</view>
                <view class="right">终身（投保次日0点起效）</view>
            </view>
            <view class="group-item">
                <view class="left">等待期</view>
                <view class="right">90天（意外伤害无等待期）</view>
            </view>
            <view class="group-item">
                <view class="left">退保</view>
                <view class="right">15天内全额退款无手续费</view>
            </view>
        </view> -->
        <view class="group" v-for="(item,index) in list" :key="index">
            <view class="tit">
                <text>{{item.name}}{{item.isOption == 0 ? '' : '(可选)'}}</text>
                <text>{{item.ensureDetail}}</text>
            </view>
            <view class="detail">{{item.explain}}</view>
        </view>
        <!-- <view class="group">
            <view class="tit">
                <text>搭配保障</text>
                <text>可选</text>
            </view>
            <view class="group-child">
                <text class="name">健康宝：</text>
                <text>行期间因遭受意外伤害事故(含烫伤)，自意外伤害发生之日起180日内以该次意外伤害为直接原因导致身故、残疾的，保险人按照保险合同约定给付保险金。其中: (1) 身故:按照本项责任的保额给付保险金; (2) 伤残:根据《人身保险伤残评定标准》(中保协发 [2013] 88号)给付保险金。(豪 华计划最高赔付30万元，经典计。</text>
            </view>
            <view class="group-child">
                <text class="name">医生保：</text>
                <text>境内旅行期间因遭受意外伤害事故(含烫伤)，自意外伤害发生之日起180日内以该次意外伤害为直接原因导致身故、残疾的，保险人按照保险合同约定给付保险金。其中: (1) 身故:按照本项责任的保额给付保险金; (2) 伤残:根据《人身保险伤残评定标准》(中保协发 [2013] 88号)给付保险金。(豪 华计划最高赔付30万元，经典计。</text>
            </view>
        </view> -->
    </view>
</template>

<script>
    export default{
        data () {
            return {
                list: []
            }
        },
        onLoad(option) {
            if(option.id){
                this.getDetail(option.id)
            }
        },
        methods:{
            getDetail(id){
                this.$api.get('pdc/product/detail.do?id='+id).then( res => {
                    if(res.success){
                        this.list = res.data.productInsureDetailOutputList
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.content{padding: 24rpx 0;
    .group{width: 702rpx; background: #fff; border-radius: 12rpx; padding: 0 24rpx; margin: 18rpx 24rpx 0;
        &.group-top{margin-top: 0;}
        .group-item{display: flex; align-items: center; justify-content: space-between; font-size: 32rpx; padding: 24rpx 0;
            .left{flex-shrink: 0; line-height: 44rpx; width: 30%;}
            .right{ color: #999; line-height: 44rpx; flex-grow: 1; padding-left: 30rpx; text-align: right;}
        }
        .tit{display: flex; align-items: center; justify-content: space-between; font-size: 32rpx; line-height: 44rpx; padding: 24rpx 0;}
        .detail{font-size: 28rpx; line-height: 42rpx; color: #999; padding-bottom: 24rpx;}
        .group-child{color: #999; line-height: 42rpx; font-size: 28rpx;
            &:last-of-type{padding-bottom: 24rpx;}
            .name{color: #333;}
        }
    }
}
</style>
