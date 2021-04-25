<template>
  <scroll-view
    class="list__wrapper"
    scroll-y
    refresher-enabled
    :refresher-triggered="triggered"
    :refresher-threshold="threshold"
    :refresher-background="background"
    @scrolltolower="onScrollToLower"
    @refresherpulling="onPulling"
    @refresherrefresh="onRefresh"
  >
    <view class="list__content" :style="contentStyle">
      <slot></slot>

      <uni-loadmore v-if="hasMore" :status="loadStatus" />

      <view v-if="noData" class="empty__wrapper">
        <image class="empty__image" src="../static/image/no-viliager.png" />
        <view class="empty__text">暂时还没有消息哦~</view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
export default {
  name: 'List',

  props: {
    loading: Boolean,

    refreshing: Boolean,

    hasMore: {
      type: Boolean,
      default: true,
    },

    noData: Boolean,

    paddingTop: {
      type: Number,
      default: 88,
    },

    paddingBottom: {
      type: Number,
      default: 88,
    },
  },

  data() {
    return {
      triggered: false,
      threshold: 100,
      background: '#f8f8f8',
    };
  },

  computed: {
    contentStyle({ paddingTop, paddingBottom }) {
      return `padding-top: ${paddingTop}rpx; padding-bottom: ${paddingBottom}rpx;`;
    },

    loadStatus({ loading, hasMore }) {
      return loading ? 'loading' : hasMore ? 'loadmore' : 'nomore';
    },
  },

  watch: {
    refreshing: {
      handler(triggered) {
        this.triggered = triggered;
      },
      immediate: true,
    },
  },

  methods: {
    onScrollToLower() {
      this.$emit('load');
    },

    onPulling() {
      this.triggered = true;
    },

    onRefresh() {
      this.$emit('refresh');
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  &__wrapper {
    height: 100vh;
  }

  &__content {
    position: relative;
  }
}

.empty {
  &__wrapper {
    text-align: center;
  }

  &__image {
    width: 596rpx;
    height: 510rpx;
    margin: 0 auto 48rpx;
  }

  &__text {
    font-size: 32rpx;
    line-height: 44rpx;
    color: #626262;
  }
}
</style>
