<template>
  <div class="search">
    <van-search v-model="value" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
  </div>
</template>

<script>
export default {
     data() {
    return {
      value: ""
    };
  },

  methods: {
    onSearch: function() {
      console.log(1);
    }
  }
};

</script>

<style scoped>
</style>