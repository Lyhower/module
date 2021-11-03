import app from "@/utils/app.js";
import util from "@/utils/util.js";
import logs from "@/utils/log.js";
export default {
	addAll() {
		//this.addRequestInterceptor();
	},
	addRequestInterceptor() {
		var that = this;
		logs.setFilterMsg('ajax');
		uni.addInterceptor('request', {
			invoke(args) {
				args.url = app.fullUrl(args.url);
				if (app.globalData.userInfo.token) {
					args.header["Authorization"] = app.globalData.userInfo.token;
				}
			},
			complete(ret) {}
		});
	}
}
