<template>
	<div id="search">
		<el-container>
			<el-header>
				<div class="shop-title-main">
					<div class="shop-title">
						<div style="background: #f40;width: 100px;color: white;font-weight: 700;"><span>所有宝贝</span></div>
						<div class="shop-title-head"><span>官方自营</span></div>
						<div class="shop-title-head"><span>二手海鲜市</span></div>
						<el-cascader :options="options" style="margin-left: 850px;">
							<template slot-scope="{ node, data }">
								<span>{{ data.label }}</span>
								<span v-if="!node.isLeaf">({{ data.children.length }})</span>
							</template>
						</el-cascader>
					</div>
				</div>
			</el-header>
			<el-main>
				<div class="all-shop" style="border:2px solid #e3dddb;display: flex;">
					<div style="width: 100px;height: 40px;display: flex;"><span style="margin-top: 15px;margin-left: 17px;font-weight: 600;">综合排序</span></div>
					<div class="shop-title-foot"><span style="margin-top: 15px;margin-left: 17px;font-weight: 600;">销量</span></div>
					<div class="shop-title-foot"><span style="margin-top: 15px;margin-left: 17px;font-weight: 600;">店铺评分</span></div>
					<el-dropdown style="margin-left: 30px;margin-top: 15px;">
						<span class="el-dropdown-link" style="font-weight: 600;">
							价格
							<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>从高到低</el-dropdown-item>
							<el-dropdown-item>从低到高</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
				<!-- 标签（当前内容） -->
				<div class="shop-main">
					<el-image :src="advertise" style="width:100%;height: 100%;"></el-image>
					<div style="background-color: #e7e7e7; height: 100px;margin-top: 20px;border:1px solid #b8b8b8;display: flex;">
						<div style="font-size: 30px;margin-top: 25px;margin-left: 50px;">
							<i class="el-icon-shopping-cart-1"></i>
							<span>当前内容:</span>
							<span style="margin-left: 20px;font-weight: 600;">{{ queryParm }}</span>
						</div>
						<div style="margin-left: 800px;margin-top: 25px;">
							<span style="font-size: 30px;font-weight: 700;">共({{ pageMessage.total }})件</span>
						</div>
					</div>
					<el-empty v-if="pageMessage.total === 0" description="暂时没有这种商品喔"></el-empty>
					<div class="content" style="display: flex;flex-wrap: wrap;border:1px solid #b8b8b8;margin-top: 25px;">
						<!-- 商品模块（列表） -->
						<div v-for="(product, index) in pageMessage.records" :key="index" style="width: 240px;height: 400px;margin-left: 80px;">
							<el-card :body-style="{ padding: '2px' }" style="margin-top: 30px;">
								<el-image :src="product.mainPhoto" class="image" @click="toLogin()"></el-image>
								<div style="padding:0px;">
									<div>
										<span style="font-size: 20px;color: red;font-weight: 100px;">￥{{ product.originalPrice }}</span>
										<span v-show="product.pinkage === 1"><el-tag type="danger" size="mini">包邮</el-tag></span>
										<span style="font-size: 13px;color: #96a3a6;margin-left: 30px;">{{ product.sell }}人付款</span>
									</div>
									<span style="font-size: 13px;">
										<el-link target="_blank" @click="toLogin()">{{ product.shopName | ellipsis }}</el-link>
									</span>
									<div class="bottom clearfix" style="font-size: 13px;">
										<span><i class="el-icon-shopping-bag-1"></i></span>
										<span><el-link type="info" @click="toLogin()">Kamisora官方店</el-link></span>
									</div>
								</div>
							</el-card>
						</div>
					</div>
				</div>
			</el-main>
			<el-footer>
				<div class="block" style="margin-top: 60px;">
					<el-pagination
						@current-change="handleCurrentChange(pageNum)"
						:current-page.sync="pageNum"
						:page-size="8"
						layout="prev, pager, next, jumper"
						:total="pageMessage.total"
					></el-pagination>
				</div>
			</el-footer>
		</el-container>
	</div>
</template>

<script>
import { getCommodityByType, getCommodityTypePage } from '@/api/shop';
export default {
	name: 'search',
	data() {
		return {
			//当前页面查询数据
			queryParm: '',
			//page
			pageSize: 6, //每页加载的个数
			pageNum: 1, //当前的页数
			totalPages: 0, //总页数
			pageMessage: {},
			//titile广告
			advertise: 'https://img.alicdn.com/tps/i4/TB1xcK0GXXXXXXTXFXXa3f9HXXX-990-50.jpeg',
			products: [],
			options: [
				{
					value: 'zhinan',
					label: '指南',
					children: [
						{
							value: 'shejiyuanze',
							label: '设计原则',
							children: [
								{
									value: 'yizhi',
									label: '一致'
								},
							]
						},
						{
							value: 'daohang',
							label: '导航',
							children: [
								{
									value: 'cexiangdaohang',
									label: '侧向导航'
								},
							]
						}
					]
				}
			]
		};
	},
	methods: {
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.getCommodityTypePages(val++);
		},
		//获取url参数
		getQueryParm() {
			this.queryParm = this.$route.query.classifyName;
		},
		//登录界面
		toLogin() {
			this.$router.push('/login');
		},
		//根据type类型获取商品列表（在首页中考虑弃用）
		getCommodityType(type) {
			getCommodityByType(type).then(res => {
				console.log(res);
				this.products = res.data.data;
			});
		},
		//根据商品type类型分页获取商品列表
		getCommodityTypePages(pageNum) {
			getCommodityTypePage(this.queryParm, pageNum, 8).then(res => {
				console.log(res);
				this.pageMessage = res.data.data;
			});
		}
	},
	mounted() {
		this.getQueryParm();
		this.getCommodityTypePages(1);
	},
	//过滤器，字数长度超过16直接省略
	filters: {
		ellipsis(value) {
			if (!value) return '';
			if (value.length > 16) {
				return value.slice(0, 16) + '...';
			}
			return value;
		}
	}
};
</script>

<style scoped>
/* -- */
.time {
	font-size: 13px;
	color: #999;
}

.bottom {
	margin-top: 20px;
	line-height: 12px;
}

.button {
	padding: 0;
	float: right;
}

.image {
	width: 100%;
	display: block;
}

.clearfix:before,
.clearfix:after {
	display: table;
	content: '';
}

.clearfix:after {
	clear: both;
}
/* -- */
#search {
	width: 1400px;
	margin: 0px auto;
}
.el-header,
.el-footer {
	color: #333;
	text-align: center;
	line-height: 60px;
}
.el-main {
}
.shop-title-main {
	background-color: #f5f5f5;
	border-bottom: 5px solid #ff0000;
}
.shop-title {
	display: flex;
}
.all-shop {
	background-color: #f5f5f5;
	display: flex;
}
.shop-main {
}
.shop-title-head {
	background-color: #f5f5f5;
	width: 100px;
}

.shop-title-head:hover {
	background: #f40;
	width: 100px;
	color: white;
	font-weight: 700;
}
.shop-title-foot {
	display: flex;
	background: #96a3a6;
	width: 100px;
	height: 50px;
}

.shop-title-foot:hover {
	display: flex;
	background-color: #f5f5f5;
	width: 100px;
	height: 50px;
}
</style>
