<template>
	<view class="moments-list-item" :style="hasMore ? '' : 'margin: 24rpx 0'">
		<view class="moments-list-item__header">
			<view class="moments-list-item__header__img">
				<image :src="data.avatar" />
			</view>
			<view class="moments-list-item__header__info">
				<view class="moments-list-item__header__info__top">
					<view class="moments-list-item__header__info__top__left">
						<view class="moments-list-item__header__info__top__name">
							{{ data.villager }}
						</view>
						<view class="moments-list-item__header__info__top__time">
							{{ data.time2 }}
						</view>
					</view>
					<image v-if="hasMore" class="moments-list-item__header__info__top__arrow"
						src="../static/image/icon-right.png" @click="onClickMore" />
				</view>
				<view class="moments-list-item__header__info__bottom">
					<view class="moments-list-item__header__info__bottom--text" v-for="(item, idx) in data.cadreTitle" :key="idx">{{ item }}</view>
				</view>
			</view>
		</view>
		<view class="moments-list-item__main" @click="onClickContent(data.id)">
			<view v-if="data.title" class="moments-list-item__title-wrap">
				<view v-if="data.result == 0" class="moments-list-item__status moments-list-item__status--unresolved">
					事件上报-未解决
				</view>
				<view v-else-if="data.result == 2"
					class="moments-list-item__status moments-list-item__status--resolved">
					事件上报-已解决
				</view>
				<view v-else-if="data.result == 1" class="moments-list-item__status moments-list-item__status--delayed">
					事件上报-延期处理
				</view>
				<view class="moments-list-item__title">
					{{ data.title }}
				</view>
			</view>
			<view class="moments-list-item__main__content">
				{{ data.content }}
			</view>
			<view class="moments-list-item__main__imgList">
				<image v-for="(img, index) in data.imgs" :key="index" :src="baseUrl + img" mode="aspectFit"
					class="moments-list-item__main__img" @click.stop="previewImage(index)"></image>
			</view>
		</view>
		<view class="moments-list-item__data" @click="onClickContent(data.id)">
			<view class="moments-list-item__data__item">
				<image src="../static/image/icon-like.png" />
				{{ data.likeTotal }}
			</view>
			<view class="moments-list-item__data__item">
				<image src="../static/image/icon-comment-circle.png" />
				{{ data.replyTotal }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'moments',
		props: {
			hasMore: { // 是否有更多操作
				type: Boolean,
				default: true,
			},

			data: {
				type: Object,
				default: {},
			},

			index: {
				type: Number,
				default: 0,
			},
		},
		data() {
			return {
				baseUrl: uni.globalData.baseUrl
			}
		},

		methods: {
			onClickMore() {
				const {
					index
				} = this;
				this.$emit('click-more', {
					detail: {
						index,
					},
				});
			},
			onClickContent(id) {
				this.$emit('click-content', id)
			},
			previewImage(index) {
				const imgList = this.data.imgs.map(item => {
					return this.baseUrl + item
				})
				uni.previewImage({
					current: index,
					urls: imgList
				})
			}
		},
	};
</script>

<style lang="scss">
	.moments-list-item {
		background-color: #fff;
		border-radius: 8rpx;
		font-size: 28rpx;
		color: #333;
		padding: 40rpx 20rpx;
		margin: 24rpx;

		&__header {
			display: flex;

			&__img {
				width: 76rpx;
				height: 76rpx;
				margin-right: 24rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 8rpx;
				}
			}

			&__info {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				&__top {
					display: flex;
					justify-content: space-between;
					font-size: 30rpx;

					&__left {
						flex: 1;
						display: flex;
						align-items: center;
					}

					&__time {
						font-size: 22rpx;
						color: #a7a7a7;
						margin-left: 24rpx;
					}

					&__arrow {
						width: 50rpx;
						height: 50rpx;
						transform: rotate(90deg);
					}
				}

				&__bottom {
					display: flex;

					&--text {
						font-size: 24rpx;
						color: #666;
						margin-right: 10rpx;
					}
				}
			}
		}

		&__main {
			&__content {
				margin: 32rpx 0;
				font-size: 28rpx;
				line-height: 40rpx;
			}

			&__imgList {
				display: flex;
				flex-wrap: wrap;
				margin: 24rpx 0;
			}

			&__img {
				width: 210rpx;
				height: 210rpx;
				margin-bottom: 12rpx;
				margin-right: 12rpx;

				image {
					width: 100%;
					height: 100%;
				}

				&:nth-child(3n + 1) {
					border-radius: 8rpx 0 0 8rpx;
				}

				&:nth-child(3n) {
					border-radius: 0 8rpx 8rpx 0;
					margin-right: 0;
				}
			}
		}

		&__title {
			&-wrap {
				display: flex;
				align-items: center;
				padding-top: 24rpx;
			}

			& {
				font-size: 32rpx;
				line-height: 44rpx;
				color: #333;
			}
		}

		&__status {
			padding: 8rpx 10rpx;
			margin-right: 24rpx;
			border-radius: 4rpx;
			font-size: 22rpx;
			line-height: 32rpx;
			color: #fff;

			&--unresolved {
				background-color: #da3b3b;
			}

			&--resolved {
				background-color: #51bc1c;
			}

			&--delayed {
				background-color: #e29f2a;
			}
		}

		&__data {
			display: flex;
			margin: 0 46rpx;

			&__item {
				width: 50%;
				display: flex;
				align-items: center;
				color: #989898;
				font-size: 22rpx;

				image {
					width: 36rpx;
					height: 36rpx;
					margin-right: 14rpx;
				}
			}
		}
	}
</style>
