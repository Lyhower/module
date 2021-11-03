import util from "@/utils/util.js";
import user from "@/utils/user.js";
import share from "@/utils/share.js";
import fs from "@/utils/io.js";
import defaultConfig from "@/config.js";

export default {
	sysInit() {
		var t = wx.getSystemInfoSync();
		// #ifdef MP
		this.globalData.navHeight = t.statusBarHeight + 46;
		this.globalData.pageHeight = t.windowHeight;
		// #endif
		// #ifdef H5
		this.globalData.navHeight = 45;
		this.globalData.pageHeight = t.windowHeight - this.globalData.navHeight;
		// #endif
		// #ifdef APP-PLUS
		this.globalData.navHeight = 66;
		this.globalData.pageHeight = t.windowHeight - this.globalData.navHeight;
		// #endif
		this.globalData.windowWidth = t.windowWidth;
		this.globalData.windowHeight = t.windowHeight;
		this.globalData.pageWidth = t.windowWidth;

		this.globalData.isiphone = t.model.indexOf("iPhone") > -1 ? true : false;
		t.environment == "wxwork" ? this.globalData.iswxwork = true : false;
	},
	fullUrl(url) {
		const config = this.getConfig();
		if (/^https/is.test(url)) {
			return url;
		}
		if (!/^\/.*/is.test(url)) {
			url = "/" + url;
		}
		return "https://" + config.host + url;
	},
	//微信登录
	async wxlogin(s) {
		let startTime=this.globalData.startTime
		let endTime=this.globalData.endTime
		if(startTime==''||endTime==''){
			this.globalData.startTime = new Date().format("yyyy-MM-dd")
			this.globalData.endTime = new Date().format("yyyy-MM-dd")
		}
		var ret = await user.login();
		if (s && typeof(s) == "function") {
			s(ret);
		}
		return ret;
	},
	//获取设置
	getConfig() {
		if (this.globalData.config) {
			return this.globalData.config
		}
		var appid = undefined;
		// #ifdef MP
		const accountInfo = wx.getAccountInfoSync();
		appid = accountInfo.miniProgram.appId;
		// #endif
		// #ifdef H5
		appid = "h5";
		// #endif
		// #ifdef APP-PLUS
		appid = "app";
		// #endif
		var debug = false;
		if (process.env.NODE_ENV == "development") {
			debug = true;
		} else {
			debug = defaultConfig.debug;
		}
		if (debug && defaultConfig.appid) {
			appid = defaultConfig.appid;
		}
		var myconfig = defaultConfig.config[appid];
		myconfig.debug = debug;
		if (!myconfig.openid) {
			util.toast("调试openid无效");
			return null;
		}
		console.log(myconfig);
		this.globalData.config = myconfig;
		return this.globalData.config;
	},
	//获取缓存
	getCache(e, t) {
		return util.getCache(e, t);
	},
	//设置缓存
	setCache(e, t, i) {
		return util.setCache(e, t, i);
	},
	//移除缓存
	removeCache(e) {
		return util.removeCache(e);
	},
	//setData
	setVal(that, name, key, val) {
		util.setVal(that, name, key, val);
	},
	//setData
	setIndexVal(that, name, index, key, val) {
		util.setIndexVal(that, name, index, key, val);
	},
	//公共分享逻辑
	shareAppMessage() {
		return share.shareAppMessage();
	},
	//
	setUserInfo(ret) {
		//debugger;
		this.globalData.userInfo.appId = ret.appId;
		this.globalData.userInfo.token = ret.token;
		this.globalData.userInfo.openId = ret.openId;
		this.globalData.userInfo.unionId = ret.unionId;
		this.globalData.userInfo.userId = ret.userId;
		this.globalData.userInfo.fansId = ret.userFansId;
		this.globalData.userInfo.userVipId = ret.userVipId;
		this.globalData.userInfo.userName = ret.userName;
		this.globalData.userInfo.userType = ret.userType;
		this.globalData.userInfo.companyId = ret.companyId;
		this.globalData.userInfo.companyName = ret.companyName;
		this.globalData.userInfo.depotId = ret.branchId;
	},
	//全局变量
	globalData: {
		config: null,
		openid: "",
		uniSessionKey: "",
		qySessionKey: "",
		userInfo: {},
		qyUserInfo: {},
		navHeight: 0,
		windowWidth: 0,
		windowHeight: 0,
		isiphone: false,
		iswxwork: false,
		temp:{},//临时存储
		startTime:'',//开始时间
		endTime:''//结束时间
	}
};
