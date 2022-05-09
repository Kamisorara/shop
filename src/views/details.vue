<template>
  <div id="details">
    <el-container>
      <el-aside width="400px"
        ><el-image
          :src="require('../assets/photo1.png')"
          style="height: 500px; width: 400px; margin-top: 100px"
        ></el-image>
        <el-image
          :src="require('../assets/photo1.png')"
          style="height: 80px; width: 80px; margin-right: 20px"
        ></el-image>
        <el-image
          :src="require('../assets/photo1.png')"
          style="height: 80px; width: 80px; margin-right: 20px"
        ></el-image>
        <el-image
          :src="require('../assets/photo1.png')"
          style="height: 80px; width: 80px; margin-right: 20px"
        ></el-image>
        <el-image
          :src="require('../assets/photo1.png')"
          style="height: 80px; width: 80px; margin-right: 20px"
        ></el-image>
      </el-aside>
      <el-container>
        <el-main>
          <div id="explain">
            <el-tag type="danger" effect="dark">官方</el-tag>
            <span style="margin-left: 20px"
              >限量版xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span
            >
          </div>
          <div id="price">
            <el-tag>价格:</el-tag>
            <span style="font-size: 30px; margin-left: 40px; color: red">
              ¥1000</span
            >
          </div>
          <div id="discounts">
            <el-tag type="info">优惠</el-tag>
            <span style="margin-left: 200px">xx币即可抵用xxx元</span>
          </div>
          <div id="delivery">
            <el-tag type="warning">配送</el-tag>
            <span style="margin-left: 200px">xxxx配送至xxx</span>
          </div>
          <div id="number">
            <div style="margin-left: 0px">
              数量
              <el-input-number
                v-model="num"
                @change="handleChange"
                :min="1"
                :max="10"
                label="描述文字"
              ></el-input-number
              >件
            </div>
          </div>
          <div id="pay">
            <el-button type="danger" round style="margin-left: 30px"
              >立即支付</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-star-off"
              circle
              style="margin-left: 100px"
            ></el-button>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script >
export default {
  name: "details",
  data() {
    return {
      num: 1,
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>
<style scoped>
#details {
  width: 1200px;
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
  margin-top: 120px;
}
</style>