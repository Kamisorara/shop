<template>
	<div id="search">
		<el-container>
			<el-header>
				<div class="shop-title-main">
					<div class="shop-title">
						<el-button type="danger">所有宝贝</el-button>
						<el-button type="danger" plain style="margin-left: 0;">官方自营</el-button>
						<el-button type="danger" plain style="margin-left: 0;">二手海鲜市</el-button>
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
					<el-button type="info" plain>综合排序</el-button>
					<el-button type="info" style="margin-left: 0;">销量</el-button>
					<el-button type="info" style="margin-left: 0;">信用</el-button>
					<el-dropdown>
						<span class="el-dropdown-link">
							价格
							<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>从高到低</el-dropdown-item>
							<el-dropdown-item>从低到高</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
				<div class="shop-main">
					<div class="content">
						<el-row>
							<el-col :span="4" v-for="(product, index) in products" :key="index" style="margin-left: 40px;">
								<el-card :body-style="{ padding: '2px' }" style="margin-top: 40px;">
									<el-image :src="product.photoAddr" class="image" @click="toLogin()"></el-image>
									<div style="padding:0px;">
										<div>
											<span style="font-size: 20px;color: red;font-weight: 100px;">￥{{ product.price }}</span>
											<span v-show="product.pinkage === 1"><el-tag type="danger" size="mini">包邮</el-tag></span>
											<span style="font-size: 13px;color: #96a3a6;margin-left: 30px;">{{ product.sell }}人付款</span>
										</div>
										<span style="font-size: 13px;">
											<el-link target="_blank" @click="toLogin()">{{ product.shopName }}</el-link>
										</span>
										<div class="bottom clearfix" style="font-size: 13px;">
											<span><i class="el-icon-shopping-bag-1"></i></span>
											<span>
												<el-link type="info" @click="toLogin()">{{ product.seller }}</el-link>
											</span>
										</div>
									</div>
								</el-card>
							</el-col>
						</el-row>
					</div>
				</div>
			</el-main>
			<el-footer>
				<div class="block" style="margin-top: 60px;">
					<el-pagination
						@size-change="handleSizeChange()"
						@current-change="handleCurrentChange()"
						:current-page.sync="currentPage1"
						:page-size="100"
						layout="prev, pager, next, jumper"
						:total="1000"
					></el-pagination>
				</div>
			</el-footer>
		</el-container>
	</div>
</template>

