<template>
  <div style="border-bottom: 1px solid #dfdfdf; font-size: 14px">
    <div
      style="
        display: flex;
        height: 40px;
        padding: 0 200px;
        background-color: #ea9573;
      "
    >
      <div class="top-title">会员中心</div>
      <div class="top-title" style="margin-left: 20px">提交bug</div>
      <div class="top-title" style="margin-left: 20px">充值</div>
      <div
        class="top-title"
        style="line-height: 40px; color: #ffffff; margin-left: 20px"
      >
        一键三连
      </div>
      <div style="flex: 1; display: flex">
        <div style="flex: 1"></div>
        <div style="width: 170px; display: flex">
          <el-button type="text" style="color: #ffffff" class="top-title"
            >登录</el-button
          >
          <el-button
            type="text"
            style="color: #ffffff; margin-right: 10px"
            class="top-title"
            >注册</el-button
          >
          <div
            style="
              background-color: rgb(223 221 221 / 40%);
              display: flex;
              width: 100px;
              padding: 0 10px;
            "
            class="top-title"
          >
            <img
              src="../assets/img2.png"
              style="
                width: 20px;
                height: 20px;
                margin-top: 10px;
                margin-right: 5px;
              "
            />
            <el-button type="text" style="color: #ffffff" class="top-title"
              >购物车</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div style="margin: 0 200px; height: 80px; line-height: 80px">
      <div style="display: flex">
        <img
          src="../assets/logo.png"
          style="cursor: pointer; height: 60px; margin-top: 10px"
        />
        <div class="title" style="margin-left: 30px" @click="toIndex">首页</div>
        <div class="title">电子产品</div>
        <div class="title">家具家电</div>
        <div class="title">母婴用品</div>
        <div class="title">零食</div>
        <div class="title">联系我们</div>
        <div style="flex: 1; text-align: right">
          <el-input
            placeholder="请输入查找的商品"
            v-model="input"
            style="width: 500px"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>ge

<script>
export default {
  data() {
    return {
      input: "",
    };
  },
  mounted() {},
  methods: {
    homePage() {
      this.$router.push({
        path: "/home/index",
      });
    },
    toIndex() {
      this.$router.push("/commodity");
    },
  },
};
</script >

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
