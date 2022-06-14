<template>
	<div class="main">
		<el-container>
			<el-aside width="200px">
				<!-- 商品分类 -->
				<el-card class="box-card">
					<div slot="header" class="clearfix"><span style="font-size: 20px;font-weight: 700;">商品分类</span></div>
					<div v-for="(item, index) in calssifications" :key="index" class="text item">
						<el-link>
							<i :class="item.icon"></i>
							<a href="#" style="text-decoration: none; color:#949494" @click="toSearch(item.classificationName)">{{ item.classificationName }}</a>
						</el-link>
					</div>
				</el-card>
			</el-aside>
			<el-main>
				<el-carousel indicator-position="outside" style="border-radius: 30px;">
					<el-carousel-item v-for="(item, index) in imagesbox" :key="index"><img :src="item" class="image" height="400" width="760" /></el-carousel-item>
				</el-carousel>
			</el-main>
			<el-aside width="300px">
				<!-- 未登录 -->
				<div v-show="!isLogin">
					<div class="demo-type">
						<div><el-avatar icon="el-icon-user-solid"></el-avatar></div>
					</div>
					<el-button type="text" @click="toLogin">请登录</el-button>
				</div>
				<!-- 已登录 -->
				<div v-show="isLogin">
					<div class="demo-type">
						<div><el-avatar :src="userHead"></el-avatar></div>
					</div>
					<p style="font-size: 20px">Hi,{{ userName }}</p>
				</div>
				<!-- 新闻公告板 -->
				<el-card class="box-card" style="width: 290px;">
					<div slot="header" class="clearfix"><span style="font-size: 18px;font-weight: 600;">新闻公告板</span></div>
					<div v-for="(item, index) in noticed" :key="index" class="board_item">
						<el-link type="info" :href="item.url">● {{ item.notice }}</el-link>
					</div>
				</el-card>
			</el-aside>
		</el-container>
		<!-- 今日推荐 -->
		<div style="height: 100px;display: flex;border-top: 1px solid #b8b8b8;border-left: 1px solid #b8b8b8;border-right: 1px solid #b8b8b8;margin-top: 70px;">
			<div class="content-head" style="display: flex;border-bottom: 3px solid;height: 80px;width: 600px;">
				<span style="font-size: 35px;margin-left: 20px;margin-top: 20px;font-weight: 700;">今日相机推荐</span>
				<el-tag type="danger" style="margin-top: 30px;margin-left: 10px;">个性推荐</el-tag>
			</div>
			<div
				v-on:mouseenter="changeCategory(index, item.type)"
				v-for="(item, index) in categoryList"
				:key="index"
				:class="{ 'border-category-selected': index == currentNum, 'border-category-unselected': index != currentNum }"
				style="margin-top: 19px;height:60px;width: 104px;display: flex;"
			>
				<el-link :underline="false" style="font-size: 19px;margin: auto;" @click="toSearch(item.name)">{{ item.name }}</el-link>
			</div>
		</div>
		<!-- 商品列表 -->
		<div class="content" style="border:1px solid #b8b8b8;">
			<div class="show" v-for="(product, index) in products" :key="index" @click="toDetail(product.id)">
				<div class="imgbg">
					<el-image :src="product.mainPhoto" style="height: 200px; width: 200px;border-top-left-radius: 15px;border-top-right-radius: 15px;"></el-image>
				</div>
				<div class="price" style="font-size: 20px; margin-left: 15px">¥{{ product.originalPrice }}</div>
				<div class="store">{{ product.shopName | ellipsis }}</div>
				<div class="detail" style="display: flex;">
					<div class="details">
						月成交
						<mark>{{ product.sell }}笔</mark>
					</div>
					<div class="details">
						评价
						<span>{{ product.mark }}</span>
					</div>
				</div>
			</div>
		</div>
		<el-image :src="advertise" style="width:100%;height: 100%;"></el-image>
		<!-- 所有商品 -->
		<div class="allCommodity" style="display: flex;height: 80px;margin-top: 20px;border: 1px solid #b83923;">
			<span style="font-size: 30px; font-weight: 600;margin-top: 20px;margin-left: 20px;">看看全部商品吧！</span>
			<span style="font-size: 20px;color: brown;font-weight: 600;margin-left: 800px;margin-top: 30px;">共（{{ pageMessage.total }}）件</span>
		</div>
		<div class="content" style="border:1px solid #c05f47;">
			<div class="show" v-for="(product, index) in pageMessage.records" :key="index" @click="toDetail(product.id)">
				<div class="imgbg">
					<el-image :src="product.mainPhoto" style="height: 200px; width: 200px;border-top-left-radius: 15px;border-top-right-radius: 15px;"></el-image>
				</div>
				<div class="price" style="font-size: 20px; margin-left: 15px">¥{{ product.originalPrice }}</div>
				<div class="store">{{ product.shopName | ellipsis }}</div>
				<div class="detail" style="display: flex;">
					<div class="details">
						月成交
						<mark>{{ product.sell }}笔</mark>
					</div>
					<div class="details">
						评价
						<span>{{ product.mark }}</span>
					</div>
				</div>
			</div>
		</div>
		<!-- 底部分页栏 -->
		<div class="block" style="margin-left: 350px;margin-top: 30px;">
			<el-pagination
				@current-change="handleCurrentChange(pageNum)"
				:current-page.sync="pageNum"
				:page-size="20"
				layout="prev, pager, next, jumper"
				:total="pageMessage.total"
			></el-pagination>
		</div>
	</div>
