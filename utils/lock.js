export default {
	_lockMap: undefined,

	/**
	 * 对一个对象加锁
	 * @param {Object} obj
	 * @param {number} count
	 */
	lock(obj, count = 15) {
		var that = this;
		if (!this._lockMap) {
			this._lockMap = new Map();
		}
		return new Promise((a, b) => {
			var checkcnt = 0;
			var time = new Date().getTime() / 1000;
			var check = () => {
				var t = that._lockMap.get(obj);
				if (t && time - t > 30) {
					t = 0;
				}
				if (!t) {
					that._lockMap.set(obj, time);
					a(true);
					return;
				}
				if (checkcnt > count) {
					a(false);
				} else {
					checkcnt++;
					setTimeout(() => {
						check();
					}, 1000);
				}
			};
			check();
		});
	},

	/**
	 * 解除对象锁
	 * @param {Object} obj
	 */
	unlock(obj) {
		//debugger;
		this._lockMap.delete(obj);
	}

};
