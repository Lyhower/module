import app from "@/utils/app";
import util from "@/utils/util";
export default {
	//公共分享事件
	shareAppMessage() {
		var userid = app.globalData.userInfo['userid'] ? app.globalData.userInfo['userid'] : "";
		if (!userid) {
			return {};
		}

		return {
			path: "pages/index/index?_shareid=" + userid
		};
	},
	//分享逻辑
	shareBiz(option) {
		if (!option) {
			return;
		}

		var scene = decodeURIComponent(option.scene);

		if (!scene) {
			return;
		}

		var params = this.str2Obj(scene);

		if (!params) {
			return;
		}

		var parentId = params["_shareid"];

		if (!parentId || !app.globalData.userInfo['userid']) {
			return;
		}

		var url = 'x3-service-wechatapplet-commenton-center/wechatUser/parent?parentUserId=' + parentId + '&userId=' +
			app.globalData.userInfo['userid'];
		util.put(url, null, ret => {
			console.log(app.globalData.userInfo['userid'] + "绑定了" + parentId);
		});
	},
	str2Obj(t) {
		if ("string" != typeof t) return t;
		var o = {};

		if (t.indexOf("&") < 0 && t.indexOf("=") < 0) {
			return o;
		}

		var e = t.split("&");

		for (var i in e) {
			if (e[i].indexOf("=") > -1) {
				var n = e[i].split("=");
				o[n[0]] = n[1];
			}
		}

		return o;
	}
};