</template>

<script>
import { getUser, getUserHead } from '@/api/user';
import { getCommodityPage, getRecommended, getAllClassification, getNotice, getAllSwiperPicture, getCommodityByType, getCommodityByTypeLimited } from '@/api/shop';
export default {
	name: 'commodity',
	data() {
		return {
			isLogin: false,
			userName: '',
			userId: '',
			userHead: '',
			//page
			pageSize: 6, //每页加载的个数
			pageNum: 1, //当前的页数
			totalPages: 0, //总页数
			pageMessage: {},
			fullscreenLoading: false,
			//当前位置
			currentNum: 0,
			//长条广告
			advertise: 'https://img.alicdn.com/tps/i4/TB1xcK0GXXXXXXTXFXXa3f9HXXX-990-50.jpeg',
			noticed: [
				{
					notice: '等待网络链接中。。。',
					url: ''
				}
			],
			imagesbox: [],
			products: [
				{
					id: 1111,
					originalPrice: 9999,
					shopName: '探碗揽月',
					mainPhoto: '',
					sell: 9999,
					mark: 9999
				}
			],
			Allproducts: [
				{
					id: 1111,
					originalPrice: 9999,
					shopName: '探碗揽月',
					mainPhoto: '',
					sell: 9999,
					mark: 9999
				}
			],
			calssifications: [
				{
					id: '123123',
					icon: 'el-icon-shopping-cart-full',
					classificationName: 'xxxx'
				}
			],
			categoryList: [
				{
					id: 1,
					name: '单反相机',
					type: '单反相机'
				},
				{
					id: 2,
					name: '数码相机',
					type: '数码相机'
				},
				{
					id: 3,
					name: '拍立得',
					type: '拍立得'
				},
				{
					id: 5,
					name: '旁轴相机',
					type: '旁轴相机'
				},
				{
					id: 6,
					name: '单电/微单',
					type: '微单'
				},
				{
					id: 7,
					name: '特殊相机',
					type: '特殊相机'
				}
			]
		};
	},
	methods: {
		//商品详情界面
		toDetail(shop_id) {
			if (this.isLogin) {
				this.openFullScreen();
				this.$router.push({
					path: '/details',
					query: {
						id: shop_id
					}
				});
			} else {
				this.$message({
					message: '登陆后再试！',
					type: 'error'
				});
				setTimeout(() => {
					this.$router.push('/login');
				}, 1000);
			}
		},
		//获取用户头像
		getUserHeadById() {
			getUserHead(this.userId).then(res => {
				console.log(res);
			});
		},
		//分页栏切换
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.getCommodityPages(val++);
		},
		//商品分页获取商品列表
		getCommodityPages(pageNum) {
			getCommodityPage(pageNum, 20).then(res => {
				console.log(res);
				this.pageMessage = res.data.data;
			});
		},
		//登录界面
		toLogin() {
			this.$router.push('/login');
		},
		//搜索界面（分类界面）
		toSearch(name) {
			this.$router.push({
				path: '/search',
				query: { classifyName: name }
			});
		},
		//获取所有推荐商品
		getAllRecommended() {
			getRecommended()
				.then(res => {
					console.log(res);
					this.Allproducts = res.data.data;
				})
				.catch(err => {
					console.error(err);
				});
		},
		//获取左侧分类板块
		getClassification() {
			getAllClassification()
				.then(res => {
					console.log(res);
					this.calssifications = res.data.data;
				})
				.catch(err => {
					console.error(err);
				});
		},
		//获取新闻板块
		getAllNotice() {
			getNotice()
				.then(res => {
					console.log(res);
					this.noticed = res.data.data;
				})
				.catch(err => {
					console.error(err);
				});
		},
		//获取用户信息（登录并且有token条件下）
		getUserInfo() {
			if (localStorage.getItem('token') != null) {
				getUser()
					.then(res => {
						console.log(res);
						if (res.data.code === 200) {
							this.isLogin = true;
							this.userName = res.data.data[1];
							this.userId = res.data.data[0];
							//获取用户通过token验证后获取头像
							getUserHead(res.data.data[0]).then(resp => {
								console.log(resp);
								this.userHead = resp.data.data;
							});
						}
					})
					.catch(err => {
						console.error(err);
					});
			}
		},
		//全屏加载画面
		openFullScreen() {
			const loading = this.$loading({
				lock: true,
				text: '加载中，请耐心等待！',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			setTimeout(() => {
				loading.close();
			}, 500);
		},
		//获取轮播图
		getAllSwiperPictures() {
			getAllSwiperPicture().then(res => {
				console.log(res);
				this.imagesbox = res.data.data;
			});
		},
		//导航栏动态切换
		changeCategory(index, type) {
			this.currentNum = index;
			this.getCommodityTypeLimitedTen(type);
		},
		//根据type类型获取商品列表（在首页中考虑弃用）
		getCommodityType(type) {
			getCommodityByType(type).then(res => {
				console.log(res);
				this.products = res.data.data;
			});
		},
		//根据type类型获取商品列表数量限制10
		getCommodityTypeLimitedTen(type) {
			getCommodityByTypeLimited(type).then(res => {
				console.log(res);
				this.products = res.data.data;
			});
		}
	},
	mounted() {
		// this.getAllRecommended();
		this.getClassification();
		this.getAllNotice();
		this.getUserInfo();
		this.getAllSwiperPictures();
		this.getCommodityTypeLimitedTen('单反相机');
		this.getCommodityPages(1);
	},
	//过滤器，字数长度超过12直接省略
	filters: {
		ellipsis(value) {
			if (!value) return '';
			if (value.length > 12) {
				return value.slice(0, 12) + '...';
			}
			return value;
		}
	}
};
</script>
<style scoped>
/* 今日推荐选中状态 */
.border-category-selected {
	font-family: 'Lucida Calligraphy', cursive, serif, sans-serif;
	background-color: #fafafa;
	border-top: 3px solid #000000;
	border-left: 3px solid #000000;
	border-right: 3px solid #000000;
}
/* 今日推荐未选中状态 */
.border-category-unselected {
	font-family: 'Lucida Calligraphy', cursive, serif, sans-serif;
	background-color: #efefef;
	border: 1px solid #b8b8b8;
	border-bottom: 3px solid #000000;
}
.board_item {
	text-align: left;
	font-size: 15px;
}

/* 头像 */
.demo-type {
	margin-top: 60px;
}

.text {
	font-size: 14px;
}

.item {
	margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
	display: table;
	content: '';
}

.clearfix:after {
	clear: both;
}

.box-card {
	width: 190px;
}

.el-aside {
	color: #333;
	text-align: center;
}

.el-main {
	background-color: #f7f9fa;
	color: #333;
	text-align: center;
	line-height: 60px;
}

/* ----- */
.main {
	width: 1250px;
	margin: 0px auto;
}

div {
	font-size: 12px;
}

.detail {
	font-size: 0px;
	background: url(#) no-repeat 190px center;
}

.details {
	display: inline-block;
	padding-right: 13px;
	border-right: 1px solid #e6e6e6;
	text-align: center;
	text-indent: 1.2em;
}

.show {
	width: 200px;
	display: inline-block;
	margin-left: 40px;
	margin-bottom: 20px;
	background-color: #eceff1;
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
	margin-top: 25px;
	border: 1px solid #b8b8b8;
}

.content {
	font-size: 0px;
	margin-bottom: 10px;
}

.price {
	font-size: 16px;
	color: red;
	font-weight: bold;
}

.store {
	color: #7f7f7f;
	text-decoration: underline;
	margin-bottom: 5px;
	font-size: 15px;
}

mark {
	background-color: transparent;
	color: #e5c45a;
}

.el-carousel__item h3 {
	color: #475669;
	font-size: 18px;
	opacity: 0.75;
	line-height: 300px;
	margin: 0;
}
</style>
