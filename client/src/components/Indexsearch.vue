<template>
  <div class="search">
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @click="changePage"
    >
      <div slot="action">搜索</div>
    </van-search>

  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },

  methods: {
    changePage(e) {
      console.log(e);
      this.$router.push({ path: "/SearchPage" });
    },
   
  }
};
</script>

<style scoped>

</style>