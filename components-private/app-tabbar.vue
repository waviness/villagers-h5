<template>
	<u-tabbar ref="tabbar" :value="current" :list="menuList" :mid-button="true" :mid-button-size="100" :inactive-color="inactiveColor"
		:active-color="activeColor" @change="onChange"></u-tabbar>
</template>

<script>
	export default {
		name: 'appTabbar',
		data() {
			return {
				activeColor: '#5FC2FF',
				inactiveColor: '',
				current: 0,
				menuList: [{
						pagePath: "/pages/index/index",
						text: "首页",
						iconPath: "/static/icon/icon_tab_1.png",
						selectedIconPath: "/static/icon/icon_tab_1_s.png",
						customIcon: false
					},
					{
						pagePath: "/pages/serve/serve",
						text: "服务",
						iconPath: "/static/icon/icon_tab_2.png",
						selectedIconPath: "/static/icon/icon_tab_2_s.png",
						customIcon: false
					},
					{
						pagePath: "/pages/release/release",
						midButton: true,
						iconPath: "/static/icon/icon_tab_3.png",
						selectedIconPath: "/static/icon/icon_tab_3.png",
						customIcon: false
					},
					{
						pagePath: "/pages/message/message",
						text: "消息",
						iconPath: "/static/icon/icon_tab_4.png",
						selectedIconPath: "/static/icon/icon_tab_4_s.png",
						customIcon: false
					},
					{
						pagePath: "/pages/my/my",
						text: " 我的",
						iconPath: "/static/icon/icon_tab_5.png",
						selectedIconPath: "/static/icon/icon_tab_5_s.png",
						customIcon: false
					}
				]
			};
		},
		methods: {
			onChange(index) {
				uni.redirectTo({
					url: this.menuList[index].pagePath
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
