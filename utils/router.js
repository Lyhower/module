export default {
	_tabUrl: [],
	_mainUrl: "",
	/**
	 * 路由初始化
	 * @param {Object} tabUrl
	 * @param {Object} mainUrl
	 */
	init(tabUrl, mainUrl) {
		this._mainUrl = mainUrl;
		this._tabUrl = tabUrl;
		var that = this;
		uni.addInterceptor('switchTab', {
			invoke(args) {
				if (!args.hascheck) {
					that.go(args.url);
					return false;
				}
			}
		});
		uni.addInterceptor('navigateTo', {
			invoke(args) {
				if (!args.hascheck) {
					that.go(args.url);
					return false;
				}
			}
		})
	},
	/**
	 * 链接跳转
	 */
	go(url) {
		if (/https:\/\/(.*)/i.test(url)) {
			//h5 网址
			uni.navigateTo({
				hascheck: true,
				url: '/pages/webpage/index?url=' + encodeURIComponent(url)
			});
			return;
		}
		if (/wxapp:\/\/([0-9A-Za-z]*)\/(.*)/i.test(url)) {
			//小程序
			var m = /wxapp:\/\/([0-9A-Za-z]*)\/(.*)/i.exec(url);
			uni.navigateToMiniProgram({
				appId: m[1],
				path: '/' + m[2]
			});
			return;
		};
		if (/^[0-9]([0-9_]+)/i.test(url)) {
			//电话号码
			uni.makePhoneCall({
				phoneNumber: url
			});
			return;
		}
		const tabURL = this._tabUrl;
		const mainUrl = this._mainUrl;
		const index = tabURL.indexOf(url);
		if (index == -1) {
			uni.navigateTo({
				hascheck: true,
				url: url,
				fail(err) {
					console.log(err);
				}
			});
			return;
		}
		var pages = getCurrentPages();
		var curpage = pages[pages.length - 1];
		if (curpage.route == mainUrl) {
			curpage.switchTab({
				index: index,
				path: url
			});
		} else {
			uni.reLaunch({
				hascheck: true,
				url: mainUrl + '?active=' + index
			})
		}
	},
}
