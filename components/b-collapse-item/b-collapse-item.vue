<template>
	<view class="uni-collapse">
		<!-- <slot /> -->
        <view :class="{ 'uni-collapse-cell--disabled': disabled,'uni-collapse-cell--notdisabled': !disabled, 'uni-collapse-cell--open': isOpen,'uni-collapse-cell--hide':!isOpen }"
         class="uni-collapse-cell">
        	<view class="uni-collapse-cell__title" @click="onClick">
        		<image lazy-load v-if="thumb" :src="thumb" class="uni-collapse-cell__title-img" />
        		<text class="uni-collapse-cell__title-text">{{ title }}</text>
                <image lazy-load v-if="isOpen" style="width: 40rpx; height: 40rpx;" src="../../static/arrow_down.png"></image>
                <image lazy-load v-else style="width: 40rpx; height: 40rpx;" src="../../static/arrow_right1.png"></image>
        	</view>
        	<view :class="{'uni-collapse-cell__content--hide':!isOpen}" class="uni-collapse-cell__content">
        		<view :class="{ 'uni-collapse-cell--animation': showAnimation === true }" class="uni-collapse-cell__wrapper" :style="{'transform':isOpen?'translateY(0)':'translateY(-50%)','-webkit-transform':isOpen?'translateY(0)':'translateY(-50%)'}">
        			<slot />
        		</view>
        	</view>
        </view>
	</view>
</template>
<script>
	export default {
		name: 'UniCollapse',
		props: {
            title: {
            	// 列表标题
            	type: String,
            	default: ''
            },
            name: {
            	// 唯一标识符
            	type: [Number, String],
            	default: 0
            },
            disabled: {
            	// 是否禁用
            	type: Boolean,
            	default: false
            },
            showAnimation: {
            	// 是否显示动画
            	type: Boolean,
            	default: false
            },
            open: {
            	// 是否展开
            	type: Boolean,
            	default: false
            },
            thumb: {
            	// 缩略图
            	type: String,
            	default: ''
            }
		},
		data() {
			return {
                isOpen: false
            }
		},
        watch: {
        	open(val) {
        		this.isOpen = val
        	}
        },
		created() {
            this.isOpen = this.open
		},
        
		methods: {
            onClick() {
            	if (this.disabled) return
            	this.isOpen = !this.isOpen
            }
		}
	}
</script>
<style lang="scss" scoped>
	@import '@/uni.scss';

	.uni-collapse {
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
		flex-direction: column;
		background-color: $uni-bg-color;
	}
    .uni-collapse-cell {
    	flex-direction: column;
    	// border-bottom: 1px solid red;
    }
    
    
    .uni-collapse-cell--hover {
    	background-color: #fff;
    }
    
    .uni-collapse-cell--open {
    	background-color: #fff;
    }
    
    .uni-collapse-cell--disabled {
    	background-color: $uni-bg-color-hover;
    	// opacity: 0.3;
    }
    
    
    // .uni-collapse-cell--hide {
    // 	height: 48px;
    // }
    
    .uni-collapse-cell--animation {
    	// transition: transform 0.3s ease;
    	transition-property: transform;
    	transition-duration: 0.3s;
    	transition-timing-function: ease;
    }
    
    .uni-collapse-cell__title {
    	padding: 24rpx;
    	position: relative;
    	/* #ifndef APP-NVUE */
    	display: flex;
    	width: 100%;
    	box-sizing: border-box;
    	/* #endif */
    	height: 96rpx;
    	line-height: 48rpx;
    	flex-direction: row;
    	justify-content: space-between;
    	align-items: center;
    }
    
    .uni-collapse-cell__title:active {
    	background-color: #fff;
    }
    
    .uni-collapse-cell__title-img {
    	height: 40rpx;
    	width: 40rpx;
    	margin-right: 20rpx;
    }
    
    // .uni-collapse-cell__title-arrow {
    // 	width: 20px;
    // 	height: 20px;
    // 	transform: rotate(0deg);
    // 	transform-origin: center center;
    
    // }
    
    // .uni-collapse-cell__title-arrow-active {
    // 	transform: rotate(180deg);
    // }
    
    .uni-collapse-cell__title-text {
    	flex: 1;
    	font-size: $uni-font-size-base;
    	/* #ifndef APP-NVUE */
    	white-space: nowrap;
    	color: inherit;
    	/* #endif */
    	/* #ifdef APP-NVUE */
    	lines: 1;
    	/* #endif */
    	overflow: hidden;
    	text-overflow: ellipsis;
		font-weight: bold;
    }
    
    .uni-collapse-cell__content {
        padding: 0 24rpx;
    	overflow: hidden;
    }
    
    .uni-collapse-cell__wrapper {
    	/* #ifndef APP-NVUE */
    	display: flex;
    	/* #endif */
    	flex-direction: column;
    }
    
    .uni-collapse-cell__content--hide {
    	height: 0;
    	line-height: 0;
    }
</style>
