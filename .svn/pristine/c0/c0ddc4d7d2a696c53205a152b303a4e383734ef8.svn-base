<template>
	<view class="content">
		<x-nav-bar :noBorder="true" :title="navBarText"  >
		</x-nav-bar>
		<view class="start-list " :class="{first:index==0}" v-for="(item,index) in list" :key="index" @click="openUrl('./start?id='+item.id)">
			<view class="left-box">
				<view class="line"></view>
				<view class="circle"></view>
			</view>
			<view>
				<text class="create-date">{{item.createDate}}</text>
				<view class="list-image-box">
					<view class="imag">
						<image lazy-load :src="item.coverImage+'?imageMogr2/crop/586x284'" style="width: 586rpx;height: 264rpx;" ></image>
					</view>
				</view>
				<view class="create-date introduction" >{{item.introduction}}</view>
			</view>
		</view>
		<x-load-more :status="bottomTips"></x-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navBarText:'往期回顾',
				list:[],
				bottomTips: 'more',
				page:5,
				limit:1
			};
		},
		onLoad() {
			this.getList()
		},
		methods:{
			getList(){
				this.$api.get('article/article/startList.do?limit='+this.limit+'&page='+this.page).then(res =>{
					if(res.success && res.data.list.length>0){
						this.list.push(...res.data.list)
						this.limit+=1
					}
                    if(this.list.length>=res.data.count){
                        this.bottomTips = 'nomore'
                    }else{
                        this.bottomTips = 'more'
                    }
					
				})
			},
			onReachBottom() {
                if(this.bottomTips != 'more') return
				this.bottomTips = 'loading'
			    this.getList()
			}
		}
	}
</script>

<style lang="scss">
 .start-list{
	 width: 658rpx;
	 height: 506rpx;
	 margin: 0 auto;
	 display: flex;
	 .left-box{
		 width: 18rpx;
		 height: 100%;
		 border-bottom: none;
		 position: relative;
		 .line{
			 border-left: 1px solid #d8d8d8;
			 height: 492rpx;
			 position: absolute;
			 left: 50%;
             transform: translateX(-50%);
			 top: 16rpx;
		 }
		 .circle{
			 width: 14rpx;
			 height: 14rpx;
			 background-color: $xinxii-theme-color;
			 border-radius: 50%;
		 }
	 }
	 .create-date{
		 font-size: 32rpx;
		 color: #333;
		 margin-left: 40rpx;
	 }
	 .introduction{
		text-align: center;
	 }
	 .list-image-box{
		 width: 618rpx;
		 height: 298rpx;
		 margin: 18rpx 0rpx 18rpx 40rpx;
		 background-image: url('../../static/list_image_bg.png');
		 background-repeat: no-repeat;
		 background-position: 0rpx 0rpx;
		 background-size: 100%;
		 padding-top: 14rpx;
		 .imag{
		 	width: 588rpx;
			height: 266rpx;
			margin: 0rpx auto;
		 }
	 }
	 
 }
 .first{
	 margin-top: 40px;
 }
</style>
