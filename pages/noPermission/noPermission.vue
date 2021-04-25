<template>
  <view class="container">
    <image
      class="develope"
      src="../../static/image/no-viliager.png"
      mode="aspectFit"
    ></image>
    <view class="develope-text">您还不是该村村民，该功能暂未开放</view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100vh;
  background: #ffffff;
}
.develope {
  width: 596rpx;
  height: 510rpx;
  position: absolute;
  top: 200rpx;
  left: 78rpx;
}
.develope-text {
  width: 750rpx;
  line-height: 44rpx;
  font-size: 32rpx;
  color: #626262;
  text-align: center;
  position: absolute;
  top: 584rpx;
}
</style>
