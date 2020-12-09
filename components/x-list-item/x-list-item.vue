<template>
	<view class="x-cont">
	    <view class="list-item" :class="{border: border == 1}" :style="{height:height}" @click="onClick">
	        <view class="left">
                <slot class="slot" name="left"></slot>
                <text class="title">{{title}}</text>
            </view>
	    	<view class="right">
	            <slot name="right"></slot>
	    		<text :style="{color: fontColor}" v-if="msg">{{msg}}</text>
                <x-icon class="icon" v-if="arrow==1" type="arrow-right" size="28" color="#999"></x-icon>
	    	</view>
			<view class="tips" v-if="tips">
				<text>{{tips}}</text>
			</view>
	    </view>
	</view>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        msg: {
            type: String,
            default: ''
        },
        border: {
            type: [String,Number],
            default: 1
        },
        height: {
            type: [String, Number],
            default: '86rpx'
        },
        fontColor: {
            type: String,
            default: ''
        },
        arrow: {
            type: [String,Number],
            default: 1
        },
		tips:{
			type: String,
			default: ''
		}
    },
    data() {
        return {
        
        }
    },
    methods: {
        onClick () {
            this.$emit('click')
        }
    }
}
</script>

<style lang="scss">
.x-cont{padding: 0 24rpx;
    .list-item{display: flex;flex-wrap: wrap; align-items: center; justify-content: space-between; background-color: #fff; font-size: 32rpx; position: relative;
        &.border{border-bottom:1rpx solid #F0F0F0;}
        .left{display: flex; align-items: center; flex-shrink: 0; margin-right: 30rpx;flex: 1;
			.title{@include text-line(1);}
		}
        .right{display: flex; align-items: center;
            >text{ @include text-line(1);font-size: 30rpx;font-weight: 400;color: #999999;line-height: 42rpx;}
        }
		.tips{width: 100%;font-size: 0;margin-top: 8rpx;margin-bottom: 24rpx;
			>text{font-size: 24rpx;font-weight: 400;color: #999999;line-height: 34rpx;}
		}
    }
}

</style>
