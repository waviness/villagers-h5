<template>
	<view class="container">
		<view class="login-box">
			<!-- <view class="welcome">欢迎使用</view> -->
			<view class="welcome-1">请完善个人信息</view>

			<button v-if="canIUseGetUserProfile" class="login-btn" @click="getUserProfile">授权微信用户信息</button>

			<button v-else class="login-btn" open-type="getUserInfo" @getuserinfo="getWxUserInfo">授权微信用户信息</button>

			<!-- <view class="login-other" @click="goLogin()">其他手机号登录</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wxAuthCode: '',
				canIUseGetUserProfile: false
			}
		},
		onLoad() {
			if (wx.getUserProfile) {
				this.canIUseGetUserProfile = true
			}
		},
		onShow() {
			this.wxLogin()
		},
		methods: {
			getUserProfile() {
				wx.getUserProfile({
					lang: 'zh_CN',
					desc: '用于完善会员资料',
					success: (res) => {
						this.getWxUserInfo({
							detail: res
						})
					}
				})
			},
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
				this.getWxUserInfo(e)
			},
			getWxUserInfo(data) {
				let obj = {
					"code": this.wxAuthCode,
					"encryptedData": data.detail.encryptedData,
					"iv": data.detail.iv,
					"mobile": uni.getStorageSync('mobile'),
					"villagerWxBind": false
				}
				this.$api.wxGetUserInfo(obj).then(res => {
					this.$toast('绑定微信成功')
					// 是否已绑定微信号, 0：否，1：是
					uni.setStorageSync('needBindingWx', false)
					uni.setStorageSync('token', res.token)
					uni.setStorageSync('role', 1)
					uni.switchTab({
						url: '/pages/index/index'
					})
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
