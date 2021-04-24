import request from './request.js'

// 小程序首页信息
export function visitorGetIndex(params){
	return request.get('/guest-api/idx', params).then(res => res.data)
}

// 组织架构
export function visitorGetZzjg(params){
	return request.get('/guest-api/idx/cadre-structure', params).then(res => res.data)
}

// 村史村志
export function visitorGetCscz(params){
	return request.get('/guest-api/idx/village-history', params).then(res => res.data)
}

// 村情概况
export function visitorGetCqgk(params){
	return request.get('/guest-api/idx/village-info', params).then(res => res.data)
}

// 消息
export function visitorGetMsg(params){
	return request.get('/guest-api/msg' + params).then(res => res.data)
}

// 消息设为已读
export function visitorMsgRead(params, id){
	return request.put('/guest-api/msg', params, id).then(res => res.data)
}

// 书记预约记录列表
export function visitorGetAppointment(params){
	return request.get('/guest-api/sec-appt' + params).then(res => res.data)
}

// 创建书记预约
export function visitorAppointmentNew(params){
	return request.post('/guest-api/sec-appt', params).then(res => res.data)
}

// 取消书记预约
export function visitorAppointmentCancel(params, id){
	return request.put('/guest-api/sec-appt/cancel', params, id).then(res => res.data)
}

// 书记预约记录详情
export function visitorAppointmentDetail(params, id){
	return request.get_1('/guest-api/sec-appt', params, id).then(res => res.data)
}
