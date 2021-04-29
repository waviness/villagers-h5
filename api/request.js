// const baseUrl = 'http://hxw.test.swadm.kpdv.cc' // 测试
const baseUrl = 'https://testing2.kpdv.cc/'; // 测试
// const baseUrl = 'https://wx.vancodes.com'; // 测试

function setHeader(method) {
	let contentType =
		method == 'POST' ? 'application/json' : 'application/x-www-form-urlencoded';
	let header = {
		'Content-Type': contentType,
	};
	let token = uni.getStorageSync('token');
	if (token) {
		header['Authorization'] = 'Bearer ' + token;
	}
	return header;
}

function http(url, params, type, header) {
	return new Promise((resolve, reject) => {
		let role = uni.getStorageSync('role')
		let prefix = +role === 1 ? '/vil-api' : '/guest-api'
		uni
			.request({
				url: url.split('/')[1] === 'wx-api' ? baseUrl + url : baseUrl + prefix + url,
				header: header || setHeader(type),
				method: type,
				data: params,
				timeout: 30000,
			})
			.then(res => {
				// console.log(res)
				if (res[1].statusCode == 200 && res[1].data.code == 200) {
					resolve(res[1].data);
				} else if (res[1].statusCode == 200 && res[1].data.code == 401) {
					uni.showToast({
						icon: 'none',
						title: res[1].data.errMsg || '登录已过期，请重新登录',
						duration: 2000,
					});
					setTimeout(() => {
						uni.clearStorageSync();
						uni.reLaunch({
							url: '/pages/wxLogin/wxLogin',
						});
					}, 1000);
				} else if (res[1].statusCode == 200 && res[1].data.code == 400) {
					uni.showToast({
						icon: 'none',
						title: res[1].data.errMsg,
						duration: 2000,
					});
				} else if (
					res[1].statusCode == 200 &&
					res[1].data.code != 200 &&
					res[1].data.code != 400
				) {
					reject(res[1].data);
					uni.showToast({
						icon: 'none',
						title: res[1].data.msg,
						duration: 2000,
					});
				} else {
					reject(res[1].data);
					uni.showToast({
						icon: 'none',
						title: '当前网络不给力哦~',
						duration: 2000,
					});
				}
			})
			.catch(err => {
				console.log('失败：' + url);
				console.log(err);
				reject(err);
			});
	});
}
const request = {
	get: function(url, params) {
		return http(url, params, 'GET');
	},
	get_1: function(url, params, id, header) {
		return http(url + '/' + id, params, 'GET', header);
	},
	post: function(url, params) {
		return http(url, params, 'POST');
	},

	put: function(url, params, id, header) {
		if (id) {
			return http(url + '/' + id, params, 'PUT');
		} else {
			return http(url, params, 'PUT', header);
		}
	},
	delete: function(url, params) {
		return http(url, params, 'DELETE');
	},
};

export default request;
