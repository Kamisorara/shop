<template>
	<div class="main" style="height: 70vh;">
		<el-tabs v-model="activeName" style="margin-top: 30px;margin-left: 150px;margin-right: 150px;">
			<el-tab-pane label="用户管理" name="first">
				<el-row :gutter="20" style="margin-top:10px;">
					<el-col :span="8">
						<div class="grid-content bg-purple">
							<el-card class="box-card">
								<div slot="header" class="clearfix"><span>个人中心</span></div>
								<div class="name-role">
									<div v-if="ifChangeHead">
										<!-- 上传头像 -->
										<el-upload
											class="avatar-uploader"
											action="http://localhost:8081/backStage/uploadFile"
											:show-file-list="false"
											:headers="headers"
											:on-success="handleAvatarSuccess"
											:before-upload="beforeAvatarUpload"
										>
											<img v-if="imageUrl" :src="imageUrl" class="avatar" />
											<i v-else class="el-icon-plus avatar-uploader-icon"></i>
										</el-upload>
									</div>
									<!-- 头像 -->
									<div @click="changeHead()"><el-avatar :src="userHead"></el-avatar></div>
									<div style="font-size: 12px;color: #8c939d;">点击头像来更换</div>
									<span class="sender">用户 - {{ dataForm.userName }}</span>
								</div>
								<div class="registe-info">
									<span class="registe-info">
										注册时间：
										<i class="el-icon-time"></i>
										{{ dataForm.createTime }}
									</span>
								</div>
								<el-divider></el-divider>
								<div class="personal-relation">
									<div class="relation-item">
										用户id:
										<div style="float: right; padding-right:20px;">{{ dataForm.id }}</div>
									</div>
								</div>
								<div class="personal-relation">
									<div class="relation-item">
										昵称:
										<div style="float: right; padding-right:20px;">{{ dataForm.nickName }}</div>
									</div>
								</div>
								<div class="personal-relation">
									<div class="relation-item">
										手机号:
										<div style="float: right; padding-right:20px;">{{ dataForm.phonenumber }}</div>
									</div>
								</div>
								<div class="personal-relation">
									<div class="relation-item">
										邮箱:
										<div style="float: right; padding-right:20px;">{{ dataForm.email }}</div>
									</div>
								</div>
								<div class="personal-relation">
									<div class="relation-item">
										性别:
										<div style="float: right; padding-right:20px;">{{ dataForm.sex }}</div>
									</div>
								</div>
							</el-card>
						</div>
					</el-col>
					<el-col :span="16">
						<div class="grid-content bg-purple">
							<el-card class="box-card">
								<div slot="header" class="clearfix"><span>基本资料修改</span></div>
								<div>
									<el-form label-width="80px" ref="dataForm" :model="dataForm" :rules="userDetails" size="small" label-position="right">
										<el-form-item label="用户昵称" prop="nickName">
											<el-input auto-complete="off" v-model="dataForm.nickName" :disabled="isInput"></el-input>
										</el-form-item>
										<el-form-item label="手机号" prop="phonenumber">
											<el-input auto-complete="off" v-model="dataForm.phonenumber" :disabled="isInput"></el-input>
										</el-form-item>
										<el-form-item label="邮箱" prop="email"><el-input maxlength="30" v-model="dataForm.email" :disabled="isInput"></el-input></el-form-item>
										<el-form-item label="地址" prop="addr"><el-input maxlength="30" v-model="dataForm.addr" :disabled="isInput"></el-input></el-form-item>
										<el-radio-group v-model="dataForm.sex" :disabled="isInput">
											<el-radio label="男"></el-radio>
											<el-radio label="女"></el-radio>
										</el-radio-group>
									</el-form>
									<div slot="footer" class="dialog-footer" v-if="!isInput">
										<el-button size="mini" type="primary" @click="submitUpdate('dataForm')">
											<i class="el-icon-check"></i>
											提交修改
										</el-button>
										<el-button size="mini" type="warning" @click="cancleInput()">
											<i class="el-icon-error"></i>
											取消编辑
										</el-button>
									</div>
									<div slot="footer" class="dialog-footer" v-if="isInput">
										<el-button type="primary" plain @click="startInput()">
											<i class="el-icon-edit"></i>
											启用编辑
										</el-button>
									</div>
								</div>
							</el-card>
							<el-col :span="20" style="margin-top: 30px;">
								<el-card shadow="always">地址：{{ dataForm.addr }}</el-card>
							</el-col>
						</div>
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane label="账号管理" name="second">
				<el-col :span="16">
					<div class="grid-content bg-purple">
						<el-card class="box-card">
							<div slot="header" class="clearfix"><span>修改密码请谨慎(Doge)</span></div>
							<div>
								<el-form :model="resetForm" :rules="rules" ref="resetForm" label-width="170px" class="demo-resetForm">
									<el-form-item label="旧密码" prop="oldPassword">
										<el-input v-model="resetForm.oldPassword" style="width: 300px" type="password" auto-complete="off"></el-input>
									</el-form-item>
									<el-form-item label="新密码" prop="password">
										<el-input v-model="resetForm.password" style="width: 300px" type="password" auto-complete="off"></el-input>
									</el-form-item>
									<el-form-item label="再输入一次" prop="password2">
										<el-input v-model="resetForm.password2" style="width: 300px" type="password" auto-complete="off"></el-input>
									</el-form-item>

									<el-form-item><el-button type="primary" @click="submitResetPasswordForm('resetForm')">修改密码</el-button></el-form-item>
								</el-form>
							</div>
						</el-card>
					</div>
				</el-col>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import { updateUserMessage, getUserDetailMessage, getUser, getUserHead } from '@/api/user';
