<template>
	<div style="font-size: 14px" class="foot">
		<div style="margin: 50px 200px 50px 200px">
			<div style="display: flex">
				<div style="flex: 1; display: flex">
					<div style="">
						<div class="foot-title">帮助中心</div>
						<div class="foot-item">账户管理</div>
						<div class="foot-item">网站报错</div>
						<div class="foot-item">bug修改</div>
					</div>
					<div style="margin-left: 100px">
						<div class="foot-title">服务支持</div>
						<div class="foot-item">购物指南</div>
						<div class="foot-item">开源链接</div>
					</div>
					<div style="margin-left: 100px">
						<div class="foot-title">线下门店</div>
						<div class="foot-item">没有门店</div>
						<div class="foot-item">这就是期末作业</div>
					</div>
					<div style="margin-left: 100px">
						<div class="foot-title">支付方式</div>
						<div class="foot-item">中国银联</div>
						<div class="foot-item">ji付宝</div>
						<div class="foot-item">PayPal</div>
					</div>
				</div>
				<div
					style="
            width: 250px;
            border-left: 1px solid #dfdfdf;
            text-align: center;
          "
				>
					<div
						style="
              color: #e0d8db;
              font-weight: bold;
              font-size: 18px;
              line-height: 40px;
            "
					>
						<el-link type="info" href="https://github.com/Kamisorara/shop">本网站已在github开源</el-link>
					</div>
					<div style="color: gray">周一至周日0：00-24：00</div>
					<div style="color: gray; margin-bottom: 10px">（全天在线）</div>
					<el-button type="success" round icon="el-icon-headset">996客服</el-button>
				</div>
			</div>
		</div>
		<div
			style="
        background-color: #e0d8db;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #8c8c8c;
      "
		>
			本网站是wyf的期末作业
		</div>
	</div>
</template>

<script></script>

<style scoped>
.foot {
	background-color: #f9f5f5;
}
.foot-title {
	height: 40px;
	line-height: 40px;
}

.foot-item {
	height: 25px;
	line-height: 25px;
	color: gray;
}

.foot-item:hover {
	cursor: pointer;
	color: #2a7fe8;
}
</style>
