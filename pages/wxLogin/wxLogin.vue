<template>
	<view class="container">
		<view class="login-box">
			<view class="welcome">欢迎使用</view>
			<view class="welcome-1">安吉醉美横溪小程序</view>
			<view class="welcome-2">如果您是横溪坞村民，请授权后使用</view>

			<button class="login-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信授权手机号登录</button>

			<view class="login-other" @click="goLogin()">其他手机号登录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wxAuthCode: ''
			}
		},
		onLoad() {

		},
		onShow() {
			this.wxLogin()
		},
		methods: {
			wxLogin() {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						console.log('login success:', res);
						this.wxAuthCode = res.code ? res.code : ''
					},
					fail: (err) => {
						console.log('login fail:', err);
					}
				})
			},
			getPhoneNumber(e) {
				console.log(e)
				this.wxAuthLogin(e)
			},
			wxAuthLogin(data) {
				let obj = {
					"code": this.wxAuthCode,
					"encryptedData": data.detail.encryptedData,
					"iv": data.detail.iv,
					"villagerWxBind": false
				}
				this.$api.wxAuthLogin(obj).then(res => {
					console.log(res)
					this.$toast('授权登录成功')
					uni.setStorageSync('token', res.token)
					uni.setStorageSync('mobile', res.mobile)
					// 0：游客，1：村民
					uni.setStorageSync('role', res.role)
					// 是否已绑定微信号, 0：否，1：是
					uni.setStorageSync('needBindingWx', res.needBindingWx)
					uni.setStorageSync('isUncle', res.isUncle)
					if (res.role == 0) {
						uni.switchTab({
							url: '../index/index'
						})
					}
					if (res.role == 1) {
						if (res.needBindingWx) {
							uni.navigateTo({
								url: '../wxUserInfo/wxUserInfo'
							})
						} else {
							uni.switchTab({
								url: '../index/index'
							})
						}
					}
				}).catch(err => {
					this.wxLogin()
				})
			},
			goLogin() {
				uni.navigateTo({
					url: '../login/login'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		width: 100%;
		height: 100vh;
		background: linear-gradient(#FFFFFF, #5FC2FF);
	}

	.login-box {
		width: 100%;
		height: auto;
		position: absolute;
		top: 300rpx;
		left: 0;

		.welcome {
			line-height: 60rpx;
			padding-left: 48rpx;
			font-size: 42rpx;
		}

		.welcome-1 {
			line-height: 66rpx;
			padding-left: 48rpx;
			font-size: 48rpx;
			font-weight: bold;
			margin-top: 32rpx;
		}

		.welcome-2 {
			line-height: 66rpx;
			padding-left: 48rpx;
			margin-top: 32rpx;
		}

		.login-btn {
			width: 636rpx;
			padding-left: 130rpx;
			height: 96rpx;
			line-height: 96rpx;
			background-color: #5FC2FF;
			background-image: url(../../static/image/icon-in.png);
			background-repeat: no-repeat;
			background-position: 470rpx 30rpx;
			background-size: 40rpx 40rpx;
			border-radius: 48rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			text-align: left;
			margin-top: 180rpx;
		}

		.login-other {
			line-height: 42rpx;
			font-size: 30rpx;
			text-align: center;
			margin: 48rpx auto 0;
			color: #696969;
		}
	}
</style>
