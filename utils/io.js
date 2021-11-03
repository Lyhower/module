const h5FileSystem = {
	requestFile(path) {
		console.log(path);
		return require(path);
	}
}
const appFileSystem = {}
const mpFileSystem = {
	requestFile(path) {
		const fs = wx.getFileSystemManager();
		try {
			const res = fs.readFileSync(`${wx.env.USER_DATA_PATH}/${path}`, 'utf8', 0)
			return res
		} catch (e) {
			console.error(e)
		}
	}
}
export default {
	/**
	 * 读取文件内容
	 * @param {Object} path 文件路径
	 * @rerurn {String}
	 */
	requestFile(path) {
		//#ifdef APP-PLUS
		return appFileSystem.requestFile(path);
		//#endif
		//#ifdef H5
		return h5FileSystem.requestFile(path);
		//#endif
		//#ifdef MP
		return mpFileSystem.requestFile(path);
		//#endif
	}
}
