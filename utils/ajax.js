import util from "@/utils/util.js";
import app from "@/utils/app.js";
import Log from "@/utils/log.js";

class ajaxSetting {
	reqQuene = new Map();
	setting = {
		title: "",
		hideError: false,
		hideLoading: false,
		delayhideLoading: 0
	};
	loadingCnt = 0;
	loadingShow = false;
	constructor(setting) {
		this.setting = Object.assign(this.setting, setting);
		console.log(this.setting);
	}
	/**
	 * 显示loading
	 */
	async showLoading() {
		if (this.loadingShow) {
			return;
		}
		this.loadingShow = true;
		uni.showLoading({
			title: this.setting.title,
			icon: "loading"
		});
	}
	async hideLoading() {
		var max = 10;
		var delay = 100;
		var cnt = 0;
		var i = 0;
		while (i < max) {
			await util.setWait(delay);
			var size = this.reqQuene.size;
			if (!size) {
				cnt++;
			} else {
				cnt = 0;
			}
			if (cnt > 3 && this.loadingShow) {
				uni.hideLoading();
				this.loadingShow = false;
				break;
			}
			i++;
		}
	}
	//创建req对象
	createRequest(url, data, type = "json") {
		var method = type.toUpperCase();
		var contenttype = "";
		if (type == "GET") {
			contenttype = "";
		} else if (method == "POST") {
			contenttype = "application/x-www-form-urlencoded";
		} else if (method == "JSON") {
			contenttype = "application/json";
			method = "POST";
		}
		var req = {
			url: url,
			method: method,
			header: {},
			data: JSON.stringify(data),
		};
		if (contenttype != "") {
			req.header["Content-type"] = contenttype;
		}
		return req;
	}
	apiUrl(url) {
		const config = app.getConfig();
		if (/^http/is.test(url)) {
			return url;
		}
		if (!/^\/.*/is.test(url)) {
			url = "/" + url;
		}
		return config.host + url;
	}
	//调用api
	async ajax(url, data, callback, type = "json") {
		url = this.apiUrl(url);
		var req = this.createRequest(url, data, type);
		Log.info(req)
		if (app.globalData.userInfo.token) {
			req.header['Authorization'] = app.globalData.userInfo.token;
		}
		const request = util.promisify(uni.request);
		var errMsg = "";
		try {
			this.reqQuene.set(request, {});
			if (!this.setting.hideLoading) {
				this.showLoading();
			}
			var size = this.reqQuene.size;
			var ret = await request(req);
			this.reqQuene.delete(request);
			this.hideLoading();

			if (ret.statusCode == 200) {
				Log.warn(ret)
				if (callback && typeof(callback) == "function") {
					callback(ret.data);
				}
				// if (ret.data.status == false) {
				// 	util.toast(ret.data.errorMsg, 1500);
				// }
				return ret.data;
			}
			Log.error(ret)
			if (!this.setting.hideError) {
				if (ret.data) {
					if (ret.data.message || ret.data.error) {
						errMsg = ret.data.message || ret.data.error;
					} else errMsg = ret.data
				} else if (ret.statusCode) {
					errMsg = ret.statusCode;
				} else errMsg = "无效请求：" + JSON.stringify(req)
			}
		} catch (err) {
			if (err.message) {
				errMsg = err.message;
			} else errMsg = err
		}
		if (errMsg) {
			util.toast(errMsg,3000);
			console.error(req.url, errMsg);
		}
		return undefined;
	}
	get(r, callback) {
		return this.ajax(r, null, callback, 'get');
	}
	//post方式
	post(r, data, callback) {
		return this.ajax(r, data, callback, 'post');
	}
	//put
	put(r, data, callback) {
		return this.ajax(r, data, callback, 'put');
	}
	//delete
	delete(r, data, callback) {
		return this.ajax(r, data, callback, 'delete');
	}
}
const defaultSetting = new ajaxSetting({});
export default {
	ajaxSetting,
	defaultSetting: defaultSetting
}
