exports.numFormat = (value) => {
	if (parseFloat(value).toString() == "NaN") {
		if (typeof(value) === 'string') {
			return value
		} else if (typeof(value) === 'undefined') {
			return '';
		} else {
			return '';
		}
	} else {
		if (value == 0) {
			return value
		} else if (value >= 10000) {
			if (value % 10000 === 0) {
				var nums = value / 10000 + "万";
				return nums
			} else {
				var nums = (value / 10000).toFixed(2) + "万";
				return nums
			}
		} else if (value < -10000) {
			if (value % 10000 === 0) {
				var nums = value / 10000 + "万";
				return nums
			} else {
				var nums = (value / 10000).toFixed(2) + "万";
				return nums
			}
		} else if (value % 1 === 0) {
			value = value.toFixed(0)
			return value;
		} else {
			value = value.toFixed(2)
			return value;
		}
	}
}

//非常用数值规范
exports.unNumFormat = (value) => {
	if (parseFloat(value).toString() == "NaN") {
		if (typeof(value) === 'string') {
			return value
		} else if (typeof(value) === 'undefined') {
			return 0;
		} else {
			return 0;
		}
	} else {
		return value
	}
}

//常用表格数值规范
exports.tableNumFormat = (value) => {
	if (parseFloat(value).toString() == "NaN") {
		if (typeof(value) === 'string') {
			return value
		} else if (typeof(value) === 'undefined') {
			return '';
		} else {
			return value;
		}
	} else {
		if (typeof(value) == 'string') {
			if (value.search("%") != -1) {
				if (value == '0%') {
					return '';
				}
				return value
			} else return '';
		} else if (typeof(value) == 'number') {
			if (value == 0) {
				return ''
			} else if (value >= 10000) {
				if (value % 10000 === 0) {
					var nums = value / 10000 + "万";
					return nums
				} else {
					var nums = (value / 10000).toFixed(2) + "万";
					return nums
				}
			} else if (value < -10000) {
				if (value % 10000 === 0) {
					var nums = value / 10000 + "万";
					return nums
				} else {
					var nums = (value / 10000).toFixed(2) + "万";
					return nums
				}
			} else if (value % 1 === 0) {
				value = value.toFixed(0)
				return value;
			} else {
				value = value.toFixed(2)
				return value;
			}
		} else return '';
	}
}
