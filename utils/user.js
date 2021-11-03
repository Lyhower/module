import app from "@/utils/app";
import util from "@/utils/util.js";
import store from "@/store/index.js";
import lock from "@/utils/lock.js";
export default {
	async login() {
		if (store.state.hasLogin) {
			return store.state.unserInfo;
		}
		if (!await lock.lock(this)) {
			throw Error('lock timeout')
		}
		const config = app.getConfig();
		if (config.debug) {
			await this.testlogin();
		} else {
			var type = "app";
			// #ifdef H5
			type = "h5";
			// #endif
			// #ifdef MP
			type = "mp";
			// #endif
			if (type == "app") {
				await this.applogin();
			}
			if (type == "h5") {
				await this.h5login();
			}
			if (type == "mp") {
				await this.wxlogin();
			}
		}
		lock.unlock(this);
		if (store.state.hasLogin) {
			return store.state.unserInfo;
		}
	},
	async applogin() {
		uni.redirectTo({
			url: "/pages/public/login"
		})
	},
	async h5login() {
		uni.redirectTo({
			url: "/pages/public/login"
		})
	},
	async testlogin() {
		const config = app.getConfig();
		var openid = config.openid;
		var unionid = "";
		var ret = await util.ajax(`x3-service-vip-center/wechat/login/byopenid`, {
			"appId": config.appid,
			"appType": "wechat",
			"language": "zh-cn",
			"openId": openid,
			"unionId": unionid
		});
		if (!ret) {
			util.toast('登录失败');
			return;
		}
		var userInfo = {
			appId: config.appid,
			token: ret.token,
			openId: openid,
			unionId: unionid,
			userId: ret.userId,
			userType: ret.userType,
			userName: ret.userName,
			companyName: ret.companyName,
			userVipId: ret.userVipId,
			branchId:ret.branchId
		}
		app.setUserInfo(userInfo);
		store.commit("login", userInfo);
	},
	async wxlogin() {
		// debugger;
		const config = app.getConfig();
		if (store.state.hasLogin) {
			var ret = await uni.checkSession();
			console.log(ret);
		}
		const login = util.promisify(uni.login);
		var code = await login();
		console.log('wxlogin', code);
		var res = await util.get(
			`x3-service-vip-center/wechat/login/get/openid/${config.appid}/${code.code}`);
		if (!res || !res.openid) {
			console.warn('code2session error');
			throw Error(res.errMsg);
		}
		app.globalData.uniSessionKey = res.session_key;
		var ret = await util.ajax(`x3-service-vip-center/wechat/login/byopenid`, {
			"appId": config.appid,
			"appType": "wechat",
			"language": "zh-cn",
			"openId": res.openid,
			"unionId": res.unionid,
		});
		var userInfo = {
			appId: config.appid,
			token: ret.token,
			openId: res.openid,
			unionId: res.unionid,
			userId: ret.userId,
			userType: ret.userType,
			userName: ret.userName,
			companyName: ret.companyName,
			userVipId: ret.userVipId,
			branchId:ret.branchId
		}
		app.setUserInfo(userInfo);
		if (app.globalData.iswxwork) {
			await this.qylogin();
		}
		store.commit("login", userInfo);
	},
	//企业微信登录
	async qylogin() {
		var config = app.getConfig();
		var syncwx = util.toASync(['checkSession', 'login'], wx.qy);

		if (app.globalData.qyUserInfo.userid) {
			await syncwx.checkSession().catch(e => {
				app.globalData.qyUserInfo.userid = "";
			});
		}
		if (!app.globalData.qyUserInfo.userid) {
			var res = await syncwx.login();
			var url =
				`x3-service-vip-center/wechat/login/get/work/user/${config.appid}/${res.code}/${app.globalData.userInfo.openId}`;
			var ret = await util.get(url);
			if (!ret) {
				throw Error(res.errMsg);
			}
			app.globalData.qyUserInfo = {
				userid: ret.userid,
				session_key: ret.session_key
			};
		}
		return "";
	},
	//解密手机号
	getMobile(e) {
		var config = app.getConfig();
		var openid = app.globalData.userInfo.openId;
		var url = `x3-service-vip-center/wechat/login/get/mobile`;
		return util.ajax(url, {
			ivStr: e.detail.iv,
			encryptedData: e.detail.encryptedData,
			sessionKey: app.globalData.uniSessionKey
		});
	},
	//保存分享日志
	saveShareOpenLog(userid, title, shareurl, f) {
		var userinfo = app.globalData.userInfo;
		var url = `x3-service-vip-center/wechat/share/open/save`;
		var params = {
			"fansId": userinfo.fansId,
			"sharChannel": 0,
			"shareTitle": title,
			"shareUrl": shareurl,
			"userId": userid
		};
		util.ajax(url, params, function(ret) {
			typeof f == 'function' && f();
		});
	},
	//保存分享日志
	saveShareLog(type, data) {
		var userinfo = app.globalData.userInfo;
		var url = `x3-service-vip-center/wechat/share/share/save`;
		var params = {
			"shareType": type,
			"sharePhoto": data.imageUrl,
			"shareTitle": data.title,
			"shareUrl": data.path,
			"userId": userinfo.userid
		};
		util.ajax(url, params);
	},
	/**
	 * 检查是否已经绑定手机
	 */
	checkMobileBind() {
		const userinfo = app.globalData.userInfo;
		if (userinfo.userVipId || userinfo.userId) {
			return true;
		}
		return false;
		// return true;
	},
	//转到手机号绑定
	bindMobile(extendUserId, backurl = '') {
		if (!backurl) {
			var pages = getCurrentPages();
			var currentPage = pages[pages.length - 1];
			backurl = currentPage.route;
		}
		backurl = encodeURIComponent(backurl);
		var args = [];
		if (extendUserId) {
			args.push(`extend=${extendUserId}`);
		}
		args.push(`backurl=${backurl}`);
		var url = `/pages/vip/register/index?` + args.join('&');
		wx.redirectTo({
			url: url
		});
	}
};
