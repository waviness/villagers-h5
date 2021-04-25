<template>
	<view class="container pb-100">
		<view class="title">
			{{title}}
		</view>
		<view class="info">
			<view class="info__add">
				{{add}}
			</view>
			<view class="info__location">
				{{location}}
			</view>
			<view class="info__time">
				{{time}}
			</view>
		</view>
		<view class="img">
			<image src="../../static/image/index/banner-2.png" mode=""></image>
		</view>
		<view class="service">
			关注公众号，将会获得以下服务
			<view class="service-list">
				<view v-for="(item, index) in serviceList" :key="index" class="service-item">
					{{item.name}}
				</view>
			</view>
		</view>
		<view class="ercode">
			<image src="../../static/image/index/tc-index.png" mode="aspectFill"></image>
			<view class="ercode__title">
				长按识别即可关注
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '关注安吉横溪坞公众号，获得你的专属服务',
				add: '横溪坞',
				location: '安吉横溪坞',
				time: '2020-11-24',
				serviceList: [{
					name: '村务信息提醒'
				}, {
					name: '农产品推广'
				}, {
					name: '旅游线路攻略'
				}, {
					name: '生态康养介绍'
				}]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 24rpx;
		color: #333333;
		background-color: #fff;
		overflow: auto;
	}

	.title {
		font-size: 36rpx;
		font-weight: 600;
		margin: 32rpx 0;
	}

	.info {
		display: flex;
		color: #757575;
		font-size: 32rpx;
		margin: 48rpx 0;

		&__location {
			color: #4FA6EB;
			margin: 0 24rpx;
		}
	}

	.img {
		width: 100%;
		height: 436rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.service {
		background-color: #F2F2F6;
		border-radius: 16rpx;
		padding: 36rpx 24rpx 48rpx 24rpx;
		text-align: center;
		font-weight: 600;
		font-size: 36rpx;
		margin-top: 48rpx;

		&-list {
			display: flex;
			flex-wrap: wrap;
			margin-top: 16rpx;
		}

		&-item {
			width: 310rpx;
			height: 160rpx;
			line-height: 160rpx;
			border-radius: 8rpx;
			background-color: #fff;
			margin-top: 32rpx;

			&:nth-child(2n+1) {
				margin-right: 32rpx;
			}
		}
	}

	.ercode {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 80rpx 0;
		font-size: 28rpx;

		image {
			width: 212rpx;
			height: 212rpx;
			margin-bottom: 24rpx;
		}
	}
</style>
