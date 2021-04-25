<template>
	<view class="audit__wrapper">
		<image class="audit__image" src="/static/image/index/tc-index.png"></image>
		<!-- <view class="user-info">
			<u-avatar :src="userInfo.avatarUrl" size="large"></u-avatar>
			<view class="user-info__main">
				<view class="">{{userInfo.nickName}}</view>
			</view>
		</view> -->
		<view class="function-list">
			<u-cell-group>
				<u-cell-item v-for="(item, index) in funcList" :key="index" :index="index" :title="item.title"
					:value="item.value" @click="onFuncClick">
					<u-icon class="mr-10" slot="icon" :name="item.icon" size="40" :color="item.color"></u-icon>
				</u-cell-item>
			</u-cell-group>
		</view>
		<image  />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					avatarUrl: '/static/image/release/icon_1_1.png',
					nickName: ''
				},
				funcList: [{
					title: '信息查询',
					value: '',
					icon: '/static/image/release/icon_1_2.png',
					toPath: '/pages/example/search'
				}, {
					title: '个人设置',
					value: '',
					icon: '/static/image/release/icon_2_1.png',
					toPath: '/pages/example/setting'
				}, {
					title: '意见反馈',
					value: '',
					icon: '/static/image/release/icon_4_1.png',
					toPath: '/pages/example/feedback'
				}]
			}
		},
		onShow() {
			uni.hideHomeButton()
		},
		methods: {
			onFuncClick(index) {
				uni.navigateTo({
					url: this.funcList[index].toPath
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	@mixin flex($horizontal: center, $vertical: center) {
		display: flex;
		justify-content: $horizontal;
		align-items: $vertical;
	}

	@mixin font-size($fontSize: 28rpx, $lineHeight: 1) {
		font-size: $fontSize;
		line-height: $lineHeight;
	}

	@mixin absolute($map: ()) {
		position: absolute;

		@each $prop,
		$value in $map {
			#{$prop}: $value
		}
	}

	@mixin wh($width, $height) {
		@if $width {
			width: $width;
		}

		@if $height {
			height: $height;
		}
	}

	.audit {
		&__image {
			width: 100vw;
		}

		&__bg {
			@include wh(100%, 228rpx);
		}

		.user-info {
			@include flex(flex-start);
			@include absolute();

			height: 228rpx;
			padding: 30rpx;

			&__main {
				margin-left: 20rpx;
				font-size: 36rpx;
				color: #fff;

				&__entry {
					@include font-size(28rpx, 60rpx);
				}
			}
		}

		.none {
			padding: 0 !important;
			background-color: transparent;
			border: 0;
			line-height: 1;

			&::after {
				content: none;
			}
		}

		.function-list {
			@include absolute((top: 248rpx)) width: 100%;
		}
	}
</style>
