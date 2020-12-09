<template>
    <view class="content">
        <x-nav-bar :no-border="true" title="填写信息"></x-nav-bar>
        <view class="top">
            <view class="flow">
                <view class="flow-item">
                    <view class="num">1</view>
                    <view class="txt">身份认证</view>
                </view>
                <view class="flow-item act">
                    <view class="num">2</view>
                    <view class="txt">填写信息</view>
                </view>
                <view class="flow-item">
                    <view class="num">3</view>
                    <view class="txt">人工审核</view>
                </view>
            </view>
        </view>
        <view class="info">
            <view class="group">
                <view class="tit">基础信息</view>
                <x-list-item title="性别" v-model="idInfo.sex" :msg="sexMsg"></x-list-item>
                <x-list-item title="出生日期">
                    <picker slot="right" mode="date" color="#FF5000" :value="date" disabled="disabled" @change="bindDateChange">
                        <view class="date-view">{{date}}</view>
                    </picker>
                </x-list-item>
                <x-list-item title="民族" :msg="mzMsg" @click="selMz"></x-list-item>
                <x-list-item title="政治面貌" :msg="zzMsg" @click="selZz"></x-list-item>
                <x-list-item title="文化程度" :msg="whMsg" @click="selWh"></x-list-item>
                <view class="item">
                    <view class="top">
                        <view class="left">是否持有保险经纪执业证号</view>
                        <view class="right">
                            <view :class="{act: practiceQualification == '1'}" @click="selBx('1')">是</view>
                            <view :class="{act: practiceQualification == '2'}" @click="selBx('2')">否</view>
                        </view>
                    </view>
                    <input v-show="practiceQualification==1" type="text" v-model="practiceCardBefore" placeholder-style="font-size: 32rpx; color: #999;" placeholder="请输入保险经纪执业证号">
                </view>
            </view>
            <view class="group">
                <view class="tit">分公司选择</view>
                <x-list-item  border="0" title="选择分公司" :msg="gsMsg" @click="selGs" ></x-list-item>
            </view>
        </view>
        <view class="sure" @click="isChecked = !isChecked">
            <radio style="transform:scale(0.7);" color="#FF5000" :checked="isChecked" ></radio>
            <view>我已阅读并确认<text @click.stop="openUrl('../ebook/userdeal')">《新禧保险经纪用户协议》</text>与<text @click.stop="openUrl('../ebook/extension')">《推广规则》</text></view>
        </view>
        <button class="btn" @click="validation">提交</button>
        <x-level-picker ref="sexPicker"
            v-model="sexVlaue"
            mode="selector"
            cancel-text="取消"
            confirm-text="确定"
            cancel-color="#999"
            confirm-color="#FF5000"
            :list="sexList"
            @confirm="handleConfirmSex"
        ></x-level-picker>
        <x-level-picker ref="selMz"
            v-model="mzVlaue"
            mode="selector"
            cancel-text="取消"
            confirm-text="确定"
            cancel-color="#999"
            confirm-color="#FF5000"
            :list="mzList"
            @confirm="handleConfirmMz"
        ></x-level-picker>
        <x-level-picker ref="selZz"
            v-model="zzVlaue"
            mode="selector"
            cancel-text="取消"
            confirm-text="确定"
            cancel-color="#999"
            confirm-color="#FF5000"
            :list="zzList"
            @confirm="handleConfirmZz"
        ></x-level-picker>
        <x-level-picker ref="selWh"
            v-model="whVlaue"
            mode="selector"
            cancel-text="取消"
            confirm-text="确定"
            cancel-color="#999"
            confirm-color="#FF5000"
            :list="whList"
            @confirm="handleConfirmWh"
        ></x-level-picker>
        <x-level-picker ref="selGs"
            v-model="gsVlaue"
            mode="selector"
            cancel-text="取消"
            confirm-text="确定"
            cancel-color="#999"
            confirm-color="#FF5000"
            :list="gsList"
            @confirm="handleConfirmGs"
        ></x-level-picker>
    </view>
</template>

