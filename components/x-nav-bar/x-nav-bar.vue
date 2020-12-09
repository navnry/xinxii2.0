<template>
	<view>
		<view class="uni-navbar" :class="{'uni-navbar-fixed':isFixed,'uni-navbar-shadow':hasShadow, 'uni-navbar-noborder': noBorder}"
		 :style="{'background':backgroundColor}">
            <view v-if="insertStatusBar" class="uni-status-bar" :style="style"></view>
			<view class="uni-navbar-header" :style="{color:color}">
				<view class="uni-navbar-header-btns" :style="{width:leftWidth}" @tap="onClickLeft">
					<view v-if="leftIcon">
						<x-icon :type="leftIcon" :color="color" size="42"></x-icon>
					</view>
					<view v-if="leftText.length" class="uni-navbar-btn-text" :class="{'uni-navbar-btn-icon-left':!leftIcon.length}">{{leftText}}</view>
					<slot name="left"></slot>
				</view>
				<view class="uni-navbar-container" @click="onClickTitle">
					<view v-if="title.length" class="uni-navbar-container-title">{{title}}</view>
					<!-- 标题插槽 -->
					<slot></slot>
				</view>
				<view class="uni-navbar-header-btns" :style="{width : (rightWidth ? (rightWidth === true ? '200rpx':rightWidth) : '80rpx')}"
				 @tap="onClickRight">
						<view v-if="rightIcon.length">
							<x-icon :type="rightIcon" :color="color" size="48"></x-icon>
						</view>
						<!-- 优先显示图标 -->
						<view v-if="rightText.length&&!rightIcon.length" class="uni-navbar-btn-text">{{rightText}}</view>
						<slot name="right"></slot>
					</view>
				</view>
			</view>
			<view class="blank" v-if="isFixed && !noBlank">
                <view v-if="insertStatusBar" class="uni-status-bar" :style="style"></view>
				<view class="uni-navbar-header"></view>
			</view>
		</view>
</template>

<script>
	export default {
		props: {
			/**
			 * 标题文字
			 */
			title: {
				type: String,
				default: ''
			},
			/**
			 * 左侧按钮文本
			 */
			leftText: {
				type: String,
				default: ''
			},
			/**
			 * 右侧按钮文本
			 */
			rightText: {
				type: String,
				default: ''
			},
			/**
			 * 左侧按钮图标
			 */
			leftIcon: {
				type: [Boolean, String],
				default: 'arrow-left'
			},
			/**
			 * 右侧按钮图标
			 */
			rightIcon: {
				type: String,
				default: ''
			},
			/**
			 * 是否固定在顶部
			 */
			fixed: {
				type: [Boolean, String],
				default: true
			},
			// 是否有底部线
			noBorder: {
				type: [Boolean, String],
				default: false
			},
			/**
			 * 按钮图标和文字颜色
			 */
			color: {
				type: String,
				default: '#222'
			},
			/**
			 * 背景颜色
			 */
			backgroundColor: {
				type: String,
				default: '#FFFFFF'
			},
			/**
			 * 是否包含状态栏，默认固定在顶部时包含
			 */
			statusBar: {
				type: [Boolean, String],
				default: ''
			},
			/**
			 * 是否使用阴影，默认根据背景色判断
			 */
			shadow: {
				type: String,
				default: 'false'
			},
			// 是否显示占位
			noBlank: {
				type: [Boolean, String],
				default: false
			},
			// 是否显示右边距或者右边距宽度
			rightWidth: {
				type: [Boolean, String],
				default: ''
			},
			// 左边距
			leftWidth: {
				type: String,
				default: '80rpx'
			},
			customClickleft: {
				type: [Boolean,String],
				default: false
			}
		},
        data (){
            return {
                touchtime: 0
            }
        },
		mounted() {},
		computed: {
            style() {
                //#ifdef MP-WEIXIN
                var systemInfo = uni.getSystemInfoSync()
                return `height:${systemInfo.statusBarHeight}px`
                //#endif
                //#ifdef APP-PLUS
                return ''
                //#endif
            },
			isFixed() {
				return String(this.fixed) === 'true'
			},
			insertStatusBar() {
				switch (String(this.statusBar)) {
					case 'true':
						return true
					case 'false':
						return false
					default:
						return this.isFixed
				}
			},
			hasShadow() {
				var backgroundColor = this.backgroundColor
				switch (String(this.shadow)) {
					case 'true':
						return true
					case 'false':
						return false
					default:
						return backgroundColor !== 'transparent' && backgroundColor.indexOf('rgba') < 0
				}
			}
		},
		methods: {
			/**
			 * 左侧按钮点击事件
			 */
			onClickLeft() {
				if (this.customClickleft) {
					this.$emit('clickLeft')
				} else {
					this.backPage()
				}
			},
			/**
			 * 右侧按钮点击事件
			 */
			onClickRight() {
				this.$emit('clickRight')
				this.$emit('click-right')
			},
            /**
             * 标题按钮点击事件
             */
            onClickTitle(){
                this.$emit('clickTitle')
                if (new Date().getTime() - this.touchtime < 500) {
                    uni.pageScrollTo({  
                        scrollTop: 0,  
                        duration: 300  
                    });  
                } else {  
                    this.touchtime = new Date().getTime() 
                } 
            }
		}
	}
</script>

<style lang="scss">
    .uni-status-bar {
        display: block;
        width: 100%;
        /* height: 20px; */
        height: var(--status-bar-height);
    }
	.uni-navbar {
		display: block;
		position: relative;
		width: 100%;
		background-color: #ffffff;
		overflow: hidden;
		border-bottom: #F3F3F3 solid 1rpx;
	}

	/* .uni-navbar view {
    line-height: 44px;
  } */

	.uni-navbar-shadow {
		box-shadow: 0 1px 1px #eee;
	}

	.uni-navbar.uni-navbar-fixed {
		position: fixed;
		z-index: 998;
		top: 0;
		left: 0;
	}

	.uni-navbar-header {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 44px;
		line-height: 44px;
		font-size: 16px;
	}

	.uni-navbar-header .uni-navbar-header-btns {
		display: inline-flex;
		flex-wrap: nowrap;
		flex-shrink: 0;
		width: 100rpx;
		padding: 0 12rpx;
	}

	.uni-navbar-header .uni-navbar-header-btns:last-child {
		width: 100rpx;
        padding-right: 24rpx;
        padding-left: 0;
	}

	.uni-navbar-container {
		width: 100%;
		/* margin: 0 10rpx; */
	}

	.uni-navbar-container-title {
		font-size: 34rpx;
		text-align: center;
		padding: 0 60rpx;
		line-height: 44px;
		/* font-weight: bold; */
    @include text-line(1);
	}
	
	.uni-navbar-btn-text{
		font-size: 28rpx;
	}
	.uni-navbar-noborder {
		border: none;
	}
</style>
