let log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null;
var Logs = {
  /**
   * 普通提示
   */
  info() {
    if (!log) {
      return;
    }

    var ret = log.info.apply(log, arguments);
  },

  /**
   * 警告提示
   */
  warn() {
    if (!log) {
      return;
    }

    log.warn.apply(log, arguments);
  },

  /**
   * 错误提示
   */
  error() {
    if (!log) {
      return;
    }

    log.error.apply(log, arguments);
  },

  /**
   * 组合提示
   * @param msg
   */
  setFilterMsg(msg) {
    if (!log || !log.setFilterMsg) {
      return;
    }

    if (typeof msg !== "string") {
      return;
    }

    log.setFilterMsg(msg);
  },

  addFilterMsg(msg) {
    if (!log || !log.addFilterMsg) {
      return;
    }

    if (typeof msg !== "string") {
      return;
    }

    log.addFilterMsg(msg);
  }

};
module.exports = Logs;