<template>
  <div id="body" style="width: 100%; height: 100%; overflow: auto">
    <top></top>
    <router-view></router-view>
    <foot></foot>
  </div>
</template>

<script>
import top from "../components/top.vue";
import foot from "../components/foot.vue";
export default {
  components: {
    top,
    foot,
  },
  name: "homePage",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
#body {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: #fafafa;
}
</style>
