<template>
	<view class="notification-container">
		<peace-item :data="data">
			<template>
				<view class="notification-databar">
					<view class="notification-databar__item">
						<view class="notification-databar__item__inner">获赞 {{ data.likeTotal }}</view>
						<view class="notification-databar__item__inner">评论 {{ data.replyTotal }}</view>
					</view>
				</view>
				<view class="notification-divider u-border-bottom"></view>
				<view v-for="(comment, commentIndex) in comments" :key="commentIndex"
					class="notification-comment u-border-bottom">
					<comment-item :data="comment" @click-comment="onComment(comment.id, comment.name)" />
				</view>
				<u-loadmore :status="status" />
			</template>
		</peace-item>

		<view v-if="!showInputbar" class="notification-bottombar">
			<view class="notification-bottombar__item" @click="onComment(0)">
				<image class="notification-bottombar__icon" src="../../static/image/icon-comment-square.png" />
				<text class="notification-bottombar__text">评论</text>
			</view>
			<view class="notification-bottombar__item" @click="onLike">
				<image v-if="!data.hasClick" class="notification-bottombar__icon"
					src="../../static/image/icon-like.png" />
				<image v-else class="notification-bottombar__icon" src="../../static/image/icon-like-fill.png" />
				<text class="notification-bottombar__text">{{ data.hasClick ? '取消点赞' : '点赞' }}</text>
			</view>
			<view class="notification-bottombar__divider u-border-left"></view>
		</view>

		<comment-input v-else :placeholder="placeholder" @close="this.showInputbar = false" @send="onSend" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showInputbar: false,

				id: '',
				title: '',
				isLiked: false,

				data: {},

				comments: [],

				pid: 0,

				buttonCustomStyle: {
					height: '32px',
				},

				optsShow: false,

				page: 1,
				pageSize: 20,
				totalPage: 0,
				status: 'loadmore',
				placeholder: '评论'
			}
		},

		onLoad(option) {
			uni.setNavigationBarTitle({
				title: option.title
			})
			this.title = option.title
			this.id = option.id
			this.getDetail()
		},

		onReachBottom() {
			if (this.page < this.totalPage) {
				this.status = 'loading'
				this.page++
				this.getComments()
			} else {
				this.status = 'nomore'
			}
		},
		methods: {
			async getDetail() {
				const res = await this.$api.getMoments(this.id)
				this.data = res
				if (!this.title) {
					uni.setNavigationBarTitle({
						title: res.typeTagName.split('-')[1]
					})
				}
				this.page = 1
				this.getComments()
			},
			async getComments() {
				const res = await this.$api.getMomentsComments({
					page: this.page,
					size: this.pageSize,
					momentsId: this.id
				})
				this.comments = this.comments.concat(res.data)
				this.totalPage = Math.ceil(res.totalElements / this.pageSize)
				if (res.totalElements < this.pageSize) {
					this.status = 'nomore'
				}
			},
			onComment(id, name) {
				this.pid = id
				this.placeholder = name ? '回复：' + name : '评论'
				this.showInputbar = true;
			},

			async onLike() {
				if (!this.data.hasClick) {
					const res = await this.$api.likeMoments(this.data.id);
					if (res) {
						this.data.hasClick = true
						this.data.likeTotal++
					}
				} else {
					const res = await this.$api.uplikeMoments(this.data.id);
					if (res) {
						this.data.hasClick = false
						this.data.likeTotal--
					}
				}
			},

			showOpts() {
				this.optsShow = !this.optsShow
			},
			updateMoments(id, result) {

			},

			async onSend(comment) {
				const res = await this.$api.createMomentsComments({
					content: comment,
					momentsId: this.id,
					pid: this.pid
				})
				if (res) {
					uni.showToast({
						icon: 'none',
						title: '评论成功',
						duration: 2000
					})
					this.showInputbar = false
					this.comments.push(res)
					this.data.replyTotal++
				}
			}
		},
	};
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.notification {
		&-container {
			padding-bottom: calc(98rpx + env(safe-area-inset-bottom, 0));
		}

		&-tag {
			padding: 8rpx;
			border-radius: 4rpx;
			font-size: 22rpx;
			line-height: 32rpx;
			background-color: #da3b3b;
			color: #fff;
		}

		&-databar {
			display: flex;
			padding-top: 16rpx;
			align-items: center;
			position: relative;

			&__item {
				flex: 1;
				display: flex;

				&__inner {
					font-size: 26rpx;
					line-height: 36rpx;
					color: #333;

					&:not(:last-child) {
						margin-right: 36rpx;
					}
				}
			}

			&__more {
				width: 60rpx;
				height: 36rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			&__opts {
				position: absolute;
				z-index: 999;
				right: 76rpx;
				top: -22rpx;
				width: 260rpx;
				background-color: #4D4D4D;
				border-radius: 8rpx;

				&__item {
					height: 84rpx;
					line-height: 84rpx;
					text-align: center;
					color: #fff;
					font-size: 28rpx;
					border-bottom: 2rpx solid #A4A4A4;

					&:last-child {
						border-bottom: 0;
					}
				}
			}
		}

		&-divider {
			height: 1px;
			margin: 24rpx -48rpx 28rpx;
		}

		&-comment {
			padding-bottom: 32rpx;

			&+& {
				padding-top: 32rpx;
			}

			&--reply {
				margin-top: 72rpx;
			}
		}

		&-bottombar {
			display: flex;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 9;
			height: 98rpx;
			padding-bottom: env(safe-area-inset-bottom, 0);
			background-color: #f2f2f6;
			box-sizing: content-box;

			&__item {
				display: flex;
				justify-content: center;
				align-items: center;
				flex: 1;
			}

			&__icon {
				width: 48rpx;
				height: 48rpx;
			}

			&__text {
				margin-left: 12rpx;
				font-size: 28rpx;
				color: #333;
			}

			&__divider {
				position: absolute;
				top: 28rpx;
				left: 50%;
				width: 1px;
				height: 40rpx;
				transform: translateX(-50%);
			}
		}
	}
</style>