export default {
	name: 'userDetail',
	data() {
		//校验规则
		var ValidatePass = (rule, value, callback) => {
			if (value == '') {
				callback(new Error('请再输入一次密码'));
			} else if (value != this.resetForm.password) {
				callback(new Error('两次输入密码不一致'));
			} else {
				callback();
			}
		};
		// 邮箱校验规则
		const checkEmail = (rule, value, callback) => {
			let emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			if (emailReg.test(value) || value == '') {
				return callback();
			} else {
				callback(new Error('邮箱格式错误'));
			}
		};
		return {
			isLogin: false,
			userName: '',
			userId: '',
			userHead: '',
			//是否要更换头像
			ifChangeHead: false,
			//禁用表单编辑
			isInput: true,
			activeName: 'first',
			dataForm: {
				id: 1,
				userName: 'Kamisora',
				nickName: '卡卡',
				email: '1210281722@qq.com',
				phonenumber: '15906877873',
				sex: '男',
				createTime: '2020-04-10',
				addr: '浙江省温州市永嘉县三江街道三江立体城盛景园7-3902'
			},
			resetForm: {
				oldPassword: '',
				password: '',
				password2: '',
				token: ''
			},
			//用户资料策略
			userDetails: {
				nickName: [
					{
						required: true,
						message: '昵称不能为空嗷',
						trigger: 'blur'
					}
				],
				phonenumber: [
					{
						required: true,
						message: '手机号不能为空嗷',
						trigger: 'blur'
					},
					{ min: 11, max: 11, message: '请输入正确的手机号喔', trigger: 'blur' }
				],
				email: [
					{
						required: true,
						validator: checkEmail,
						trigger: 'blur'
					}
				],
				addr: [
					{
						required: true,
						message: '地址不能为空嗷',
						trigger: 'blur'
					}
				]
			},
			//修改密码策略
			rules: {
				oldPassword: [
					{
						required: true,
						message: '请输入旧密码',
						trigger: 'blur'
					}
				],
				password: [
					{
						required: true,
						message: '请输入新密码',
						trigger: 'blur'
					},
					{
						min: 6,
						max: 20,
						message: '长度在 6个字符以上',
						trigger: 'blur'
					}
				],
				password2: [
					{
						required: true,
						validator: ValidatePass,
						trigger: 'blur'
					}
				]
			},
			//头像地址
			imageUrl: ''
		};
	},
	methods: {
		//启动编辑
		startInput() {
			this.isInput = false;
		},
		//关闭编辑
		cancleInput() {
			this.isInput = true;
		},
		//获取用户id
		getUserId() {
			this.userId = this.$route.query.id;
		},
		//显示显示更换头像
		changeHead() {
			this.ifChangeHead = true;
		},
		//提交更新用户信息
		submitUpdate(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					updateUserMessage(this.dataForm).then(res => {
						this.$message({
							message: '修改成功！',
							type: 'success'
						});
						this.openFullScreen();
					});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		//根据userId获取用户信息
		getUserInfo() {
			if (localStorage.getItem('token') != null) {
				getUserDetailMessage(this.userId)
					.then(res => {
						console.log(res);
						this.dataForm = res.data.data;
						//获取用户信息同时获取用户头像
						getUserHead(this.userId).then(resp => {
							this.userHead = resp.data.data;
						});
					})
					.catch(err => {
						console.error(err);
					});
			}
		},
		//提交修改密码申请
		submitResetPasswordForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.submit.userName = this.loginStatus.username;
					this.submit.password = this.resetForm.password;
					this.$axios
						.post('/system/resetPassword?' + this.$qs.stringify(this.submit))
						.then(res => {
							this.$message({
								message: '修改成功！',
								type: 'success'
							});
						})
						.catch(err => {
							console.error(err);
							console.error('发生未知错误！');
							this.$message.error('修改失败！');
						});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
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
		handleAvatarSuccess(res, file) {
			console.log(res);
			console.log(file);
			this.$router.go(0); //刷新页面
		},
		beforeAvatarUpload(file) {
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isLt2M;
		}
	},
	mounted() {
		this.getUserId();
		this.getUserInfo();
	},
	//upload携带请求头
	computed: {
		headers() {
			return {
				token: localStorage.getItem('token'),
				userId: this.userId
			};
		}
	}
};
</script>

<style scoped>
/* //卡片样式 */
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
	width: 100%;
}

/* //文本样式区 */
.name-role {
	font-size: 16px;
	padding: 5px;
	text-align: center;
}

.sender {
	text-align: center;
}

.registe-info {
	text-align: center;
	padding-top: 10px;
}

.personal-relation {
	font-size: 16px;
	padding: 0px 5px 15px;
	margin-right: 1px;
	width: 100%;
}

.relation-item {
	padding: 12px;
}

.dialog-footer {
	padding-top: 10px;
	padding-left: 10%;
}

/* //布局样式区 */
.el-row {
	margin-bottom: 20px;

	&:last-child {
		margin-bottom: 0;
	}
}

.el-col {
	border-radius: 4px;
}

.bg-purple-dark {
	background: #99a9bf;
}

.bg-purple {
	background: #d3dce6;
}

.bg-purple-light {
	background: #e5e9f2;
}

.grid-content {
	border-radius: 4px;
	min-height: 36px;
}

.row-bg {
	padding: 10px 0;
	background-color: #f9fafc;
}

/* 头像上传 */
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #216fff;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #818790;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
}
.avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>
