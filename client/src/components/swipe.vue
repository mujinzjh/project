<template>
  <van-swipe :autoplay="3000" :height="250">
    <van-swipe-item v-for="(item, index) in images" :key="index" @click="ongoclick(item.gid)">
        <img :src="item.img" class="imgs" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  data() {
    return {
      images: []
    };
  },
  mounted() {
    this.getRem();
  },
  methods: {
    getRem: function() {
      this.axios
        .get("/Goods")
        .then(response => {
          console.log(response);
          this.images = response.data;
          this.images.forEach(el => {
            el.img = el.img.split(",")[0];
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  ongoclick(gid) {
    this.$router.push({ path: "/Info", query: { gid: gid } });
  }
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.imgs {
  width: 100%;
  height: 250px;
}
</style>