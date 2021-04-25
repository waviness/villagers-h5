<template>
	<view class="container">
		<peace-item :data="data" no-tag>
			<view v-if="!isUncle" class="rate">
				<view v-if="computedIsVillagers" class="rate-number">
					<view class="rate-number__inner">
						<view class="rate-number__label">我的评分：</view>
						<view class="rate-number__value">{{ computedRate }}</view>
					</view>
				</view>
				<view class="rate__divider u-border-bottom"></view>
				<view v-if="computedIsVillagers" class="rate-star">
					<view class="rate-star__label">处理满意度</view>
					<view class="rate-star__value">
						<u-rate :count="count" v-model="data.rate" active-color="#5FC2FF" size="40"></u-rate>
					</view>
				</view>
				<view class="rate-comment">
					<text class="rate-comment__label">我的评价：</text>
					{{ data.comments }}
				</view>
			</view>
			<view v-else>
				<view class="rate__divider u-border-bottom"></view>
				<view class="rate-comment">
					<text class="rate-comment__label">调节结果：</text>
					{{ data.result }}
				</view>
			</view>
		</peace-item>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isUncle: false,
				role: 'villagers',
				count: 5,
				data: {}
			};
		},

		onLoad(option) {
			this.id = option.id
			this.getDetail();
		},

		onShow() {
			this.isUncle = uni.getStorageSync('isUncle')
		},

		computed: {
			computedRate() {
				return this.data.rate.toFixed(1);
			},

			computedIsVillagers() {
				return this.role === 'villagers'
			},
		},

		methods: {
			async getDetail() {
				this.data = await this.$api.getPeaceEvent(this.id)
				this.page = 1
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-top: 24rpx;
	}

	.rate {
		&__divider {
			height: 1px;
			margin: 32rpx 0;
		}

		&-number {
			padding-top: 32rpx;

			&__inner {
				display: flex;
				align-items: center;
				padding: 12rpx 16rpx;
				border-radius: 4rpx;
				background-color: #F2F2F6;
			}

			&__label {
				font-size: 28rpx;
			}


			&__value {
				margin-left: 4rpx;
				font-size: 32rpx;
				font-weight: bold;
				color: #2A82FD;
			}
		}

		&-star {
			display: flex;
			align-items: center;
			padding: 16rpx 0 48rpx;

			&__label {
				font-size: 32rpx;
				font-weight: bold;
			}

			&__value {
				margin-left: 56rpx;
			}
		}

		&-comment {
			padding: 22rpx 28rpx;
			font-size: 28rpx;
			line-height: 50rpx;
			color: #5FC2FF;
			background-color: #F2F2F6;
			border-radius: 8rpx;

			&__label {
				color: #333;
			}
		}
	}
</style>
