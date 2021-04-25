<template>
	<view class="container">
		<view class="card">
			<peace-section label="选择调解人" :value="data.uncleName" :margin-bottom="36" />
			<peace-section label="矛盾描述" direction="vertical" :margin-bottom="36">
				<view class="content">{{ data.content }}</view>
			</peace-section>
			<peace-section v-if="!isUncle" label="调解状态" :value="status" />
			<view v-else class="time">{{ data.time }}</view>
		</view>
		<view v-if="data.isFinished == 0 && isUncle" class="bottombar">
			<u-button type="primary" shape="circle" @click="finish">
				完成调解</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isUncle: false,
				data: {},
			};
		},

		computed: {
			status() {
				return this.data.isFinished == 1 ? '完成调解' : '待调解';
			},
		},

		onLoad(option) {
			this.id = option.id;
			this.getDetail();
		},

		onShow() {
			this.isUncle = uni.getStorageSync('isUncle');
		},

		methods: {
			async getDetail() {
				this.data = await this.$api.getPeaceEvent(this.id);
				this.page = 1;
			},

			finish() {
				uni.navigateTo({
					url: `/pages/peace/result?id=${this.id}&uncleId=${this.data.villagerId}`,
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		padding: 24rpx;
	}

	.card {
		padding: 32rpx 28rpx 36rpx;
		border-radius: 16rpx;
		background-color: #fff;
	}

	.content {
		font-size: 26rpx;
		line-height: 36rpx;
		color: #757575;
	}

	.time {
		text-align: right;
		font-size: 24rpx;
		line-height: 34rpx;
		color: #666;
	}

	.bottombar {
		position: absolute;
		width: 100%;
		bottom: 112rpx;
		padding: 0 96rpx;
	}
</style>
