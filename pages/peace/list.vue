<template>
  <view class="container">
    <view v-if="!isUncle">
      <view class="peace-tabs">
        <view class="peace-tabs__tabs">
          <u-tabs
            :list="nameList1"
            :current="currentTabIndex"
            gutter="64"
            inactive-color="#666"
            active-color="#5FC2FF"
            font-size="28"
            bar-width="80"
            @change="change"
          />
        </view>
        <view class="peace-tabs__add">
          <image
            @click="toPublish"
            class="peace-tabs__add-icon"
            src="../../static/image/icon-add.png"
          >
          </image>
        </view>
      </view>
      <list
        :loading="loading"
        :refreshing="refreshing"
        :has-more="hasMore"
        :no-data="noData"
        @load="onLoadData"
        @refresh="onRefreshData"
      >
        <view style="padding: 24rpx">
          <view
            v-for="(item, index) in list"
            :key="index"
            class="peace-list__item"
            @click="toDetail(item.id)"
          >
            <view class="peace-list__header">
              <view class="peace-list__title"
                >选择调解人：{{ item.uncleName }}</view
              >
              <view class="peace-list__time">{{ item.time }}</view>
            </view>
            <view class="peace-list__content">
              <view class="peace-list__value u-line-1">
                矛盾描述：{{ item.content }}
              </view>
              <view class="peace-list__button-wrap">
                <view
                  v-if="item.result && !item.comments"
                  class="peace-list__button"
                  @click.stop="toReview(item.id)"
                  >评价</view
                >
              </view>
            </view>
          </view>
        </view>
      </list>
    </view>
    <view v-else class="is-uncle">
      <view class="peace-tabs">
        <u-tabs
          :list="nameList2"
          :current="currentTabIndex"
          gutter="130"
          inactive-color="#666"
          active-color="#5FC2FF"
          font-size="28"
          bar-width="80"
          @change="change"
        />
      </view>

      <list
        :loading="loading"
        :refreshing="refreshing"
        :has-more="hasMore"
        :no-data="noData"
        @load="onLoadData"
        @refresh="onRefreshData"
      >
        <peace-item
          v-for="(item, index) in list"
          :key="index"
          :data="item"
          no-tag
          @click="toDetail(item.id)"
        />
      </list>
    </view>
  </view>
</template>

<script>
import List from '../../components-private/list';

export default {
  components: {
    List,
  },

  data() {
    return {
      isUncle: false,
      currentTabIndex: 0,
      nameList1: [
        {
          name: '待处理',
        },
        {
          name: '已完成',
        },
      ],
      nameList2: [
        {
          name: '待调解',
        },
        {
          name: '已经调解',
        },
      ],
      list: [],
      page: 1,
      pageSize: 20,

      loading: false,
      refreshing: false,
      hasMore: true,
      noData: false,
    };
  },

  onShow() {
    this.isUncle = uni.getStorageSync('isUncle');
    this.getList();
  },

  methods: {
    change(index) {
      if (this.currentTabIndex !== index) {
        this.currentTabIndex = index;
        this.page = 1;
        this.list = [];
        this.hasMore = true;
        this.getList();
      }
    },

    toDetail(id) {
      let url;

      if (!this.isUncle) {
        if (this.currentTabIndex == 0) {
          url = '/pages/peace/progress?id=' + id;
        } else {
          url = '/pages/peace/detail?id=' + id;
        }
      } else {
        if (this.currentTabIndex == 0) {
          url = '/pages/peace/progress?id=' + id;
        } else {
          url = '/pages/peace/detail?id=' + id;
        }
      }

      uni.navigateTo({
        url,
      });
    },

    toReview(id) {
      uni.navigateTo({
        url: '/pages/peace/review?id=' + id,
      });
    },

    toPublish() {
      uni.navigateTo({
        url: '/pages/peace/publish',
      });
    },

    async getList() {
      const { list, page, pageSize: size, currentTabIndex: finish } = this;
      const { data, totalElements } = await this.$api.getPeaceEventList({
        page,
        size,
        finish,
        onlySelf: true,
      });
      const currentTotal = page * size;

      this.list = [...list, ...data];
      this.loading = false;
      this.refreshing = false;

      if (totalElements === 0) {
        this.noData = true;
      } else if (totalElements < currentTotal) {
        this.hasMore = false;
      }
    },

    onLoadData() {
      if (!this.hasMore) return;

      this.loading = true;
      this.page++;
      this.getList();
    },

    onRefreshData() {
      this.page = 1;
      this.list = [];
      this.refreshing = true;
      this.hasMore = true;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.peace {
  &-tabs {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 111;
    align-items: center;
    background-color: #fff;

    &__tabs {
      width: calc(100vw - 156rpx);
    }

    &__add {
      width: 60rpx;
      height: 60rpx;
      margin: 0 48rpx;

      &-icon {
        width: 100%;
        height: 100%;
      }
    }
  }

  &-list {
    height: 100%;
    padding: 112rpx 24rpx 0;

    &__item {
      padding: 32rpx 24rpx 32rpx 32rpx;
      background-color: #fff;
      border-radius: 16rpx;

      & + & {
        margin-top: 24rpx;
      }
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32rpx;
    }

    &__content {
      display: flex;
      align-items: center;
    }

    &__title {
      font-size: 32rpx;
    }

    &__time {
      font-size: 24rpx;
      color: #666;
    }

    &__value {
      flex: 1;
      font-size: 28rpx;
      color: #666;
    }

    &__button-wrap {
      width: 112rpx;
      margin-left: 56rpx;
    }

    &__button {
      width: 112rpx;
      height: 48rpx;
      padding: 8rpx 32rpx;
      color: #666;
      border: 1px solid #5fc2ff;
      border-radius: 24rpx;
      background-color: #fff;
      font-size: 22rpx;
      box-sizing: border-box;
    }
  }
}

.is-uncle {
  & .peace-list {
    padding: 112rpx 0 0;
  }
}
</style>
