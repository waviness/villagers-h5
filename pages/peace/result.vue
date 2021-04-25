<template>
	<view class="container">
		<view class="publish">
			<view class="publish__desc">调解结果：</view>
			<view class="publish-textarea">
				<u-input v-model="value" type="textarea" placeholder="在此输入详细评价…" :border="border" height="184"
					auto-height="true" :clearable="clearable" maxlength="300" />
			</view>
		</view>
		<view class="publish-btn">
			<u-button type="primary" shape="circle" @click="submit">提交</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				border: false,
				clearable: false,
			};
		},

		onLoad(option) {
			this.id = option.id;
			this.uncleId = option.uncleId;
		},

		methods: {
			async submit() {
				const res = await this.$api.updatePeaceEvent({
					id: this.id,
					result: this.value,
					finish: 1,
				});

				if (res) {
					uni.showToast({
						title: '调解成功',
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 2
								})
							}, 800)
						}
					})
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100vh;
		background-color: #f2f2f6;
		padding: 24rpx;
		box-sizing: border-box;
	}

	.publish {
		border-radius: 16rpx;
		background-color: #fff;
		padding: 32rpx 24rpx;

		&-textarea {
			@include input-border;
		}

		&__desc {
			margin-bottom: 32rpx;
			font-size: 32rpx;
		}

		&-btn {
			padding: 112rpx 72rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			box-sizing: border-box;
		}
	}
</style>
