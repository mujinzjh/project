<template>
  <div class="search">
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @click="changePage"
    >
      <div slot="action" style="line-height:normal"><van-icon name="search" size="20"/></div>
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
      this.$router.push({ path: "/SearchPage" });
    },
   
  }
};
</script>

<style scoped>

</style>