<script>
	import { IdCard } from '@/common/api/index.js'
    export default{
        data () {
            return {
                sexVlaue: '',
				defaultSex:'',
                sexMsg: '请选择',
                sexList:[{label: '女',value: "0"},{label: '男',value: "1"}],
                date:'请选择',
                mzVlaue: '',
                mzMsg:'请选择',
                mzList:[],
                zzVlaue: '',
                zzMsg:'请选择',
                zzList:[],
                whVlaue: '',
                whMsg:'请选择',
                whList:[],
                practiceQualification: '2',
                gsVlaue: '',
                gsMsg:'请选择',
                gsList:[],
				idInfo: {},
				practiceCardBefore:"",
				code:'1',
                isChecked: false,
				gsDisabled:false,
				parentCompany:'ddd',
                loadBusy: false
            }
        },
		onLoad(option) {
			if (!!this.userinfo && Object.keys(this.userinfo).length == 0) {
				//没有用户信息返回登录页面
				uni.redirectTo({
					url: '/pages/my/login'
				});
			}
			//读取缓存信息
			if (!!this.idInfoCache && Object.keys(this.idInfoCache).length != 0) {
				this.idInfo = JSON.parse(JSON.stringify(this.idInfoCache));
			}
			if(option.idInfo){
				this.idInfo = JSON.parse(option.idInfo)
			}
			this.dicData()
			this.formatIdInfo()
		},
        methods:{
			
            selSex(){
                this.$refs.sexPicker.show()
            },
            handleConfirmSex(item){
                this.sexMsg = item.item.label
				this.idInfo.gander = item.value
            },
            bindDateChange(e) {
                this.date = e.target.value
				this.idInfo.birthDate = new Date(e.target.value.replace(/-/g, '/'))
				this.getAge()
            },
            selMz(){
                this.$refs.selMz.show()
            },
            handleConfirmMz(item){
                this.mzMsg = item.item.label
				this.idInfo.nation = item.item.value
            },
            selZz(){
                this.$refs.selZz.show()
            },
            handleConfirmZz(item){
                this.zzMsg = item.item.label
				this.idInfo.politicalStatus = item.item.value
            },
            selWh(){
                this.$refs.selWh.show()
            },
            handleConfirmWh(item){
                this.whMsg = item.item.label
				this.idInfo.education = item.item.value
            },
            selBx(val){
                if(this.practiceQualification == val) return
				this.practiceQualification = val
				this.idInfo.practiceQualification = val
            },
            selGs(){
				if(!this.gsDisabled){
					this.$refs.selGs.show()
				}
            },
            handleConfirmGs(item){
                this.gsMsg = item.item.label
				this.idInfo.applySubCompany = item.item.value
            },
			dicData(){
				this.$api.post('member/qualification/dictData.do').then( res => {
					let BranchOffice = res.data.BranchOffice,
						parentCompanyId = res.data.parentCompanyId
					console.log(BranchOffice)
				    if(res.success && res.data!=null){
						this.zzList = res.data.PoliticalStatus
						this.whList = res.data.Education
						this.mzList = res.data.Nation
						this.gsList = res.data.BranchOffice
						if(!res.data.parentCompanyId){
							this.gsDisabled = false
						}else{
							this.gsDisabled = true
							BranchOffice.map((item)=>{
								if(parentCompanyId==item.value){
									this.gsMsg = item.label
									this.idInfo.applySubCompany = item.value
								}
							})
						}
				    }
				})
			},
			getAge(){
                let birthdays = this.idInfo.birthDate
                let d = new Date();
                this.idInfo.age =  d.getFullYear() - birthdays.getFullYear() -  (d.getMonth() < birthdays.getMonth() || (d.getMonth() == birthdays.getMonth() && d.getDate() < birthdays.getDate()) ? 1 : 0);
			},
			validation(){
				if(!this.idInfo.gander){
					this.showToast('请选择性别');
					return;
				}
				if(!this.idInfo.birthDate){
					this.showToast('请输入出生日期');
					return;
				}
				if(!this.idInfo.nation){
					this.showToast('请选择民族');
					return;
				}
				if(!this.idInfo.politicalStatus){
					this.showToast('请选择政治面貌');
					return;
				}
				if(!this.idInfo.education){
					this.showToast('请选择文化程度');
					return;
				}
				if(this.idInfo.practiceQualification=='1' && this.practiceCardBefore==''){
					this.showToast('请填写保险经纪执业证号');
					return;
				}
                if(!this.isChecked){
                    this.showToast('请阅读规则')
                    return
                }
				if(!this.idInfo.applySubCompany){
					this.showToast('请选择分公司');
					return;
				}
				this.idInfo.practiceQualification = this.practiceQualification
				this.idInfo.practiceCardBefore = this.practiceCardBefore
				//证件类型 默认1 以后再改
				this.idInfo.licenseType = "1"
				this.submitReview()
			},
			submitReview(){
				console.log(this.idInfo)
                if (this.loadBusy) return
                this.loadBusy = true
				this.$api.post('member/qualification/submitReview.do',this.idInfo).then( res => {
				    if(res.success){
                        this.loadBusy = false
						this.showToast('提交成功')
						setTimeout(()=>{
							this.openUrl('./audit?code='+this.code+'&type=1')
						},1000)
				    }
				})
			},
			formatIdInfo(){
				if(IdCard(this.idInfo.licenseNumber,2) ==="女"){
					this.sexMsg = "女"
					this.idInfo.gander = "0"
				}else{
					this.sexMsg = "男"
					this.idInfo.gander = "1"
				}
				this.date = IdCard(this.idInfo.licenseNumber,1)
				this.idInfo.birthDate = new Date(IdCard(this.idInfo.licenseNumber,1).replace(/-/g, '/'))
				this.getAge()
			}
        }
    }
