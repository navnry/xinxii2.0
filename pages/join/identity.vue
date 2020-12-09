<template>
	<view class="content">
		<x-nav-bar :no-border="true" title="身份认证"></x-nav-bar>
		<view class="top">
			<view class="flow">
				<view class="flow-item act">
					<view class="num">1</view>
					<view class="txt">身份认证</view>
				</view>
				<view class="flow-item">
					<view class="num">2</view>
					<view class="txt">填写信息</view>
				</view>
				<view class="flow-item">
					<view class="num">3</view>
					<view class="txt">人工审核</view>
				</view>
			</view>
			<view class="tip">依照行业监管要求，本平台将通过银保监会官方渠道验证您的资质，您的个人信息将严格保密。</view>
		</view>
		<view class="info">
			<view class="group">
				<view class="tit">身份认证</view>
				<x-input class="list-item" leftText="姓名" type="text" v-model="idInfo.name" placeholder="请填写您的姓名"></x-input>
				<x-input class="list-item input-item" leftText="身份证件号码" maxlength="18" type="text" v-model="idInfo.licenseNumber" placeholder="请填写您的身份号码"></x-input>
			</view>
			<view class="group">
				<view class="tit">上传身份证照片</view>
				<view class="photo-box">
					<view class="photo" @click="chooseImage('PHOTO_FRONT')"><image lazy-load class="bg" :src="idInfo.photoFront + '?imageView2/1/w/158/h/98'" mode=""></image></view>
					<view class="photo" @click="chooseImage('PHOTO_REVERSE')"><image lazy-load class="bg" :src="idInfo.photoReverse + '?imageView2/1/w/158/h/98'" mode=""></image></view>
				</view>
				<view class="tips">
					<view class="txt">如下图示范：</view>
					<view class="tip">*请确保身份证照片信息真实有效，清晰可读</view>
				</view>
				<view class="code-box">
					<view class="code-item">
						<image lazy-load class="bg" src="@/static/join/join_item_01.png" mode=""></image>
						<image lazy-load class="status" src="@/static/join/join_check_win.png" mode=""></image>
						<view class="txt">标准</view>
					</view>
					<view class="code-item">
						<image lazy-load class="bg" src="@/static/join/join_item_02.png" mode=""></image>
						<image lazy-load class="status" src="@/static/join/join_check_err.png" mode=""></image>
						<view class="txt">缺损</view>
					</view>
					<view class="code-item">
						<image lazy-load class="bg" src="@/static/join/join_item_03.png" mode=""></image>
						<image lazy-load class="status" src="@/static/join/join_check_err.png" mode=""></image>
						<view class="txt">模糊</view>
					</view>
					<view class="code-item">
						<image lazy-load class="bg" src="@/static/join/join_item_04.png" mode=""></image>
						<image lazy-load class="status" src="@/static/join/join_check_err.png" mode=""></image>
						<view class="txt">强光</view>
					</view>
				</view>
			</view>
			<view class="group">
				<view class="tit">上传一寸人脸照片</view>
				<view class="img-box" @click="chooseImage('USER_PHOTO')"><image lazy-load :src="idInfo.formalPhotos + '?imageView2/1/w/86/h/103'" mode=""></image></view>
				<view class="tips">
					<view class="txt">注意事项</view>
					<view class="tip">
						*请确保照片是一寸免冠
						<text>白底</text>
						照片
					</view>
				</view>
			</view>
		</view>
		<button class="btn" @click="next">下一步</button>
	</view>
</template>

