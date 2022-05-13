<template>
	<div id="details">
		<el-container>
			<el-aside width="400px">
				<el-image :src="commodityDetail.mainPhoto" style="height: 500px; width: 400px; margin-top: 100px">
				</el-image>
				<el-image :src="commodityDetail.photo1" style="height: 80px; width: 80px; margin-right: 20px">
				</el-image>
				<el-image :src="commodityDetail.photo2" style="height: 80px; width: 80px; margin-right: 20px">
				</el-image>
				<el-image :src="commodityDetail.photo3" style="height: 80px; width: 80px; margin-right: 20px">
				</el-image>
				<el-image :src="commodityDetail.photo4" style="height: 80px; width: 80px; margin-right: 20px">
				</el-image>
			</el-aside>
			<el-container>
				<el-main>
					<div id="explain">
						<el-tag type="danger" effect="dark">{{ commodityDetail.label }}</el-tag>
						<span style="margin-left: 20px">{{ commodityDetail.shopName }}</span>
					</div>
					<div id="price">
						<el-tag>价格:</el-tag>
						<span style="font-size: 30px; margin-left: 40px; color: red">
							¥{{ commodityDetail.price }}</span>
					</div>
					<div id="discounts">
						<el-tag type="info">优惠</el-tag>
						<span style="margin-left: 200px">{{ commodityDetail.discountNotice }}</span>
					</div>
					<div id="delivery">
						<el-tag type="warning">配送</el-tag>
						<span style="margin-left: 200px">{{ commodityDetail.addr }}</span>
					</div>
					<div id="number">
						<div style="margin-left: 0px">
							数量
							<el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字">
							</el-input-number>件
						</div>
					</div>
					<div id="pay">
						<el-button type="danger" round style="margin-left: 30px">立即支付</el-button>
						<el-button type="warning" icon="el-icon-star-off" circle style="margin-left: 100px"></el-button>
					</div>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: "detail",
		data() {
			return {
				shop_id: "",
				num: 1,
				commodityDetail: {
					id: 1,
					label: "官方",
					shopName: "xxx",
					price: 1000.00,
					discountNotice: "暂无优惠",
					addr: "火星送往地球",
					mark: 999,
					sell: 999,
					mainPhoto: "https://img.alicdn.com/imgextra/i1/2114030042/O1CN01VxaRe41CBHNfA3wqa_!!2114030042.jpg_430x430q90.jpg",
					photo1: "https://img.alicdn.com/imgextra/i4/2114030042/O1CN01aQzPdw1CBHGO1rFPo_!!2114030042.jpg_60x60q90.jpg",
					photo2: "https://img.alicdn.com/imgextra/i1/2114030042/O1CN01cdBULA1CBHGUvLCnS_!!2114030042.jpg_60x60q90.jpg",
					photo3: "https://img.alicdn.com/imgextra/i1/2114030042/O1CN01lyoFTB1CBHHsIC4bF_!!2114030042.jpg_60x60q90.jpg",
					photo4: "https://img.alicdn.com/imgextra/i1/2114030042/O1CN01VxaRe41CBHNfA3wqa_!!2114030042.jpg_60x60q90.jpg",
				},
			};
		},
		methods: {
			handleChange(value) {
				console.log(value);
			},
			getShop_id() {
				this.shop_id = this.$route.query.id;
			},
			//根据id获取商品详细信息
			getCommodityDetail() {
				this.$axios.post("/shop/index/commodities?id=" + this.shop_id)
					.then(res => {
						this.commodityDetail = res.data.data;
					})
					.catch((err) => {
						console.error(err);
					});
			}
		},
		mounted() {
			this.getShop_id();
			this.getCommodityDetail();
		},
	};
</script>
<style scoped>
	#details {
		width: 1250px;
		margin: 0px auto;
	}

	.el-header,
	.el-footer {
		text-align: center;
		line-height: 60px;
	}

	.el-aside {
		color: rgb(104, 100, 100);
		line-height: 100px;
	}

	.el-main {
		line-height: 80px;
	}

	#price {
		margin-top: 40px;
		background-color: #fff2e8;
	}

	#discounts {
		background-color: #fff2e8;
		line-height: 120px;
	}

	#delivery {
		background-color: #fff2e8;
	}

	#number {
		margin-top: 60px;
	}

	#pay {
		margin-top: 100px;
	}
</style>
