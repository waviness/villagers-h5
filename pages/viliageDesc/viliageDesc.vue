<template>
	<view class="container">
		<view class="tab-card">
			<view class="tab-card-li" @click="tabChange(0)">
				<view class="tab-card-li-t" :class="tabIndex == 0 ? 'tab-card-li-t-active' : ''">村情概况</view>
				<view class="tab-card-li-i" :class="tabIndex == 0 ? 'tab-card-li-i-active' : ''"></view>
			</view>
			<view class="tab-card-li" @click="tabChange(1)">
				<view class="tab-card-li-t" :class="tabIndex == 1 ? 'tab-card-li-t-active' : ''">组织架构</view>
				<view class="tab-card-li-i" :class="tabIndex == 1 ? 'tab-card-li-i-active' : ''"></view>
			</view>
			<view class="tab-card-li" @click="tabChange(2)">
				<view class="tab-card-li-t" :class="tabIndex == 2 ? 'tab-card-li-t-active' : ''">村史村志</view>
				<view class="tab-card-li-i" :class="tabIndex == 2 ? 'tab-card-li-i-active' : ''"></view>
			</view>
		</view>
		
		<view class="tab-cont" v-show="tabIndex == 0">
			<!-- 村情概况 -->
			<view class="detail_desc ql-editor" v-html="cqgkText"></view>
		</view>
		
		<view class="tab-cont" v-show="tabIndex == 1">
			<!-- 组织架构 -->
			<view class="zzjg-box">
				<view class="zzjg-li" v-for="item in zzjgList" :key="item.id">
					<view class="zzjg-li-i">
						<view class="name">{{item.name}}</view>
						<view class="title-name">{{item.titleName}}</view>
					</view>
					<view class="zzjg-li-i">
						<view class="desc">{{item.titleDesc}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="tab-cont" v-show="tabIndex == 2">
			<!-- 村史村志 -->
			<view class="detail_desc ql-editor" v-html="csczText"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 0,
				zzjgList: [],
				zzjgList1: [
					{
						"id": '',
						"name": "裘松伟",
						"titleDesc": "全面主持村党总支部，村委会和经济合作社工作。",
						"titleName": "村党总支部书记"
					},
					{
						"id": '',
						"name": "裘松伟",
						"titleDesc": "全面主持村党总支部，村委会和经济合作社工作。",
						"titleName": "村党总支部书记"
					}
				],
				cqgkText: '',
				csczText: ''
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getInfo()
		},
		methods: {
			tabChange(index) {
				this.tabIndex = index
			},
			getInfo() {
				this.$api.getZzjg({}, 0).then(res => {
					this.zzjgList = res
				})
				this.$api.getCscz().then(res => {
					this.csczText = JSON.parse(res).text.replace(/\<img/gi,'<img style="max-width:100%; height:auto; display: block;" ')
				})
				this.$api.getCqgk().then(res => {
					this.cqgkText = JSON.parse(res).text.replace(/\<img/gi,'<img style="max-width:100%; height:auto; display: block;" ')
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		width: 100%;
		min-height: calc(100vh - 100rpx);
		background: #F2F2F6;
		padding-top: 100rpx;
	}
	.tab-card{
		width: 750rpx;
		height: 80rpx;
		padding-top: 20rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: fixed;
		top: 0;
		.tab-card-li{
			width: 250rpx;
			height: auto;
			text-align: center;
			.tab-card-li-t{
				height: 40rpx;
				line-height: 40rpx;
				font-size: 28rpx;
				color: #666666;
				margin-bottom: 4rpx;
			}
			.tab-card-li-i{
				width: 112rpx;
				height: 8rpx;
				background-color: #FFFFFF;
				margin: auto;
			}
			.tab-card-li-t-active{
				color: #5FC2FF;
			}
			.tab-card-li-i-active{
				background-color: #5FC2FF;
			}
		}
	}
	.tab-cont{
		width: 690rpx;
		height: auto;
		padding: 30rpx;
	}
	.zzjg-box{
		width: 702rpx;
		height: auto;
		margin: auto;
		.zzjg-li{
			width: 646rpx;
			padding: 32rpx 28rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			margin-bottom: 24rpx;
			.zzjg-li-i{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.name{
					line-height: 44rpx;
					color: #333333;
					font-size: 32rpx;
					font-weight: bold;
					margin-right: 16rpx;
					margin-bottom: 20rpx;
				}
				.title-name{
					font-size: 24rpx;
				}
				.desc{
					text-align: left;
					line-height: 40rpx;
					font-size: 28rpx;
				}
			}
		}
	}
</style>
