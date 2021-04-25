<template>
  <view class="container">
    <!-- banner -->
    <view class="banner">
      <swiper
        class="swiper"
        :indicator-dots="indicatorDots"
        :current="current"
        :autoplay="autoplay"
        indicator-color="#ffffff"
        indicator-active-color="#69C0FF"
        :interval="interval"
        :duration="duration"
        circular
      >
        <block v-for="(item, index) in bannerList" :key="index">
          <swiper-item>
            <image
              class="banner_img"
              :src="baseUrl + item.icon"
              mode="scaleToFill"
            >
            </image>
          </swiper-item>
        </block>
      </swiper>
    </view>

    <view class="body">
      <!-- 村情简介 -->
      <view class="cun-desc" @click="goDesc()">
        <view class="desc-text">“从历史讲起</view>
        <view class="desc-text desc-text-1">了解美丽横溪坞”</view>
        <image
          class="desc-img"
          src="../../static/image/index/icon_right_1.png"
          mode="aspectFit"
        ></image>
      </view>

      <!-- 公众号关注 -->
      <!-- <view class="follow__wrapper" @click="onTo('/pages/index/conduct')">
				<view class="follow__header">
					<view class="follow__title">关注公众号获得专属服务</view>
					<image class="follow__more" src="../../static/image/icon-right.png" mode=""></image>
				</view>
				<view class="follow__body">
					<image class="follow__body-img" :src="follow.img" />
					<view class="follow__body-info">
						<view class="follow__body-info__name">
							{{ follow.name }}
						</view>
						<view class="follow__body-info__desc">
							{{ follow.desc }}
						</view>
					</view>
				</view>
			</view> -->

      <card v-for="(card, idx) in cards" :key="idx" :title="card.menuName">
        <u-row>
          <u-col v-for="(menu, idx2) in card.children" :key="idx2" span="4">
            <view class="menu__wrapper" @click="onTo(menu.routerPath)">
              <image class="menu__icon" :src="baseUrl + menu.menuIcon" />
              <view class="menu__text">{{ menu.menuName }}</view>
            </view>
          </u-col>
        </u-row>
      </card>

      <!-- 游客/村民弹窗 -->
      <view class="type-dialog" v-if="showDialog">
        <image
          class="dialog-img"
          src="../../static/image/index/tc-index.png"
          mode="aspectFit"
        ></image>
        <view class="dialog-footer">
          <view class="dialog-btn" @click="touristLogin()">我是游客</view>
          <view class="dialog-login-btn" @click="userLogin()">我是村民</view>
        </view>
        <!-- <view class="dialog-close"></view> -->
      </view>

      <u-sticky>
        <u-tabs
          :list="tabList"
          :current="currentTabIndex"
          gutter="27"
          active-color="#333"
          inactive-color="#333"
          font-size="32"
          :bar-style="barStyle"
          bg-color="#f2f2f6"
          @change="onChangeCurrentTabIndex"
        />
      </u-sticky>

      <view v-if="list.length" class="party-list">
        <view
          v-for="(item, idx) in list"
          :key="idx"
          class="message-card__wrapper"
        >
          <moments
            :data="item"
            :hasMore="hasMore"
            @click-content="toMomentsDetail(item)"
          />
          <!-- <peace-item :data="item" noTag>
						<view class="message-card-footer__wrapper">
							<view class="message-card-footer__item">
								<image class="message-card-footer__icon" src="/static/image/icon-like.png" />
								<view class="message-card-footer__number">{{ item.likeTotal }}</view>
							</view>
							<view class="message-card-footer__item">
								<image class="message-card-footer__icon" src="/static/image/icon-comment-circle.png" />
								<view class="message-card-footer__number">{{ item.comments.length }}</view>
							</view>
						</view>
					</peace-item> -->
        </view>
        <u-loadmore :status="status" />
      </view>
      <nodata v-else />
    </view>

    <!-- 遮罩 -->
    <view class="mask" v-if="showDialog"></view>
    <app-tabbar />
  </view>
</template>

<script>
import Card from '../../components-private/card';
import PeaceItem from '../../components-private/peace-item';

