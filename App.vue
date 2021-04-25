<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			this.wxUpdate();
			uni['globalData'] = {
				baseUrl: 'https://testing2.kpdv.cc/',
				isRelease: -1,
			};
			uni.setStorageSync('token', this.$route.query.token);
			uni.setStorageSync('role', this.$route.query.role);
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
			// 更新小程序
			wxUpdate() {
				const updateManager = wx.getUpdateManager();

				updateManager.onCheckForUpdate(res => {
					// 请求完新版本信息的回调
					console.log(res.hasUpdate);
				});

				updateManager.onUpdateReady(() => {
					wx.showModal({
						title: '更新提示',
						content: '新版本已经准备好，是否重启应用？',
						success: res => {
							if (res.confirm) {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								updateManager.applyUpdate();
							}
						},
					});
				});

				updateManager.onUpdateFailed(() => {
					// 新版本下载失败
				});
			},
		},
	};
</script>

<style lang="scss">
	@import 'uview-ui/index.scss';

	page {
		background: #f2f2f6;
	}

	uni-page-head {
		display: none;
	}
</style>
<style lang="less">
	/*每个页面公共css */
	@import url('common/css/reset.less');
</style>
