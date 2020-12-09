<template>
	<view class="radio-box" :class="column">
		<view class="radio-title">{{title}}</view>
		<view class="radio-wrap">
			<view class="radio-item" v-for="(v,i) in shoItems" :key="i" >
				<view 
				:class="[{ 'active':(type=='radio' && index == i) || (type=='checkbox' && v.checked) },{'disabled' : v.disabled}]"
				:data-i="i"
				@tap="change"
				>{{v.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				index:-1,
				type:'checkbox',
				column:'',
				title:''
			};
		},
		computed: {
			shoItems: function () {
				return this.list.filter(item=> {
					return item.show
				})
			}
		},
		methods: {
			/* 切换 */
			change(e){
				let i = Number(e.currentTarget.dataset.i);
				/* 单选框 */
				if(this.type=='radio'){
					this.index = i;
					this.$nextTick(()=>{
						this.$emit("change",this.get());
					})
					return;
				}
				/* 复选框 */
				if(this.list[i].checked){
					this.$set(this.list[i],"checked",false);
				}else{
					if(this.maxSize){
						let pickerSize = 0;
						this.list.forEach((item,index)=>{
							if(item.checked){
								pickerSize++;
							}
						});
						// 当已选值数量 >= 允许的最大选择值时触发
						if(pickerSize >= this.maxSize){
							this.maxFn && this.maxFn();
							return;
						}
					}
					this.$set(this.list[i],"checked",true);
				}
				this.$nextTick(()=>{
					this.$emit("change",this.get());
				});
			},
			/* 设置值 */
			set(data) {
				let [type,index] = ['checkbox',-1];
				let column = ['','col_1','col_2','col_3','col_4'];
				if(data.type == 'radio'){
					type = 'radio';
					index = data.index >= 0 ? data.index : -1;
				}
				for(let i=0;i<data.list.length;i++){
					 data.list[i].index = i
				}
				this.column = (data.column in column) ? column[data.column] : '';
				this.type = type;
				this.index = index;
				this.list = data.list;
				this.title = data.title;
				
				if(data.maxSize > 0 && data.maxFn){
					this.maxSize = data.maxSize;
					this.maxFn = data.maxFn;					
				}else{
					this.maxSize = undefined;
					this.maxFn = undefined;
				}
			},
			/* 获取值 */
			get(){
				/* 单选框 */
				if(this.type=='radio'){
					if(this.index >= 0){
						this.list[this.index].index = this.index;
						return this.list[this.index]
					}else{
						return null;
					}
				}
				
				let arr=[];
				this.list.forEach((item,index)=>{
					if(item.checked == true){
						arr.push(item);
					}
				});
				return arr.length > 0 ? arr : null;
			},
			/* 全部选中 */
			checkAll(){
				if(this.type=='radio'){
					return null;
				}
				this.list.forEach((item,index)=>{
					this.$set(this.list[index],"checked",true);
				})
			},
			/* 取消全部选中 */
			cancelAll(){
				if(this.type=='radio'){
					this.index = -1;
					return null;
				}
				this.list.forEach((item,index)=>{
					this.$set(this.list[index],"checked",false);
				})
			},
			/* 反选全部 */
			invertAll(){
				if(this.type=='radio'){
					this.index = -1;
					return null;
				}
				this.list.forEach((item,index)=>{
					this.$set(this.list[index],"checked",item.checked ? false : true);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.radio-box{border-bottom: 1rpx solid #F0F0F0;padding: 22rpx 0 24rpx;
	&:last-child{border-bottom: 0;padding-bottom: 0;}
	.radio-title{
		font-size: 34rpx;font-weight: 400;line-height: 48rpx;margin-bottom: 24rpx;
	}
	.radio-wrap{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
		margin-right: -24rpx;
		font-size: 28rpx;
		text-align: center;
		
	}
	.radio-item{
		margin-top: 24rpx;
		padding-right: 24rpx;
		box-sizing: border-box;
	}
	
	&.col_1{
		.radio-item{
			width: 100%;
			margin-top: 0;
		}
	}
	&.col_2{
		.radio-item{
			width: 50%;
			&:nth-child(-n+2){
				margin-top: 0;
			}
		}
	}
	&.col_3{
		.radio-item{
			width: 33.3333333%;
			&:nth-child(-n+3){
				margin-top: 0;
			}
		}
	}
	&.col_4{
		.radio-item{
			width: 25%;
			&:nth-child(-n+4){
				margin-top: 0;
			}
		}
	}
	
	.radio-item{
		&>view{
			line-height: 64rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
			background-color: #F4F5F6;
			border-radius: 6rpx;
			font-size: 32rpx;
			color: #333;
			position: relative;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			
			&.disabled{
				pointer-events: none;
				background-color: #ccc;
				opacity: 0.5;
				
			}
			&.active{
				background-color: #FFDCCC;
				color: #FF5000;
				
				&::after{content: '';position: absolute;width: 38rpx;height: 38rpx;background: url(../../static/checked.png) center/cover no-repeat;right: 0;bottom: 0;}
			}
		}
	}
}
</style>
