<template>
	<view class="container">
		<view class="appointment-box">
			<view class="appointment-title">
				<view class="appointment-title-t">{{appointmentDetail.title}}</view>
			</view>
			<view class="angle angle-1" v-if="appointmentDetail.status == 1"></view>
			<view class="angle-text" v-if="appointmentDetail.status == 1">已预约</view>
			<view class="angle angle-2" v-if="appointmentDetail.status == 0"></view>
			<view class="angle-text" v-if="appointmentDetail.status == 0">待回复</view>
			<view class="angle angle-3" v-if="appointmentDetail.status == 3"></view>
			<view class="angle-text" v-if="appointmentDetail.status == 3">被拒绝</view>
			<view class="angle angle-3" v-if="appointmentDetail.status == 2"></view>
			<view class="angle-text" v-if="appointmentDetail.status == 2">已取消</view>

			<view class="appointment-label">
				<view class="label-name">预约人</view>
				<view class="label-value">{{appointmentDetail.person}}</view>
			</view>
			<view class="appointment-label">
				<view class="label-name">联系电话</view>
				<view class="label-value">
					{{appointmentDetail.mobile}}
					<image class="mobile" src="../../../static/image/icon-mobile.png" mode="aspectFit"
						@click="callPhone()"></image>
				</view>
			</view>
			<view class="appointment-label">
				<view class="label-name">公司名称</view>
				<view class="label-value">{{appointmentDetail.company}}</view>
			</view>
			<view class="appointment-label">
				<view class="label-name">公司职位</view>
				<view class="label-value">{{appointmentDetail.cmpTitle}}</view>
			</view>
			<view class="appointment-label">
				<view class="label-name">预约时间</view>
				<view class="label-value">{{timeFormat(appointmentDetail.startTime)}} ~
					{{timeFormat(appointmentDetail.endTime)}}</view>
			</view>
			<view class="appointment-label">
				<view class="label-name">随访人数</view>
				<view class="label-value">{{appointmentDetail.num}}</view>
			</view>
			<view class="appointment-label">
				<view class="label-name">随访人员介绍</view>
				<view class="label-value"></view>
			</view>
			<view class="people-desc">
				{{appointmentDetail.intro}}
			</view>
		</view>

		<view class="appointment-reply" v-show="appointmentDetail.reply">
			<view class="reply-title">书记回复</view>
			<view class="reply-content">{{appointmentDetail.reply}}</view>
		</view>

		<view class="refuse-btn" v-if="appointmentDetail.status != 2" @click="cancel()">取消预约</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				appointmentId: '',
				appointmentDetail: {}
			}
		},
		onLoad(option) {
			this.appointmentId = option.id
			this.getDetail()
		},
		onShow() {

		},
		methods: {
			getDetail() {
				let obj = {}
				this.$api.visitorAppointmentDetail(obj, this.appointmentId).then(res => {
					this.appointmentDetail = res
				})
			},
			// 取消预约
			cancel() {
				uni.showModal({
					title: '提示',
					content: '确认取消预约？',
					success: (res) => {
						if (res.confirm) {
							let obj = {}
							this.$api.visitorAppointmentCancel(obj, this.appointmentId).then(res => {
								this.$toast('取消预约成功')
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 1000)
							})
						} else if (res.cancel) {
							
						}
					}
				})
				
			},
			// 时间戳转化
			timeFormat(str) {
				return this.$moment(str).format("YY-MM-DD hh:mm:ss")
			},
			// 打电话
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: this.appointmentDetail.mobile
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		width: 100%;
		min-height: calc(100vh - 90rpx);
		padding-top: 30rpx;
		padding-bottom: 60rpx;
		background: #F2F2F6;
	}

	.appointment-box {
		width: 654rpx;
		height: auto;
		padding: 0 24rpx 30rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		margin: 0 auto 24rpx;
		position: relative;
		overflow: hidden;

		.appointment-title {
			width: auto;
			height: 140rpx;
			border-bottom: 1px rgba(159, 159, 159, 0.5) solid;
			margin-bottom: 32rpx;

			.appointment-title-t {
				line-height: 140rpx;
				font-size: 32rpx;
				font-weight: bold;
				text-align: center;
			}
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

		.angle-text {
			width: 80rpx;
			height: 30rpx;
			line-height: 30rpx;
			font-size: 22rpx;
			color: #FFFFFF;
			transform: rotate(45deg);
			z-index: 99;
			position: absolute;
			top: 26rpx;
			right: 0;
		}

		.appointment-label {
			width: auto;
			line-height: 44rpx;
			padding: 30rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.label-name {
				font-size: 32rpx;
			}

			.label-value {
				font-size: 26rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;

				.mobile {
					width: 42rpx;
					height: 52rpx;
					margin-left: 30rpx;
				}
			}
		}

		.people-desc {
			width: 600rpx;
			line-height: 40rpx;
			font-size: 26rpx;
			color: #696969;
			margin: 20rpx auto 0;
		}
	}

	.appointment-reply {
		width: 654rpx;
		height: auto;
		padding: 30rpx 24rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		margin: auto;

		.reply-title {
			line-height: 50rpx;
			font-size: 32rpx;
			font-weight: bold;
		}

		.reply-content {
			width: 600rpx;
			line-height: 40rpx;
			font-size: 26rpx;
			color: #696969;
			margin: 20rpx auto 0;
		}
	}

	.refuse-btn {
		width: 560rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background-color: #E43838;
		border-radius: 40rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		margin: 80rpx auto 0;
	}
</style>
