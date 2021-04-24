import * as common from './common'
import * as user from './user'
import * as visitor from './visitor'
import Vue from 'vue'

const api = {
	...user,
	...visitor,
	...common
}

Vue.prototype.$api = api
export default api
