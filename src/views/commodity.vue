<template>
  <div class="main">
    <div class="content">
      <div class="show" v-for="(product, index) in products" :key="index">
        <div class="imgbg">
          <el-image
            :src="require('../assets/photo1.png')"
            style="
              height: 180px;
              width: 180px;
              margin-top: 30px;
            "
          ></el-image>
        </div>
        <div class="price">¥{{ product.price }}</div>
        <div class="introduce">{{ product.introduce }}</div>
        <div class="store">{{ product.store }}</div>
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
      products: [
        {
          price: 9999,
          introduce: "是兄弟就来砍我",
          store: "探碗揽月",
          sell: 9999,
          mark: 9999,
        },
        {
          price: 9999,
          introduce: "是兄弟就来砍我",
          store: "探碗揽月",
          sell: 9999,
          mark: 9999,
        },
        {
          price: 9999,
          introduce: "是兄弟就来砍我",
          store: "探碗揽月",
          sell: 9999,
          mark: 9999,
        },
        {
          price: 9999,
          introduce: "是兄弟就来砍我",
          store: "探碗揽月",
          sell: 9999,
          mark: 9999,
        },
        {
          price: 9999,
          introduce: "是兄弟就来砍我",
          store: "探碗揽月",
          sell: 9999,
          mark: 9999,
        },
        {
          price: 9999,
          introduce: "是兄弟就来砍我",
          store: "探碗揽月",
          sell: 9999,
          mark: 9999,
        },
        {
          price: 9999,
          introduce: "是兄弟就来砍我",
          store: "探碗揽月",
          sell: 9999,
          mark: 9999,
        },
        {
          price: 9999,
          introduce: "是兄弟就来砍我",
          store: "探碗揽月",
          sell: 9999,
          mark: 9999,
        },
        {
          price: 9999,
          introduce: "是兄弟就来砍我",
          store: "探碗揽月",
          sell: 9999,
          mark: 9999,
        },
        {
          price: 9999,
          introduce: "是兄弟就来砍我",
          store: "探碗揽月",
          sell: 9999,
          mark: 9999,
        },
        {
          price: 9999,
          introduce: "是兄弟就来砍我",
          store: "探碗揽月",
          sell: 9999,
          mark: 9999,
        },
        {
          price: 9999,
          introduce: "是兄弟就来砍我",
          store: "探碗揽月",
          sell: 9999,
          mark: 9999,
        },
        {
          price: 9999,
          introduce: "是兄弟就来砍我",
          store: "探碗揽月",
          sell: 9999,
          mark: 9999,
        },
        {
          price: 9999,
          introduce: "是兄弟就来砍我",
          store: "探碗揽月",
          sell: 9999,
          mark: 9999,
        },
        {
          price: 9999,
          introduce: "是兄弟就来砍我",
          store: "探碗揽月",
          sell: 9999,
          mark: 9999,
        },
        {
          price: 9999,
          introduce: "是兄弟就来砍我",
          store: "探碗揽月",
          sell: 9999,
          mark: 9999,
        },
      ],
    };
  },
};
</script>
<style>
.main {
  width: 1000px;

  /*border: 1px solid red;*/
  margin: 0px auto;
}
div {
  /*border:1px solid green;*/
  font-size: 12px;
}
.detail {
  font-size: 0px;
  background: url(#) no-repeat 190px center;
  border: 1px solid #e6e6e6;
}
.details {
  display: inline-block;
  padding-right: 13px;
  border-right: 1px solid #e6e6e6;
  text-align: center;
  text-indent: 1.2em;
}
.show {
  width: 220px;
  display: inline-block;
  margin-left: 20px;
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
}
mark {
  background-color: transparent;
  color: #e5c45a;
}
</style>