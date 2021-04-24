<template>
  <view class="container">
    <view class="mail-detail">
      <view class="mail-detail-title">信件标题：{{ replyDetail.title }}</view>
      <view class="mail-detail-cont">{{ replyDetail.content }}</view>
      <view class="mail-detail-time">{{
        timeFormat(replyDetail.createTime)
      }}</view>
    </view>

    <view class="reply-history" v-if="replyDetail.replies.length > 0">
      <view class="reply-history-title">历史回复：</view>
      <view
        class="reply-history-list"
        v-for="(item, index) in replyDetail.replies"
        :key="index"
      >
        <view class="reply-time">{{ timeFormat(item.createTime) }}</view>
        <view
          class="reply-content"
          :class="item.isReply == 1 ? 'reply-get' : 'reply-send'"
        >
          <view class="reply-content-type" v-if="item.isReply == 0">我：</view>
          <view class="reply-content-type" v-if="item.isReply == 1"
            >书记回复：</view
          >
          <view class="reply-content-text">{{ item.content }}</view>
        </view>
      </view>
    </view>

    <view class="add-reply">
      <view class="add-reply-title">
        <view class="add-reply-title-t">添加回复：</view>
        <image
          class="add-reply-title-i"
          src="../../../static/image/icon-send.png"
          mode="aspectFit"
          @click="reply()"
        ></image>
      </view>
      <view class="add-reply-cont">
        <textarea
          class="add-reply-input"
          placeholder-class="place-holder"
          placeholder="在此输入回复信息…"
          maxlength="200"
          v-model="content"
        />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      mailId: '',
      replyDetail: {},
      content: '',
    };
  },
  onLoad(option) {
    this.mailId = option.id;
    this.getReply();
  },
  onShow() {},
  methods: {
    getReply() {
      this.$api.mailBoxDetail({}, this.mailId).then(res => {
        this.replyDetail = res;
      });
    },
    reply() {
      if (this.content != '') {
        let data = {
          content: this.content,
          mailboxId: this.replyDetail.id,
        };
        this.$api.mailBoxReply(data).then(res => {
          this.$toast('回复成功');
          this.content = '';
          this.getReply();
        });
      }
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
  height: 100%;
  padding: 30rpx 0;
  background: #f2f2f6;
}
.mail-detail {
  width: 642rpx;
  height: auto;
  padding: 30rpx;
  margin: 0 auto 24rpx;
  border-radius: 16rpx;
  background: #ffffff;
  .mail-detail-title {
    line-height: 44rpx;
    font-size: 32rpx;
    text-align: left;
  }
  .mail-detail-cont {
    line-height: 42rpx;
    font-size: 26rpx;
    color: #757575;
    text-align: left;
    margin: 30rpx 0 0;
  }
  .mail-detail-time {
    line-height: 34rpx;
    font-size: 24rpx;
    color: #696969;
    text-align: right;
    margin-top: 24rpx;
  }
}

.reply-history {
  width: 642rpx;
  height: auto;
  padding: 30rpx;
  margin: 0 auto 24rpx;
  border-radius: 16rpx;
  background: #ffffff;
  .reply-history-title {
    height: 44rpx;
    line-height: 44rpx;
    padding-bottom: 26rpx;
    font-size: 32rpx;
    text-align: left;
    border-bottom: 1px rgba(159, 159, 159, 0.5) solid;
  }
  .reply-history-list {
    .reply-time {
      padding: 30rpx 0 24rpx;
      line-height: 34rpx;
      font-size: 24rpx;
      text-align: left;
      color: #757575;
    }
    .reply-content {
      width: auto;
      padding: 24rpx;
      border-radius: 16rpx;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      .reply-content-type {
        width: 180rpx;
        line-height: 40rpx;
        font-size: 26rpx;
        text-align: left;
      }
      .reply-content-text {
        line-height: 40rpx;
        font-size: 26rpx;
        text-align: left;
      }
    }
    .reply-get {
      background: #f2f2f6;
    }
    .reply-send {
      background: #d9f4fe;
    }
  }
}
.add-reply {
  width: 642rpx;
  height: auto;
  padding: 30rpx;
  margin: 0 auto;
  border-radius: 16rpx;
  background: #ffffff;
  .add-reply-title {
    height: 44rpx;
    margin-bottom: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .add-reply-title-t {
      font-size: 32rpx;
    }
    .add-reply-title-i {
      width: 48rpx;
      height: 48rpx;
    }
  }
  .add-reply-cont {
    width: auto;
    height: auto;
    border: 1px #dbdbdb solid;
    border-radius: 16rpx;
    padding: 24rpx;
    .add-reply-input {
      width: 100%;
      height: 180rpx;
      line-height: 36rpx;
      font-size: 26rpx;
      text-align: left;
    }
  }
}
</style>
