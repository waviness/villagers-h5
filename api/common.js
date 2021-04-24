import request from './request.js';

export function checkVersion() {
  return request.get('/wx-api/check-version').then(res => res.data);
}

// 小程序获取手机号登陆(村民端)
export function wxAuthLogin(params) {
  return request.post('/wx-api/auth/villager', params).then(res => res.data);
}

// 绑定用户微信信息
export function wxGetUserInfo(params) {
  return request
    .post('/wx-api/auth/villager/userinfo', params)
    .then(res => res.data);
}

// 手机号与验证码登录
export function login(params) {
  return request
    .post('/wx-api/auth/villager/login', params)
    .then(res => res.data);
}

// 小程序首页信息
export function getIndex(params) {
  return request.get('/idx', params).then(res => res.data);
}

// 组织架构
export function getZzjg(params, id) {
  return request
    .get_1('/idx/cadre-structure', params, id, {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + uni.getStorageSync('token'),
    })
    .then(res => res.data);
}

// 村史村志
export function getCscz(params) {
  return request.get('/idx/village-history', params).then(res => res.data);
}

// 村情概况
export function getCqgk(params) {
  return request.get('/idx/village-info', params).then(res => res.data);
}

// 个人信息
export function getUserInfo(params) {
  return request.get('/idx/userinfo', params).then(res => res.data);
}

// 消息
export function getMsg(params) {
  return request.get('/msg' + params).then(res => res.data);
}

// 消息设为已读
export function msgRead(params, id) {
  return request.put('/msg', params, id).then(res => res.data);
}

// 书记信箱列表
export function getMailbox(params) {
  return request.get('/mailbox' + params).then(res => res.data);
}

// 新建书记信箱
export function newMailbox(params) {
  return request.post('/mailbox', params).then(res => res.data);
}

// 书记信箱记录详情
export function mailBoxDetail(params, id) {
  return request.get_1('/mailbox', params, id).then(res => res.data);
}

// 书记信箱 新建回复
export function mailBoxReply(params) {
  return request.post('/mailbox/reply', params).then(res => res.data);
}

// 获取短信验证码
export function sendSmsCode(params) {
  return request.post('/wx-api/auth/villager/code', params);
}

// 事件上报列表获取
export function getEventReportList(params) {
  return request.post('/eventReport/page', params).then(res => res.data);
}

// 事件上报-单个获取
export function getEventReport(id) {
  return request.get_1('/eventReport', {}, id).then(res => res.data);
}

// 事件上报 - 添加
export function createNewEventReport(params) {
  return request.post('/eventReport', params).then(res => res.data);
}

// 事件上报 - 删除
export function deleteEventReport(id) {
  return request.delete('/eventReport/' + id).then(res => res.data);
}

// 事件上报 - 点赞
export function likeEventReport(id) {
  return request.post('/eventReport/click/' + id).then(res => res.data);
}

// 事件上报 - 取消点赞
export function unlikeEventReport(id) {
  return request.post('/eventReport/unclick/' + id).then(res => res.data);
}

// 事件上报 - 添加评论
export function createEventReportComment(params) {
  return request.post('/eventReport/comments', params).then(res => res.data);
}

// 事件上报 - 获取评论
export function getEventReportComment(params) {
  return request
    .post('/eventReport/comments/page', params)
    .then(res => res.data);
}

// 动态列表获取
export function getMomentsList(params) {
  return request.post('/moments/page', params).then(res => res.data);
}

// 动态-单个获取
export function getMoments(id) {
  return request.get_1('/moments', {}, id).then(res => res.data);
}

// 动态 - 添加
export function createNewMoments(params) {
  return request.post('/moments', params).then(res => res.data);
}

// 动态 - 删除
export function deleteMoments(id) {
  return request.delete('/moments/' + id).then(res => res.data);
}

// 动态 - 点赞
export function likeMoments(id) {
  return request.put('/moments/click', {}, id).then(res => res.data);
}

// 动态 - 取消点赞
export function uplikeMoments(id) {
  return request.put('/moments/unclick', {}, id).then(res => res.data);
}

// 动态 - 添加评论
export function createMomentsComments(params) {
  return request.post('/moments/comments', params).then(res => res.data);
}

// 动态 - 获取评论
export function getMomentsComments(params) {
  return request.post('/moments/comments/page', params).then(res => res.data);
}

// 调解纠结 - 添加
export function createPeaceEvent(params) {
  return request.post('/argMediate', params).then(res => res.data);
}

// 调解纠结 - 修改
export function updatePeaceEvent(params) {
  return request
    .put('/argMediate/modify', params, null, {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + uni.getStorageSync('token'),
    })
    .then(res => res.data);
}

// 调解纠结 - 获取 - 分页
export function getPeaceEventList(params) {
  return request.post('/argMediate/page', params).then(res => res.data);
}

// 调解纠结 - 获取 - 单个
export function getPeaceEvent(id) {
  return request.get('/argMediate/' + id).then(res => res.data);
}

// 调节纠结 - 获取老娘舅
export function getUncleList(params) {
  return request.post('/uncel/page', params);
}

// 标签
export function getTag(params) {
  return request.post('/tags/list', params).then(res => res.data);
}

// 村友通讯录-列表(含搜索)
export function getFriendList(params) {
  return request.get('/friend', params).then(res => res.data);
}
