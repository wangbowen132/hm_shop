const BASE_URL = 'http://localhost:3000'

export const myRequest = ({ url, method, success }) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			method: method || 'GET',
			success: (res) => {
				resolve(res);
			}
		});
	}).then((res) => {
		success(res);
	});
}