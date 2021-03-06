//axios全局拦截器
import axios from "axios";
import Element from 'element-ui' //需要进行弹窗
import router from './router' //肯定需要重定向

axios.defaults.baseURL = "http://192.168.31.174:8081" //定义全局端口

//创建axios对象
const request = axios.create({
	timeout: 20000,
	headers: {
		'Content-Type': "application/json; charset=utf-8"
	}
})

//请求头添加token
request.interceptors.request.use(config => {
	if (localStorage.getItem("token") != null) {
		config.headers['token'] = localStorage.getItem("token")
	}
	return config;
})


request.interceptors.response.use(response => {
	//先获取结果
	let res = response.data;
	// Do something before response is sent
	if (res.code === 200) {
		return response;
	} else {
		//下面的那个语句有个bug,暂时先用这个代替先
		if (res.msg) {
			Element.Message.error(res.msg);
		}
		// Element.Message.error(res.msg ? "系统异常!":res.msg );//获取异常信息就弹个窗
		return Promise.reject(response.data.msg); //告诉拒绝的原因
	}
}, error => {
	// Do something with response error
	if (error.response.data) {
		error.Message = error.response.data.msg;
	}

	if (error.response.status === 401) {
		router.push("/");
	}


	Element.Message.error(error.Message, {
		duration: 3000
	}) //三秒延迟

	return Promise.reject(error);
});

//最后要暴露出去
export default request;
