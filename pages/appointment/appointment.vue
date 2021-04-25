<template>
	<view class="container">
		<scroll-view class="content" scroll-y @scrolltolower="loadMoreLow()" refresher-enabled="true"
			:refresher-triggered="triggered" :refresher-threshold="100" refresher-background="#f8f8f8"
			@refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
			@refresherabort="onAbort">
			<view class="appointment" :class="index == (appointmentList.length - 1) ? '' : 'appointment-b'"
				v-for="(item, index) in appointmentList" :key="index" @click="appointmentDetail(item.id)">
				<view class="appointment-name">{{item.title}}</view>
				<view class="appointment-time">{{timeFormat(item.startTime)}} ~ {{timeFormat(item.endTime)}}</view>
				<view class="angle angle-1" v-if="item.status == 1"></view>
				<view class="angle-text" v-if="item.status == 1">已预约</view>
				<view class="angle angle-2" v-if="item.status == 0"></view>
				<view class="angle-text" v-if="item.status == 0">待回复</view>
				<view class="angle angle-3" v-if="item.status == 3"></view>
				<view class="angle-text" v-if="item.status == 3">被拒绝</view>
				<view class="angle angle-3" v-if="item.status == 2"></view>
				<view class="angle-text" v-if="item.status == 2">已取消</view>
			</view>

			<uni-load-more :status="loadStatus" :content-text="contentText" color="#6b6c6c"
				v-if="appointmentList.length > 0" />

			<view class="no_data" v-if="appointmentList.length == 0">
				<image class="no_img" src="../../static/image/no-viliager.png" mode="aspectFit"></image>
				<view class="no_text">暂时还没有消息哦~</view>
			</view>
		</scroll-view>
		
		<image class="release-btn" src="../../static/image/icon-release.png" mode="aspectFit" @click="appointmentAdd()"></image>
	</view>
</template>

<script>
	import {
		uniLoadMore
	} from '@dcloudio/uni-ui'
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				triggered: false,
				pageNum: 0,
				loadStatus: 'more',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多了'
				},
				appointmentList: [],
				appointmentList1: [{
						type: 1,
						title: '数字乡村项目合作数字乡村项目合作数字乡村项目合作',
						content: '数字乡村项目合作以及开数字乡村项目合作以及开数字乡村项目合作以及开发',
						time: '2020-01-01 11:11:11',
						status: 'read'
					},
					{
						type: 2,
						title: '数字乡村项目合作',
						content: '数字乡村项目合作以及开数字乡村项目合作以及开数字乡村项目合作以及开发',
						time: '2020-01-01 11:11:11',
						status: 'hadRead'
					},
					{
						type: 3,
						title: '数字乡村项目合作',
						content: '数字乡村项目合作以及开数字乡村项目合作以及开数字乡村项目合作以及开发',
						time: '2020-01-01 11:11:11',
						status: 'hadRead'
					}
				]
			}
		},
		onLoad() {
			this._freshing = false
			setTimeout(() => {
				this.triggered = true
			}, 100)
		},
		onShow() {
			this.setTabBarIndex(3)
		},
		methods: {
			// 设置消息logo
			setappointmentIcon(type) {
				let path = ''
				switch (type) {
					case 'aa':
						path = '../../static/image/serve/icon-serve-1-1.png'
						break;
					default:
						break;
				}
				return path
			},
			loadMoreLow() {
				this.pageNum++
				if (this.loadStatus != 'noMore') {
					this.getappointment()
				}
			},
			getappointment() {
				// this.appointmentList = this.appointmentList1
				let obj = '?page=' + this.pageNum + '&size=10'
				this.$api.visitorGetAppointment(obj).then(res => {
					this.appointmentList = this.appointmentList.concat(res.data)
					if (res.totalElements < 10) {
						this.loadStatus = 'noMore'
					}
				})
			},
			// 加载线下广告
			loadappointment() {
				this.pageNum = 0
				this.appointmentList = []
				this.loadStatus = 'more'
				this.loadMoreLow()
			},
			// 上拉刷新
			onPulling(e) {
				// console.log("onpulling", e);
			},
			onRefresh() {
				if (this._freshing = false) return
				this._freshing = true
				this.loadappointment()
				setTimeout(() => {
					this.triggered = false
					this._freshing = false
				}, 500)
			},
			onRestore() {
				this.triggered = 'restore'; // 需要重置
			},
			onAbort() {

			},
			appointmentAdd() {
				uni.navigateTo({
					url: './appointmentAdd/appointmentAdd'
				})
			},
			appointmentDetail(id) {
				uni.navigateTo({
					url: './appointmentDetail/appointmentDetail?id=' + id
				})
			},
			// 时间戳转化
			timeFormat(str) {
				return this.$moment(str).format("YY-MM-DD hh:mm:ss")
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		width: 100%;
		height: 100vh;
		background: #F2F2F6;
	}

	.content {
		width: 100%;
		height: calc(100% - 30rpx);
		padding-top: 30rpx;
	}

	.appointment-b {
		margin-bottom: 48rpx;
	}

	.appointment {
		width: 642rpx;
		height: auto;
		padding: 30rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		margin: 0 auto 30rpx;
		position: relative;
		overflow: hidden;

		.appointment-name {
			height: 44rpx;
			line-height: 44rpx;
			font-size: 32rpx;
			font-weight: bold;
			width: 502rpx;
			margin-bottom: 20rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.appointment-time {
			height: 40rpx;
			line-height: 40rpx;
			font-size: 24rpx;
			background: url(../../static/image/icon-right.png) 602rpx 0 no-repeat;
			background-size: 40rpx 40rpx;
		}

		.angle {
			width: 0;
			height: 0;
			z-index: 98;
			position: absolute;
			top: 0;
			right: 0;
		}

		.angle-1 {
			// background-color: #5fc2ff;
			border-top: 116rpx solid #5fc2ff;
			border-left: 116rpx solid transparent;
		}

		.angle-2 {
			// background-color: #8dd34a;
			border-top: 116rpx solid #8dd34a;
			border-left: 116rpx solid transparent;
		}

		.angle-3 {
			// background-color: #e43838;
			border-top: 116rpx solid #e43838;
			border-left: 116rpx solid transparent;
		}
		.angle-text{
			width: 80rpx;
			height: 30rpx;
			line-height: 30rpx;
			font-size: 22rpx;
			color: #FFFFFF;
			transform: rotate(45deg);
			z-index: 99;
			position: absolute;
			top: 26rpx;
			right: -10rpx;
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
	
	.release-btn{
		width: 144rpx;
		height: 144rpx;
		position: fixed;
		right: 40rpx;
		bottom: 140rpx;
		z-index: 999;
	}
</style>
