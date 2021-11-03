import app from "@/utils/app";
import util from "@/utils/util";
import router from "@/utils/router";
module.exports = {
	menus: {
		"user/myscore": "/packageA/pages/clerk/user/score/index",
		//我的返利
		"user/myvip": "/packageA/pages/clerk/customer/my/index",
		//我的顾客
		"user/myretail": "/packageA/pages/clerk/order/list",
		//我的订单
		"/vip/archives/#/vipusernew/vipusernew": "/packageA/pages/clerk/newvip/index",
		//会员入会
		"mainMyData": "/packageA/pages/clerk/user/info/index",
		//个人资料
		"mainMyAccountManagement": "/packageA/pages/clerk/user/account/index",
		//账户管理
		"mainMySocre": "/packageA/pages/clerk/user/socre/index",
		//我的返利
		"mainMyFavorites": "/packageA/pages/clerk/user/favorites/index",
		//我的收藏
		"mainMySubscription": "/packageA/pages/clerk/user/subscription/index",
		//我的订阅
		"/report/fixed/#/reportapps/appstockquery": "/packageA/pages/clerk/goods/index/index",
		//查库存
		"vipcener/addres": "/pages/member/address/index",
		//地址管理
		"vipcener/vipinfo": "/pages/member/info/index",
		// 会员资料
		"vipcener/score": "/pages/member/score/index",
		// 会员返利
		"vipcener/coupon": "/pages/member/coupon/index",
		// 会员优惠券
		"vipcener/likedepot": "/packageA/pages/shop/index",
		// 附近门店
		"vipcener/vippolicy": "/pages/vip/viprights/index",
		// 会员权益
		"vipcener/zstj": "/pages/vip/zstj/index",
		// 专属推荐
		"vipcener/wszl": "/packageA/pages/clerk/myvips/info/index",
		//完善会员资料
		"vipscoresub": "/pages/member/score/index",
		//会员返利
		"vipcouponsub": "/pages/member/coupon/index",
		// 会员优惠券
		"vipretailsub": "/pages/member/wardrobe/index",
		//会员衣橱、消费流水
		"/retail/retaildepots/clerklist/clerk/retailmainandsub": "/packageA/pages/clerk/myvips/order/list",
		//零售单
		"/retail/bills/#/retaildepots/retailclerklist": "/packageA/pages/clerk/myvips/order/list?type=my",
		//我的零售单
		"/retail/bills/#/retaildepots/retaildepotapplist": "/packageA/pages/clerk/myvips/order/list?type=depot",
		//店铺零售单
		"/vip/bills/#/vipdepotadjustposs/vipdepotadjustposcreateapp": "/packageA/pages/clerk/VipTransfer/create/index",
		//手工开卡
		"/vip/archives/#/vipusernew/vipclerk": "/packageA/pages/clerk/customer/my/index",
		//我的顾客
		"/vip/archives/#/vipusernew/vipdepot": "/packageA/pages/clerk/customer/depot/index",
		//店铺顾客
		"/vip/archives/#/customervip/vipadmin": "/packageA/pages/clerk/customer/all/index",
		//所有顾客
		"/retail/bills/#/retaildepots/retailcashierv2": "/packageA/pages/clerk/checkout/index",
		//收银台
		"/retail/bills/#/retaildepots/retaicashier": "/packageA/pages/clerk/checkout/index",
		//收银台
		"VipTaskClerk": "/packageA/pages/clerk/VipTaskClerk/index",
		//会员维护任务
		"VipTaskManage": "/packageA/pages/clerk/VipTaskManage/index",
		//会员任务管理
		"/vip/bills/#/vipbilltasksubs/viptasksublist": "/packageA/pages/clerk/vipTask/list",
		//会员维护任务列表
		"/vip/bills/#/vipdepotadjustposs/vipdepotadjustposlist": "/packageA/pages/clerk/VipTransfer/list/index",
		//会员转移任务申请列表
		"VipTransferApproval": "/packageA/pages/clerk/VipTransfer/detail/index",
		//会员归属调整单
		"/system/tools/#/universes/universereporthomepage": "/packageA/pages/report/main/index",
		//自定义报表
		"/vip/archives/#/vipcenter/vipcenterallocate": "/packageA/pages/clerk/depotVipTransfer/index",
		//会员分配
		"/bi/board/#/foundation/foundationnationwide": "/packageA/pages/sell/nationwide/index",
		//看板全国
		"/bi/board/#/foundation/foundationarea": "/packageA/pages/sell/area/index",
		//看板区域
		"/bi/board/#/foundation/foundationdepot": "/packageA/pages/sell/depot/index",
		//看板门店
		"/vip/bills/#/vipbillapplys/vipapply": "/packageA/pages/clerk/myvips/apply/index",
		//会员申请
		"/vip/archives/#/user/vipuserquery": "/packageA/pages/clerk/myvips/search/index",
		//会员查询
		"/vip/bills/#/vipbillclerks/vipclerkmanage": "/packageA/pages/clerk/manage/index",
		"/bi/board/#/foundation/foundationnationwidetenthousandbill": "/packageA/pages/board/nationwide/thousand/index",
		//全国万元单
		"/bi/board/#/foundation/foundationnationwidedepotsales": "/packageA/pages/board/nationwide/depotSaleRank/index",
		//全国店铺销售排行
		"/bi/board/#/foundation/foundationnationwidedepotsalesmansales": "/packageA/pages/board/nationwide/clerkSaleRank/index",
		//全国导购销售排行
		"/bi/board/#/foundation/foundationnationwidevipnetgrowth": "/packageA/pages/board/nationwide/vipGrowth/index",
		//全国vip净增长
		"/bi/board/#/foundation/foundationnationwidesalesmanareatop": "/packageA/pages/board/nationwide/saleTop/index",
		//全国销冠
		"/bi/board/#/foundation/foundationnationwidetotalsales": "/packageA/pages/board/nationwide/saleStatistics/index",
		//区域-销售统计
		"/bi/board/#/foundation/foundationareatenthousandbill": "/packageA/pages/board/area/thousand/index",
		//区域-万元单
		"/bi/board/#/foundation/foundationareadepotsales": "/packageA/pages/board/area/depotSaleRank/index",
		//区域-门店销售排行
		"/bi/board/#/foundation/foundationareadepotsalesmansales": "/packageA/pages/board/area/clerkSaleRank/index",
		//区域-导购销售排行
		"/bi/board/#/foundation/foundationareavipnetgrowth": "/packageA/pages/board/area/vipGrowth/index",
		//区域-会员净增长
		"/bi/board/#/foundation/foundationareasalesmandepottop": "/packageA/pages/board/area/saleTop/index",
		//区域-销冠
		"/bi/board/#/foundation/foundationareatotalsales": "/packageA/pages/board/area/saleStatistics/index",
		//区域销售统计
		"/bi/board/#/foundation/foundationdepottenthousandbill": "/packageA/pages/board/depot/thousand/index",
		//店铺-万元单
		"/bi/board/#/foundation/foundationdepottotalsales": "/packageA/pages/board/depot/saleStatistics/index",
		//门店-销售统计
		"/bi/board/#/foundation/foundationdepotvipnetgrowth": "/packageA/pages/board/depot/vipGrowth/index",
		//门店-会员净增长
		"/bi/board/#/foundation/foundationdepotsalesmansales": "/packageA/pages/board/depot/clerkSaleRank/index",
		//门店-导购排行
		"/bi/board/#/foundation/foundationnationwidewaresalerank": "/packageA/pages/board/nationwide/salesRank/index",
		//全国-商品销售排行
		"/bi/board/#/foundation/foundationdepotwaresalerank": "/packageA/pages/board/depot/salesRank/index",
		//门店-商品销售排行
		"/bi/board/#/foundation/foundationareawaresalerank": "/packageA/pages/board/area/salesRank/index",
		 //区域-商品销售排行
		"/report/fixed/#/chwechats/depotsalesanalysis": "/packageA/pages/board/depotanalysis", 
		//单店分析
		"/report/fixed/#/chwechats/stylesalesrank": "/packageA/pages/board/goodsrank", 
		//商品排行
		
		"/report/fixed/#/chwechats/salesanalysis": "/packageA/pages/board/salesanalysis" ,//销售分析
		//店铺报表
		"/report/fixed/#/chwechats/vipportrait":"/packageA/pages/board/portrayal",
		//会员画像
		"/report/fixed/#/chwechats/vipoverview":"/packageA/pages/board/overview",
		//会员概况
		"/retail/bills/#/retails/retailmenu":"/packageA/pages/clerk/myvips/bills/index",
		//单据中心
		"/retail/retaildepots/clerklist/clerk/retailmainandsub":"/packageA/pages/clerk/myvips/bills/retails/index",
		//零售单
		"/retail/ocorderdepots/app/pick/page/query":"/packageA/pages/clerk/myvips/bills/ocoreder/index",
		//全渠道订单中心
		"/retail/bills/#/retails/retailsharedayachievement":"/packageA/pages/clerk/sales/index",
		//销售圈
		"/vip/archives/#/vipusernew/vipstudyhome":"/packageA/pages/clerk/studyland/index",
		//学习园地
		"/retail/bills/#/promotions/promotionapp":"/packageA/pages/clerk/promotion/index",
		//查促销
		"/vip/bills/#/vipbillapplys/vipapplyapprove":"/packageA/pages/clerk/myvips/apply/approve",
		//会员申请审批
		"/bills/business/#/dayguideusersalestargets/dayguideusersalestargetapp":"/packageA/pages/clerk/target/index"
		//指标查询
	},
	url(e) {
		if (typeof(e) == 'object') {
			e = util.pdata(e).url;
		}
		var p = "";
		var path = "";
		if (/^\/pages\/.*/.test(e) || /^\/packageA\/pages\/.*/.test(e)) {
			path = e;
		} else {
			var s = e.split("?");
			if (s.length == 2) {
				e = s[0];
				p = s[1];
			}
			path = this.menus[e];
		}
		if (!path) {
			util.toast(`菜单${e}未定义`);
			return;
		}
		var fullurl = p ? path + "?" + p : path;
		router.go(fullurl);
	},
	setGlobalMethodUrl(obj) {
		var that = this;
		if (!obj.url) {
			obj.url = function(e) {
				var pdata = util.pdata(e);
				that.url(pdata.url);
			};
		}
	},
	//添加全局方法
	setGlobalMethod(obj) {
		this.setGlobalMethodUrl(obj);
	}
};