<script>
export default {
	name: 'search',
	data() {
		return {
			//当前页
			currentPage1: 1,
			products: [
				{
					id: 1111,
					price: 9999,
					shopName: 'MSI/微星RTX 3060',
					photoAddr: 'https://picasso.alicdn.com/imgextra/O1CNA1sEwl0E2LllfJsa4oW_!!2133729733-0-psf.jpg_580x580Q90.jpg_.webp',
					sell: 9999999,
					mark: 9999,
					seller: 'Kamisra官方自营店',
					pinkage: 1
				},
				{
					id: 1111,
					price: 9999,
					shopName: 'MSI/微星RTX 3060',
					photoAddr: 'https://picasso.alicdn.com/imgextra/O1CNA1sEwl0E2LllfJsa4oW_!!2133729733-0-psf.jpg_580x580Q90.jpg_.webp',
					sell: 999999,
					mark: 9999,
					seller: 'Kamisra官方自营店',
					pinkage: 1
				},
				{
					id: 1111,
					price: 9999,
					shopName: 'MSI/微星RTX 3060',
					photoAddr: 'https://picasso.alicdn.com/imgextra/O1CNA1sEwl0E2LllfJsa4oW_!!2133729733-0-psf.jpg_580x580Q90.jpg_.webp',
					sell: 999999,
					mark: 9999,
					seller: 'Kamisra官方自营店',
					pinkage: 1
				},
				{
					id: 1111,
					price: 9999,
					shopName: 'MSI/微星RTX 3060',
					photoAddr: 'https://picasso.alicdn.com/imgextra/O1CNA1sEwl0E2LllfJsa4oW_!!2133729733-0-psf.jpg_580x580Q90.jpg_.webp',
					sell: 999999,
					mark: 9999,
					seller: 'Kamisra官方自营店',
					pinkage: 1
				},
				{
					id: 1111,
					price: 9999,
					shopName: 'MSI/微星RTX 3060',
					photoAddr: 'https://picasso.alicdn.com/imgextra/O1CNA1sEwl0E2LllfJsa4oW_!!2133729733-0-psf.jpg_580x580Q90.jpg_.webp',
					sell: 999999,
					mark: 9999,
					seller: 'Kamisra官方自营店',
					pinkage: 1
				},
				{
					id: 1111,
					price: 9999,
					shopName: 'MSI/微星RTX 3060',
					photoAddr: 'https://picasso.alicdn.com/imgextra/O1CNA1sEwl0E2LllfJsa4oW_!!2133729733-0-psf.jpg_580x580Q90.jpg_.webp',
					sell: 999999,
					mark: 9999,
					seller: 'Kamisra官方自营店',
					pinkage: 1
				},
				{
					id: 1111,
					price: 9999,
					shopName: 'MSI/微星RTX 3060',
					photoAddr: 'https://picasso.alicdn.com/imgextra/O1CNA1sEwl0E2LllfJsa4oW_!!2133729733-0-psf.jpg_580x580Q90.jpg_.webp',
					sell: 999999,
					mark: 9999,
					seller: 'Kamisra官方自营店',
					pinkage: 1
				},
				{
					id: 1111,
					price: 9999,
					shopName: 'MSI/微星RTX 3060',
					photoAddr: 'https://picasso.alicdn.com/imgextra/O1CNA1sEwl0E2LllfJsa4oW_!!2133729733-0-psf.jpg_580x580Q90.jpg_.webp',
					sell: 999999,
					mark: 9999,
					seller: 'Kamisra官方自营店',
					pinkage: 1
				},
				{
					id: 1111,
					price: 9999,
					shopName: 'MSI/微星RTX 3060',
					photoAddr: 'https://picasso.alicdn.com/imgextra/O1CNA1sEwl0E2LllfJsa4oW_!!2133729733-0-psf.jpg_580x580Q90.jpg_.webp',
					sell: 999999,
					mark: 9999,
					seller: 'Kamisra官方自营店',
					pinkage: 1
				},
				{
					id: 1111,
					price: 9999,
					shopName: 'MSI/微星RTX 3060',
					photoAddr: 'https://picasso.alicdn.com/imgextra/O1CNA1sEwl0E2LllfJsa4oW_!!2133729733-0-psf.jpg_580x580Q90.jpg_.webp',
					sell: 999999,
					mark: 9999,
					seller: 'Kamisra官方自营店',
					pinkage: 1
				},
				{
					id: 1111,
					price: 9999,
					shopName: 'MSI/微星RTX 3060',
					photoAddr: 'https://picasso.alicdn.com/imgextra/O1CNA1sEwl0E2LllfJsa4oW_!!2133729733-0-psf.jpg_580x580Q90.jpg_.webp',
					sell: 999999,
					mark: 9999,
					seller: 'Kamisra官方自营店',
					pinkage: 1
				},
				{
					id: 1111,
					price: 9999,
					shopName: 'MSI/微星RTX 3060',
					photoAddr: 'https://picasso.alicdn.com/imgextra/O1CNA1sEwl0E2LllfJsa4oW_!!2133729733-0-psf.jpg_580x580Q90.jpg_.webp',
					sell: 999999,
					mark: 9999,
					seller: 'Kamisra官方自营店',
					pinkage: 1
				},
				{
					id: 1111,
					price: 9999,
					shopName: 'MSI/微星RTX 3060',
					photoAddr: 'https://picasso.alicdn.com/imgextra/O1CNA1sEwl0E2LllfJsa4oW_!!2133729733-0-psf.jpg_580x580Q90.jpg_.webp',
					sell: 999999,
					mark: 9999,
					seller: 'Kamisra官方自营店',
					pinkage: 1
				},
				{
					id: 1111,
					price: 9999,
					shopName: 'MSI/微星RTX 3060',
					photoAddr: 'https://picasso.alicdn.com/imgextra/O1CNA1sEwl0E2LllfJsa4oW_!!2133729733-0-psf.jpg_580x580Q90.jpg_.webp',
					sell: 999999,
					mark: 9999,
					seller: 'Kamisra官方自营店',
					pinkage: 1
				},
				{
					id: 1111,
					price: 9999,
					shopName: 'MSI/微星RTX 3060',
					photoAddr: 'https://picasso.alicdn.com/imgextra/O1CNA1sEwl0E2LllfJsa4oW_!!2133729733-0-psf.jpg_580x580Q90.jpg_.webp',
					sell: 999999,
					mark: 9999,
					seller: 'Kamisra官方自营店',
					pinkage: 1
				}
			],
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
								{
									value: 'fankui',
									label: '反馈'
								},
								{
									value: 'xiaolv',
									label: '效率'
								},
								{
									value: 'kekong',
									label: '可控'
								}
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
								{
									value: 'dingbudaohang',
									label: '顶部导航'
								}
							]
						}
					]
				}
			]
		};
	},
	methods: {
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
		//登录界面
		toLogin() {
			this.$router.push('/login');
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
</style>
