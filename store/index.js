import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		tabbarHeight: 0,
		hasLogin: false, //登录状态
		key: "userInfo",
		userInfo: {}
	},
	getters: {

	},
	mutations: {
		setTabbarHeight(state, h) {
			state.tabbarHeight = h;
		},
		/**
		 * 登录
		 * @param {Object} state
		 * @param {Object} data
		 */
		login(state, data) {
			state.hasLogin = true;
			state.userInfo = data;
			uni.setStorageSync(state.key, data);
		},
		/**
		 * 注销
		 * @param {Object} state
		 */
		logout(state) {
			console.log('注销登录');
			state.hasLogin = false;
			state.userInfo = {};
			let ret = uni.removeStorageSync(state.key);
		}
	},
	actions: {
		/**
		 * 载入缓存的登录信息
		 * @param {Object} context
		 */
		loadStorage(context) {
			let key = context.state.key;
			let data = uni.getStorageSync(key);
			if (data) {
				context.commit('login', data);
			}
		}
	}
})
export default store
