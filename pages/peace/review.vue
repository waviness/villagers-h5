<template>
	<view class="container">
		<view class="publish">
			<peace-section label="处理满意度" :marginBottom="24">
				<u-rate :count="5" v-model="rate" active-color="#5FC2FF" size="40"></u-rate>
			</peace-section>
			<view class="publish__desc">调解评价：</view>
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
				rate: 0,
				border: false,
				clearable: false,
			};
		},

		onLoad(option) {
			this.id = option.id;
		},

		methods: {
			async submit() {
				const res = await this.$api.updatePeaceEvent({
					id: this.id,
					comments: this.value,
					rate: this.rate,
				});

				if (res) {
					uni.showToast({
						title: '评价成功',
						success() {
							setTimeout(() => {
								uni.navigateBack()
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
