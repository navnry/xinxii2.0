<template>
	<view class="no-data">
		<image lazy-load :src="imageUrl.url" mode="widthFix" class="pic"></image>
        <view class="tip">{{imageUrl.txt}}</view>
        <view class="text">{{imageUrl.text}}</view>
	</view>
</template>

<script>
export default {
  props:{
    num: {
      type: [String,Number],
      default: 1 // 1 通用 2 订单 3 提现 4 收益   5 消息
    }
  },
  computed:{
      imageUrl (){
          let info = {
              url: '../../static/empty/empty.png',
              txt: '暂无内容',
              text: '还没有任何内容'
          }
          if(this.num == 2){
              info.url = '../../static/empty/empty_order.png'
              info.txt = '暂无订单'
              info.text = '还没有订单信息哦'
          }else if(this.num == 3){
              info.url = '../../static/empty/../../static/empty/empty_order.png'
              info.txt = '暂无提现记录'
              info.text = '暂无提现记录'
          }else if(this.num == 4){
              info.url = '../../static/empty/../../static/empty/empty_assets.png'
              info.txt = '暂无资产明细'
              info.text = '升级成为新禧经纪人后才能获得收益'
          }else if(this.num == 5){
              info.url = '../../static/empty/../../static/empty/empty_msg.png'
              info.txt = '暂无消息'
              info.text = '还没有消息通知'
          }
          return info
      }
  },
  data() {
    return {
        
    }
  }
}
</script>

<style lang="scss" scoped>
    .no-data{font-size: 0; text-align: center; width: 100%; padding: 24rpx 0;
    	.pic{width: 310rpx; height: 288rpx;}
        .tip{font-size: 36rpx; line-height: 44rpx; margin: 80rpx 0 32rpx;}
        .text{font-size: 28rpx; line-height: 40rpx; color: #999;}
    }
</style>
