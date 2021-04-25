<template>
	<view class="container">
		<u-radio-group class="choose" v-model="value" width="40">
			<view v-for="(item, index) in list" :key="index" @click="changeRadio(index)" class="choose-item">
				<image class="choose-item__img" :src="item.avatar" mode=""></image>
				<view class="choose-item__info">
					<view class="choose-item__info__name">
						{{ item.name }}
					</view>
					<view class="choose-item__info__rate">
						{{ item.villageName }}
					</view>
				</view>
				<u-radio class="choose-item__icon" :name="index" shape="circle"></u-radio>
			</view>
		</u-radio-group>
		<view class="choose-btn">
			<u-button type="primary" shape="circle" @click="submit">确定</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: -1,
				list: [],
			};
		},

		onLoad() {
			this.getList();
		},

		methods: {
			changeRadio(val = 0) {
				this.value = val;
			},

			submit() {
				uni.setStorageSync('uncleName', this.list[this.value].name);
				uni.setStorageSync('uncleId', this.list[this.value].villagerId);
				uni.navigateBack();
			},

			async getList() {
				const res = await this.$api.getUncleList({
					page: this.page,
					size: this.pageSize,
					finish: this.currentTabIndex,
				});
				this.list = this.list.concat(res.data.data);
				if (res.totalElements < this.page * this.pageSize) {
					this.loadStatus = 'noMore';
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		padding-top: 2rpx;
	}

	.choose {
		&-item {
			height: 136rpx;
			border-radius: 16rpx;
			background-color: #fff;
			margin: 20rpx 24rpx;
			padding: 0 24rpx;
			display: flex;
			align-items: center;

			&__img {
				width: 80rpx;
				height: 80rpx;
				border-radius: 8rpx;
				margin-right: 24rpx;
			}

			&__info {
				flex: 1;

				&__name {
					font-size: 28rpx;
				}

				&__rate {
					color: #696969;
					font-size: 22rpx;
					line-height: 44rpx;
				}
			}

			&__icon {
				width: 40rpx;
				height: 40rpx;
			}
		}

		&-btn {
			padding: 112rpx 72rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			box-sizing: border-box;
		}
	}
</style>
