Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,
    //月份 
    "d+": this.getDate(),
    //日 
    "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
    //小时 
    "H+": this.getHours(),
    //小时 
    "m+": this.getMinutes(),
    //分 
    "s+": this.getSeconds(),
    //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3),
    //季度 
    "S": this.getMilliseconds() //毫秒 

  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }

  return fmt;
}; // 是否今日


Date.prototype.istoday = function () {
  var cdate = new Date();
  return this.getFullYear() == cdate.getFullYear() && this.getMonth() == cdate.getMonth() && this.getDate() == cdate.getDate();
}; //是否昨日


Date.prototype.isyesterday = function () {
  var dd = new Date();
  dd.setDate(dd.getDate() - 1);
  dd.setHours(0);
  dd.setMinutes(0);
  dd.setSeconds(0);
  return this > dd;
};

Date.prototype.format2 = function () {
  if (this.istoday()) {
    return this.format("今日 HH:mm");
  }

  if (this.isyesterday()) {
    return this.format("昨天 HH:mm");
  }

  return this.format("yyyy-MM-dd HH:mm");
};

module.exports = {
  //格式化
  date (timestamp) {
    var date = util.toDate(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000

    date.format("yyyy-MM-dd HH:mm:ss");
  },
  //获取时间戳
  timestamp (date) {
    var times = Math.round(date / 1000);
    return times;
  }
};