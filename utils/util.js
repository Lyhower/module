import app from "@/utils/app";
import logs from "@/utils/log";
import dateFormat from "@/utils/dateFormat";
import store from "@/store/index";
import ajaxSetting from "@/utils/ajax.js";
export default {
	/**
	 * 转换到事件
	 * @param {Object} s
	 */
	toDate(s) {
		if (!s) {
			return new Date();
		}
		return new Date(s.replace(/-/g, "/").replace(/T/g, ' ').replace(/\.(.*)/g, ''));
	},
	/**
	 * 时间格式化
	 * @param {Object} datestr
	 * @param {Object} foramt
	 */
	dateFormat(datestr, foramt) {
		return this.toDate(datestr).format(foramt);
	},
	//格式化
	format(list, key, fmt) {
		for (let i in list) {
			let date = this.toDate(list[i][key]);
			list[i][key] = date.format(fmt);
		}
		return list;
	},
	/**
	 * 时间格式化
	 * @param {Object} list
	 * @param {Object} key
	 */
	format2(list, key) {
		for (let i in list) {
			let date = this.toDate(list[i][key]);
			list[i][key] = date.format2();
		}

		return list;
	},
	info(e, type) {
		type && logs.setFilterMsg(type);
		e && logs.info(e);
	},
	//包装Promise
	promisify(fn) {
		return function(args) {
			return new Promise((resolve, reject) => {
				args = args || {};
				args.success = res => {
					resolve(res);
				};
				args.fail = err => {
					reject(err);
				};
				fn(args);
			});
		};
	},
	//转换对象方法为promisify
	toASync(names, obj = null) {
		const that = this;
		!obj && (obj = wx);
		return (names || []).map(name => ({
			name,
			member: obj[name]
		})).filter(t => typeof t.member === "function").reduce((r, t) => {
			r[t.name] = that.promisify(obj[t.name]);
			return r;
		}, {});
	},
	/**
	 * 显示调试消息
	 * @param {Object} s
	 * @param {Object} t
	 */
	toast(s, t) {
		this.showToast(s, 'none', t);
	},
	/**
	 * 显示对话框
	 */
	async confirm(s, title = '提示') {
		const showModal = this.promisify(uni.showModal);
		var ret = await showModal({
			title: title,
			content: s
		});
		return ret.confirm;
	},
	/*
	 * @param {Object} e
	 */
	pdata(e) {
		return e.currentTarget.dataset;
	},
	/**
	 * @param {Object} filePath
	 * @param {Object} callback
	 */
	async uploadFile(filePath, callback) {
		var that = this;
		var config = app.getConfig();
		var user = store.state.userInfo;
		var header = {
			"Authorization": user.token
		};
		const uploadFile = this.promisify(uni.uploadFile);
		var res = await uploadFile({
			header: header,
			formData: {
				fileType: 1
			},
			filePath: filePath,
			name: 'file',
			url: `${config.host}/x3-service-ftp-center/ftp/v2`
		});
		if (res.statusCode == 200) {
			res.data = JSON.parse(res.data);
			var ret = res.data.fileSource + res.data.fileRealPath;
			if (callback && typeof(callback) == "function") {
				callback(true, ret);
			}
			return ret;
		}
	},
	/**
	 * 使用参数初始化
	 * @param {Object} config
	 */
	createAjax(config) {
		return new ajaxSetting.ajaxSetting(config);
	},
	//调用api
	async ajax(url, data, callback, type = "json") {
		var ret = await ajaxSetting.defaultSetting.ajax(url, data, callback, type);
		return ret;
	},
	//get方式
	get(r, callback) {
		return this.ajax(r, null, callback, 'get');
	},
	//post方式
	post(r, data, callback) {
		return this.ajax(r, data, callback, 'post');
	},
	//put
	put(r, data, callback) {
		return this.ajax(r, data, callback, 'put');
	},
	//delete
	delete(r, data, callback) {
		return this.ajax(r, data, callback, 'delete');
	},
	/**
	 * 显示
	 * @param {Object} title
	 */
	showLoading(title) {
		uni.showLoading({
			title: title || '',
			icon: "loading"
		});
	},
	/**
	 * 隐藏
	 */
	async hideLoading() {
		uni.hideLoading();
	},
	//查询入参
	inputApi(api, f) {
		var url = `x3-service-archives-center/archive/user/v1/response/get/list`;
		var params = {
			appApiUrlId: `GET/${api}`
		};
		return this.ajax(url, params, f);
	},
	//setData
	setVal(that, name, key, val) {
		that[name][key] = val;
	},
	//setData
	setIndexVal(that, name, index, key, val) {
		that[name][index][key] = val;
	},
	//获取缓存
	getCache(e, t) {
		var i = +new Date() / 1e3;
		var n = "";
		var i = parseInt(i);
		var config = app.getConfig();
		try {
			(n = wx.getStorageSync(e + config.appid)).expire > i || 0 == n.expire ? n = n.value : (n = "", this
				.removeCache(e));
		} catch (e) {
			n = void 0 === t ? "" : t;
		}
		return n = n || "";
	},
	//设置缓存
	setCache(e, t, i) {
		var n = +new Date() / 1e3;
		var a = !0;
		var o = {
			expire: i ? n + parseInt(i) : 0,
			value: t
		};
		var config = app.getConfig();
		try {
			uni.setStorageSync(e + config.appid, o);
		} catch (e) {
			a = !1;
		}
		return a;
	},
	//移除缓存
	removeCache(e) {
		var t = !0;
		var config = app.getConfig();
		try {
			uni.removeStorageSync(e + config.appid);
		} catch (e) {
			t = !1;
		}
		return t;
	},
	/**
	 * 显示提示消息
	 */
	showToast(title, icon = "none", t = 3000) {
		if (!title) {
			return;
		}
		uni.showToast({
			title: title ? title + '' : '',
			icon: icon,
			duration: t
		});
	},
	//url参数反序列化
	str2Obj(t) {
		if ("string" != typeof t) {
			return t;
		}
		if (t.indexOf("&") < 0 && t.indexOf("=") < 0) {
			return {};
		}
		var e = t.split("&");
		var o = {};
		e.forEach(s => {
			var n = s.split("=");
			o[n[0]] = n[1];
		});
		return o;
	},
	/**
	 * 导航并监听返回事件
	 * @param {Object} path
	 * @param {Object} func
	 */
	navigateTo(path, func) {
		uni.addInterceptor('navigateBack', {
			complete() {
				uni.removeInterceptor('navigateBack');
				func && typeof(func) == 'function' && func();
			}
		});
		uni.navigateTo({
			url: path
		})
	},
	//获取上一个页面
	getPrevPage() {
		let pages = getCurrentPages();
		if (pages.length < 2) {
			return null;
		}
		let prevPage = pages[pages.length - 2];
		// #ifndef H5
		return prevPage.$vm;
		// #endif
		return prevPage;
	},
	//获取dom元素的尺寸
	getRect(selector, that) {
		return new Promise((resolve, reject) => {
			var query = that ? that.createSelectorQuery() : wx.createSelectorQuery();
			query.select(selector).boundingClientRect((rect) => {
				resolve(rect);
			}).exec();
		});
	},
	//循环获取deom元素尺寸，最多尝试2秒，间隔200ms
	async getRectLoop(selector, that) {
		var i = 0;
		var ret = null;
		while (i < 10 && !ret) {
			this.setWait(200);
			ret = await this.getRect(selector, that);
			i++;
		}
		if (!ret) {
			console.error(`getRectLoop ${selector} fail!`);
		}
		return ret;
	},
	/**
	 * 延迟
	 * @param {Number} n
	 */
	setWait(n) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, n);
		});
	},
	/**
	 * 打印
	 * @param {Object} o
	 */
	echo(o) {
		if (typeof(o) == "object") {
			console.log(JSON.stringify(o));
		} else {
			console.log(o);
		}
	},
	//返回刷新
	backRefresh(title){
		if(title){
			this.toast(title)
		}
		setTimeout(function() {
			let pages = getCurrentPages();//当前页面
			let beforePage = pages[pages.length - 2];//上一个页面
			uni.navigateBack({
			    success: function() {
			        beforePage.onLoad(); // 执行上一页的onLoad方法
			    }
			});
		}, 1000);
	},
	//上一页刷新
	previousPageRefresh(){
		let pages = getCurrentPages();//当前页面
		let beforePage = pages[pages.length - 2];//上一个页面
		beforePage.onLoad(); // 执行上一页的onLoad方法
	}
}
