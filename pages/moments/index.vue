<template>
	<view class="container">
		<view class="header">
			<view class="header__desc">历史动态</view>
			<image @click="toPublish" class="header__img" src="../../static/image/icon-add.png"></image>
		</view>

		<view v-if="list.length" class="moments-list">
			<moments v-for="item in list" :key="item.id" :data="item" @click-more="onClickMore"
				@click-content="toDetail(item.id)" />
			<u-loadmore :status="status" />
		</view>
		<nodata v-else />

		<action-sheet v-model="showActionSheet" @click-item="onClickItem" @cancel="showActionSheet = false" />

		<u-modal v-model="showDeleteUModal" content="删除的事件无法找回，您确定要删除吗？" :show-title="false" confirm-text="确认删除"
			confirm-color="#E43838" show-cancel-button cancel-text="再想想" cancel-color="#757575" @confirm="onDelete"
			@cancel="showDeleteUModal = false" />
	</view>
</template>

<script>
	import List from '../../components-private/list';

	export default {
		components: {
			List,
		},
		data() {
			return {
				status: 'loadmore',
				totalPage: 0,
				list: [],
				page: 1,
				pageSize: 20,
				current: '',
				showActionSheet: false,
				showDeleteUModal: false,
				loading: false,
				refreshing: false,
				hasMore: true,
				noData: false,
			};
		},

		onShow() {
			this.getList();
		},

		onPullDownRefresh() {
			this.status = 'loading'
			this.page = 1
			this.list = []
			this.getList()
		},
		
		onReachBottom() {
			if (this.page < this.totalPage) {
				this.status = 'loading'
				this.page++
				this.getList()
			} else {
				this.status = 'nomore'
			}
		},
		
		methods: {
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/moments/detail?id=' + id,
				});
			},

			toPublish() {
				uni.navigateTo({
					url: '/pages/moments/publish',
				});
			},

			async getList() {
				const {
					list,
					page,
					pageSize: size
				} = this;
				const {
					data,
					totalElements
				} = await this.$api.getMomentsList({
					page,
					size,
					type: 0,
					onlySelf: true,
				});
				const currentTotal = page * size;

				this.list = this.list.concat(data)
				this.totalPage = Math.ceil(totalElements / this.pageSize)
				if (totalElements < this.pageSize) {
					this.status = 'nomore'
				}
			},

			onLoadData() {
				if (!this.hasMore) return;

				this.loading = true;
				this.page++;
				this.getList();
			},

			onRefreshData() {
				this.page = 1;
				this.list = [];
				this.refreshing = true;
				this.hasMore = true;
				this.getList();
			},

			onClickMore(e) {
				const {
					index
				} = e.detail;
				this.current = index;
				this.showActionSheet = true;
			},

			onClickItem(e) {
				const {
					command
				} = e.detail;
				this.showActionSheet = false;
				if (command === 'DELETE') {
					this.showDeleteUModal = true;
				}
			},

			async onDelete() {
				const id = this.list[this.current].id;
				const res = await this.$api.deleteMoments(id);
				uni.showToast({
					icon: 'none',
					title: '删除成功',
					duration: 2000,
				});
				this.list.splice(this.current, 1);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.header {
		width: 100%;
		height: 120rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		box-sizing: border-box;
		padding: 0 48rpx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;

		&__desc {
			font-size: 36rpx;
			font-weight: 600;
		}

		&__img {
			width: 70rpx;
			height: 70rpx;
		}
	}

	.moments-list {
		background: #f2f2f6;
		padding-top: 120rpx;
		min-height: calc(100vh - 120rpx);
		padding-bottom: 100rpx;
	}
</style>