export default {
  components: {
    Card,
    PeaceItem,
  },

  data() {
    return {
      barStyle: {
        width: '44rpx',
        height: '8rpx',
        borderRadius: '4rpx',
        backgroundColor: '#2DA6F0',
      },

      follow: {
        img: '../../static/image/index/tc-index.png',
        name: '安吉横溪坞',
        desc: '横溪坞欢迎您！',
      },

      cards: [
        // {
        // 	menuName: '三务公开',
        // 	children: [{
        // 			visible: true,
        // 			menuIcon: '/static/image/index/icon-dw.png',
        // 			menuName: '党务',
        // 			routerPath: '/pages/work/party',
        // 		},
        // 		{
        // 			visible: true,
        // 			menuIcon: '/static/image/index/icon-cunwu.png',
        // 			menuName: '村务',
        // 			routerPath: '/pages/work/village',
        // 		},
        // 		{
        // 			visible: true,
        // 			menuIcon: '/static/image/index/icon-cw.png',
        // 			menuName: '财务',
        // 			routerPath: '/pages/work/finance',
        // 		},
        // 	],
        // },
      ],

      loginStatus: false, // 登录状态
      role: '',
      needBindingWx: false,
      showDialog: false,
      indicatorDots: true,
      autoplay: true,
      interval: 4000,
      duration: 500,
      current: 0,
      bannerList: [
        // {
        // 	icon: '../../static/image/index/banner-1.png',
        // },
        // {
        // 	icon: '../../static/image/index/banner-2.png',
        // },
      ],

      currentTabIndex: 0,
      tabList: [
        {
          name: '村聊动态',
        },
        // {
        // 	name: '事件上报',
        // },
        // {
        // 	name: '务工招聘',
        // },
        // {
        // 	name: '闲置发布',
        // },
      ],
      hasMore: false,
      page: 1,
      pageSize: 20,
      totalPage: 0,
      status: 'loadmore',
      list: [],

      baseUrl: uni.globalData.baseUrl,
    };
  },
  async onShow() {
    // if (uni.globalData.isRelease == -1) {
    //   const res = await this.$api.checkVersion();
    //   if (res == 1) {
    //     uni.globalData.isRelease = res;
    //     uni.reLaunch({
    //       url: '/pages/example/audit',
    //     });
    //   }
    // } else {
      this.setTabBarIndex(0);
      this.hasLgonin();
      this.getList();
      const role = uni.getStorageSync('role');
      this.tabList =
        role === 1
          ? [
              {
                name: '村聊动态',
              },
              {
                name: '事件上报',
              },
            ]
          : [
              {
                name: '村聊动态',
              },
            ];
    // }
  },
  onReachBottom() {
    if (this.page < this.totalPage) {
      this.status = 'loading';
      this.page++;
      this.getList();
    } else {
      this.status = 'nomore';
    }
  },
  methods: {
    onChangeCurrentTabIndex(index) {
      if (this.currentTabIndex !== index) {
        this.currentTabIndex = index;
        this.page = 1;
        this.list = [];
        this.getList();
      }
    },

    // 判断是否登录及身份
    hasLgonin() {
      let token = uni.getStorageSync('token');
      this.role = uni.getStorageSync('role');
      this.needBindingWx = uni.getStorageSync('needBindingWx');
      if (token) {
        this.loginStatus = true;
      } else {
        this.loginStatus = false;
        uni.reLaunch({
          url: '../wxLogin/wxLogin',
        });
        return;
      }
      if (this.role == 1 && this.needBindingWx) {
        uni.navigateTo({
          url: '../wxUserInfo/wxUserInfo',
        });
        return;
      }
      this.getHome();
    },
    // 获取首页信息
    getHome() {
      this.$api.getIndex().then(res => {
        res.announcements.forEach(item => {
          if (item.pageModule === 0) {
            // 首页
            this.bannerList = item.announcements;
          } else if (item.pageModule === 1) {
            // 服务大厅
            uni.setStorageSync('serveBannerList', item.announcements);
          } else if (item.pageModule === 2) {
            // 党务
            uni.setStorageSync('partyBannerList', item.announcements);
          } else if (item.pageModule === 3) {
            // 村务
            uni.setStorageSync('countryBannerList', item.announcements);
          } else if (item.pageModule === 4) {
            // 财务
            uni.setStorageSync('financeBannerList', item.announcements);
          }
        });
        res.menus.forEach(item => {
          if (item.pageModule === 0) {
            // 首页
            this.cards = item.menus;
          } else if (item.pageModule === 1) {
            // 服务大厅
            uni.setStorageSync('serveList', item.menus);
          } else if (item.pageModule === 2) {
            // 发布
            uni.setStorageSync('releaseList', item.menus);
          } else if (item.pageModule === 3) {
            // 个人中心
            uni.setStorageSync('usercenterList', item.menus);
          }
        });
      });
    },
    // 游客
    touristLogin() {
      this.showDialog = false;
    },
    // 村民
    userLogin() {
      uni.reLaunch({
        url: '../wxLogin/wxLogin',
      });
    },
    // 村情简介
    goDesc() {
      uni.navigateTo({
        url: '../viliageDesc/viliageDesc',
      });
    },

    onTo(url) {
      uni.navigateTo({
        url,
      });
    },
    async getList() {
      let res = {};
      if (this.currentTabIndex === 0) {
        res = await this.$api.getMomentsList({
          page: this.page,
          size: this.pageSize,
          type: 0,
          onlySelf: false,
        });
      } else if (this.currentTabIndex === 1) {
        res = await this.$api.getEventReportList({
          page: this.page,
          size: this.pageSize,
          onlySelf: false,
        });
      }
      this.list = this.list.concat(res.data);
      this.totalPage = Math.ceil(res.totalElements / this.pageSize);
      if (res.totalElements < this.pageSize) {
        this.status = 'nomore';
      }
    },
    toMomentsDetail(item) {
      if (this.currentTabIndex === 0) {
        uni.navigateTo({
          url: '/pages/moments/detail?id=' + item.id,
        });
      } else if (this.currentTabIndex === 1) {
        uni.navigateTo({
          url: '/pages/event/detail?id=' + item.id,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  padding: 24rpx;
}

.menu {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__icon {
    width: 76rpx;
    height: 76rpx;
    margin-bottom: 20rpx;
  }

  &__text {
    font-size: 28rpx;
    line-height: 40rpx;
    color: #333;
  }
}

.message-card {
  &__wrapper {
    position: relative;
  }

  &-footer {
    &__wrapper,
    &__item {
      display: flex;
      align-items: center;
    }

    &__icon {
      width: 36rpx;
      height: 36rpx;
      margin-right: 16rpx;
    }

    &__number {
      font-size: 22rpx;
      line-height: 32rpx;
      color: #989898;
    }
  }
}
</style>

<style lang="less" scoped>
.container {
  width: 100%;
  min-height: calc(100vh - 49px);
  background: #f2f2f6;
}

.banner {
  width: 750rpx;
  height: 270rpx;
  margin: auto;

  .banner_img {
    display: block;
    width: 750rpx;
    height: 270rpx;
    margin: auto;
    background: #999999;
  }

  .swiper {
    width: 750rpx;
    height: 270rpx;
  }
}

.cun-desc {
  width: 704rpx;
  height: 208rpx;
  padding-top: 36rpx;
  margin: 0 auto 24rpx;
  background: url(../../static/image/index/icon_desc.png) 0 0 no-repeat;
  background-size: 100% 100%;
  position: relative;

  .desc-text {
    line-height: 44rpx;
    font-size: 32rpx;
    font-weight: bold;
    margin-left: 30rpx;
  }

  .desc-text-1 {
    margin-left: 112rpx;
    margin-top: 16rpx;
  }

  .desc-img {
    position: absolute;
    width: 60rpx;
    height: 60rpx;
    top: 74rpx;
    right: 20rpx;
  }
}

.type-dialog {
  width: 580rpx;
  height: 656rpx;
  background: #f2f2f6;
  border-radius: 16rpx;
  position: absolute;
  top: calc(50% - 328rpx - 50px);
  left: 85rpx;
  z-index: 99;

  .dialog-img {
    display: block;
    width: 580rpx;
    height: 463rpx;
  }

  .dialog-footer {
    width: auto;
    height: 192rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .dialog-btn {
      width: 110px;
      height: 38px;
      line-height: 38px;
      font-size: 16px;
      text-align: center;
      border-radius: 20px;
      border: 1px #5fc2ff solid;
    }

    .dialog-login-btn {
      width: 120px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 16px;
      border-radius: 20px;
      background: linear-gradient(#79ccff, #b6ebff);
    }
  }
}

.mask {
  width: 100%;
  height: 100vh;
  background: rgba(51, 51, 51, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 98;
}

.follow {
  &__wrapper {
    border-radius: 16rpx;
    background-color: #fff;
    padding: 28rpx 20rpx 20rpx;
    margin-bottom: 24rpx;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-weight: 600;
    font-size: 28rpx;
  }

  &__more {
    width: 48rpx;
    height: 48rpx;
  }

  &__body {
    background-color: #f2f2f6;
    border-radius: 8rpx;
    padding: 28rpx;
    margin: 20rpx 0;
    display: flex;

    &-img {
      width: 88rpx;
      height: 88rpx;
      margin-right: 38rpx;
    }

    &-info {
      &__name {
        font-size: 28rpx;
        font-weight: 600;
      }

      &__desc {
        font-size: 22rpx;
        margin-top: 24rpx;
      }
    }
  }
}
</style>
