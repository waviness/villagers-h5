<template>
  <view class="container">
    <scroll-view
      class="content"
      scroll-y
      @scrolltolower="loadMoreLow()"
      refresher-enabled="true"
      :refresher-triggered="triggered"
      :refresher-threshold="100"
      refresher-background="#f8f8f8"
      @refresherpulling="onPulling"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      @refresherabort="onAbort"
    >
      <view
        class="mail"
        :class="index == mailList.length - 1 ? '' : 'mail-b'"
        v-for="(item, index) in mailList"
        :key="index"
        @click="mailReply(item)"
      >
        <view class="mail-info-li">
          <view class="mail-title">{{ item.title }}</view>
          <view class="mail-status" v-if="item.isRead == 0"></view>
        </view>
        <view class="mail-info-li">
          <view class="mail-cont">{{ item.villagerName }}</view>
          <view class="mail-time">{{ timeFormat(item.createTime) }}</view>
        </view>
      </view>

      <uni-load-more
        :status="loadStatus"
        :content-text="contentText"
        color="#6b6c6c"
        v-if="mailList.length > 0"
      />

      <view class="no_data" v-if="mailList.length == 0">
        <image
          class="no_img"
          src="../../static/image/no-viliager.png"
          mode="aspectFit"
        ></image>
        <view class="no_text">暂时还没有消息哦~</view>
      </view>
    </scroll-view>

    <image
      class="release-btn"
      src="../../static/image/icon-release.png"
      mode="aspectFit"
      @click="mailAdd()"
    ></image>
  </view>
</template>

<script>
import { uniLoadMore } from '@dcloudio/uni-ui';
export default {
  components: {
    uniLoadMore,
  },
  data() {
    return {
      triggered: false,
      pageNum: 0,
      loadStatus: 'more',
      contentText: {
        contentdown: '查看更多',
        contentrefresh: '加载中',
        contentnomore: '没有更多了',
      },
      mailList: [],
      mailList1: [
        {
          type: 'aa',
          title: '关于房屋维修政策咨询',
          content: '张纪中',
          createTime: '2020-01-01 11:11:11',
          isRead: 1,
        },
        {
          type: 'aa',
          title: '关于房屋维修政策咨询',
          content: '张纪中',
          createTime: '2020-01-01 11:11:11',
          isRead: 0,
        },
      ],
    };
  },
  onLoad() {},
  onShow() {
    this._freshing = false;
    setTimeout(() => {
      this.triggered = true;
    }, 100);
    this.setTabBarIndex(3);
  },
  methods: {
    loadMoreLow() {
      this.pageNum++;
      if (this.loadStatus != 'noMore') {
        this.getmail();
      }
    },
    getmail() {
      // this.mailList = this.mailList1
      let obj = '?page=' + this.pageNum + '&size=10';
      this.$api.getMailbox(obj).then(res => {
        this.mailList = this.mailList.concat(res.data);
        if (res.totalElements < 10) {
          this.loadStatus = 'noMore';
        }
      });
    },
    // 加载线下广告
    loadmail() {
      this.pageNum = 0;
      this.mailList = [];
      this.loadStatus = 'more';
      this.loadMoreLow();
    },
    // 上拉刷新
    onPulling(e) {
      // console.log("onpulling", e);
    },
    onRefresh() {
      if ((this._freshing = false)) return;
      this._freshing = true;
      this.loadmail();
      setTimeout(() => {
        this.triggered = false;
        this._freshing = false;
      }, 500);
    },
    onRestore() {
      this.triggered = 'restore'; // 需要重置
    },
    onAbort() {},
    mailReply(data) {
      data.isRead = true;
      uni.navigateTo({
        url: './mailReply/mailReply?id=' + data.id,
      });
    },
    mailAdd() {
      uni.navigateTo({
        url: './mailAdd/mailAdd',
      });
    },
    // 时间戳转化
    timeFormat(str) {
      return this.$moment(str).format('YY-MM-DD hh:mm:ss');
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100vh;
  background: #f2f2f6;
}
.content {
  width: 100%;
  height: calc(100% - 30rpx);
  padding-top: 30rpx;
}
.mail-b {
  margin-bottom: 24rpx !important;
}
.mail {
  width: 642rpx;
  height: auto;
  padding: 30rpx;
  border-radius: 16rpx;
  background-color: #ffffff;
  margin: auto;
  .mail-info-li {
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .mail-title {
      width: 600rpx;
      height: 44rpx;
      line-height: 44rpx;
      font-size: 32rpx;
      font-weight: bold;
      text-align: left;
      margin-bottom: 16rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .mail-time {
      font-size: 22rpx;
      color: #696969;
    }
    .mail-cont {
      width: 200rpx;
      height: 36rpx;
      line-height: 36rpx;
      font-size: 26rpx;
      font-weight: bold;
      color: #757575;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .mail-status {
      width: 12rpx;
      height: 12rpx;
      background-color: #e83333;
      border-radius: 50%;
    }
  }
}

.no_data {
  width: 100%;
  height: auto;
  position: relative;

  .no_img {
    width: 596rpx;
    height: 510rpx;
    position: absolute;
    top: 100rpx;
    left: 78rpx;
  }

  .no_text {
    width: 100%;
    line-height: 44rpx;
    font-size: 32rpx;
    color: #626262;
    text-align: center;
    position: absolute;
    top: 484rpx;
  }
}
.release-btn {
  width: 144rpx;
  height: 144rpx;
  position: fixed;
  right: 40rpx;
  bottom: 140rpx;
  z-index: 999;
}
</style>
