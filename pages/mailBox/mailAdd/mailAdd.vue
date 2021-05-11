<template>
	<view class="container">
		<view class="mail-box">
			<view class="mail-title">
				<view class="mail-title-t">信件标题：</view>
				<input class="mail-title-input" type="text" maxlength="30" placeholder-class="place-holder" placeholder="输入标题" v-model="mail.title" />
			</view>
			
			<view class="mail-cont">
				<textarea class="mail-cont-input" placeholder-class="place-holder" placeholder="在此输入详细描述…" maxlength="200" v-model="mail.content" />
			</view>
			
			<view class="line"></view>
			
			<view class="mail-type">
				<view class="mail-type-t">匿名</view>
				<switch @change="switchChange" />
			</view>
		</view>
		<view class="submit" @click="mailAdd()">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mail: {
					"content": "",
					"isAnonymous": false,
					"title": ""
				}
			}
		},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods: {
			switchChange(e) {
				console.log(e)
				if (e.detail.value) {
					this.mail.isAnonymous = true
				} else {
					this.mail.isAnonymous = false
				}
			},
			mailAdd() {
				this.$api.newMailbox(this.mail).then(res => {
					this.$toast('信件发送成功')
					uni.navigateBack({
						delta: 1
					})
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		width: 100%;
		min-height: calc(100vh - 30rpx);
		padding-top: 30rpx;
		background: #F2F2F6;
	}
	.mail-box{
		width: 654rpx;
		height: auto;
		padding: 24rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		margin: auto;
		.mail-title{
			height: 60rpx;
			margin-bottom: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.mail-title-t{
				font-size: 32rpx;
			}
			.mail-title-input{
				width: 444rpx;
				height: 56rpx;
				line-height: 56rpx;
				padding: 0 12rpx;
				font-size: 26rpx;
				border: 1rpx #DBDBDB solid;
				border-radius: 12rpx;
			}
		}
		.mail-cont{
			width: 606rpx;
			height: auto;
			padding: 24rpx;
			border: 1rpx #DBDBDB solid;
			border-radius: 16rpx;
			.mail-cont-input{
				width: 100%;
				line-height: 36rpx;
				font-size: 26rpx;
			}
		}
		.line{
			width: 654rpx;
			height: 1px;
			background-color: rgba(159, 159, 159, 0.5);
			margin: 40rpx 0;
		}
		.mail-type{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.mail-type-t{
				font-size: 32rpx;
			}
		}
	}
	.submit{
		width: 560rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #5FC2FF;
		border-radius: 40rpx;
		text-align: center;
		font-size: 32rpx;
		color: #FFFFFF;
		position: absolute;
		bottom: 112rpx;
		left: 85rpx;
	}
</style>