<script>
import { updateUserinfo } from '@/common/api'
import { IdentityCodeValid ,uploadImage} from '@/common/utils'
// import constVal from '../../common/utils/constval.js'
import constVal from '@/common/utils/constval.js'
import { mapState } from 'vuex'
export default {
	data() {
		return {
			idInfo: {
				//userId: '',
				name: '',
				licenseNumber: '',
				photoFront: '@/static/join/join_code_front.png',
				photoReverse: '@/static/join/join_code_reverse.png',
				formalPhotos: '@/static/join/join_photo.png'
			}
		};
	},
	computed: { ...mapState(['userinfo', 'idInfoCache']) },
	onLoad() {
		if (!!this.userinfo && Object.keys(this.userinfo).length == 0) {
			//没有用户信息返回登录页面
			uni.redirectTo({
				url: '/pages/my/login'
			});
		}
		//读取缓存信息
		// if (!!this.idInfoCache && Object.keys(this.idInfoCache).length != 0) {
		// 	this.idInfo = JSON.parse(JSON.stringify(this.idInfoCache));
		// }
		// this.idInfo.photoFront ='https://xinxii-dev-1302479696.picgz.myqcloud.com/logo/1595398540243.jpg'
		// this.idInfo.photoReverse ='https://xinxii-dev-1302479696.picgz.myqcloud.com/logo/1595398540243.jpg'
		// this.idInfo.formalPhotos ='https://xinxii-dev-1302479696.picgz.myqcloud.com/logo/1595398540243.jpg'
	},
	methods: {
		chooseImage(key) {
            let url = constVal.UPLOAD_IMG_URL+'mobile/file/img/upload2.do',
				count = 1
            uploadImage(url,key,count,this.userinfo.token,(res)=>{
                console.log(res);
                switch (key) {
                    case 'PHOTO_FRONT':
                        this.idInfo.photoFront = res.data.path
                        break
                    case 'PHOTO_REVERSE':
                        this.idInfo.photoReverse = res.data.path
                        break
                    case 'USER_PHOTO':
                        this.idInfo.formalPhotos = res.data.path
                        break
                }
            })
		},
		next() {
			if (!this.idInfo.name) {
				this.showToast('请输入姓名')
				return
			}
            let nameReg = /^[\u4e00-\u9fa5_a-zA-Z]+$/ 
            if(!nameReg.test(this.idInfo.name)){
                this.showToast('姓名仅支持中文或英文')
                return
            }
            this.idInfo.licenseNumber = this.idInfo.licenseNumber.trim()
			if (!this.idInfo.licenseNumber) {
				this.showToast('请输入身份证件号码')
				return
			}
            if(!IdentityCodeValid(this.idInfo.licenseNumber)){
                this.showToast('请输入正确身份证件号码')
                return
            }
			if (this.idInfo.photoFront == '@/static/join/join_code_front.png') {
				this.showToast('请上传身份证人脸面')
				return
			}
			if (this.idInfo.photoReverse == '@/static/join/join_code_reverse.png') {
				this.showToast('请上传身份证国徽面')
				return
			}
			if (this.idInfo.formalPhotos == '@/static/join/join_photo.png') {
				this.showToast('请上传一寸人脸照片')
				return
			}
			let params = JSON.stringify(this.idInfo)
			uni.navigateTo({ url: './fillmsg?idInfo=' + params })
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	padding: 0 24rpx 48rpx;
	.top {
		.flow {
			display: flex;
			padding: 24rpx 32rpx;
			justify-content: space-between;
			.flow-item {
				.num {width: 44rpx;height: 44rpx;border: 2rpx solid #999;text-align: center;line-height: 40rpx;border-radius: 50%;font-size: 28rpx;margin: 0 auto;position: relative;
					&::after {width: 124rpx;height: 2rpx;background: #999;content: '';position: absolute;top: 50%;transform: translateY(-50%);left: 92rpx;}
				}
				.txt {margin-top: 12rpx;font-size: 28rpx;color: #999;}
				&.act {
					.num {border-color: $xinxii-theme-color;background: $xinxii-theme-color;color: #FFFFFF;}
					.txt {color: $xinxii-theme-color;}
				}
				&:last-of-type {
					.num {
						&::after {display: none;}
					}
				}
			}
		}
		.tip {color: $xinxii-theme-color;font-size: 24rpx;line-height: 36rpx;}
	}
	.info {
		.group {border-radius: 12rpx;background: #fff;padding: 0 24rpx;margin-top: 18rpx;
			&:first-of-type {margin-top: 24rpx;}
			.tit {font-size: 32rpx;font-weight: bold;line-height: 44rpx;padding-top: 24rpx;}
			.input-item {border: none;}
			.list-item {text-align: right;}
			.photo-box {display: flex;justify-content: space-between;margin: 24rpx 0;
				.photo {width: 316rpx;height: 196rpx;
					.bg {width: 100%;height: 100%;}
				}
			}
			.tips {color: #999;
				.txt {font-size: 28rpx;}
				.tip {font-size: 24rpx;padding: 12rpx 0 24rpx;
					> text {color: $xinxii-theme-color;}
				}
			}
			.code-box {display: flex;justify-content: space-between;padding-bottom: 24rpx;
				.code-item {width: 126rpx;position: relative;text-align: center;font-size: 0;
					.bg {width: 100%;height: 100rpx;}
					.status {width: 32rpx;height: 32rpx;position: absolute;left: 50%;transform: translateX(-50%);top: 84rpx;}
					.txt {font-size: 24rpx;margin-top: 28rpx;}
				}
			}
			.img-box {font-size: 0;
				image {width: 172rpx;height: 206rpx;margin: 24rpx 0;}
			}
		}
	}
	.btn {margin: 48rpx auto 0;border-radius: 8rpx;width: 702rpx;height: 88rpx;line-height: 88rpx;font-size: 32rpx;color: #fff;font-weight: bold;background-color: $xinxii-theme-color;}
}
</style>