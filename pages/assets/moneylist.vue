<template>
    <view class="content">
        <x-nav-bar :no-border="true" title="资金明细"></x-nav-bar>
     <!--   <x-level-picker ref="selType"
            v-model="typeVlaue"
            mode="selector"
            cancel-text="取消"
            confirm-text="确定"
            cancel-color="#999"
            confirm-color="#FF5000"
            :list="typeList"
            @confirm="handleConfirmType"
        ></x-level-picker>
        <view class="type-box" @click="selType">
            <view>
                <text>{{typeMsg}}</text>
                <image lazy-load src="@/static/assets/assets_type.png" mode=""></image>
            </view>
        </view> -->
        <view class="list">
           <!-- <view class="top">
                <view class="left">
                    <picker mode="date" color="#FF5000" :value="date" fields="month" @change="bindDateChange">
                        <view class="date-view">{{date}}</view>
                        <text>{{date}}</text>
                        <image lazy-load src="@/static/assets/assets_triangle.png" mode=""></image>
                    </picker>
                </view>
                <view class="right">
                    <text>月收入¥199</text>
                    <text>月提现¥5333</text>
                </view>
            </view> -->
          <!--  <view class="item" v-if="list.length>0">
                <view class="item-top">2020年8月</view>
                <view class="item-child" v-for="item in list" :key="item.id" @click="openUrl('./moneydetail?id='+item.id)">
                    <view class="left">
                        <image lazy-load :src="item.typeName == '推荐奖金' ? '@/static/assets/assets_money_item02.png' : '@/static/assets/assets_money_item01.png'" mode=""></image>
                        <view class="info">
                            <view class="name">{{item.typeName}}</view>
                            <view class="time">{{item.createDate}}</view>
                        </view>
                    </view>
                    <view class="right">
                        <text>￥{{item.price}}</text>
                        <image lazy-load src="./static/arrow_right2.png" mode=""></image>
                    </view>
                </view>
                <x-load-more :status="pageStatus"></x-load-more>
            </view> -->
			<view v-if="list.length>0">
				<view class="item" v-for="item in list" :key="item.id">
					<view class="item-top">{{item.issueMonth}}</view>
					<view class="item-child"  @click="openUrl('./moneydetail?id='+item.id)">
						<view class="left">
							<image lazy-load src="@/static/assets/assets_money_item01.png" mode=""></image>
						</view>
						<view class="info">
							<text>税后收入</text>
							<text>{{item.sumAfter.toFixed(2)}}元</text>
						</view>
						<view class="right">
							<!-- <image lazy-load src="./static/arrow_right2.png" mode=""></image> -->
                            <x-icon type="arrow-right"></x-icon>
						</view>
					</view>
				</view>
				<x-load-more :status="pageStatus"></x-load-more>
			</view>
            <x-no-data num="4" v-else-if="list.length==0&&noData"></x-no-data>
        </view>
    </view>
</template>

