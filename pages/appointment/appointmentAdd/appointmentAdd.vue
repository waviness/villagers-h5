<template>
	<view class="container">
		<view class="card">
			<view class="appointment-title">
				<view class="appointment-title-t">信件标题：</view>
				<input class="appointment-title-input" type="text" maxlength="30" placeholder-class="place-holder"
					placeholder="输入标题" v-model="appointment.title" />
			</view>

			<view class="appointment-cont">
				<textarea class="appointment-cont-input" placeholder-class="place-holder" placeholder="在此输入详细描述…"
					maxlength="200" v-model="appointment.content" />
			</view>
		</view>
		<view class="card">
			<view class="appointment-title">
				<view class="appointment-title-t">预约日期</view>
			</view>

			<view class="choose">
				<view class="choose-date">
					<view :class="['choose-date-item', dateIndex === idx ? 'choose-date-item--active' : '']"
						v-for="(item, idx) in dateList" :key="idx" @click="dateChange(item, idx)">
						<view class="choose-date-title">{{ item.title }}</view>
						<view class="choose-date-value">{{ item.date }}</view>
					</view>
				</view>
			</view>

			<view class="appointment-form">
				<view class="appointment-form_label">预约时间</view>
				<view class="appointment-form-picker-box">
					<picker class="appointment-form-picker-1" mode="time" v-model="appointment.startTime"
						:start="startDate" :end="endDate" @change="startTimeChange">
						<view class="appointment-form-value" v-if="appointment.startTime != ''">
							{{appointment.startTime}}
						</view>
						<view class="appointment-form-value appointment-form-value-1"
							v-if="appointment.startTime == ''">选择开始时间</view>
					</picker>
					<picker class="appointment-form-picker-1" mode="time" v-model="appointment.endTime"
						:start="startDate" :end="endDate" @change="endTimeChange">
						<view class="appointment-form-value" v-if="appointment.endTime != ''">{{appointment.endTime}}
						</view>
						<view class="appointment-form-value appointment-form-value-1" v-if="appointment.endTime == ''">
							选择结束时间</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="appointment-form">
				<view class="appointment-form-label">预约人</view>
				<input class="appointment-form-input" type="text" maxlength="30" placeholder-class="place-holder"
					placeholder="输入姓名" v-model="appointment.person" />
			</view>

			<view class="appointment-form">
				<view class="appointment-form-label">联系电话</view>
				<input class="appointment-form-input" type="text" maxlength="11" placeholder-class="place-holder"
					placeholder="输入预约人手机号码" v-model="appointment.mobile" />
			</view>

			<view class="appointment-form">
				<view class="appointment-form-label">公司名称</view>
				<input class="appointment-form-input" type="text" maxlength="30" placeholder-class="place-holder"
					placeholder="输入公司名称" v-model="appointment.company" />
			</view>

			<view class="appointment-form">
				<view class="appointment-form-label">公司职位</view>
				<input class="appointment-form-input" type="text" maxlength="30" placeholder-class="place-holder"
					placeholder="输入公司职位" v-model="appointment.cmpTitle" />
			</view>
		</view>
		<view class="card">
			<view class="appointment-form">
				<view class="appointment-form-label">随访人数</view>
				<input class="appointment-form-input" type="text" maxlength="4" placeholder-class="place-holder"
					placeholder="输入随访人数" v-model="appointment.num" />
			</view>

			<view class="appointment-form">
				<view class="appointment-form-label appointment-form-label-1">随访人员介绍</view>
				<view class="appointment-form-value"></view>
			</view>

			<view class="appointment-form-textarea">
				<textarea class="appointment-cont-input" placeholder-class="place-holder" placeholder="请输入随访人员介绍，非必填项"
					maxlength="200" v-model="appointment.intro" />
			</view>
		</view>

		<view class="submit" @click="submit()">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				appointment: {
					"cmpTitle": "",
					"company": "",
					"content": "",
					"endTime": "",
					"intro": "",
					"mobile": "",
					"num": '',
					"person": "",
					"startTime": "",
					"title": "",
					date: ''
				},
				dateList: [],
				dateIndex: 0,
			}
		},
		onLoad() {

		},
		onShow() {
			const date1 = this.formatDate(new Date())
			const date2 = this.formatDate(new Date().getTime() + 24 * 60 * 60 * 1000)
			const date3 = this.formatDate(new Date().getTime() + 24 * 60 * 60 * 1000 * 2)
			const date4 = this.formatDate(new Date().getTime() + 24 * 60 * 60 * 1000 * 3)
			const date5 = this.formatDate(new Date().getTime() + 24 * 60 * 60 * 1000 * 4)
			this.dateList = [{
				title: '今天',
				date: this.formatDateToText(date1),
				value: date1
			}, {
				title: '明天',
				date: this.formatDateToText(date2),
				value: date2
			}, {
				title: this.getWeek(date3),
				date: this.formatDateToText(date3),
				value: date3
			}, {
				title: this.getWeek(date4),
				date: this.formatDateToText(date4),
				value: date4
			}, {
				title: this.getWeek(date5),
				date: this.formatDateToText(date5),
				value: date5
			}]
			this.dateIndex = 0
			this.appointment.date = this.dateList[0].value
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			formatDate(time) {
				const date = new Date(time)
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (month < 10) {
					month = "0" + month;
				}
				if (day < 10) {
					day = "0" + day;
				}
				return year + "-" + month + "-" + day;
			},
			getWeek(dateString) {
				const dateArray = dateString.split("-");
				const date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
				return "周" + "日一二三四五六".charAt(date.getDay());
			},
			formatDateToText(dateString) {
				const dateArray = dateString.split("-");
				return (dateArray[1] < 10 ? dateArray[1].slice(1) : dateArray[1]) + "月" + dateArray[2] + "日";
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			dateChange(item, index) {
				console.log(item)
				this.dateIndex = index
				this.appointment.date = item.value
			},
			startTimeChange(e) {
				this.appointment.startTime = e.detail.value
			},
			endTimeChange(e) {
				this.appointment.endTime = e.detail.value
			},
			// 提交
			submit() {
				if (this.appointment.date == '') {
					this.$toast('请选择预约日期')
					return false
				}
				if (this.appointment.startTime == '') {
					this.$toast('请选择预约开始日期')
					return false
				}
				if (this.appointment.endTime == '') {
					this.$toast('请选择预约结束日期')
					return false
				}
				this.appointment.startTime = Date.parse(this.appointment.date + ' ' + this.appointment.startTime)
				this.appointment.endTime = Date.parse(this.appointment.date + ' ' + this.appointment.endTime)
				console.log(this.appointment)
				this.$api.visitorAppointmentNew(this.appointment).then(res => {
					this.$toast('预约成功')
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1000)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 24rpx 24rpx 200rpx 24rpx;
		overflow: auto;
	}

	.card {
		padding: 32rpx 24rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;

		&:not(:last-child) {
			margin-bottom: 24rpx;
		}
	}

	.appointment {
		&-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30rpx;

			&-t {
				font-size: 32rpx;
			}

			&-input {
				width: 444rpx;
				height: 56rpx;
				padding: 0 12rpx;
				font-size: 26rpx;
				line-height: 56rpx;
				border: 1rpx #DBDBDB solid;
				border-radius: 12rpx;
			}
		}

		&-cont {
			padding: 24rpx;
			border: 1rpx #DBDBDB solid;
			border-radius: 16rpx;

			&-input {
				width: 100%;
				height: 188rpx;
				line-height: 36rpx;
				font-size: 26rpx;
			}
		}

		&-form {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 60rpx;

			&:first-of-type {
				margin-top: 0;
			}

			&-label {
				width: 160rpx;
				font-size: 32rpx;
			}

			&-label-1 {
				width: 230rpx !important;
			}

			&-input {
				width: 490rpx;
				height: 44rpx;
				line-height: 44rpx;
				font-size: 26rpx;
				text-align: right;
			}

			&-picker {
				width: 442rpx;
				height: 44rpx;
				line-height: 44rpx;
				font-size: 26rpx;
				text-align: right;
				padding-right: 48rpx;
				background: url(../../../static/image/icon-right.png) 450rpx 2rpx no-repeat;
				background-size: 40rpx 40rpx;
			}

			&-picker-box {
				width: 456rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

			}

			&-picker-1 {
				width: 200rpx;
				height: 52rpx;
				line-height: 52rpx;
				font-size: 26rpx;
				text-align: center;
				border: 1px #979797 solid;
				border-radius: 16rpx;
			}

			&-value {
				font-size: 26rpx;
			}

			&-value-1 {
				font-size: 26rpx;
				color: #757575;
			}

			&-textarea {
				width: auto;
				height: auto;
				padding: 24rpx;
				border: 1px #DBDBDB solid;
				border-radius: 16rpx;
				margin-top: 32rpx;
			}
		}

	}

	.choose {
		width: 100%;
		height: 160rpx;
		overflow-x: scroll;
		overflow-y: hidden;

		&-date {
			display: flex;

			&-item {
				min-width: 160rpx;
				height: 160rpx;
				padding: 24rpx;
				border-radius: 8rpx;
				background-color: #F2F2F6;
				text-align: center;
				margin-right: 76rpx;
				font-weight: 600;
				flex-shrink: 0;

				&--active {
					background-color: #5FC2FF;

					.choose-date-title {
						color: #fff;
					}

					.choose-date-value {
						color: #fff;
					}
				}
			}

			&-title {
				margin-bottom: 26rpx;
				font-size: 28rpx;
				line-height: 40rpx;
				color: #757575;
			}

			&-value {
				font-size: 32rpx;
				line-height: 44rpx;
				color: #757575;
			}
		}
	}

	.submit {
		width: 560rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #5FC2FF;
		border-radius: 40rpx;
		text-align: center;
		font-size: 32rpx;
		color: #FFFFFF;
		margin: 60rpx auto 0;
	}
</style>
