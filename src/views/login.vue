<template>
	<div>
		<el-row type="flex" class="row-bg" justify="center">
			<el-col :xl="6" :lg="7">
				<h1>欢迎来到wyf的商城</h1>

				<el-image :src="require('../assets/head.png')" style="
            height: 180px;
            width: 180px;
            margin-top: 30px;
            margin-bottom: 30px;
          "></el-image>
				<p>本网站纯属娱乐</p>
				<el-button type="text" @click="toIndex">返回商城首页</el-button>
				<div class="grid-content bg-purple"></div>
			</el-col>

			<el-col :span="1">
				<el-divider direction="vertical"></el-divider>
			</el-col>
			<el-col :span="6">
				<el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
					<el-form-item label="用户名" prop="username">
						<el-input v-model="loginForm.username" style="width: 300px"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="loginForm.password" style="width: 300px" type="password"
							@keyup.enter.native="submitForm('loginForm')"></el-input>
					</el-form-item>
					<el-link type="primary" @click="toRegister">没有账号？点击注册</el-link>
					<el-form-item>
						<el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: "login",
		data() {
			return {
				loginForm: {
					username: "",
					password: "",
					token: "",
				},
				loginStatus: {
					isLogin: 400,
					username: "",
				},
				rules: {
					username: [{
						required: true,
						message: "请输入用户名",
						trigger: "blur"
					}, ],
					password: [{
							required: true,
							message: "请输入密码",
							trigger: "blur"
						},
						{
							min: 6,
							max: 20,
							message: "长度在 6个字符以上",
							trigger: "blur"
						},
					],
				},
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.clearMethod();
						this.$axios
							.post("/user/login?" + this.$qs.stringify(this.loginForm))
							.then((res) => {
								//访问成功之后获取jwt
								// const jwt = res.headers["authorization"];
								const jwt = res.data.data.token;
								this.$store.commit("SET_TOKEN", jwt);
								this.$message({
									message: "登录成功，即将跳转登录！",
									type: "success",
								});
								// setTimeout(() => {
								// 	//需要延迟的代码 :1秒后延迟跳转到首页，可以加提示什么的
								// 	this.$router.push("/");
								// 	//延迟时间：1秒
								// }, 1000);
								this.openFullScreen();
							})
							.catch((err) => {
								console.error(err);
							});
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},
			//清除localStorage中的token 和userName
			clearMethod() {
				localStorage.clear();
				sessionStorage.clear();
			},
			//跳转注册界面
			toRegister() {
				this.$router.push("/register");
			},
			toIndex() {
				this.$router.replace("/");
			},
			//判断用户是否已经登录
			userLogin() {
				if (localStorage.getItem("token") != null) {
					this.$message({
						message: "你已经登录！",
						type: "success",
					});
					setTimeout(() => {
						this.$router.push("/");
					}, 1000);
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
					this.$router.push("/");
				}, 1000);
			}
		},
		mounted() {
			this.userLogin();
		},
	};
</script>
<style scoped>
	.el-row {
		background-color: #fafafa;
		height: 100vh;
		display: flex;
		align-items: center;
		text-align: center;
	}

	.el-divider {
		height: 250px;
	}

	.el-link {
		margin-left: 100px;
		margin-bottom: 10px;
	}
</style>
