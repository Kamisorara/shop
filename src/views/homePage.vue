<template>
  <div id="body" style="width: 100%; height: 100%; overflow: auto">
    <top></top>
    <commodity></commodity>
    <foot></foot>
  </div>
</template>

<script>
import top from "../components/top.vue";
import foot from "../components/foot.vue";
import commodity from "../views/commodity.vue";
export default {
  components: {
    top,
    foot,
    commodity,
  },
  name: "homePage",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style>
#body {
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