<script>
	import floatcalc from '@/common/utils/floatcalc.js'
    export default{
        data () {
            return {
                // date: '2020-08',
                // typeVlaue: '',
                // typeMsg:'全部类型',
                // typeList:[],
                list: [],
                sendData:{
                    pageNo: 1,
                    pageSize: 5,
                    type: ''
                },
                pageStatus: 'more',
                noData: false,
				testData:[]
            }
        },
        onLoad() {
			this.getAssectsList()
		},
        methods:{
			
			//将数据按时间排序
			forwardRankingDate(data, key) {
			    for (let i = 0; i < data.length - 1; i++) {
			        for (let j = 0; j < data.length - 1 - i; j++) {
			            if (Date.parse(data[j][key]) < Date.parse(data[j+1][key])) {
			                var temp = data[j];
			                data[j] = data[j + 1];
			                data[j + 1] = temp;
			            }
			        }
			    }
			    return data;
			},
			
			// 将时间转换成月份
			formatTime(timestamp) {
         	    var date = new Date(timestamp);
         	    var Y = date.getFullYear() + '年';
         	    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
         	    return Y + M;
         	},
			
			//处理返回数据
			formatData(array){
				let tempList = []
				this.forwardRankingDate(array,"createDate").map(item=>{
					let tempData = {
						date:this.formatTime(item.createDate),
						price:item.price
					}
					tempList = tempList.concat(tempData)
				})
				console.log(tempList)
				tempList = tempList.reduce((obj, item) => {
					let find = obj.find(i => i.date === item.date)
					let _d = { ...item,}
					find ? (find.price += item.price) : obj.push(_d)
					return obj
				}, [])
				return tempList
				// console.log(tempList)
			},
		
			getAssectsList(){
				// this.$api.get('mas/assetsWater/details.do',this.sendData).then( res => {
				this.$api.get('salary/detail/getSalaryDetailList.do',this.sendData).then( res => {
					this.noData = true
					console.log(res.data)
				    if(res.success){
						if (this.sendData.pageNo <= 1) {
							// this.list = this.formatData(res.data)
							this.list = res.data
						} else {
							this.list.push(...res.data)
						}
						// this.sendData.pageNo++
						// if (this.sendData.pageNo > Math.ceil(res.page.totalCount / this.sendData.pageSize)) {
						// 	this.pageStatus = 'noMore'
						// }else{
						// 	this.pageStatus = 'more'
						// }
				    }
				})
			}
			/**
			bindDateChange(e){
                this.date = e.target.value
            },
            selType(){
                this.$refs.selType.show()
            },
			handleConfirmType(item){
                this.typeMsg = item.item.label
                this.sendData.type = item.item.value
                this.sendData.pageNo = 1
                this.getAssetsDetail()
            },
            getTypeList(){
                this.$api.get('system/dict/getDictByType.do?type=AssetsWaterType').then( res => {
                    if(res.success){
                        this.typeList = res.data
                        this.typeList.unshift({label:'全部类型',value: ''})
                    }
                })
            },
            getAssetsDetail(){
                this.$api.post('mas/assetsWater/details.do',this.sendData).then( res => {
                    this.noData = true
                    if(res.success){
                        if (this.sendData.pageNo <= 1) {
                        	this.list = res.data
                        } else {
                        	this.list.push(...res.data)
                        }
                        this.sendData.pageNo++
                        if (this.sendData.pageNo > Math.ceil(res.page.totalCount / this.sendData.pageSize)) {
                        	this.pageStatus = 'noMore'
                        }else{
                        	this.pageStatus = 'more'
                        }
                    }
                })
            }
			*/
        },
        onReachBottom() {
            if(this.pageStatus != 'more') return
        	this.pageStatus = 'loading'
            this.getAssectsList()
        }
    }
</script>

<style lang="scss" scoped>
.content{padding: 24rpx;
    .type-box{background: #F0F0F0; height: 64rpx; font-size: 0; display: inline-block; padding: 0 24rpx; border-radius: 8rpx;
        view{ display: flex; align-items: center; justify-content: space-between; height: 64rpx;
            text{font-size: 28rpx;}
            image{width: 28rpx; height: 28rpx; margin-left: 36rpx;}
        }
    }
    .list{
        // .top{display: flex; justify-content: space-between; align-items: center; padding: 24rpx 0;
        //     .left{font-size: 0; display: flex; align-items: center; background: #fff; padding: 0 24rpx; height: 44rpx; border-radius: 22rpx;
        //         text{font-size: 28rpx;}
        //         image{width: 16rpx; height: 16rpx; margin-left: 12rpx;}
        //     }
        //     .right{font-size: 28rpx;
        //         text{margin-left: 10rpx;}
        //     }
        // }
        .item{border-radius: 12rpx; background: #fff; margin-top: 24rpx;
			&:first-child{margin-top: 0;}
            .item-top{background: #F0F0F0; height: 88rpx; line-height: 88rpx; padding-left: 24rpx; font-size: 32rpx; font-weight: bold; border-radius: 12rpx 12rpx 0 0;}
            .item-child{display: flex; align-items: center; justify-content: space-between; height: 96rpx; border-bottom: 1px solid #ddd; margin: 0 24rpx;
                &:last-of-type{border: none;}
                .left{font-size: 0; display: flex;  flex-shrink: 0;
                    image{width: 48rpx; height: 48rpx; margin-right: 24rpx;}
                    .info{
                        .name{font-size: 32rpx; line-height: 44rpx;}
                        .time{font-size: 24rpx; line-height: 34rpx; margin-top: 12rpx;}
                    }
                }
				.info{flex:1;font-size: 32rpx;font-weight: 400;line-height: 44rpx;
					text{padding-right: 5rpx;}
				}
                .right{font-size: 0; display: flex; align-items: center;
                    text{font-size: 28rpx; line-height: 40rpx;}
                    image{width: 14rpx; height: 24rpx; margin-left: 12rpx;}
                }
            }
        }
    }
}

</style>
