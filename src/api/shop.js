import axios from '@/axios'
import qs from 'qs'

//推荐商品列表
export function getRecommended() {
	return axios
		.get("/uni-shop/index/get-index-commodities");
}
//商品分类列表
export function getAllClassification() {
	return axios
		.get("/shop/index/classification");
}
//获取公告板
export function getNotice() {
	return axios
		.get("/shop/index/notice-board");
}

//根据id获取商品详细信息
export function getCommodityDetails(id) {
	return axios
		.post("/shop/index/commodities?id=" + id);
}


//根据id获取店家信息
export function getSellerDetails(id) {
	return axios
		.post("/shop/index/seller?id=" + id);
}


//获取轮播图图片
export function getAllSwiperPicture() {
	return axios
		.get('/uni-shop/index/getSwiperPicture');
}


//根据type获取商品列表
export function getCommodityByType(type) {
	return axios
		.get('/uniapp-detail/get-commodity-type' + '?type=' + type);
}
