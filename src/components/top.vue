<template>
	<div style="border-bottom: 1px solid #dfdfdf; font-size: 14px">
		<div style="
        display: flex;
        height: 40px;
        padding: 0 200px;
        background-color: #ea9573;
      ">
			<div class="top-title">会员中心</div>
			<div class="top-title" style="margin-left: 20px">提交bug</div>
			<div class="top-title" style="margin-left: 20px">充值</div>
			<div class="top-title" style="line-height: 40px; color: #ffffff; margin-left: 20px">
				一键三连
			</div>
			<div style="flex: 1; display: flex">
				<div style="flex: 1"></div>
				<div style="width: 170px; display: flex">
					<el-button v-if="!isLogin" type="text" style="color: #ffffff" class="top-title" @click="toLogin">登录
					</el-button>
					<el-button v-if="!isLogin" type="text" style="color: #ffffff; margin-right: 10px" class="top-title"
						@click="toRegister">注册</el-button>
					<div style="margin-right: 10px" v-if="isLogin">
						<el-dropdown>
							<span class="el-dropdown-link" style="font-size: 15px">
								{{ userName }},你好<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item @click.native="toUserDetail()">
									个人中心
								</el-dropdown-item>
								<el-dropdown-item @click.native="logout">退出</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
					<div style="
              background-color: rgb(223 221 221 / 40%);
              display: flex;
              width: 100px;
              padding: 0 10px;
            " class="top-title">
						<el-button type="text" style="color: #ffffff" class="top-title"><i
								class="el-icon-shopping-cart-1"></i>购物车</el-button>
					</div>
				</div>
			</div>
		</div>
		<div style="margin: 0 200px; height: 80px; line-height: 80px">
			<div style="display: flex">
				<img src="../assets/img1.png" style="cursor: pointer; height: 60px; margin-top: 10px" />
				<div class="title" style="margin-left: 30px" @click="toIndex">首页</div>
				<div class="title">电子产品</div>
				<div class="title">家具家电</div>
				<div class="title">母婴用品</div>
				<div class="title">零食</div>
				<div class="title">联系我们</div>
				<div style="flex: 1; text-align: right">
					<el-input placeholder="请输入查找的商品" v-model="input" style="width: 500px">
						<el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		login,
		getUser,
		logout
	} from "@/api/user";
	export default {
		data() {
			return {
				input: "",
				isLogin: false,
				username: "",
				userId: ""
			};
		},
		methods: {
			getUserInfo() {
				if (localStorage.getItem("token") != null) {
					getUser()
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
							this.$message({
								message: "请重新登录",
								type: "error",
							})
							this.clearMethod();
							this.$router.go(0);
						});
				}
			},
			homePage() {
				this.$router.push({
					path: "/home/index",
				});
			},
			//回到主页面
			toIndex() {
				this.openFullScreen();
				this.$router.push("/");
			},

			//登录界面
			toLogin() {
				this.$router.push("/login");
			},
			//注册界面
			toRegister() {
				this.$router.push("/register");
			},
			//用户详情界面
			toUserDetail() {
				if (localStorage.getItem("token") != null) {
					this.openFullScreen();
					this.$router.push("/user-detail");
				}
			},
			logout() {
				logout()
					.then((res) => {
						this.clearMethod();
						this.$store.commit("resetState"); //调用store里面的方法来清空token
						this.$message({
							message: res.data.msg,
							type: "success",
						});
						this.openFullScreen();
					})
					.catch((err) => {
						console.error(err);
					});
			},
			//清除localStorage中的token 和userName
			clearMethod() {
				localStorage.clear();
				sessionStorage.clear();
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
					this.$router.go(0); //刷新页面
					loading.close();
				}, 500);
			},
		},
		mounted() {
			this.getUserInfo();
		},
	};
</script>

<style scoped>
	.top-title:hover {
		cursor: pointer;
		color: #e5e5e5 !important;
	}

	.title {
		font-weight: bold;
		font-size: 18px;
	}

	.title:hover {
		color: #c250c6 !important;
	}

	.top-title {
		padding-right: 20px;
		border-right: 1px solid rgb(230 230 230 / 40%);
		line-height: 40px;
		color: #ffffff;
	}

	.title {
		margin-right: 20px;
		cursor: pointer;
		color: gray;
	}
</style>
