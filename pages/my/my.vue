<template>
	<view class="container">
		<view class="top-wrap">
			<view class="user-info__wrapper">
				<image class="user-info__avatar" :src="userInfo.avatar || placeholder" />
				<view class="user-info__center">
					<view class="user-info__name">{{ userInfo.name || '游客' }}</view>
					<view class="user-label">
						<view class="user-label-li" v-for="(item, index) in userInfo.titles" :key="index">
							{{ item }}
						</view>
					</view>
				</view>
				<view v-if="userInfo.isCadre == 1" class="user-info__switch-button" @click="onSwitch">
					切换干部端
				</view>
			</view>

			<view class="score__wrapper">
				<image class="score__icon" src="../../static/image/user/icon-score.png" />
				<view class="score__number">0</view>
				<view class="score__more-button" @click="onTo('/pages/develope/develope')">
					获取更多积分
					<image src="../../static/image/icon-right-white.png" mode=""></image>
				</view>
			</view>
		</view>

		<card v-for="(card, idx) in cards" :key="idx" :title="card.menuName">
			<u-row gutter="16">
				<u-col v-for="(menu, idx2) in card.children" :key="idx2" span="3">
					<view :class="['menu__wrapper', 'menu__wrapper--' + menu.position]" @click="onTo(menu.routerPath)">
						<image class="menu__icon" :src="baseUrl + menu.menuIcon" />
						<view class="menu__text">{{ menu.menuName }}</view>
					</view>
				</u-col>
			</u-row>
		</card>
		<app-tabbar />
	</view>
</template>

<script>
	import Card from '../../components-private/card';

	export default {
		components: {
			Card,
		},

		data() {
			return {
				baseUrl: uni.globalData.baseUrl,
				placeholder: '/static/icon/icon_tab_5_s.png',

				userInfo: {},
				
				cards: []

				// cards: [{
				// 		menuName: '数据中心',
				// 		children: [{
				// 				menuIcon: '/static/image/user/icon-menu-1.png',
				// 				menuName: '事件上报',
				// 				position: 'top',
				// 				routerPath: '/pages/event/list',
				// 			},
				// 			{
				// 				menuIcon: '/static/image/user/icon-menu-2.png',
				// 				menuName: '矛盾调解',
				// 				position: 'top',
				// 				routerPath: '/pages/peace/list',
				// 			},
				// 			{
				// 				menuIcon: '/static/image/user/icon-menu-3.png',
				// 				menuName: '动态发布',
				// 				position: 'top',
				// 				routerPath: '/pages/moments/index',
				// 			},
				// 			{
				// 				menuIcon: '/static/image/user/icon-menu-4.png',
				// 				menuName: '书记信箱',
				// 				position: 'top',
				// 				routerPath: '/pages/mailBox/mailBox',
				// 			},
				// 			{
				// 				menuIcon: '/static/image/user/icon-menu-5.png',
				// 				menuName: '发布闲置',
				// 				position: 'bottom',
				// 				routerPath: '/pages/develope/develope',
				// 			},
				// 			{
				// 				menuIcon: '/static/image/user/icon-menu-6.png',
				// 				menuName: '求购物品',
				// 				position: 'bottom',
				// 				routerPath: '/pages/develope/develope',
				// 			},
				// 			{
				// 				menuIcon: '/static/image/user/icon-menu-7.png',
				// 				menuName: '招聘发布',
				// 				position: 'bottom',
				// 				routerPath: '/pages/develope/develope',
				// 			},
				// 			{
				// 				menuIcon: '/static/image/user/icon-menu-8.png',
				// 				menuName: '务工求职',
				// 				position: 'bottom',
				// 				routerPath: '/pages/develope/develope',
				// 			},
				// 		],
				// 	},
				// 	{
				// 		menuName: '村友',
				// 		children: [{
				// 			menuIcon: '/static/image/user/icon-menu-8.png',
				// 			menuName: '村友通讯录',
				// 			position: '	top',
				// 			routerPath: '/pages/index/contact',
				// 		}, ],
				// 	}
				// ]
			};
		},

		onShow() {
			this.getUserInfo();
			this.setTabBarIndex(4);
			this.cards = uni.getStorageSync('usercenterList') || []
		},

		methods: {
			getUserInfo() {
				let role = uni.getStorageSync('role');
				if (role == 1) {
					this.$api.getUserInfo().then(res => {
						this.userInfo = res;
						this.userInfo.titles = [res.villageName, '村民']
					});
				}
			},

			onTo(url) {
				uni.navigateTo({
					url,
				});
			},

			onSwitch() {
				uni.navigateToMiniProgram({
					appId: 'wxae074160a08656a7',
					path: 'pages/index/index',
					envVersion: 'trial',
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		padding: 24rpx;
		background-color: #f2f2f6;
	}

	.top-wrap {
		padding: 0 24rpx;
	}

	.user-info {
		&__wrapper {
			display: flex;
			align-items: center;
			position: relative;
			margin-bottom: 68rpx;
		}

		&__avatar {
			width: 120rpx;
			height: 120rpx;
			border-radius: 12rpx;
		}

		&__center {
			margin-left: 32rpx;
			margin-right: auto;
		}

		&__name {
			margin-bottom: 20rpx;
			font-weight: bold;
			font-size: 42rpx;
			line-height: 58rpx;
			color: #333;
		}

		&__switch-button {
			position: absolute;
			top: 0;
			right: 0;

			padding: 8rpx 16rpx;

			background-color: #5fc2ff;
			border-radius: 32rpx;

			font-size: 22rpx;
			line-height: 32rpx;
			color: #31353f;
			font-weight: 600;
		}
	}

	.user-label {
		display: flex;

		&-li {
			font-size: 24rpx;
			margin-right: 12rpx;
		}
	}

	.score {
		&__wrapper {
			display: flex;
			align-items: center;
			height: 108rpx;
			padding: 0 44rpx;
			background-color: #31353f;
			border-top-left-radius: 28rpx;
			border-top-right-radius: 28rpx;
		}

		&__icon {
			width: 48rpx;
			height: 48rpx;
			margin-right: 16rpx;
		}

		&__number {
			margin-right: auto;
			font-weight: bold;
			font-size: 36rpx;
			line-height: 42rpx;
			color: #ffffff;
		}

		&__more-button {
			font-size: 26rpx;
			line-height: 36rpx;
			color: #ffffff;
			display: flex;
			align-items: center;

			image {
				width: 14rpx;
				height: 24rpx;
				margin-left: 14rpx;
			}
		}
	}

	.menu {
		&__wrapper {
			display: flex;
			flex-direction: column;
			align-items: center;

			&--top {
				padding-top: 16rpx;
			}

			&--bottom {
				padding-top: 70rpx;
			}
		}

		&__icon {
			width: 76rpx;
			height: 76rpx;
			margin-bottom: 20rpx;
		}

		&__text {
			font-size: 28rpx;
			line-height: 40rpx;
			color: #333;
		}
	}
	
	card {
		.menu__wrapper {
			margin: 20rpx 0;
		}
	}
</style>
