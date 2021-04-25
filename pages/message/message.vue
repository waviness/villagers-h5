<template>
	<view class="container">
		<scroll-view class="content" scroll-y @scrolltolower="loadMoreLow()" refresher-enabled="true"
			:refresher-triggered="triggered" :refresher-threshold="100" refresher-background="#f8f8f8"
			@refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
			@refresherabort="onAbort">
			<view class="message" :class="index == messageList.length - 1 ? '' : 'message-b'"
				v-for="(item, index) in messageList" :key="index" @click="handleLink(item)">
				<view class="message-info">
					<view class="message-type">
						<view class="message-type__content" :style="'background-color: ' + bgColor[item.type]">
							{{ typeList[item.type] }}
						</view>
						<view class="message-type__status" v-if="item.isRead == 0"></view>
					</view>
					<view class="message-title">{{ item.title }}</view>
					<view class="message-time">{{ timeFormat(item.createTime) }}</view>
				</view>
				<view v-if="item.type === 0" class="message-detail-2">
					<view class="message-result">预约人：{{ item.apptPerson }}
						预约时间：{{ formatDate(item.apptBeginTime) }}({{ formatWeek(item.apptBeginTime) }}),</view>
					<view class="message-result">{{ formatTime(item.apptBeginTime) }} -
						{{ formatTime(item.apptEndTime) }}
					</view>
				</view>
				<view v-else-if="item.type === 3" class="message-detail">
					<view class="message-result">申请人：{{ item.argPerson }}
						老娘舅：{{ item.argMediateUncle }}</view>
				</view>
				<view v-else-if="item.type === 5">
					<view v-if="item.content" class="message-result">{{ item.content }}</view>
					<view class="message-moment">
						<image v-if="item.momentsImg" :src="baseUrl + item.momentsImg" class="message-moment__img" />
						<view class="message-moment__desc">
							{{ item.momentsContent }}
						</view>
					</view>
				</view>
				<view v-else class="message-detail">
					<view class="message-result">{{ item.content }}</view>
				</view>
			</view>

			<uni-load-more :status="loadStatus" :content-text="contentText" color="#6b6c6c"
				v-if="messageList.length > 0" />

			<view class="no_data" v-if="messageList.length == 0">
				<image class="no_img" src="../../static/image/no-viliager.png" mode="aspectFit"></image>
				<view class="no_text">暂时还没有消息哦~</view>
			</view>
		</scroll-view>
		<app-tabbar />
	</view>
</template>

<script>
	import {
		uniLoadMore
	} from '@dcloudio/uni-ui';
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
				bgColor: ['#5fdaff', '#FF9F5F', '#3F60E6', '#8583FB', '#da3b3b', '#9AE647'],
				typeList: ['书记预约', '书记信箱', '事件上报', '矛盾调解', '三务公开', '村聊动态'],
				messageList: [],
				baseUrl: uni.globalData.baseUrl,
			};
		},
		onLoad() {
			this._freshing = false;
			setTimeout(() => {
				this.triggered = true;
			}, 100);
		},
		onShow() {
			this.setTabBarIndex(3);
		},
		methods: {
			// 设置消息logo
			setMessageIcon(type) {
				let path = '';
				switch (type) {
					case 'aa':
						path = '../../static/image/serve/icon-serve-1-1.png';
						break;
				}
				return path;
			},
			loadMoreLow() {
				this.pageNum++;
				if (this.loadStatus != 'noMore') {
					this.getMessage();
				}
			},
			getMessage() {
				let obj = '?page=' + this.pageNum + '&size=10';
				let role = uni.getStorageSync('role');
				this.$api.getMsg(obj).then(res => {
					this.messageList = this.messageList.concat(res.data);
					if (res.totalElements < 10) {
						this.loadStatus = 'noMore';
					}
				});
			},
			// 加载线下广告
			loadMessage() {
				this.pageNum = 0;
				this.messageList = [];
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
				this.loadMessage();
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 500);
			},
			onRestore() {
				this.triggered = 'restore'; // 需要重置
			},
			onAbort() {},
			handleLink(data) {
				this.$api.visitorMsgRead({}, data.id).then(res => {});
				data.isRead = true;
				switch (data.type) {
					case 0: // 书记预约
						uni.navigateTo({
							url: '../appointment/appointmentDetail/appointmentDetail?id=' + data.objId
						})
						break
					case 1: // 书记信箱
						uni.navigateTo({
							url: '../mailBox/mailReply/mailReply?id=' + data.objId
						})
						break
					case 2: // 事件上报
						uni.navigateTo({
							url: '/pages/event/detail?id=' + data.objId
						})
						break
					case 3: // 矛盾调解
						uni.navigateTo({
							url: '/pages/peace/detail?id=' + data.objId
						})
						break
					case 4: // 三务公开
						uni.navigateTo({
							url: '/pages/work/detail?id=' + data.objId
						})
						break
					case 5: // 村聊动态
						uni.navigateTo({
							url: '/pages/moments/detail?id=' + data.objId
						})
						break
				}
			},
			// 时间戳转化
			timeFormat(str) {
				return this.$moment(str).format('YY-MM-DD hh:mm:ss');
			},
			formatTime(str) {
				return this.$moment(str).format('mm:ss');
			},
			formatDate(str) {
				return this.$moment(str).format('MM/DD')
			},
			formatWeek(date) {
				const weeks = ['日', '一', '二', '三', '四', '五', '六']
				const week = this.$moment(date).day()
				return '周' + weeks[week]
			},
		},
	};
</script>

<style lang="less" scoped>
	.container {
		width: 100%;
		height: calc(100vh - 49px);
		background: #f2f2f6;
	}

	.content {
		width: 100%;
		height: calc(100% - 30rpx);
	}

	.message-b {
		margin-bottom: 24rpx !important;
	}

	.message {
		padding: 32rpx 24rpx 40rpx 24rpx;
		background-color: #ffffff;
		border-radius: 16rpx;
		margin: 24rpx;

		.message-info {
			width: auto;
			height: 48rpx;
			display: flex;
			align-items: center;
			margin-bottom: 40rpx;

			.message-type {
				position: relative;

				&__content {
					width: 136rpx;
					height: 48rpx;
					line-height: 48rpx;
					font-size: 28rpx;
					text-align: center;
					color: #fff;
					border-radius: 8rpx;
				}

				&__status {
					width: 12rpx;
					height: 12rpx;
					background-color: #E43838;
					border-radius: 50%;
					position: absolute;
					top: -6rpx;
					right: -6rpx;
				}
			}

			.message-title {
				width: 314rpx;
				font-size: 32rpx;
				font-weight: bold;
				text-align: left;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-left: 24rpx;
			}

			.message-time {
				width: 180rpx;
				font-size: 22rpx;
				color: #757575;
				text-align: right;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		.message-detail {
			height: 40rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;

			.message-result {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 28rpx;
				margin-right: 10rpx;
			}

			.message-cont-b {
				flex: 1;
				font-size: 28rpx;
				color: #5fc2ff;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		&-moment {
			height: 136rpx;
			display: flex;
			background-color: #F2F2F6;
			margin-top: 32rpx;

			&__img {
				width: 136rpx;
				height: 136rpx;
			}

			&__desc {
				flex: 1;
				font-size: 28rpx;
				margin: 32rpx;
				word-break: break-all;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
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
</style>
