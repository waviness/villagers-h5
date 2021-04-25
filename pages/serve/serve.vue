<template>
	<view class="container">
		<!-- banner -->
		<view v-if="bannerList.length" class="banner">
			<swiper class="swiper" :indicator-dots="indicatorDots" :current="current" :autoplay="autoplay"
				indicator-color="#ffffff" indicator-active-color="#69C0FF" :interval="interval" :duration="duration"
				circular>
				<block v-for="(item, index) in bannerList" :key="index">
					<swiper-item>
						<image class="banner_img" :src="baseUrl + item.icon" mode="scaleToFill"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>

		<view class="meau" v-for="(item, index) in serveList" :key="index">
			<view class="meau-title">
				<view class="meau-title-l"></view>
				<view class="meau-title-t">{{ item.menuName }}</view>
			</view>
			<view class="meau-list" v-if="item.children">
				<view class="meau-list-item" v-for="(item1, index1) in item.children" :key="index1"
					@click="linkGo(item1.routerPath)">
					<image class="meau-list-img" :src="baseUrl + item1.menuIcon" mode="aspectFit">
					</image>
					<view class="meau-list-text">{{ item1.menuName }}</view>
				</view>
			</view>
		</view>
		<app-tabbar />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 4000,
				duration: 500,
				current: 0,
				// bannerList: [{
				// 		icon: '../../static/image/index/banner-1.png',
				// 		id: '',
				// 	},
				// 	{
				// 		icon: '../../static/image/index/banner-2.png',
				// 		id: '',
				// 	},
				// ],
				// serveList: [{
				// 	icon: '',
				// 	menuName: '村民就业',
				// 	path: '',
				// 	children: [{
				// 			menuIcon: '../../static/image/serve/icon-serve-2-1.png',
				// 			menuName: '技能培训',
				// 			routerPath: '',
				// 		},
				// 		{
				// 			menuIcon: '../../static/image/serve/icon-serve-2-2.png',
				// 			menuName: '务工招聘',
				// 			routerPath: '',
				// 		},
				// 	],
				// }, {
				// 	icon: '',
				// 	menuName: '便民服务',
				// 	path: '',
				// 	children: [{
				// 		menuIcon: '../../static/image/serve/icon-serve-2-1.png',
				// 		menuName: '书记预约',
				// 		routerPath: '/pages/appointment/appointmentAdd/appointmentAdd',
				// 	}, {
				// 		menuIcon: '../../static/image/serve/icon-serve-2-1.png',
				// 		menuName: '村友通讯录',
				// 		routerPath: '/pages/index/contact',
				// 	}, ],
				// }],
				baseUrl: uni.globalData.baseUrl,
				bannerList: [],
				serveList: []
			};
		},
		onLoad() {},
		onShow() {
			this.setTabBarIndex(1);
			this.bannerList = uni.getStorageSync('serveBannerList') || []
			this.serveList = uni.getStorageSync('serveList') || []
		},
		methods: {
			// 链接跳转
			linkGo(path) {
				console.log(path);
				uni.navigateTo({
					url: path,
				});
			},
		},
	};
</script>

<style lang="less" scoped>
	.container {
		width: 100%;
		height: 100%;
		background: #f2f2f6;
	}

	.content {
		width: 100%;
		height: 100%;
	}

	.banner {
		width: 750rpx;
		height: 270rpx;
		margin: 0 auto 30rpx;

		.banner_img {
			display: block;
			width: 750rpx;
			height: 270rpx;
			margin: auto;
			background: #999999;
		}

		.swiper {
			width: 750rpx;
			height: 270rpx;
		}
	}

	.meau {
		width: 700rpx;
		height: auto;
		padding: 25rpx 0;
		margin: 0 auto 30rpx;
		background: #ffffff;
		border-radius: 16rpx;

		.meau-title {
			height: 44rpx;
			padding-left: 24rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.meau-title-l {
				width: 12rpx;
				height: 36rpx;
				border-radius: 6rpx;
				background: #1a91f2;
				margin-right: 20rpx;
			}

			.meau-title-t {
				font-size: 32rpx;
				font-weight: bold;
			}
		}

		.meau-list {
			width: auto;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-wrap: wrap;

			.meau-list-item {
				width: 175rpx;
				height: auto;
				text-align: center;

				.meau-list-img {
					width: 92rpx;
					height: 92rpx;
					margin-top: 40rpx;
				}

				.meau-list-text {
					line-height: 40rpx;
					font-size: 28rpx;
					margin-top: 16rpx;
				}
			}
		}
	}
</style>
