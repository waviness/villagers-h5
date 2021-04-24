<template>
  <view :class="setRootClass">
    <view class="message-tag__text">{{ tagMap[type].text }}</view>
    <u-badge v-if="isDot" type="error" :offset="offset" is-dot />
  </view>
</template>

<script>
export default {
  name: 'MessageTag',

  props: {
    type: {
      type: String,
      default: 'appointment',
    },

    isDot: Boolean,
  },

  data() {
    return {
      tagMap: {
        0: { label: 'appointment', text: '书记预约' },
        1: { label: 'mailbox', text: '书记信箱' },
        2: { label: 'peace', text: '矛盾调解' },
        3: { label: 'report', text: '事件上报' },
        4: { label: 'dynamic', text: '村聊动态' },
      },

      offset: [-4, -4],
    };
  },

  computed: {
    setRootClass({ tagMap, type }) {
      return `message-tag message-tag--${tagMap[type].label}`;
    },
  },
};
</script>

<style lang="scss" scoped>
$typeMap: (
  'appointment': #5fc2ff,
  'mailbox': #ff9f5f,
  'peace': #8583fb,
  'report': #3f60e6,
  'dynamic': #9ae647,
);

.message-tag {
  position: relative;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;

  @each $k, $v in $typeMap {
    &--#{$k} {
      background-color: $v;
    }
  }

  &__text {
    font-size: 28rpx;
    line-height: 40rpx;
    color: #fff;
  }
}
</style>
