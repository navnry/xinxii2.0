<template>
    <view class="content">
        <x-nav-bar title="新禧公众号">
            <view slot="right" class="top-right"  @click="share">
                <!-- <image lazy-load src="../../static/share_ioc.png" mode=""></image> -->
                <x-icon type="share"></x-icon>
            </view>
        </x-nav-bar>
        <view class="cont">
            <image lazy-load :src="url" mode=""></image>
        </view>
        <b-share-wechat :imageUrl="url" :typeNumber="2" :show="show" @click="show = false"></b-share-wechat>
    </view>
</template>

<script>
    export default{
        data () {
            return {
                url: 'http://xinxii-1302479696.cos.ap-guangzhou.myqcloud.com/logo/public_bg.png',
                show: false
            }
        },
        methods:{
            share(){
                this.show = true
            }
        }
    }
</script>

<style lang="scss" scoped>
.top-right{font-size: 0; display: flex; align-items: center; justify-content: center; width: 100%;
    image{width: 40rpx; height: 40rpx;}
}
.cont{font-size: 0; width: 702rpx; height: 986rpx; margin: 108rpx auto 0;
    image{width: 100%; height: 100%;}
}
</style>
