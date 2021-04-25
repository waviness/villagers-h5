<template>
	<view class="container">
		<view class="header-img">
			<image src="../../static/image/party-work.png" mode=""></image>
		</view>
		<view class="party-work-types">
			<view v-for="(item, index) in partyTypeList" :key="index"
				:class="['party-work-types__item', activeType === index ? 'party-work-types__item--active' : '']"
				@click="onActiveTypeChange(index)">
				{{ item.name }}
			</view>
		</view>
		<u-sticky>
			<view class="party-work-tabs">
				<u-tabs :list="nameList" :current="currentTabIndex" :gutter="gutter" inactive-color="#666"
					active-color="#5FC2FF" font-size="28" @change="change"></u-tabs>
			</view>
		</u-sticky>
		<u-line color="#DBDBDB" />
		<view v-if="list.length" class="party-list">
			<event-item v-for="(item, index) in list" :key="index" :data="item" @click="toDetail(item)" />
			<u-loadmore :status="status" />
		</view>
		<nodata v-else />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				triggered: false,
				page: 1,
				pageSize: 20,
				totalPage: 0,
				status: 'loadmore',
				partyTypeList: [{
						name: '村务公开'
					},
					{
						name: '村内活动'
					},
				],
				activeType: 0,
				gutter: 36,
				nameList: [{
					name: '全部'
				}],
				nameList1: [],
				nameList2: [],
				currentTabIndex: 0,
				list: []
			}
		},
		onLoad() {
			this.getTag()
		},
		onReachBottom() {
			if (this.page < this.totalPage) {
				this.status = 'loading'
				this.page++
				this.getList(this.nameList[this.currentTabIndex].id);
			} else {
				this.status = 'nomore'
			}
		},
		methods: {
			onActiveTypeChange(index) {
				this.activeType = index
				if (index === 0) {
					this.gutter = 36
					this.nameList = [{
						name: '全部'
					}, ...this.nameList1]
				} else {
					this.gutter = 40
					this.nameList = [{
						name: '全部'
					}, ...this.nameList2]
				}
				this.currentTabIndex = 0
				this.getList()
			},
			change(index) {
				if (this.currentTabIndex != index) {
					this.currentTabIndex = index;
					this.getList(this.nameList[index].id)
				}
			},
			async getList(tagId) {
				const res = await this.$api.getMomentsList({
					tagId,
					page: this.page,
					size: this.pageSize,
					type: this.activeType === 1 ? 22 : 21,
				})
				this.list = this.list.concat(res.data)
				this.totalPage = Math.ceil(res.totalElements / this.pageSize)
				if (res.totalElements < this.pageSize) {
					this.status = 'nomore'
				}
			},
			async getTag() {
				const [data1, data2] = await Promise.all([
					this.$api.getTag({
						type: 21
					}),
					this.$api.getTag({
						type: 22
					}),
					this.getList()
				]);
				this.nameList = [{
					name: '全部'
				}, ...data1]
				this.nameList1 = data1
				this.nameList2 = data2
			},
			toDetail(item) {
				const title = this.nameList.find(ele => ele.id === item.tagId).name
				uni.navigateTo({
					url: `/pages/work/detail?id=${item.id}&title=${title}`
				})
			},
		}
	}
</script>


<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100vh;
	}

	.header-img {
		background-color: #fff;
		padding: 12rpx 24rpx;
		height: 268rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.party-work {
		&-types {
			display: flex;
			justify-content: center;
			padding: 56rpx 0 26rpx 0;
			background-color: #fff;

			&__item {
				width: 180rpx;
				height: 72rpx;
				line-height: 72rpx;
				background-color: #F2F2F6;
				text-align: center;
				color: #757575;
				font-size: 28rpx;

				&--active {
					background-color: #DA3B3B;
					color: #fff;
				}

				&:first-child {
					border-radius: 8rpx 0 0 8rpx;
				}

				&:last-child {
					border-radius: 0 8rpx 8rpx 0;
				}
			}
		}

		&-tabs {
			width: 100%;
		}
	}

	.party-list {
		background-color: #F2F2F6;
	}
</style>
