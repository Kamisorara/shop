<template>
	<div class="main">
		<el-container>
			<el-aside width="200px">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span style="font-size: 20px">商品分类</span>
					</div>
					<div v-for="(item, index) in calssifications" :key="index" class="text item">
						<i :class="item.icon"></i>
						<a href="#" style="text-decoration: none; color: darkgrey">{{
              item.classificationName
            }}</a>
					</div>
				</el-card>
			</el-aside>
			<el-main>
				<el-carousel indicator-position="outside" style="border-radius: 30px;">
					<el-carousel-item v-for="(item, index) in imagesbox" :key="index">
						<img :src="item.idView" class="image" />
					</el-carousel-item>
				</el-carousel>
			</el-main>
			<el-aside width="200px">
				<div v-show="!isLogin">
					<div class="demo-type">
						<div>
							<el-avatar icon="el-icon-user-solid"></el-avatar>
						</div>
					</div>
					<el-button type="text" @click="toLogin">请登录</el-button>
				</div>
				<div v-show="isLogin">
					<div class="demo-type">
						<div>
							<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
							</el-avatar>
						</div>
					</div>
					<p style="font-size: 20px">Hi,{{ userName }}</p>
				</div>

				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>公告板</span>
					</div>
					<div v-for="(item, index) in noticed" :key="index" class="board_item">
						<a href="#" style="text-decoration: none; color: darkgrey">{{
              item.notice
            }}</a>
					</div>
				</el-card>
			</el-aside>
		</el-container>
		<div class="content">
			<div class="show" v-for="(product, index) in products" :key="index" @click="toDetail(product.id)">
				<div class="imgbg">
					<el-image :src="product.photoAddr" style="height: 180px; width: 200px; margin-top: 30px"></el-image>
				</div>
				<div class="price" style="font-size: 20px; margin-left: 15px">
					¥{{ product.price }}
				</div>
				<div class="store">{{ product.shopName }}</div>
				<div class="detail">
					<div class="details">
						月成交<mark>{{ product.sell }}笔</mark>
					</div>
					<div class="details">
						评价<span>{{ product.mark }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "commodity",
		data() {
			return {
				isLogin: false,
				userName: "",
				userId: "",
				noticed: [{
					notice: "等待网络链接中。。。",
				}, ],
				imagesbox: [{
						id: 0,
						idView: require("../assets/advertise1.png"),
					},
					{
						id: 1,
						idView: require("../assets/advertise2.jpg"),
					},
					{
						id: 2,
						idView: require("../assets/advertise3.jpg"),
					},
					{
						id: 3,
						idView: require("../assets/advertise4.jpg"),
					},
					{
						id: 4,
						idView: require("../assets/advertise5.jpg"),
					},
				],
				products: [{
					id: 1111,
					price: 9999,
					shopName: "探碗揽月",
					photoAddr: "",
					sell: 9999,
					mark: 9999,
				}, ],
				calssifications: [{
					id: "123123",
					icon: "el-icon-shopping-cart-full",
					classificationName: "xxxx",
				}, ],
			};
		},
		methods: {
			toDetail(shop_id) {
				this.$router.push({
					path: "/details",
					query: {
						id: shop_id
					},
				});
			},
			toLogin() {
				this.$router.push("/login");
			},
			getAllRecommended() {
				this.$axios
					.get("/shop/index/default-recommended")
					.then((res) => {
						console.log(res);
						this.products = res.data.data;
					})
					.catch((err) => {
						console.error(err);
					});
			},
			getClassification() {
				this.$axios
					.get("/shop/index/classification")
					.then((res) => {
						console.log(res);
						this.calssifications = res.data.data;
					})
					.catch((err) => {
						console.error(err);
					});
			},

			getAllNotice() {
				this.$axios
					.get("/shop/index/notice-board")
					.then((res) => {
						console.log(res);
						this.noticed = res.data.data;
					})
					.catch((err) => {
						console.error(err);
					});
			},
			//获取用户信息（登录并且有token条件下）
			getUserInfo() {
				if (localStorage.getItem("token") != null) {
					this.$axios
						.get("/user/user-info")
						.then((res) => {
							console.log(res);
							if (res.data.code === 200) {
								this.isLogin = true;
								this.userName = res.data.data[1];
								this.userId = res.data.data[0];
							}
						})
						.catch((err) => {
							console.error(err);
						});
				}
			},
		},
		mounted() {
			this.getAllRecommended();
			this.getClassification();
			this.getAllNotice();
			this.getUserInfo();
		},
	};
</script>
<style scoped>
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
		content: "";
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
		margin-left: 50px;
		background-color: #e6e9ec;
		border-radius: 30px;
		margin-top: 25px;
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
