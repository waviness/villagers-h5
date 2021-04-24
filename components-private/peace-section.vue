<template>
  <view :class="classes" :style="style">
    <view class="peace-section__label">{{ label }}</view>
    <view class="peace-section__value">
      <template v-if="value">{{ value }}</template>
      <template v-else>
        <slot></slot>
      </template>
    </view>
  </view>
</template>

<script>
export default {
  name: 'PeaceSection',

  props: {
    label: String,

    value: String,

    colon: {
      type: Boolean,
      default: true,
    },

    direction: {
      type: String,
      default: 'horizontal',
    },

    marginBottom: {
      type: [String, Number],
      default: '0',
    },
  },

  computed: {
    classes({ colon, direction }) {
      return [
        'peace-section',
        `peace-section--${direction}`,
        colon ? 'peace-section--colon' : '',
      ];
    },

    style({ marginBottom }) {
      return `margin-bottom: ${marginBottom}rpx`;
    },
  },
};
</script>

<style lang="scss" scoped>
.peace-section {
  display: flex;

  &--horizontal {
    flex-direction: row;
    align-items: center;

    & .section__label {
      margin-right: 8rpx;
    }
  }

  &--vertical {
    flex-direction: column;

    & .peace-section__label {
      margin-bottom: 20rpx;
    }
  }

  &--colon &__label::after {
    content: ':';
  }

  &__label,
  &__value {
    font-size: 32rpx;
    line-height: 44rpx;
    color: #333;
    letter-spacing: 1rpx;
  }
}
</style>
