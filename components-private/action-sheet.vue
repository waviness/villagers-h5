<template>
  <u-popup
    :value="value"
    mode="bottom"
    border-radius="40"
    height="370rpx"
    @input="onInput"
  >
    <view class="action-sheet__wrapper">
      <view class="action-sheet__content">
        <scroll-view class="action-sheet__scroll" scroll-x>
          <view class="action-sheet__list">
            <view
              v-for="(item, index) in items"
              :key="index"
              class="action-sheet__item"
              @click="onClickItem(item.command)"
            >
              <image class="action-sheet__icon" :src="item.icon" />
              <view class="action-sheet__text">{{ item.text }}</view>
            </view>
          </view>
        </scroll-view>
      </view>
      <view class="action-sheet__cancel-button" @click="onCancel">取消</view>
    </view>
  </u-popup>
</template>

<script>
export default {
  name: 'ActionSheet',

  props: {
    value: Boolean,
  },

  data() {
    return {
      items: [
        {
          icon: '../static/image/icon-delete.png',
          text: '删除',
          command: 'DELETE',
        },
      ],
    };
  },

  methods: {
    onInput(value) {
      this.$emit('input', value);
    },

    onClickItem(command) {
      this.$emit('click-item', {
        detail: {
          command,
        },
      });
    },

    onCancel() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.action-sheet {
  &__wrapper {
    position: relative;
    background-color: #fff;
  }

  &__content {
    padding: 68rpx 0 40rpx;
  }

  &__scroll {
    width: 100%;
    padding: 0 44rpx;
  }

  &__list {
    display: flex;
    align-items: center;
  }

  &__item {
    text-align: center;

    &:not(:first-child) {
      margin-right: 44rpx;
    }
  }

  &__icon {
    width: 104rpx;
    height: 104rpx;
    margin-bottom: 20rpx;
  }

  &__text {
    font-size: 28rpx;
    line-height: 40rpx;
    color: #333;
  }

  &__cancel-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 98rpx;
    padding-bottom: env(safe-area-inset-bottom, 0);
    font-size: 32rpx;
    line-height: 44rpx;
    color: #333;
    background-color: #f1f1f1;
    box-sizing: content-box;
  }
}
</style>
