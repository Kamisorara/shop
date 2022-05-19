<template>
	<div id="search">
		<el-container>
			<el-header>Header</el-header>
			<el-main>Main</el-main>
			<el-footer>Footer</el-footer>
		</el-container>
	</div>
</template>

<script>
export default {
	name: 'search',
	data() {
		return {};
	}
};
</script>

<style scoped>
.el-header,
.el-footer {
	background-color: #b3c0d1;
	color: #333;
	text-align: center;
	line-height: 60px;
}
.el-main {
	background-color: #e9eef3;
	color: #333;
	text-align: center;
	line-height: 160px;
}
</style>
