<template>
    <view class="content">
        <view v-for="(item, index) in list" :key="index">
            <b-collapse ref="add" class="warp" @change="change"  v-for="(sub, key) in item.data" :key="key" thumb="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg" :open="false" :show-animation="true" :title="sub.subName">
                <view class="content">
                    <image lazy-load src="../../static/code.png" mode=""></image>
                    <view class="">
                        这是一个折叠的测试组件，具体样式等待微调
                    </view>
                </view>
        	</b-collapse>
        </view>
    </view>
</template>

<script>
    export default {
        data () {
            return {
                list: [
                    {
                        data: [{
                            type: true,
                            subName: '我是标题内容',
                            showAnimation: true,
                            content:'我这里是内容'
                        }]
                    }
                ]
            }
        },
        methods: {
            change(e) {}
        }
    }
</script>

<style>
    
</style>