</script>

<style lang="scss" scoped>
.content{padding: 0 24rpx;
    .top{
        .flow{display: flex; padding: 24rpx 32rpx; justify-content: space-between;
            .flow-item{
                .num{width: 44rpx; height: 44rpx; border: 2rpx solid #999; text-align: center; line-height: 40rpx; border-radius: 50%; font-size: 28rpx; margin: 0 auto; position: relative;
                    &::after{width: 124rpx; height: 2rpx; background: #999; content: ''; position: absolute; top: 50%; transform: translateY(-50%); left: 92rpx;}
                }
                .txt{margin-top: 12rpx; font-size: 28rpx; color: #999;}
                &.act{
                    .num{border-color: $xinxii-theme-color; background: $xinxii-theme-color; color: #ffffff;}
                    .txt{color: $xinxii-theme-color;}
                }
                &:last-of-type{
                    .num{
                        &::after{display: none;}
                    }
                }
            }
        }
    }
    .group{background: #fff; border-radius: 12rpx; margin-bottom: 18rpx;
        .tit{font-size: 32rpx; font-weight: bold; line-height: 44rpx; padding: 24rpx 24rpx 0;}
        .date-view{position: absolute; width: 100%; height: 100%; line-height: 88rpx; left: 0; top: 0; text-align: right; padding-right: 24rpx;}
        .item{ padding: 0 24rpx 24rpx;
            .top{display: flex; justify-content: space-between; align-items: center; margin-top: 24rpx;
                .left{font-size: 32rpx;}
                .right{display: flex; align-items: center;
                    >view{width: 102rpx; height: 44rpx; text-align: center; line-height: 40rpx; border: 2rpx solid #999; border-radius: 30rpx; color: #999; font-size: 28rpx; margin-left: 24rpx;
                        &.act{border-color: $xinxii-theme-color; color: $xinxii-theme-color;}
                    }
                }
            }
            input{border-bottom: 2rpx solid #F0F0F0; padding: 24rpx 0; height: 88rpx;}
        }
    }
    .sure{display: flex; align-items: center; margin: 48rpx 0 18rpx;
        view{font-size: 24rpx; margin-left: 6rpx;
            >text{color: $xinxii-theme-color;}
        }
    }
    .btn{ border-radius: 8rpx; width: 702rpx; height: 88rpx; line-height: 88rpx; font-size: 32rpx; color: #fff; font-weight: bold; background-color: $xinxii-theme-color;}
}  
</style>
