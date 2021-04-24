<template>
  <view class="card__wrapper">
    <view class="card__header">
      <view class="card__title">{{ title }}</view>
    </view>
    <view class="card__body">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Card',

  props: {
    title: String,
  },
};
</script>

<style lang="scss" scoped>
.card {
  &__wrapper {
    margin-bottom: 24rpx;
    border-radius: 16rpx;
    background-color: #fff;
  }

  &__header,
  &__body {
    position: relative;
  }

  &__header {
    display: flex;
    align-items: center;
    padding: 32rpx 24rpx;
  }

  &__body {
    padding-bottom: 32rpx;
  }

  &__title {
    display: flex;
    align-items: center;

    font-size: 32rpx;
    line-height: 44rpx;
    color: #333;

    &::before {
      display: block;
      width: 12rpx;
      height: 32rpx;
      margin-right: 20rpx;
      border-radius: 6rpx;
      background-color: #1a91f2;
      content: ' ';
    }
  }
}
</style>
