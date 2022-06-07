import axios from '@/axios'
import qs from 'qs'
//登录
export function login(data) {
	return axios
		.post("/user/login?" + qs.stringify(data));
}
//根据token获取用户信息
export function getUser() {
	return axios
		.get("/user/user-info");
}
//退出
export function logout() {
	return axios
		.get("/user/logout");
}

//注册
export function register(data) {
	return axios
		.post("/user/register?" + qs.stringify(data))
}

//发送注册邮件
export function sendEmail(data) {
	return axios
		.post("/user/verify-code?" + "email=" + data)
}


//根据id修改用户详细信息
export function updateUserMessage(data) {
	return axios
		.post("/user/userDetail-post", data)
}


//根据id获取用户详细信息
export function getUserDetailMessage(id) {
	return axios
		.post("/user/user-info-detail-get?userId=" + id)
}
