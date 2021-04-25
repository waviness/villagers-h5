<template>
	<view class="container pb-100">
		<view class="contact-search">
			<view class="contact-search__content">
				<u-icon name="search" color="#ACACAC" size="36"></u-icon>
				<input v-model="value" class="contact-search__content__input" placeholder="输入村民的名字进行搜索" />
			</view>
			<view class="contact-search__text" @click="search">
				搜索
			</view>
		</view>
		<view v-if="list.length">
			<view v-for="(item, index) in list" :key="index" class="contact" @click="call(item.mobile)">
				<view class="contact-item">
					<image class="contact-item__img" :src="item.avatarUrl" mode=""></image>
					<view class="contact-item__info">
						<view class="contact-item__info__name">
							{{ item.name }}
						</view>
						<view class="contact-item__info__rate">
							{{ item.titles }}
						</view>
					</view>
					<image class="contact-item__icon" src="../../static/image/phone.png" mode=""></image>
				</view>
			</view>
			<u-loadmore :status="status" />
		</view>
		<nodata v-else />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				pageSize: 20,
				totalPage: 0,
				status: 'loadmore',
				value: '',
				list: []
			}
		},
		onLoad() {
			this.getList()
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
			async getList() {
				const res = await this.$api.getFriendList({
					page: this.page,
					size: this.pageSize,
					query: this.value
				})
				uni.stopPullDownRefresh()
				this.list = this.list.concat(res.data)
				this.totalPage = Math.ceil(res.totalElements / this.pageSize)
				if (res.totalElements < this.pageSize) {
					this.status = 'nomore'
				}
			},
			call(phoneNumber) {
				uni.makePhoneCall({
				    phoneNumber
				})
			},
			search() {
				this.list = []
				this.page = 1
				this.getList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100%;
		overflow: auto;
		background-color: #fff;
	}
	.contact-search {
		padding: 40rpx 36rpx 16rpx 32rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #ff;
		&__content {
			width: 604rpx;
			height: 70rpx;
			background-color: #EBEBEB;
			border-radius: 12rpx;
			display: flex;
			align-items: center;
			padding: 0 24rpx;
			&__input {
				flex: 1;
				height: 70rpx;
				font-size: 24rpx;
				margin-left: 24rpx;
			}
		}
		&__text {
			color: $u-type-primary;
			font-size: 28rpx;
		}
	}
	.contact:last-of-type {
		margin-bottom: 20rpx;
	}
	.contact-item {
		padding: 32rpx 42rpx;
		display: flex;
		align-items: center;
		
		&:active {
			background-color: #F2F2F6;
		}
		
		&__img {
			width: 80rpx;
			height: 80rpx;
			border-radius: 8rpx;
			margin-right: 36rpx;
		}
		
		&__info {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 80rpx;

			&__name {
				font-size: 28rpx;
			}
			&__rate {
				color: #666666;
				font-size: 23rpx;
			}
		}
		
		&__icon {
			width: 56rpx;
			height: 58rpx;
		}
	}
</style>
