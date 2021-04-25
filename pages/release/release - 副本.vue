<template>
	<view class="container">
		<card v-for="(card, idx) in cards" :key="idx" :title="card.menuName">
			<u-row>
				<u-col v-for="(menu, idx2) in card.children" :key="idx2" span="4">
					<view class="menu__wrapper" @click="onTo(menu.routerPath, menu.permission)">
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
				cards: []
				
				// cards: [{
				// 		menuName: '综合服务',
				// 		children: [{
				// 				menuIcon: '/static/image/user/icon-menu-1.png',
				// 				menuName: '事件上报',
				// 				routerPath: '/pages/event/publish',
				// 			},
				// 			{
				// 				menuIcon: '/static/image/user/icon-menu-2.png',
				// 				menuName: '矛盾调解',
				// 				routerPath: '/pages/peace/publish',
				// 			},
				// 		],
				// 	},
				// 	{
				// 		menuName: '动态',
				// 		children: [{
				// 				menuIcon: '/static/image/user/icon-menu-news.png',
				// 				menuName: '图文动态',
				// 				routerPath: '/pages/moments/publish',
				// 				permission: 1,
				// 			},
				// 			{
				// 				menuIcon: '/static/image/user/icon-menu-video.png',
				// 				menuName: '视频动态',
				// 				routerPath: '/pages/moments/publish',
				// 				permission: 1,
				// 			},
				// 		],
				// 	},
				// 	{
				// 		menuName: '闲置物品',
				// 		children: [{
				// 				menuIcon: '/static/image/user/icon-menu-5.png',
				// 				menuName: '发布闲置',
				// 				routerPath: '/pages/develop/develop',
				// 			},
				// 			{
				// 				menuIcon: '/static/image/user/icon-menu-6.png',
				// 				menuName: '求购物品',
				// 				routerPath: '/pages/develop/develop',
				// 			},
				// 		],
				// 	},
				// 	{
				// 		menuName: '务工招聘',
				// 		children: [{
				// 				menuIcon: '/static/image/user/icon-menu-7.png',
				// 				menuName: '招聘发布',
				// 				routerPath: '/pages/develop/develop',
				// 			},
				// 			{
				// 				menuIcon: '/static/image/user/icon-menu-8.png',
				// 				menuName: '务工求职',
				// 				routerPath: '/pages/develop/develop',
				// 			},
				// 		],
				// 	},
				// ],
			};
		},

		onShow() {
			this.setTabBarIndex(2);
			this.role = uni.getStorageSync('role');
			this.cards = uni.getStorageSync('releaseList') || []
		},

		methods: {
			onTo(url, permission) {
				if (permission == 1 && this.role == 0) {
					url = '/pages/noPermission/noPermisson';
				}

				uni.navigateTo({
					url,
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		padding: 24rpx;
	}

	.menu {
		&__wrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
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
</style>
