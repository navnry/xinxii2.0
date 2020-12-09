<template>
    <view class="content">
        <x-nav-bar title="协议和规则"></x-nav-bar>
        <view class="list">
            <!-- <x-list-item title="计划书使用条款"></x-list-item> -->
			<x-list-item title="个人信息使用授权书" @click="openUrl('../ebook/personal')"></x-list-item>
			<x-list-item title="推广规则" @click="openUrl('../ebook/extension')"></x-list-item>
			<x-list-item title="新禧保险经纪用户协议" @click="openUrl('../ebook/userdeal')"></x-list-item>
            <x-list-item title="隐私政策" @click="openUrl('../ebook/privacypolicy')"></x-list-item>
            <x-list-item title="用户注册及使用协议" @click="openUrl('../ebook/register')" border="0"></x-list-item>
            <!-- <x-list-item title="用户分析服务协议" border="0"></x-list-item> -->
        </view>
    </view>
</template>

<script>
    export default{
        data () {
            return {
                
            }
        },
        methods:{
            
        }
    }
</script>

<style lang="scss" scoped>
.list{background-color: #fff;}
</style>
