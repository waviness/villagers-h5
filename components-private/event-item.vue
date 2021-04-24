<template>
	<view class="event-item" @click="clickMore">
		<view class="event-item__header">
			<view class="event-item__header__img">
				<image :src="data.avatar" mode=""></image>
			</view>
			<view class="event-item__header__info">
				<view class="event-item__header__info__top">
					<view class="event-item__header__info__top__name">
						{{ data.villager }}
					</view>
					<view class="event-item__header__info__top__time">
						{{ data.time2 }}
					</view>
				</view>
				<view class="event-item__header__info__bottom">
					{{ data.cadreTitle }}
				</view>
			</view>
		</view>
		<view class="event-item__title">
			<view class="event-item__title__type">
				{{ data.typeTagName }}
			</view>
			<view class="event-item__title__name">
				{{ data.title }}
			</view>
		</view>
		<view class="event-item__main">
			<view class="event-item__main__content">
				{{ data.content }}
			</view>
			<view class="event-item__main__imgList">
				<image v-for="(img, index) in data.imgs" :key="index" :src="baseUrl + img" mode="" class="event-item__main__img" @click.stop="previewImage(index)">
				</image>
			</view>
		</view>
		<view class="event-item__data">
			<view class="event-item__data__item">
				<image src="../static/image/icon-like.png" mode=""></image>
				{{ data.likeTotal }}
			</view>
			<view class="event-item__data__item">
				<image src="../static/image/icon-comment-circle.png" mode=""></image>
				{{ data.replyTotal }}
			</view>
		</view>
		<u-line color="#E6E6E6" hair-line="false" />
		<view class="event-item__zan">
			<text class="event-item__zan--name">{{ data.likePerson }}</text>等{{ data.likeTotal }}人觉得很赞
		</view>
		<view v-for="(com, index) in data.comments" :key="index" class="event-item__comment">
			{{ com.name }} {{ com.pidName ? '回复'+com.pidName : '' }}：{{ com.content }}
		</view>
		<view class="event-item__more">
			查看更多评论（{{ data.replyTotal }}）>>>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'eventItem',

		props: {
			data: {
				type: Object,
				default: {},
			},
		},
		data() {
			return {
				baseUrl: uni.globalData.baseUrl
			}
		},
		methods: {
			clickMore() {
				this.$emit('click')
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
		}
	};
</script>

<style lang="scss" scoped>
	.event-item {
		background-color: #fff;
		font-size: 28rpx;
		color: #333;
		padding: 48rpx 48rpx 32rpx 48rpx;
		margin-bottom: 10rpx;

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

					&__time {
						font-size: 22rpx;
						color: #a7a7a7;
					}
				}

				&__bottom {
					font-size: 24rpx;
					color: #666;
				}
			}
		}

		&__title {
			display: flex;
			font-size: 32rpx;
			line-height: 48rpx;
			margin: 24rpx 0;
			font-weight: 600;

			&__type {
				width: 208rpx;
				height: 48rpx;
				border-radius: 4rpx;
				background-color: #da3b3b;
				color: #fff;
				font-size: 22rpx;
				text-align: center;
				margin-right: 20rpx;
				font-weight: 100;
			}
		}

		&__main {
			&__imgList {
				display: flex;
				flex-wrap: wrap;
				margin-top: 32rpx;
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

		&__data {
			display: flex;
			margin: 24rpx 44rpx;

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

		&__zan {
			font-size: 26rpx;
			margin: 32rpx 0;

			&--name {
				color: #5fc2ff;
			}
		}

		&__comment {
			font-size: 26rpx;
			margin: 16rpx 0;
		}

		&__more {
			color: #5fc2ff;
			font-size: 20rpx;
			text-align: center;
			margin-top: 32rpx;
		}
	}
</style>
