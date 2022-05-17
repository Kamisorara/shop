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
export function regiser(data) {
	return axios
		.post("/user/register?" + this.qs.stringify(data))
}

//发送注册邮件
export function sendEmail(data) {
	return axios
		.post("/user/verify-code?" + "email=" + data)
}
