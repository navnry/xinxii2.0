<template>
    <view class="content">
        <x-nav-bar title="反馈与建议"></x-nav-bar>
        <view class="classify">
            <view class="tit">所属分类</view>
            <view class="list">
                <view class="item" :class="{act : current == 1}" @click="selTab(1)">体验问题</view>
                <view class="item" :class="{act : current == 2}" @click="selTab(2)">订单问题</view>
                <view class="item" :class="{act : current == 3}" @click="selTab(3)">交易问题</view>
                <view class="item" :class="{act : current == 4}" @click="selTab(4)">提现问题</view>
                <view class="item" :class="{act : current == 5}" @click="selTab(5)">产品问题</view>
                <view class="item" :class="{act : current == 6}" @click="selTab(6)">活动问题</view>
                <view class="item" :class="{act : current == 7}" @click="selTab(7)">新功能建议</view>
                <view class="item" :class="{act : current == 8}" @click="selTab(8)">其他</view>
            </view>
            <textarea v-model="fromData.content"  placeholder="请写下你的反馈和建议，非常感谢…" @input="input" maxlength="500" placeholder-style="font-size: 28rpx; color: #999;" />
        </view>
        <view class="img-box">
            <view class="img-item" v-for="(item,index) in picList" :key="index">
                <x-icon class="img-item-del" type="del" size="36" @click="removeImage(index)"></x-icon>
				<image lazy-load :src="item" mode="aspectFill" @click="openImg(picList,index)"></image>
			</view>
            <view class="add" @click="chooseImage('PHOTO_FEEDBACK')" v-show="addShow">+</view>
        </view>
        <button class="btn" @click="next()">提交</button>
    </view>
</template>

<script>
	import { mapState } from 'vuex'
    import {uploadImage} from '@/common/utils'
    import constVal from '@/common/utils/constval'
	 import { bigImg } from '@/common/api'
    export default{
        data () {
            return {
				fromData:{
					type: 1,
					content:'',
					imageUrl:''
				},
				current:1,
				picList:[],
				addShow:true
            }
        },
		computed: { ...mapState(['userinfo']) },
        methods:{
            selTab(val){
                if(this.current == val) return
                this.current = val
            },
			feedBackSubmit(){
				this.$api.post('system/feedBack/submitFeedBack.do',this.fromData).then( res => {
				    if(res.success){
						this.showToast('提交成功')
						setTimeout(()=>{
							this.backPage()
						},1000)
				    }
				})
			},
			next(){
				if(!this.fromData.content){
					this.showToast('请输入反馈和建议');
					return;
				}
				if(this.picList.length > 0 ){
					this.fromData.imageUrl = this.picList.join(",")
				}
				this.fromData.type = this.current
				this.feedBackSubmit()
			},
			removeImage(index){
				this.picList.pop(index)
				if(this.picList.length < 3){
					this.addShow = true
				}
			},
            input(){
                if(this.fromData.content.length >= 500){
                    this.showToast('最多输入500个字')
                }
            },
			chooseImage(key) {
				let count 
				this.picList.length == 0 ? count = 3 : (this.picList.length == 1 ? count = 2 : count = 1)
				 //多选3张图片
                let url = constVal.UPLOAD_IMG_URL+'mobile/file/img/upload2.do'
				uploadImage(url,key,count,this.userinfo.token,(res) => {
                    this.picList.push(res.data.path)
                    if(this.picList.length >= 3){
                    	this.addShow = false
                    }
                })
			},
			openImg(urls,i){
			    bigImg(urls,i)
			},
        }
    }
</script>

<style lang="scss" scoped>
.content{position: absolute; left: 0; top: 0; min-height: 100%; width: 100%; background: #fff; padding: 0 24rpx;
    .classify{
        .tit{font-size: 32rpx; line-height: 44rpx; font-weight: bold; padding: 24rpx 0;}
        .list{display: flex; flex-wrap: wrap;
            .item{width: 218rpx; height: 80rpx; border: 2rpx solid #979797; line-height: 76rpx; text-align: center; font-size: 28rpx; margin-bottom: 24rpx; margin-right: 24rpx;
                &.act{color: $xinxii-theme-color; border-color: $xinxii-theme-color;}
                &:nth-of-type(3n){margin-right: 0;}
            }
        }
    }
    textarea{font-size: 28rpx; margin: 24rpx 0; width: 100%;}
    .img-box{font-size: 0; display: flex; flex-wrap: wrap;
		.img-item{position: relative;
            .img-item-del{width: 36rpx; height: 36rpx; position: absolute; top:-30rpx; right: 0; z-index: 10;}
			image{width: 200rpx; height: 200rpx; margin-right: 20rpx; margin-bottom: 24rpx;}
		}
        .add{width: 200rpx; height: 200rpx; background: #F0F0F0; color: #fff; font-size: 120rpx;line-height: 1; text-align: center;display: flex;align-items: center;justify-content: center;}
    }
    .btn{width: 702rpx; height: 88rpx; line-height: 88rpx; text-align: center; background: $xinxii-theme-color; color: #fff; font-size: 32rpx; margin-top: 24rpx;}
}
</style>
