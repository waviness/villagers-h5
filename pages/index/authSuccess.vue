<template>
	<view class="container">
		<view class="auth-success">
			<image src="../../static/image/success.png" mode=""></image>
			<view class="auth-success__title">
				恭喜您授权成功！
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100vw;
		height: 100vh;
	}

	.auth-success {
		color: #333;
		font-size: 36rpx;
		font-weight: 600;
		width: 500rpx;
		height: 500rpx;
		margin: 250rpx auto;
		text-align: center;
		position: relative;
		
		image {
			width: 100%;
			height: 100%;
		}
		
		&__title {
			position: absolute;
			bottom: 26rpx;
			width: 100%;
			letter-spacing: 1px;
		}
	}
</style>
