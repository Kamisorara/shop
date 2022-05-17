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
					<div style="border-radius: 20px;background-color: #fff2e8;">
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
		<el-container>
			<el-header>
				<el-image :src="advertise" style="width:100%;height: 100%;">
				</el-image>
			</el-header>
			<el-container>
				<el-aside width="200px">
					<div id="seller-main" style="border:3px solid #bbbbbb">
						<div style="background-color:#e0e0e0;height: 80px">{{ seller.sellerName}}</div>
						<div style="height: 20px">
							<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
							</el-avatar>
						</div>
						<div id="seller" class="seller-display">
							<div class="seller-display" id="seller-b1">
								<p>描述:</p>
								<p class="seller-mark">{{ seller.sellerMark1 }}</p>
							</div>

							<div class="seller-display">
								<p>服务:</p>
								<p class="seller-mark">{{ seller.sellerMark2 }}</p>
							</div>
							<div class="seller-display">
								<p>物流:</p>
								<p class="seller-mark">{{ seller.sellerMark3  }}</p>
							</div>
						</div>
					</div>
				</el-aside>
				<el-main>
					<el-tabs v-model="activeName" type="card">
						<el-tab-pane label="商品详情" name="first">
							<div style="display: flex;border-bottom:1px solid #a6a6a6">
								<p>品牌名称:</p>
								<p>xxxxxxx</p>
							</div>
							<img :src="advertise2" style="width: 100%;">
							<div>
								<el-carousel :interval="5000" arrow="always">
									<el-carousel-item v-for="(item,index) in imagesbox" :key="index">
										<el-image :src="item.idView" style="width:100%;height: 100%;">
										</el-image>
									</el-carousel-item>
								</el-carousel>
							</div>
						</el-tab-pane>
						<el-tab-pane label="评价" name="second">
							<div id="mark-top" style="border-bottom:1px solid #a6a6a6">
								<p>大家的评价:</p>
								<el-rate v-model="value" disabled show-score text-color="#ff9900"
									score-template="{value}">
								</el-rate>
							</div>
							<div id="mark-main" style="margin-top: 50px;">
								<div id="marl-main-detail" style="margin-top: 40px;" v-for="(item,index) in comment"
									:key="index">
									<el-col :span="10">
										<el-card shadow="hover">
											<el-avatar
												src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
											</el-avatar>说：
											{{item.detail}}
											<div>
												<p>{{ item.buy }}</p>
											</div>
										</el-card>
									</el-col>
								</div>
							</div>
						</el-tab-pane>
					</el-tabs>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import {
		getCommodityDetails,
		getSellerDetails
	} from '@/api/shop';
	export default {
		name: "detail",
		data() {
			return {
				shop_id: "",
				num: 1,
				activeName: 'first',
				value: 4.9,
				advertise: "https://img.alicdn.com/tps/i4/TB1xcK0GXXXXXXTXFXXa3f9HXXX-990-50.jpeg",
				advertise2: "https://gdp.alicdn.com/imgextra/i1/3918712328/O1CN01Z6oHG61T4Gmygn7xq_!!3918712328.jpg",
				//卖家相关	
				seller: [{
					id: 0,
					sellerName: "",
					sellerMark1: 4.0,
					sellerMark2: 4.0,
					sellerMark3: 4.0,
				}],
				comment: [{
						id: 0,
						detail: "哈哈哈还可以",
						buy: "xxx产品",
					},
					{
						id: 1,
						detail: "哈哈哈还可以",
						buy: "xxx产品",
					},
					{
						id: 2,
						detail: "哈哈哈还可以",
						buy: "xxx产品",
					},

				],
				imagesbox: [{
						id: 0,
						idView: "https://img.alicdn.com/imgextra/i1/3918712328/O1CN01ht8lzd1T4GnU4Px48_!!3918712328.jpg",
					},
					{
						id: 1,
						idView: "https://detail.tmall.com/item.htm?spm=a1z10.1-b-s.w5003-23365291949.2.1520d9b47hCata&id=625285462516&scene=taobao_shop",
					},
					{
						id: 2,
						idView: "https://img.alicdn.com/tfs/TB1.CUdsY9YBuNjy0FgXXcxcXXa-1572-394.png",
					},
				],
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
					sellerId: 1,
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
				getCommodityDetails(this.shop_id)
					.then(res => {
						console.log(res);
						this.commodityDetail = res.data.data;
					})
					.catch((err) => {
						console.error(err);
					});
			},
			//根据id获取店家信息
			getSellerDetail() {
				getSellerDetails(this.shop_id)
					.then(res => {
						console.log(res);
						this.seller = res.data.data;
					})
					.catch((err) => {
						console.error(err);
					});
			}
		},
		mounted() {
			this.getShop_id();
			this.getCommodityDetail();
			this.getSellerDetail();
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

	}

	#discounts {

		line-height: 120px;
	}

	#delivery {}

	#number {
		margin-top: 60px;
	}

	#pay {
		margin-top: 100px;
	}



	/* 卖家块 */
	.seller-display {
		display: flex;
	}

	.seller-mark {
		font-size: 20px;
		color: red;
	}
</style>
